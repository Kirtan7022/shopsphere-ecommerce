import express from 'express';
import { getUsers, getUserById, deleteUser, updateUserRole } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser);
router.put('/:id/role', protect, admin, updateUserRole);

export default router;
