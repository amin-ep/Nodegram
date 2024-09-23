import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
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
  const comments = await Comment.find({
    post: req.params.postId ?? undefined,
  }).populate({
    path: 'user',
    select: 'username image',
  });

  if (req.params.postId) {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return next(new HTTPError(`Invalid Id: ${req.params.postId}`));
    }
  }

  res.status(200).json({
    status: 'success',
    result: comments.length,
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
