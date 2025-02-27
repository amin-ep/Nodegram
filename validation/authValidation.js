import Joi from 'joi';

export const signupValidator = Joi.object({
  image: Joi.string(),
  username: Joi.string().min(5).max(12).required().lowercase(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'io'] },
    })
    .required(),
  password: Joi.string().min(8).max(12).required(),
  role: Joi.string().valid('admin', 'author', 'user'),
});

export const loginValidator = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'io'] },
    })
    .required(),
  password: Joi.string().min(8).max(12).required(),
});

export const forgetPasswordValidator = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'io'] },
    })
    .required(),
});

export const resetPasswordValidator = Joi.object({
  password: Joi.string().min(8).max(12).required(),
});

export const validateVerifyEmail = Joi.object({
  number: Joi.string().min(8).max(12),
});
