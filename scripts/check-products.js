require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  try {
    console.log('🔍 Checking products in Supabase...\n');
    
    // Get all products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log(`📊 Total products in database: ${products.length}\n`);

    // Check for duplicate image URLs
    const imageUrlMap = new Map();
    products.forEach(product => {
      const imageId = product.image_url.split('photo-')[1]?.split('?')[0];
      if (imageId) {
        if (!imageUrlMap.has(imageId)) {
          imageUrlMap.set(imageId, []);
        }
        imageUrlMap.get(imageId).push(product.name);
      }
    });

    const duplicates = Array.from(imageUrlMap.entries())
      .filter(([_, names]) => names.length > 1);

    if (duplicates.length > 0) {
      console.log('⚠️  Duplicate images found:\n');
      duplicates.forEach(([imageId, names]) => {
        console.log(`  Image ID: ${imageId}`);
        names.forEach(name => console.log(`    - ${name}`));
        console.log('');
      });
    } else {
      console.log('✅ All products have unique images!\n');
    }

    // Group by category
    const byCategory = {};
    products.forEach(product => {
      if (!byCategory[product.category]) {
        byCategory[product.category] = [];
      }
      byCategory[product.category].push(product.name);
    });

    console.log('📦 Products by category:');
    Object.entries(byCategory).forEach(([category, names]) => {
      console.log(`\n  ${category} (${names.length}):`);
      names.forEach(name => console.log(`    - ${name}`));
    });

    console.log('\n');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkProducts();

