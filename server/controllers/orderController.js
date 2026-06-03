import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { AppError } from '../middleware/errorMiddleware.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new AppError('No order items provided', 400);
  }

  // Fetch product details and calculate prices
  let itemsPrice = 0;
  const populatedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new AppError(`Product not found: ${item.product}`, 404);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${product.name}. Available: ${product.stock}`, 400);
    }

    populatedItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0]?.url || '',
      price: product.price,
      quantity: item.quantity,
    });

    itemsPrice += product.price * item.quantity;

    // Reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  // Calculate prices
  const taxRate = 0.18; // 18% GST
  const taxPrice = Math.round(itemsPrice * taxRate * 100) / 100;
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

  const order = await Order.create({
    user: req.user._id,
    orderItems: populatedItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name images');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Only allow the order owner or admin to view
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to view this order', 403);
  }

  res.json({
    success: true,
    order,
  });
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: req.user._id })
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments({ user: req.user._id });

  res.json({
    success: true,
    count: orders.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    orders,
  });
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  const { status } = req.body;

  if (!status) {
    throw new AppError('Status is required', 400);
  }

  const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
  }

  // Handle cancellation - restore stock
  if (status === 'Cancelled' && order.status !== 'Cancelled') {
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
  }

  // Handle delivery
  if (status === 'Delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  order.status = status;
  const updatedOrder = await order.save();

  res.json({
    success: true,
    order: updatedOrder,
  });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    updateTime: req.body.update_time,
    emailAddress: req.body.payer?.email_address,
  };

  const updatedOrder = await order.save();

  res.json({
    success: true,
    order: updatedOrder,
  });
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .populate('user', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  // Calculate total revenue
  const revenueResult = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);
  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  res.json({
    success: true,
    count: orders.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    totalRevenue,
    orders,
  });
});
