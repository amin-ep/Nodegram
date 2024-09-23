import Joi from 'joi';

export const commentCreateValidator = Joi.object({
  post: Joi.string().required(),
  text: Joi.string().min(1).max(200).required(),
  user: Joi.string().required(),
  parentComment: Joi.string(),
});

export const commentUpdateValidator = commentCreateValidator.fork(
  ['post', 'user'],
  schema => schema.optional(),
);
