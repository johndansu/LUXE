import { createServerComponentClient } from './supabase'

// Product interfaces (matching existing types)
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  _id: string
  session_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface Order {
  _id: string
  user_id?: string
  session_id: string
  status: string
  subtotal: number
  shipping_cost: number
  tax_amount: number
  total_amount: number
  shipping_address_id?: string
  billing_address_id?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  _id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

// Product functions
export async function getProducts(): Promise<Product[]> {
  const supabase = await createServerComponentClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data.map((product) => ({
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }))
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createServerComponentClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data.map((product) => ({
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }))
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerComponentClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return {
    _id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    image_url: data.image_url,
    category: data.category,
    stock_quantity: data.stock_quantity,
    featured: data.featured,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = await createServerComponentClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data.map((product) => ({
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }))
}

export async function searchProducts(searchQuery: string): Promise<Product[]> {
  const supabase = await createServerComponentClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching products:', error)
    return []
  }

  return data.map((product) => ({
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }))
}

// Cart functions
export async function addToCart(
  sessionId: string,
  productId: string,
  userId: string | null = null,
  quantity = 1
): Promise<void> {
  const supabase = await createServerComponentClient()

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('session_id', sessionId)
    .eq('product_id', productId)
    .maybeSingle()

  if (existingItem) {
    // Update existing item quantity
    await supabase
      .from('cart_items')
      .update({ 
        quantity: existingItem.quantity + quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingItem.id)
  } else {
    // Add new item to cart
    await supabase
      .from('cart_items')
      .insert({
        session_id: sessionId,
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      })
  }
}

export async function getCartItems(sessionId: string, userId?: string | null): Promise<CartItem[]> {
  const supabase = await createServerComponentClient()

  // Build query - check both session_id and user_id if provided
  let query = supabase
    .from('cart_items')
    .select(`
      *,
      products (*)
    `)

  if (userId) {
    query = query.or(`session_id.eq.${sessionId},user_id.eq.${userId}`)
  } else {
    query = query.eq('session_id', sessionId)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching cart items:', error)
    return []
  }

  return data.map((item: any) => ({
    _id: item.id,
    session_id: item.session_id,
    product_id: item.product_id,
    quantity: item.quantity,
    created_at: item.created_at,
    updated_at: item.updated_at,
    product: item.products ? {
      _id: item.products.id,
      name: item.products.name,
      description: item.products.description,
      price: item.products.price,
      image_url: item.products.image_url,
      category: item.products.category,
      stock_quantity: item.products.stock_quantity,
      featured: item.products.featured,
      created_at: item.products.created_at,
      updated_at: item.products.updated_at,
    } : undefined,
  }))
}

export async function updateCartItemQuantity(
  sessionId: string,
  productId: string,
  quantity: number,
  userId?: string | null
): Promise<void> {
  const supabase = await createServerComponentClient()

  if (quantity <= 0) {
    await removeFromCart(sessionId, productId, userId)
    return
  }

  // Find the cart item
  let query = supabase
    .from('cart_items')
    .select('*')
    .eq('session_id', sessionId)
    .eq('product_id', productId)

  if (userId) {
    query = query.or(`session_id.eq.${sessionId},user_id.eq.${userId}`)
  }

  const { data: existingItem } = await query.maybeSingle()

  if (!existingItem) {
    throw new Error(`Cart item not found for session ${sessionId} and product ${productId}`)
  }

  await supabase
    .from('cart_items')
    .update({ 
      quantity: quantity,
      updated_at: new Date().toISOString()
    })
    .eq('id', existingItem.id)
}

export async function removeFromCart(
  sessionId: string,
  productId: string,
  userId?: string | null
): Promise<void> {
  const supabase = await createServerComponentClient()

  let query = supabase
    .from('cart_items')
    .delete()
    .eq('session_id', sessionId)
    .eq('product_id', productId)

  // If userId is provided, also delete by user_id
  if (userId) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
  } else {
    await query
  }
}

export async function clearCart(sessionId: string, userId?: string | null): Promise<void> {
  const supabase = await createServerComponentClient()

  if (userId) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
  } else {
    await supabase
      .from('cart_items')
      .delete()
      .eq('session_id', sessionId)
  }
}

