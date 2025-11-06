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

// Sample products data - Fashion categories matching shop filters
const sampleProducts = [
  // Evening Wear
  {
    name: "Silk Evening Gown",
    description: "Elegant floor-length silk gown with delicate beading and flowing silhouette. Perfect for formal occasions and special events.",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
    category: "Evening Wear",
    stock_quantity: 15,
    featured: true,
  },
  {
    name: "Black Tuxedo Dress",
    description: "Sophisticated black tuxedo-inspired dress with satin lapels and tailored fit. Timeless elegance for evening events.",
    price: 649.99,
    image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
    category: "Evening Wear",
    stock_quantity: 20,
    featured: true,
  },
  {
    name: "Embellished Cocktail Dress",
    description: "Stunning cocktail dress with sequin embellishments and A-line silhouette. Ideal for cocktail parties and evening gatherings.",
    price: 549.99,
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop",
    category: "Evening Wear",
    stock_quantity: 18,
    featured: false,
  },
  {
    name: "Velvet Wrap Dress",
    description: "Luxurious velvet wrap dress with V-neckline and flowing skirt. Perfect for winter evening events.",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop",
    category: "Evening Wear",
    stock_quantity: 12,
    featured: false,
  },
  {
    name: "Chiffon Maxi Dress",
    description: "Romantic chiffon maxi dress with floral print and tiered layers. Elegant and graceful for special occasions.",
    price: 499.99,
    image_url: "https://images.unsplash.com/photo-1566479179817-2785d0c0b7c8?w=800&h=1000&fit=crop",
    category: "Evening Wear",
    stock_quantity: 22,
    featured: false,
  },
  // Casual Luxury
  {
    name: "Cashmere Sweater",
    description: "Luxurious cashmere blend sweater with relaxed fit and ribbed cuffs. Perfect for everyday elegance.",
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
    category: "Casual Luxury",
    stock_quantity: 30,
    featured: true,
  },
  {
    name: "Tailored Blazer",
    description: "Classic tailored blazer with structured shoulders and double-breasted design. Versatile for work or casual wear.",
    price: 479.99,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
    category: "Casual Luxury",
    stock_quantity: 25,
    featured: true,
  },
  {
    name: "Wide-Leg Trousers",
    description: "Elegant wide-leg trousers in premium wool blend. Comfortable and sophisticated for modern professionals.",
    price: 279.99,
    image_url: "https://images.unsplash.com/photo-1506629905607-3aac40c6a6cd?w=800&h=1000&fit=crop",
    category: "Casual Luxury",
    stock_quantity: 35,
    featured: false,
  },
  {
    name: "Silk Blouse",
    description: "Luxurious silk blouse with button-down collar and French cuffs. Timeless piece for sophisticated styling.",
    price: 229.99,
    image_url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=1000&fit=crop",
    category: "Casual Luxury",
    stock_quantity: 28,
    featured: false,
  },
  {
    name: "Linen Midi Dress",
    description: "Breathable linen midi dress with A-line silhouette and button front. Perfect for warm weather elegance.",
    price: 189.99,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
    category: "Casual Luxury",
    stock_quantity: 32,
    featured: false,
  },
  {
    name: "Knit Cardigan",
    description: "Cozy knit cardigan in soft merino wool. Perfect layering piece for transitional seasons.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1572804013432-3e5a0a0e5b9a?w=800&h=1000&fit=crop",
    category: "Casual Luxury",
    stock_quantity: 27,
    featured: false,
  },
  // Spring Essentials
  {
    name: "Floral Print Dress",
    description: "Charming floral print dress with cinched waist and flowing skirt. Perfect for spring gatherings.",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
    category: "Spring Essentials",
    stock_quantity: 40,
    featured: true,
  },
  {
    name: "Lightweight Trench Coat",
    description: "Classic lightweight trench coat in water-resistant fabric. Essential spring outerwear.",
    price: 429.99,
    image_url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop",
    category: "Spring Essentials",
    stock_quantity: 20,
    featured: true,
  },
  {
    name: "Pastel Blazer",
    description: "Soft pastel blazer with modern cut and soft shoulders. Fresh and elegant for spring office wear.",
    price: 319.99,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
    category: "Spring Essentials",
    stock_quantity: 24,
    featured: false,
  },
  {
    name: "Wrap Midi Skirt",
    description: "Flattering wrap midi skirt in lightweight fabric with side slit. Versatile for spring styling.",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop",
    category: "Spring Essentials",
    stock_quantity: 36,
    featured: false,
  },
  {
    name: "Cotton Blouse",
    description: "Crisp cotton blouse with ruffle details and short sleeves. Fresh and comfortable for spring days.",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=1000&fit=crop",
    category: "Spring Essentials",
    stock_quantity: 42,
    featured: false,
  },
  {
    name: "Woven Bag",
    description: "Stylish woven tote bag with leather handles. Perfect spring accessory for everyday use.",
    price: 179.99,
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
    category: "Spring Essentials",
    stock_quantity: 38,
    featured: false,
  },
  // Accessories
  {
    name: "Leather Handbag",
    description: "Premium Italian leather handbag with gold-tone hardware and multiple compartments.",
    price: 459.99,
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 18,
    featured: true,
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with abstract print. Versatile accessory for elegant styling.",
    price: 89.99,
    image_url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 50,
    featured: true,
  },
  {
    name: "Statement Necklace",
    description: "Bold statement necklace with geometric design and gold plating. Perfect finishing touch.",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 35,
    featured: false,
  },
  {
    name: "Designer Sunglasses",
    description: "Classic aviator sunglasses with UV protection and premium frame. Timeless style.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 28,
    featured: false,
  },
  {
    name: "Leather Belt",
    description: "Elegant leather belt with minimalist buckle. Perfect for defining waistlines.",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 45,
    featured: false,
  },
  {
    name: "Clutch Purse",
    description: "Evening clutch purse with metallic finish and chain strap. Essential for formal events.",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 32,
    featured: false,
  },
  {
    name: "Pearl Earrings",
    description: "Classic pearl drop earrings with gold setting. Timeless elegance for any occasion.",
    price: 159.99,
    image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop",
    category: "Accessories",
    stock_quantity: 40,
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
