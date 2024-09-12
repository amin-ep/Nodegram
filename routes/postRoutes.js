import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
  uploadPostImage,
  setImageOnBody,
} from '../controllers/postController.js';
import {
  checkDocuemntsUser,
  protect,
} from '../middlewares/accecibilityMiddleware.js';
import { restrictTo } from '../controllers/authController.js';
import Post from '../models/Post.js';
import commentRouter from './commentRoutes.js';
import likeRouter from './likeRoutes.js';

const router = express.Router();

// Nested Routes
router.use('/:postId/comments', commentRouter);
router.use('/:postId/likes', likeRouter);

router
  .route('/')
  .get(getAllPosts)
  .post(
    protect,
    restrictTo('author', 'admin'),
    uploadPostImage,
    setImageOnBody,
    createPost,
  );

router
  .route('/:id')
  .get(getPost)
  .patch(
    protect,
    restrictTo('author'),
    checkDocuemntsUser(Post),
    uploadPostImage,
    setImageOnBody,
    updatePost,
  )

  .delete(protect, restrictTo('author'), checkDocuemntsUser(Post), deletePost);

export default router;
