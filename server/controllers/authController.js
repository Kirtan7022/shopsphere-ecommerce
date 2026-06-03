import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import User from '../models/User.js';
import { generateToken, sendTokenResponse } from '../utils/generateToken.js';
import { AppError } from '../middleware/errorMiddleware.js';
import sendEmail from '../utils/sendEmail.js';
import { resetPasswordTemplate, passwordChangedTemplate } from '../utils/emailTemplates.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('User already exists with this email', 400);
  }

  const user = await User.create({ name, email, password });

  if (user) {
    sendTokenResponse(user, 201, res);
  } else {
    throw new AppError('Invalid user data', 400);
  }
});

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    user,
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.avatar = req.body.avatar || user.avatar;

  if (req.body.address) {
    user.address = {
      ...user.address,
      ...req.body.address,
    };
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      address: updatedUser.address,
    },
  });
});

// @desc    Logout user & clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

// @desc    Forgot password - send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError('Please provide an email address', 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('No account found with that email address', 404);
  }

  // Generate reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopSphere - Password Reset Request',
      html: resetPasswordTemplate(user.name, resetUrl),
    });

    res.json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    // Clear reset token on error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppError('Email could not be sent. Please try again later.', 500);
  }
});

// @desc    Reset password with token
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    throw new AppError('Please provide password and confirm password', 400);
  }

  if (password !== confirmPassword) {
    throw new AppError('Passwords do not match', 400);
  }

  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }

  // Hash the token from URL params to match DB
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Find user with valid token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Invalid or expired reset token', 400);
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Send confirmation email
  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopSphere - Password Changed Successfully',
      html: passwordChangedTemplate(user.name),
    });
  } catch (err) {
    // Non-critical, don't throw
    console.error('Confirmation email failed:', err.message);
  }

  res.json({
    success: true,
    message: 'Password reset successful. You can now log in with your new password.',
  });
});
