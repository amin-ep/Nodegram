import Joi from 'joi';

export const createReplyValidator = Joi.object({
  text: Joi.string().required().min(1).max(200),
  post: Joi.string().required(),
  user: Joi.string().required(),
  parentComment: Joi.string().required(),
});
