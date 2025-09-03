const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe_ecommerce';

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log(`📍 Connection string: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connection successful!');

    // Test basic operations
    console.log('🧪 Testing basic operations...');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📋 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📁 Collection names:');
      collections.forEach(col => console.log(`   - ${col.name}`));
    }

    // Test Product collection if it exists
    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);

    console.log('\n🎉 MongoDB test completed successfully!');
    console.log('✅ Your database is ready to use.');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is running');
      console.log('2. Check your MONGODB_URI in .env.local');
      console.log('3. For local MongoDB: mongod --dbpath /path/to/your/db');
      console.log('4. For MongoDB Atlas: Check your connection string');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testConnection();
