import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  updateOrderToPaid,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validate, createOrderRules, mongoIdRule } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrderRules, validate, createOrder)
  .get(protect, admin, getAllOrders);

router.get('/my-orders', protect, getMyOrders);

router.route('/:id')
  .get(protect, mongoIdRule, validate, getOrderById);

router.put('/:id/status', protect, admin, mongoIdRule, validate, updateOrderStatus);
router.put('/:id/pay', protect, mongoIdRule, validate, updateOrderToPaid);

export default router;
