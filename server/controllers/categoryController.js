import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { AppError } from '../middleware/errorMiddleware.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort('name');

  // Get product count per category
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const productCount = await Product.countDocuments({ category: cat.name });
      return {
        ...cat.toObject(),
        productCount,
      };
    })
  );

  res.json({
    success: true,
    count: categoriesWithCount.length,
    categories: categoriesWithCount,
  });
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.json({
    success: true,
    category,
  });
});

// @desc    Create category (admin)
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  const categoryExists = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (categoryExists) {
    throw new AppError('Category already exists', 400);
  }

  const category = await Category.create({ name, description, image });

  res.status(201).json({
    success: true,
    category,
  });
});

// @desc    Update category (admin)
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    category: updatedCategory,
  });
});

// @desc    Delete category (admin)
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  // Check if any products use this category
  const productCount = await Product.countDocuments({ category: category.name });
  if (productCount > 0) {
    throw new AppError(
      `Cannot delete category. ${productCount} products are using this category.`,
      400
    );
  }

  await Category.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Category deleted successfully',
  });
});
