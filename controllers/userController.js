import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import HTTPError from '../utils/httpError.js';
import { deleteOne, getAll, getOne } from './handlerFactory.js';

const filteredBodyObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filteredBodyObj(req.body, 'username', 'email');
  if (req.body.password) {
    return next(
      new HTTPError('You cannot update your password in this route!', 400),
    );
  }

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
  });

  if (!user) {
    return next(new HTTPError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const verifyPassword = await user.correctPassword(
    req.body.currentPassword,
    user.password,
  );
  // FIXME validate password
  if (!verifyPassword) {
    return next(new HTTPError('your current password is wrong!', 400));
  }

  user.password = req.body.password;

  await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new HTTPError(
        `Invalid Id: ${req.params.id}!cannot find this user on the server`,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
