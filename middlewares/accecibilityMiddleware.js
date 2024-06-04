import HTTPError from '../utils/httpError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';

export const checkDocuemntsUser = Model => {
  return async (req, res, next) => {
    const doc = await Model.findOne({ _id: req.params.id });

    if (!doc) {
      return next(new HTTPError(`doc not found!`, 404));
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (doc.user.toString() !== decoded.id) {
      return next(new HTTPError(`this data does not belong to you`, 403));
    }
    next();
  };
};

export const checkUserRole = method => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id });

    if (user.role === 'admin') {
      return next(
        new HTTPError(`You cannot ${method} the data of an admin`, 403),
      );
    }
    next();
  };
};

export const protect = catchAsync(async (req, res, next) => {
  // Get token
  let token;
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  // send error if token does not exists
  if (!token) {
    return next(
      new HTTPError('You are not logged in,please login to get access!', 401),
    );
  }

  // token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(new HTTPError('The user does no longer exists', 401));

  // check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new HTTPError('This user changed password! please login again.', 401),
    );
  }

  if (currentUser.verified === false) {
    return next(new HTTPError('This email is not verified yet', 401));
  }

  req.user = currentUser;
  next();
});
