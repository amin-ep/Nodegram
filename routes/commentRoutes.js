import {
  createComment,
  createReply,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
  checkPostId,
} from '../controllers/commentController.js';
import { restrictTo } from '../controllers/authController.js';
import {
  protect,
  checkDocuemntsUser,
} from '../middlewares/accecibilityMiddleware.js';
import Comment from '../models/Comment.js';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/').get(getAllComments).post(protect, checkPostId, createComment);

router.route('/replies').post(protect, checkPostId, createReply);

router
  .route('/:id')
  .get(getComment)
  .delete(checkDocuemntsUser(Comment), deleteComment)
  .patch(checkDocuemntsUser(Comment), updateComment);

export default router;
