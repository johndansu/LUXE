import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "./mongodb";
import { User, UserAddress, IUser, IUserAddress } from "./schemas";
import mongoose from "mongoose";

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface UserAddress {
  _id: string;
  user_id: string;
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
  created_at: string;
  updated_at: string;
}

// Password hashing functions
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// JWT functions
function generateToken(userId: string): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error(
      "JWT_SECRET environment variable is not set. Please configure it in Vercel Dashboard → Settings → Environment Variables"
    );
  }
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  } as jwt.SignOptions);
}

function verifyToken(token: string): { userId: string } | null {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is not set");
      return null;
    }
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}): Promise<User | null> {
  try {
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const user = new User({
      email: userData.email,
      password_hash: hashedPassword,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone,
    });

    const savedUser = await user.save();

    return {
      _id: savedUser._id.toString(),
      email: savedUser.email,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      phone: savedUser.phone,
      created_at: savedUser.created_at.toISOString(),
      updated_at: savedUser.updated_at.toISOString(),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return null;
    }

    // Return user without password hash
    return {
      _id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user) return null;

    return {
      _id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
    };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return null;

    return {
      _id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
    };
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
}

export async function createUserAddress(
  addressData: Omit<UserAddress, "_id" | "created_at" | "updated_at">
): Promise<UserAddress> {
  try {
    await connectDB();

    const address = new UserAddress({
      user_id: new mongoose.Types.ObjectId(addressData.user_id),
      type: addressData.type,
      first_name: addressData.first_name,
      last_name: addressData.last_name,
      company: addressData.company,
      address_line_1: addressData.address_line_1,
      address_line_2: addressData.address_line_2,
      city: addressData.city,
      state: addressData.state,
      postal_code: addressData.postal_code,
      country: addressData.country,
      is_default: addressData.is_default,
    });

    const savedAddress = await address.save();

    return {
      _id: savedAddress._id.toString(),
      user_id: savedAddress.user_id.toString(),
      type: savedAddress.type,
      first_name: savedAddress.first_name,
      last_name: savedAddress.last_name,
      company: savedAddress.company,
      address_line_1: savedAddress.address_line_1,
      address_line_2: savedAddress.address_line_2,
      city: savedAddress.city,
      state: savedAddress.state,
      postal_code: savedAddress.postal_code,
      country: savedAddress.country,
      is_default: savedAddress.is_default,
      created_at: savedAddress.created_at.toISOString(),
      updated_at: savedAddress.updated_at.toISOString(),
    };
  } catch (error) {
    console.error("Error creating user address:", error);
    throw error;
  }
}

export async function getUserAddresses(userId: string): Promise<UserAddress[]> {
  try {
    await connectDB();
    const addresses = await UserAddress.find({ user_id: userId }).sort({
      is_default: -1,
      created_at: -1,
    });

    return addresses.map((address) => ({
      _id: address._id.toString(),
      user_id: address.user_id.toString(),
      type: address.type,
      first_name: address.first_name,
      last_name: address.last_name,
      company: address.company,
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
      created_at: address.created_at.toISOString(),
      updated_at: address.updated_at.toISOString(),
    }));
  } catch (error) {
    console.error("Error getting user addresses:", error);
    return [];
  }
}

export async function getDefaultAddress(
  userId: string,
  type: "shipping" | "billing"
): Promise<UserAddress | null> {
  try {
    await connectDB();
    const address = await UserAddress.findOne({
      user_id: userId,
      type: type,
      is_default: true,
    });

    if (!address) return null;

    return {
      _id: address._id.toString(),
      user_id: address.user_id.toString(),
      type: address.type,
      first_name: address.first_name,
      last_name: address.last_name,
      company: address.company,
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
      created_at: address.created_at.toISOString(),
      updated_at: address.updated_at.toISOString(),
    };
  } catch (error) {
    console.error("Error getting default address:", error);
    return null;
  }
}

// Session management with JWT
export async function setUserSession(userId: string) {
  const token = generateToken(userId);
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getUserSession(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded?.userId || null;
  } catch (error) {
    console.error("Error getting user session:", error);
    return null;
  }
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getUserSession();
  if (!userId) return null;
  return await getUserById(userId);
}

// Middleware function to protect routes
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}
