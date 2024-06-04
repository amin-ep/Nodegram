import express from 'express';
import {
  signup,
  login,
  forgetPassword,
  resetPassword,
  verifyEmail,
  restrictTo,
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

const router = express.Router();

router.route('/signup').post(signup);
router.route('/verifyEmail/:key').post(verifyEmail);
router.route('/login').post(login);
router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword/:token').post(resetPassword);

router.use(protect);
router.get('/me', getMe, getUser);
router.route('/').get(restrictTo('admin'), getAllUsers);
router
  .route('/:id')
  .get(getUser)
  .patch(restrictTo('admin'), checkUserRole('update'), updateUser)
  .delete(restrictTo('admin'), checkUserRole('delete'), deleteUser);

router.route('/:userId/likes', likeRouter);

router.delete('/deleteMe', deleteMe);
router.patch('/updateMe', updateMe);
router.patch('/updateMyPassword', updateMyPassword);

export default router;
