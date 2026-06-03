import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validate, createProductRules, reviewRules, mongoIdRule } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.get('/top', getTopProducts);
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProductRules, validate, createProduct);

router.route('/:id')
  .get(mongoIdRule, validate, getProductById)
  .put(protect, admin, mongoIdRule, validate, updateProduct)
  .delete(protect, admin, mongoIdRule, validate, deleteProduct);

router.post('/:id/reviews', protect, mongoIdRule, reviewRules, validate, createProductReview);

export default router;
