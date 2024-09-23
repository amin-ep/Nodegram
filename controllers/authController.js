import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.js';
import {
  signupValidator,
  loginValidator,
} from '../validation/authValidation.js';
import HTTPError from '../utils/httpError.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../emails/email.js';
import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const imageOriginalName = file.originalname.split('.')[0];
    cb(null, `user-${Date.now()}-${imageOriginalName}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new HTTPError('Not an image, please upload only images', 400), false);
  }
};

const uploads = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserImage = uploads.single('image');

const createTokenAndRes = (res, statusCode, data, message) => {
  const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIERES_IN,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    message: message ? message : undefined,
    data: data,
  });
};

const sendEmailVerifyKey = async user => {
  const key = await user.generateEmailVerification();
  const link = `http://localhost:5173/verify/${key}`;
  const html = `
  <div>
  <h3>
    Please click this <a href="${link}">Link</a> to verify your email address!
  </h3>
  </div>
  `;

  user.emailVerifyKey = key;
  await user.save({ validateBeforeSave: false });
  await sendEmail({
    email: user.email,
    subject: `This is your verification key to verify your email ${key}`,
    html,
    message: key,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { username, email, password, role, image } = req.body;
  const requestBody = {
    username,
    email,
    password,
    role,
    image,
  };

  // validate input data
  const { error } = signupValidator.validate(requestBody);
  if (error) {
    return next(new HTTPError(error.message, 400));
  }

  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    const user = await User.create(requestBody);
    sendEmailVerifyKey(user);

    res.status(201).json({
      status: 'success',
      message: `Sent an email to ${user.email}`,
    });
  } else if (existingUser && existingUser.verified === false) {
    sendEmailVerifyKey(existingUser);

    res.status(201).json({
      status: 'success',
      message: `Sent an email to ${existingUser.email}`,
    });
  } else if (existingUser.active === true && existingUser.verified === true) {
    return next(
      new HTTPError(
        'There is a user with this email. Please provide another email',
        403,
      ),
    );
  }
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  // get user based on verifyEmail
  const user = await User.findOne({ emailVerifyKey: req.params.key });

  if (!user) {
    return next(new HTTPError('Invalid key!', 404));
  }

  user.verified = true;
  user.emailVerifyKey = undefined;
  await user.save({ validateBeforeSave: false });

  createTokenAndRes(res, 200, user);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // const { error } = validateUser.validate({ email, password });
  const { error } = loginValidator.validate({ email, password });

  if (error) {
    return next(new HTTPError(error.message, 400));
  }

  // check the user still exists
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new HTTPError('Incorrect email or password!', 401));

  req.user = user;
  createTokenAndRes(res, 200, user);
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HTTPError('You do not at permission to perform this action', 403),
      );
    }
    next();
  };
};

export const forgetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new HTTPError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createresetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  const link = `http://localhost:5173/resetPassword/${resetToken}`;
  const html = `
  <div>
  <h3>
    Please click this <a href="${link}">Link</a> to verify your email address!
  </h3>
  </div>
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
      html: html,
    });

    res.status(200).json({
      status: 'success',
      message: `An email sent to ${user.email}`,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HTTPError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const user = await User.findOne({
    passwordResetToken: req.params.token,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new HTTPError('Invalid or expired token!', 400));
  }

  if (!req.body.password) {
    return next(new HTTPError('Please provide a new password!', 400));
  }

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.password = req.body.password;

  await user.save();

  createTokenAndRes(res, 200, user);
});
