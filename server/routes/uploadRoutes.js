import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, admin } from '../middleware/authMiddleware.js';
import { AppError } from '../middleware/errorMiddleware.js';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files (jpeg, jpg, png, gif, webp) are allowed', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Single image upload
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }
  res.json({
    success: true,
    url: `/${req.file.path.replace(/\\\\/g, '/')}`,
    message: 'Image uploaded successfully',
  });
});

// Multiple images upload (max 5)
router.post('/multiple', protect, admin, upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError('No files uploaded', 400);
  }
  const urls = req.files.map((file) => ({
    url: `/${file.path.replace(/\\\\/g, '/')}`,
    filename: file.filename,
  }));
  res.json({
    success: true,
    urls,
    message: `${req.files.length} images uploaded successfully`,
  });
});

export default router;
