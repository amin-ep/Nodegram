import Joi from 'joi';

export const updateMeValidator = Joi.object({
  image: Joi.string().optional(),
  username: Joi.string().min(5).max(12).required().lowercase().trim(true),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'io'] },
    })
    .required(),
});
