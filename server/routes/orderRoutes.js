import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.get('/my-orders', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
