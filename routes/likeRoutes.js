import { protect } from '../middlewares/accecibilityMiddleware.js';
import {
  getAllLikes,
  toggleLike,
  getLike,
} from '../controllers/likeController.js';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllLikes).post(protect, toggleLike);
router.route('/:id').get(getLike);

export default router;
