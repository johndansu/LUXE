import connectDB from "./mongodb";
import {
  Product,
  User,
  UserAddress,
  CartItem,
  Order,
  OrderItem,
  IProduct,
  ICartItem,
  IOrder,
  IOrderItem,
} from "./schemas";
import mongoose from "mongoose";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  _id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Order {
  _id: string;
  user_id?: string;
  session_id: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total_amount: number;
  shipping_address_id?: string;
  billing_address_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  _id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

// Product functions
export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const products = await Product.find().sort({ created_at: -1 });
  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await connectDB();
  const products = await Product.find({ featured: true }).sort({
    created_at: -1,
  });
  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB();
  const product = await Product.findById(id);
  if (!product) return null;

  return {
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  };
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  await connectDB();
  const products = await Product.find({ category }).sort({ created_at: -1 });
  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  }));
}

export async function searchProducts(searchQuery: string): Promise<Product[]> {
  await connectDB();
  const products = await Product.find({
    $or: [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
    ],
  }).sort({ created_at: -1 });

  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    stock_quantity: product.stock_quantity,
    featured: product.featured,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  }));
}

// Cart functions
export async function addToCart(
  sessionId: string,
  productId: string,
  quantity = 1
): Promise<void> {
  await connectDB();

  // Check if item already exists in cart
  const existingItem = await CartItem.findOne({
    session_id: sessionId,
    product_id: productId,
  });

  if (existingItem) {
    // Update existing item quantity
    existingItem.quantity += quantity;
    existingItem.updated_at = new Date();
    await existingItem.save();
  } else {
    // Add new item to cart
    const newCartItem = new CartItem({
      session_id: sessionId,
      product_id: productId,
      quantity: quantity,
    });
    await newCartItem.save();
  }
}

export async function getCartItems(sessionId: string): Promise<CartItem[]> {
  await connectDB();
  const cartItems = await CartItem.find({ session_id: sessionId })
    .populate("product_id")
    .sort({ created_at: -1 });

  return cartItems.map((item) => ({
    _id: item._id.toString(),
    session_id: item.session_id,
    product_id: (item.product_id as any)._id.toString(), // Use the populated product's _id
    quantity: item.quantity,
    created_at: item.created_at.toISOString(),
    updated_at: item.updated_at.toISOString(),
    product: item.product_id
      ? {
          _id: (item.product_id as any)._id.toString(),
          name: (item.product_id as any).name,
          description: (item.product_id as any).description,
          price: (item.product_id as any).price,
          image_url: (item.product_id as any).image_url,
          category: (item.product_id as any).category,
          stock_quantity: (item.product_id as any).stock_quantity,
          featured: (item.product_id as any).featured,
          created_at: (item.product_id as any).created_at.toISOString(),
          updated_at: (item.product_id as any).updated_at.toISOString(),
        }
      : undefined,
  }));
}

export async function updateCartItemQuantity(
  sessionId: string,
  productId: string,
  quantity: number
): Promise<void> {
  await connectDB();

  console.log(
    "updateCartItemQuantity - Session ID:",
    sessionId,
    "Product ID:",
    productId,
    "Quantity:",
    quantity
  );

  if (quantity <= 0) {
    await removeFromCart(sessionId, productId);
  } else {
    // First check if the cart item exists
    const existingItem = await CartItem.findOne({
      session_id: sessionId,
      product_id: productId,
    });
    console.log(
      "updateCartItemQuantity - Existing item:",
      existingItem ? "found" : "not found"
    );

    const result = await CartItem.findOneAndUpdate(
      { session_id: sessionId, product_id: productId },
      { quantity: quantity, updated_at: new Date() }
    );

    if (!result) {
      throw new Error(
        `Cart item not found for session ${sessionId} and product ${productId}`
      );
    }
  }
}

export async function removeFromCart(
  sessionId: string,
  productId: string
): Promise<void> {
  await connectDB();
  await CartItem.deleteOne({
    session_id: sessionId,
    product_id: productId,
  });
}

export async function clearCart(sessionId: string): Promise<void> {
  await connectDB();
  await CartItem.deleteMany({ session_id: sessionId });
}

