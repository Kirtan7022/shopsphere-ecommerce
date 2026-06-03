import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate, registerRules, loginRules } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.post('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;
