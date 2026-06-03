import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import ApiFeatures from '../utils/apiFeatures.js';
import { AppError } from '../middleware/errorMiddleware.js';

const DEFAULT_PAGE_SIZE = parseInt(process.env.DEFAULT_PAGE_SIZE) || 12;

// @desc    Get all products (with search, filter, sort, pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  // Get total count for pagination metadata
  const totalProducts = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .selectFields()
    .paginate(DEFAULT_PAGE_SIZE);

  const products = await apiFeatures.query;

  // Count filtered results
  const filteredFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  const filteredCount = await Product.countDocuments(filteredFeatures.query.getFilter());

  const { page, limit } = apiFeatures.pagination;

  res.json({
    success: true,
    count: products.length,
    totalProducts,
    filteredCount,
    totalPages: Math.ceil(filteredCount / limit),
    currentPage: page,
    products,
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name avatar');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.json({
    success: true,
    product,
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if user already reviewed this product
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    throw new AppError('You have already reviewed this product', 400);
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.averageRating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
  });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const products = await Product.find({ featured: true })
    .sort({ averageRating: -1 })
    .limit(limit);

  res.json({
    success: true,
    products,
  });
});
