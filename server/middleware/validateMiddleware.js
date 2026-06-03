import { validationResult, body, param, query } from 'express-validator';
import { AppError } from './errorMiddleware.js';

// Run validation and collect errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    throw new AppError(extractedErrors.map(e => e.message).join('. '), 400);
  }
  next();
};

// ─── Auth Validation Rules ────────────────────────────────────────

export const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number'),
];

export const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

// ─── Product Validation Rules ─────────────────────────────────────

export const createProductRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 200 }).withMessage('Product name cannot exceed 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Product description is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

export const reviewRules = [
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty().withMessage('Review comment is required')
    .isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters'),
];

// ─── Order Validation Rules ───────────────────────────────────────

export const createOrderRules = [
  body('orderItems')
    .isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('orderItems.*.product')
    .notEmpty().withMessage('Product ID is required for each item'),
  body('orderItems.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress.street')
    .trim()
    .notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode')
    .trim()
    .notEmpty().withMessage('Zip code is required'),
  body('shippingAddress.country')
    .trim()
    .notEmpty().withMessage('Country is required'),
  body('paymentMethod')
    .trim()
    .notEmpty().withMessage('Payment method is required'),
];

// ─── Param Validation ─────────────────────────────────────────────

export const mongoIdRule = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];
