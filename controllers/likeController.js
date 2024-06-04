import catchAsync from '../utils/catchAsync.js';
import HTTPError from '../utils/httpError.js';
import Like from '../models/Like.js';
import { likeValidator } from '../validation/likeValidation.js';
import { getAll, getOne } from './handlerFactory.js';
import Post from '../models/Post.js';

export const getAllLikes = getAll(Like);
export const getLike = getOne(Like);

export const toggleLike = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  const { error } = likeValidator.validate(req.body);
  if (error) {
    return next(new HTTPError(error.message, 400));
  }

  const post = await Post.findOne({ _id: req.body.post });
  const liked = post.likes.map(el => el.user == req.user.id).pop();
  if (liked) {
    await Like.findOneAndDelete({ user: req.user.id });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    const newLike = await Like.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        like: newLike,
      },
    });
  }
});