// Order functions
export async function createOrder(orderData: {
  user_id?: string
  session_id: string
  subtotal: number
  shipping_cost: number
  tax_amount: number
  total_amount: number
  shipping_address_id?: string
  billing_address_id?: string
}): Promise<Order> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.user_id || null,
      session_id: orderData.session_id,
      status: 'pending',
      subtotal: orderData.subtotal,
      shipping_cost: orderData.shipping_cost,
      tax_amount: orderData.tax_amount,
      total_amount: orderData.total_amount,
      shipping_address_id: orderData.shipping_address_id || null,
      billing_address_id: orderData.billing_address_id || null,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`)
  }

  return {
    _id: data.id,
    user_id: data.user_id || undefined,
    session_id: data.session_id,
    status: data.status,
    subtotal: data.subtotal,
    shipping_cost: data.shipping_cost,
    tax_amount: data.tax_amount,
    total_amount: data.total_amount,
    shipping_address_id: data.shipping_address_id || undefined,
    billing_address_id: data.billing_address_id || undefined,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}

export async function addOrderItem(itemData: {
  order_id: string
  product_id: string
  quantity: number
  price: number
}): Promise<OrderItem> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('order_items')
    .insert({
      order_id: itemData.order_id,
      product_id: itemData.product_id,
      quantity: itemData.quantity,
      price: itemData.price,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to add order item: ${error.message}`)
  }

  return {
    _id: data.id,
    order_id: data.order_id,
    product_id: data.product_id,
    quantity: data.quantity,
    price: data.price,
    created_at: data.created_at,
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error || !data) {
    return null
  }

  return {
    _id: data.id,
    user_id: data.user_id || undefined,
    session_id: data.session_id,
    status: data.status,
    subtotal: data.subtotal,
    shipping_cost: data.shipping_cost,
    tax_amount: data.tax_amount,
    total_amount: data.total_amount,
    shipping_address_id: data.shipping_address_id || undefined,
    billing_address_id: data.billing_address_id || undefined,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId)

  if (error) {
    console.error('Error fetching order items:', error)
    return []
  }

  return data.map((item) => ({
    _id: item.id,
    order_id: item.order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    created_at: item.created_at,
  }))
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user orders:', error)
    return []
  }

  return data.map((order) => ({
    _id: order.id,
    user_id: order.user_id || undefined,
    session_id: order.session_id,
    status: order.status,
    subtotal: order.subtotal,
    shipping_cost: order.shipping_cost,
    tax_amount: order.tax_amount,
    total_amount: order.total_amount,
    shipping_address_id: order.shipping_address_id || undefined,
    billing_address_id: order.billing_address_id || undefined,
    created_at: order.created_at,
    updated_at: order.updated_at,
  }))
}

// Wishlist functions
export async function getWishlistItems(userId: string): Promise<any[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('wishlist')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching wishlist:', error)
    return []
  }

  return data.map((item: any) => ({
    _id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    created_at: item.created_at,
    product: item.products ? {
      _id: item.products.id,
      name: item.products.name,
      description: item.products.description,
      price: item.products.price,
      image_url: item.products.image_url,
      category: item.products.category,
      stock_quantity: item.products.stock_quantity,
      featured: item.products.featured,
      created_at: item.products.created_at,
      updated_at: item.products.updated_at,
    } : undefined,
  }))
}

export async function addToWishlist(userId: string, productId: string): Promise<void> {
  const supabase = await createServerComponentClient()

  // Check if already in wishlist
  const { data: existing } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()

  if (!existing) {
    await supabase
      .from('wishlist')
      .insert({
        user_id: userId,
        product_id: productId,
      })
  }
}

export async function removeFromWishlist(userId: string, productId: string): Promise<void> {
  const supabase = await createServerComponentClient()

  await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
}
