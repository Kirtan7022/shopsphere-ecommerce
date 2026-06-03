import express from 'express';
import { getUsers, getUserById, deleteUser, updateUserRole } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validate, mongoIdRule } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id')
  .get(protect, admin, mongoIdRule, validate, getUserById)
  .delete(protect, admin, mongoIdRule, validate, deleteUser);
router.put('/:id/role', protect, admin, mongoIdRule, validate, updateUserRole);

export default router;