// Order functions
export async function createOrder(orderData: {
  user_id?: string;
  session_id: string;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total_amount: number;
  shipping_address_id?: string;
  billing_address_id?: string;
}): Promise<Order> {
  await connectDB();

  const order = new Order({
    user_id: orderData.user_id
      ? new mongoose.Types.ObjectId(orderData.user_id)
      : undefined,
    session_id: orderData.session_id,
    subtotal: orderData.subtotal,
    shipping_cost: orderData.shipping_cost,
    tax_amount: orderData.tax_amount,
    total_amount: orderData.total_amount,
    shipping_address_id: orderData.shipping_address_id
      ? new mongoose.Types.ObjectId(orderData.shipping_address_id)
      : undefined,
    billing_address_id: orderData.billing_address_id
      ? new mongoose.Types.ObjectId(orderData.billing_address_id)
      : undefined,
  });

  const savedOrder = await order.save();

  return {
    _id: savedOrder._id.toString(),
    user_id: savedOrder.user_id?.toString(),
    session_id: savedOrder.session_id,
    status: savedOrder.status,
    subtotal: savedOrder.subtotal,
    shipping_cost: savedOrder.shipping_cost,
    tax_amount: savedOrder.tax_amount,
    total_amount: savedOrder.total_amount,
    shipping_address_id: savedOrder.shipping_address_id?.toString(),
    billing_address_id: savedOrder.billing_address_id?.toString(),
    created_at: savedOrder.created_at.toISOString(),
    updated_at: savedOrder.updated_at.toISOString(),
  };
}

export async function addOrderItem(itemData: {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}): Promise<OrderItem> {
  await connectDB();

  const orderItem = new OrderItem({
    order_id: new mongoose.Types.ObjectId(itemData.order_id),
    product_id: new mongoose.Types.ObjectId(itemData.product_id),
    quantity: itemData.quantity,
    price: itemData.price,
  });

  const savedItem = await orderItem.save();

  return {
    _id: savedItem._id.toString(),
    order_id: savedItem.order_id.toString(),
    product_id: savedItem.product_id.toString(),
    quantity: savedItem.quantity,
    price: savedItem.price,
    created_at: savedItem.created_at.toISOString(),
  };
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  await connectDB();
  const order = await Order.findById(orderId);
  if (!order) return null;

  return {
    _id: order._id.toString(),
    user_id: order.user_id?.toString(),
    session_id: order.session_id,
    status: order.status,
    subtotal: order.subtotal,
    shipping_cost: order.shipping_cost,
    tax_amount: order.tax_amount,
    total_amount: order.total_amount,
    shipping_address_id: order.shipping_address_id?.toString(),
    billing_address_id: order.billing_address_id?.toString(),
    created_at: order.created_at.toISOString(),
    updated_at: order.updated_at.toISOString(),
  };
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  await connectDB();
  const orderItems = await OrderItem.find({ order_id: orderId })
    .populate("product_id", "name image_url")
    .sort({ created_at: 1 });

  return orderItems.map((item) => ({
    _id: item._id.toString(),
    order_id: item.order_id.toString(),
    product_id: item.product_id.toString(),
    quantity: item.quantity,
    price: item.price,
    created_at: item.created_at.toISOString(),
  }));
}

export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<void> {
  await connectDB();
  await Order.findByIdAndUpdate(orderId, {
    status: status,
    updated_at: new Date(),
  });
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  await connectDB();
  const orders = await Order.find({ user_id: userId }).sort({ created_at: -1 });

  return orders.map((order) => ({
    _id: order._id.toString(),
    user_id: order.user_id?.toString(),
    session_id: order.session_id,
    status: order.status,
    subtotal: order.subtotal,
    shipping_cost: order.shipping_cost,
    tax_amount: order.tax_amount,
    total_amount: order.total_amount,
    shipping_address_id: order.shipping_address_id?.toString(),
    billing_address_id: order.billing_address_id?.toString(),
    created_at: order.created_at.toISOString(),
    updated_at: order.updated_at.toISOString(),
  }));
}
