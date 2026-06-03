import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { AppError } from '../middleware/errorMiddleware.js';

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Search by name or email
  const searchQuery = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { email: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(searchQuery)
    .select('-password')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(searchQuery);

  res.json({
    success: true,
    count: users.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    users,
  });
});

// @desc    Get user by ID (admin)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Get user's order count
  const orderCount = await Order.countDocuments({ user: req.params.id });

  res.json({
    success: true,
    user: {
      ...user.toObject(),
      orderCount,
    },
  });
});

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Prevent deleting admin users
  if (user.role === 'admin') {
    throw new AppError('Cannot delete admin users', 400);
  }

  // Prevent self-deletion
  if (user._id.toString() === req.user._id.toString()) {
    throw new AppError('Cannot delete your own account from admin panel', 400);
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});

// @desc    Update user role (admin)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const { role } = req.body;

  if (!role || !['user', 'admin'].includes(role)) {
    throw new AppError('Invalid role. Must be either user or admin', 400);
  }

  // Prevent changing own role
  if (user._id.toString() === req.user._id.toString()) {
    throw new AppError('Cannot change your own role', 400);
  }

  user.role = role;
  await user.save();

  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
