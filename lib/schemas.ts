import mongoose, { Schema, Document } from "mongoose";

// Product Schema
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema<IProduct>({
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

// User Schema
export interface IUser extends Document {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// User Address Schema
export interface IUserAddress extends Document {
  user_id: mongoose.Types.ObjectId;
  type: "shipping" | "billing";
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserAddressSchema = new Schema<IUserAddress>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["shipping", "billing"], required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  company: { type: String },
  address_line_1: { type: String, required: true },
  address_line_2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true, default: "United States" },
  is_default: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Cart Item Schema
export interface ICartItem extends Document {
  session_id: string;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  session_id: { type: String, required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Order Schema
export interface IOrder extends Document {
  user_id?: mongoose.Types.ObjectId;
  session_id: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total_amount: number;
  shipping_address_id?: mongoose.Types.ObjectId;
  billing_address_id?: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const OrderSchema = new Schema<IOrder>({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  session_id: { type: String, required: true },
  status: { type: String, default: "pending" },
  subtotal: { type: Number, required: true, min: 0 },
  shipping_cost: { type: Number, required: true, min: 0, default: 0 },
  tax_amount: { type: Number, required: true, min: 0, default: 0 },
  total_amount: { type: Number, required: true, min: 0 },
  shipping_address_id: { type: Schema.Types.ObjectId, ref: "UserAddress" },
  billing_address_id: { type: Schema.Types.ObjectId, ref: "UserAddress" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Order Item Schema
export interface IOrderItem extends Document {
  order_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  created_at: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  created_at: { type: Date, default: Date.now },
});

// Wishlist Schema
export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  created_at: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  created_at: { type: Date, default: Date.now },
});

// Create indexes for better performance
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
UserSchema.index({ email: 1 });
CartItemSchema.index({ session_id: 1 });
OrderSchema.index({ user_id: 1 });
OrderSchema.index({ session_id: 1 });
OrderItemSchema.index({ order_id: 1 });
WishlistSchema.index({ user_id: 1 });
WishlistSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

// Export models
export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const UserAddress =
  mongoose.models.UserAddress ||
  mongoose.model<IUserAddress>("UserAddress", UserAddressSchema);
export const CartItem =
  mongoose.models.CartItem ||
  mongoose.model<ICartItem>("CartItem", CartItemSchema);
export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export const OrderItem =
  mongoose.models.OrderItem ||
  mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);
export const Wishlist =
  mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema);
