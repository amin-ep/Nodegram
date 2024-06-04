import Comment from '../models/Comment.js';
import catchAsync from '../utils/catchAsync.js';
import HTTPError from '../utils/httpError.js';
import { commentCreateValidator } from '../validation/commentValidation.js';
import { createReplyValidator } from '../validation/replyValidation.js';
import { createOne, deleteOne, getOne, updateOne } from './handlerFactory.js';

export const checkPostId = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId;
  next();
};

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find().populate({
    path: 'user',
    select: 'username email -posts',
  });

  res.status(200).json({
    status: 'success',
    data: {
      comments,
    },
  });
});
export const getComment = getOne(Comment);
export const createComment = createOne(Comment, commentCreateValidator);
export const updateComment = updateOne(Comment);
export const deleteComment = deleteOne(Comment);
export const createReply = createOne(Comment, createReplyValidator);
