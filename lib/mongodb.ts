import mongoose from "mongoose";

// MongoDB connection configuration
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://dansujw_db_user:ghaBfbysXDLRZ0Ej@cluster0.sgcjdsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Global variable to cache the connection
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Test database connection
export async function testConnection() {
  try {
    await connectDB();
    console.log("✅ MongoDB connection test passed");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    return false;
  }
}

// Close database connection
export async function closeConnection() {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export default connectDB;
