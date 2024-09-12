import Joi from 'joi';

export const postValidator = Joi.object({
  title: Joi.string().required().min(3).max(20),
  description: Joi.string().required().min(10).max(400),
  location: Joi.array().empty(),
  image: Joi.string().required(),
  user: Joi.string().required(),
});
