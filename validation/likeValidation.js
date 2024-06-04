import Joi from 'joi';

export const likeValidator = Joi.object({
  user: Joi.string().required(),
  post: Joi.string().required(),
});
