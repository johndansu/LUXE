# 🍃 MongoDB Setup Guide

Your LUXE e-commerce backend has been converted to use **MongoDB**! This guide will help you set up and run your MongoDB-powered backend.

## 🚀 Quick Start

### 1. Create Environment File

Create a `.env.local` file in your project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/luxe_ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRES_IN=7d

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production-67890

# Environment
NODE_ENV=development
```

### 2. Set Up MongoDB

**Choose one option:**

#### Option A: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition:**

   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB:**

   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   mongod --dbpath /usr/local/var/mongodb
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster** (free tier available)
3. **Get your connection string** and update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxe_ecommerce?retryWrites=true&w=majority
   ```

#### Option C: Docker (Alternative)

```bash
# Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest

# Update .env.local
MONGODB_URI=mongodb://admin:password@localhost:27017/luxe_ecommerce?authSource=admin
```

### 3. Initialize Database

```bash
# Test connection
npm run db:test

# Seed with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Test API

```bash
# Health check
curl http://localhost:3000/api/health

# Get products
curl http://localhost:3000/api/products

# Get featured products
curl http://localhost:3000/api/products?featured=true
```

## 🎉 You're Done!

Your MongoDB-powered backend is now running with:

- ✅ **MongoDB Database** - Document-based storage
- ✅ **All API Endpoints** - Products, cart, orders, auth
- ✅ **Sample Data** - 8 products across 4 categories
- ✅ **Authentication** - JWT-based user sessions
- ✅ **Validation** - Input validation with Zod

## 🧪 Available Scripts

```bash
# Test database connection
npm run db:test

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 Database Schema

### Collections Created:

1. **products** - Product catalog
2. **users** - User accounts
3. **useraddresses** - User shipping/billing addresses
4. **cartitems** - Shopping cart items
5. **orders** - Order records
6. **orderitems** - Individual order items

### Sample Data:

- **8 Products** across Electronics, Sports, Home, and Accessories
- **4 Featured Products** for homepage display
- **Stock Management** with quantity tracking

## 🔧 Troubleshooting

### Connection Issues

```bash
# Test MongoDB connection
npm run db:test

# Check if MongoDB is running
# Windows: net start MongoDB
# macOS/Linux: brew services start mongodb-community
```

### Common Issues:

1. **"ECONNREFUSED"** - MongoDB not running
2. **"Authentication failed"** - Wrong credentials in MONGODB_URI
3. **"Database not found"** - MongoDB will create the database automatically

### Reset Database:

```bash
# Clear and reseed database
npm run db:reset
```

## 🚀 Production Deployment

### MongoDB Atlas (Recommended)

1. **Create production cluster** on MongoDB Atlas
2. **Update environment variables:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxe_ecommerce
   NODE_ENV=production
   JWT_SECRET=your-production-secret-key
   ```
3. **Deploy your Next.js app** to Vercel, Netlify, or your preferred platform

### Environment Variables for Production:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxe_ecommerce
JWT_SECRET=your-super-secure-production-secret
JWT_EXPIRES_IN=7d
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-production-secret
NODE_ENV=production
```

## 🎯 Next Steps

1. **Customize Products** - Add your own product catalog
2. **Configure Payment** - Integrate Stripe, PayPal, etc.
3. **Add Features** - Reviews, wishlist, recommendations
4. **Deploy** - Push to production with MongoDB Atlas

Your LUXE e-commerce backend is now powered by MongoDB! 🛍️✨
