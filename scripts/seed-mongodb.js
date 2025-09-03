const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe_ecommerce';

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image_url: { type: String, required: true },
  category: { type: String, required: true },
  stock_quantity: { type: Number, required: true, min: 0, default: 0 },
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);

// Sample products data
const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    price: 299.99,
    image_url: "/wireless-headphones.png",
    category: "Electronics",
    stock_quantity: 50,
    featured: true,
  },
  {
    name: "Smartwatch Lifestyle",
    description: "Advanced smartwatch with health monitoring, GPS, and water resistance.",
    price: 399.99,
    image_url: "/smartwatch-lifestyle.png",
    category: "Electronics",
    stock_quantity: 30,
    featured: true,
  },
  {
    name: "Running Shoes on Track",
    description: "High-performance running shoes with advanced cushioning technology.",
    price: 149.99,
    image_url: "/running-shoes-on-track.png",
    category: "Sports",
    stock_quantity: 75,
    featured: true,
  },
  {
    name: "Rolled Yoga Mat",
    description: "Premium eco-friendly yoga mat with superior grip and comfort.",
    price: 79.99,
    image_url: "/rolled-yoga-mat.png",
    category: "Sports",
    stock_quantity: 40,
    featured: false,
  },
  {
    name: "Modern Coffee Maker",
    description: "Smart coffee maker with programmable brewing and temperature control.",
    price: 199.99,
    image_url: "/modern-coffee-maker.png",
    category: "Home",
    stock_quantity: 25,
    featured: true,
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels and USB charging.",
    price: 89.99,
    image_url: "/led-desk-lamp.png",
    category: "Home",
    stock_quantity: 60,
    featured: false,
  },
  {
    name: "Laptop Backpack",
    description: "Professional laptop backpack with multiple compartments and laptop protection.",
    price: 129.99,
    image_url: "/laptop-backpack.png",
    category: "Accessories",
    stock_quantity: 35,
    featured: false,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    price: 159.99,
    image_url: "/bluetooth-speaker.png",
    category: "Electronics",
    stock_quantity: 45,
    featured: false,
  },
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Insert sample products
    console.log('📦 Inserting sample products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Display inserted products
    console.log('\n📋 Sample Products Created:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (${product.category})`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Total products: ${products.length}`);
    console.log(`- Featured products: ${products.filter(p => p.featured).length}`);
    console.log(`- Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDatabase();
