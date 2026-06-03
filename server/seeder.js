import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Category from './models/Category.js';

dotenv.config();

// Sample data
const categories = [
  { name: 'Electronics', description: 'Electronic devices and gadgets' },
  { name: 'Clothing', description: 'Fashion and apparel' },
  { name: 'Home & Kitchen', description: 'Home appliances and kitchen essentials' },
  { name: 'Books', description: 'Books and educational materials' },
  { name: 'Sports', description: 'Sports equipment and accessories' },
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@shopsphere.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    console.log('Existing data cleared!');

    // Seed categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories seeded`);

    // Seed users (password will be hashed by the pre-save hook)
    const createdUsers = await User.create(users);
    const adminUser = createdUsers[0]._id;
    console.log(`${createdUsers.length} users seeded`);

    // Seed sample products
    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
        price: 2999,
        category: 'Electronics',
        brand: 'SoundMax',
        stock: 50,
        images: [{ url: '/uploads/sample-headphones.jpg', alt: 'Wireless Headphones' }],
        featured: true,
        user: adminUser,
      },
      {
        name: 'Classic Cotton T-Shirt',
        description: 'Premium cotton t-shirt with a comfortable fit. Available in multiple colors and sizes.',
        price: 799,
        category: 'Clothing',
        brand: 'StyleCraft',
        stock: 200,
        images: [{ url: '/uploads/sample-tshirt.jpg', alt: 'Cotton T-Shirt' }],
        featured: false,
        user: adminUser,
      },
      {
        name: 'Smart Watch Pro',
        description: 'Feature-packed smartwatch with health monitoring, GPS tracking, and a beautiful AMOLED display.',
        price: 5499,
        category: 'Electronics',
        brand: 'TechWear',
        stock: 30,
        images: [{ url: '/uploads/sample-smartwatch.jpg', alt: 'Smart Watch' }],
        featured: true,
        user: adminUser,
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        price: 599,
        category: 'Home & Kitchen',
        brand: 'HydroLife',
        stock: 150,
        images: [{ url: '/uploads/sample-bottle.jpg', alt: 'Water Bottle' }],
        featured: false,
        user: adminUser,
      },
      {
        name: 'JavaScript: The Definitive Guide',
        description: 'Comprehensive guide to JavaScript programming. Covers modern ES6+ features and best practices.',
        price: 1299,
        category: 'Books',
        brand: "O'Reilly",
        stock: 75,
        images: [{ url: '/uploads/sample-book.jpg', alt: 'JavaScript Book' }],
        featured: true,
        user: adminUser,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products seeded`);

    console.log('\n✅ Data seeded successfully!');
    console.log('Admin Login: admin@shopsphere.com / admin123');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    console.log('\n🗑️  All data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
