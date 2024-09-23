import express from 'express';
import {
  signup,
  login,
  forgetPassword,
  resetPassword,
  verifyEmail,
  restrictTo,
  uploadUserImage,
} from '../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  getMe,
  deleteMe,
  updateMe,
  updateMyPassword,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

import {
  checkUserRole,
  protect,
} from '../middlewares/accecibilityMiddleware.js';
import likeRouter from '../routes/likeRoutes.js';
import { setImageOnBody } from '../controllers/postController.js';

const router = express.Router();

router.route('/signup').post(uploadUserImage, setImageOnBody, signup);
router.route('/verifyEmail/:key').post(verifyEmail);
router.route('/login').post(login);
router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword/:token').post(resetPassword);

router.get('/me', protect, getMe, getUser);
router.route('/').get(protect, restrictTo('admin'), getAllUsers);
router.delete('/deleteMe', protect, deleteMe);
router.patch('/updateMe', protect, uploadUserImage, setImageOnBody, updateMe);
router.patch('/updateMyPassword', protect, updateMyPassword);

router
  .route('/:id')
  .get(getUser)
  .patch(protect, restrictTo('admin'), checkUserRole('update'), updateUser)
  .delete(protect, restrictTo('admin'), checkUserRole('delete'), deleteUser);

router.route('/:userId/likes', likeRouter);

export default router;
