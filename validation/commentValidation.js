import Joi from 'joi';

export const commentCreateValidator = Joi.object({
  text: Joi.string().min(1).max(200).required(),
  post: Joi.string().required(),
  user: Joi.string().required(),
});

export const commentUpdateValidator = commentCreateValidator.fork(
  ['post', 'user'],
  schema => schema.optional(),
);
