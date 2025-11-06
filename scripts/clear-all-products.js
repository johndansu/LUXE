require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearAllProducts() {
  try {
    console.log('🗑️  Clearing ALL products from Supabase...\n');
    
    // Get count first
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    console.log(`📊 Found ${count || 0} products to delete\n`);
    
    if (count === 0) {
      console.log('✅ No products to delete!');
      return;
    }
    
    // Use a more efficient approach - delete all at once using a condition that matches all
    // Since we can't use TRUNCATE via the client, we'll delete where id is not null (all rows)
    console.log('⏳ Deleting all products (this may take a moment)...\n');
    
    const { error, count: deletedCount } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      // If that doesn't work, try deleting in larger batches
      console.log('⚠️  First attempt failed, trying batch deletion...\n');
      
      let totalDeleted = 0;
      let batchSize = 1000;
      let attempts = 0;
      const maxAttempts = 10; // Safety limit
      
      while (attempts < maxAttempts) {
        const { data: batch, error: fetchError } = await supabase
          .from('products')
          .select('id')
          .limit(batchSize);
        
        if (fetchError || !batch || batch.length === 0) {
          break;
        }
        
        const ids = batch.map(p => p.id);
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .in('id', ids);
        
        if (deleteError) {
          console.error('❌ Error deleting batch:', deleteError.message);
          break;
        }
        
        totalDeleted += batch.length;
        console.log(`   Deleted ${totalDeleted} products...`);
        
        if (batch.length < batchSize) {
          break;
        }
        
        attempts++;
      }
      
      console.log(`\n✅ Deleted ${totalDeleted} products total`);
    } else {
      console.log(`✅ Successfully deleted all products!`);
    }
    
    // Verify deletion
    const { count: remainingCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n📊 Remaining products: ${remainingCount || 0}`);
    
    if (remainingCount === 0) {
      console.log('✅ All products cleared successfully!\n');
    } else {
      console.log(`⚠️  Warning: ${remainingCount} products still remain\n`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearAllProducts();

