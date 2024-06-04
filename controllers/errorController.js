import { config } from 'dotenv';
import HTTPError from '../utils/httpError.js';

config({ path: '../config.env' });

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
      err,
    });
  }
};

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid data sent: ${errors}`;
  return new HTTPError(message, 400);
};

const handleCastError = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new HTTPError(message, 404);
};

const handleDuplicateFieldError = err => {
  const values = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field: ${values}. please use another value!`;
  return new HTTPError(message, 400);
};

const handleJWTError = () => {
  return new HTTPError('Invalid token', 401);
};

const handleJWTExpieredError = () => {
  return new HTTPError('The token has expired, please login again!', 401);
};

export default function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'ValidationError') err = handleValidationError(err);
    if (err.name === 'CastError') err = handleCastError(err);
    if (err.code === 11000) err = handleDuplicateFieldError(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpieredError();

    sendErrorForProd(err, res);
  }
}
