require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
    description: "Professional-grade coffee maker with programmable settings and thermal carafe.",
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
    console.log('🔄 Connecting to Supabase...');
    console.log(`📍 Supabase URL: ${supabaseUrl}`);

    // Test connection by checking if we can query
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (testError && testError.code !== 'PGRST116') {
      throw testError;
    }

    console.log('✅ Connected to Supabase');

    // Clear existing products (optional - comment out if you want to keep existing)
    console.log('🗑️ Clearing existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (using a UUID that won't exist)

    if (deleteError) {
      console.warn('⚠️ Could not clear products (might be empty):', deleteError.message);
    } else {
      console.log('✅ Cleared existing products');
    }

    // Insert sample products
    console.log('📦 Inserting sample products...');
    const { data: products, error: insertError } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (insertError) {
      throw insertError;
    }

    console.log(`✅ Inserted ${products.length} products`);

    // Display inserted products
    console.log('\n📋 Sample Products Created:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (${product.category})${product.featured ? ' ⭐ Featured' : ''}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Total products: ${products.length}`);
    console.log(`- Featured products: ${products.filter(p => p.featured).length}`);
    console.log(`- Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.details) {
      console.error('Error details:', error.details);
    }
    if (error.hint) {
      console.error('Hint:', error.hint);
    }
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
