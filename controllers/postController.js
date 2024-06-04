import Post from '../models/Post.js';
import HTTPError from '../utils/httpError.js';
import { postValidator } from '../validation/postValidation.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';
import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/posts');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `post-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new HTTPError('Not an image, please upload only images', 400), false);
  }
};

export const setImageOnBody = (req, res, next) => {
  if (!req.body.image) {
    req.body.image = `post-${Date.now()}.jpeg`;
  }
  next();
};

const uploads = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadPostImage = uploads.single('image');

export const getAllPosts = getAll(Post);
export const getPost = getOne(Post);
export const createPost = createOne(Post, postValidator);
export const deletePost = deleteOne(Post);
export const updatePost = updateOne(Post);
