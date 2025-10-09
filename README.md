# LUXE E-commerce Application

A modern, full-stack e-commerce application built with Next.js, featuring a minimal and elegant design with complete shopping cart, wishlist, and authentication functionality.

> 🚀 **Ready to deploy?** See [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) for Netlify deployment setup!

![LUXE E-commerce](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🛒 **Shopping Experience**

- **Product Catalog** - Browse featured products and full collection
- **Shopping Cart** - Add, update, and remove items with real-time updates
- **Quick View** - Preview products without leaving the page
- **Responsive Design** - Optimized for desktop and mobile devices

### ❤️ **Wishlist System**

- **Save for Later** - Add products to your personal wishlist
- **Wishlist Management** - View, organize, and manage saved items
- **Quick Access** - Heart icon with count in navigation
- **Authentication Required** - Secure user-specific wishlists

### 🔐 **Authentication**

- **User Registration** - Create new accounts with validation
- **Secure Login** - JWT-based authentication system
- **Account Management** - View profile and order history
- **Session Management** - Persistent login sessions

### 🎨 **User Interface**

- **Minimal Design** - Clean, elegant, and professional aesthetic
- **Smooth Animations** - Framer Motion powered interactions
- **Toast Notifications** - Real-time feedback for user actions
- **Mobile-First** - Fully responsive across all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd LUXE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your MongoDB Atlas connection string:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Seed the database** (optional)

   ```bash
   node scripts/seed-mongodb.js
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
LUXE/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cart/          # Shopping cart operations
│   │   ├── wishlist/      # Wishlist management
│   │   └── products/      # Product data
│   ├── cart/              # Shopping cart page
│   ├── shop/              # Product catalog
│   ├── wishlist/          # Wishlist page
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   └── account/           # User account page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── minimal-nav.tsx   # Navigation component
│   ├── product-card.tsx  # Product display card
│   └── toast.tsx         # Notification system
├── lib/                  # Utility libraries
│   ├── mongodb.ts        # Database connection
│   ├── schemas.ts        # MongoDB schemas
│   ├── auth.ts           # Authentication utilities
│   ├── cart-context.tsx  # Cart state management
│   └── wishlist-context.tsx # Wishlist state management
└── scripts/              # Database scripts
    ├── seed-mongodb.js   # Database seeding
    └── test-mongodb.js   # Connection testing
```

## 🛠️ Technology Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### **Backend**

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### **Development Tools**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📱 API Endpoints

### **Authentication**

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### **Products**

- `GET /api/products` - Get all products
- `GET /api/products?featured=true` - Get featured products
- `GET /api/products/[id]` - Get product by ID

### **Shopping Cart**

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

### **Wishlist**

- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist` - Remove item from wishlist

## 🎯 Key Features Explained

### **Shopping Cart System**

- **Anonymous Support** - Works without login using session cookies
- **User Association** - Automatically links to user account when logged in
- **Real-time Updates** - Cart count updates instantly across the app
- **Persistent Storage** - Cart items saved between sessions

### **Wishlist Management**

- **User-Specific** - Each user has their own private wishlist
- **Quick Actions** - Add/remove items with heart button
- **Dedicated Page** - Full wishlist management interface
- **Cart Integration** - Move items from wishlist to cart

### **Authentication Flow**

- **Secure Registration** - Password hashing with bcryptjs
- **JWT Tokens** - Stateless authentication
- **Protected Routes** - Wishlist requires login
- **Session Management** - Automatic token refresh

## 🔧 Configuration

### **Environment Variables**

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/...

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Application
NODE_ENV=development
```

### **Database Schema**

- **Users** - User accounts and authentication
- **Products** - Product catalog with images and details
- **Cart Items** - Shopping cart contents
- **Wishlist** - User wishlist items
- **Orders** - Order history and details
- **Addresses** - User shipping/billing addresses

## 🚀 Deployment

### **Netlify** (Configured & Ready!)

This project is configured for Netlify deployment with `netlify.toml`.

**Quick Deploy:**
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://app.netlify.com/)
3. Add environment variables in Netlify dashboard
4. Deploy automatically!

📖 **[Complete Netlify Deployment Guide](NETLIFY_DEPLOYMENT.md)** - Step-by-step instructions

### **Vercel**

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Other Platforms**

- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment
- **AWS Amplify** - AWS deployment

## 🧪 Testing

### **Database Connection**

```bash
node scripts/test-mongodb.js
```

### **API Testing**

```bash
# Test cart API
curl http://localhost:3000/api/cart

# Test products API
curl http://localhost:3000/api/products
```

## 📝 Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run deploy       # Deploy to Netlify (requires Netlify CLI)
npm run db:seed      # Seed MongoDB database
npm run db:test      # Test MongoDB connection
```

### **Code Style**

- **ESLint** - Enforces code quality
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety and better IDE support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🎉 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For deployment platform
- **MongoDB** - For the database service
- **Tailwind CSS** - For the utility-first CSS framework

---

**Built with ❤️ using Next.js, React, and MongoDB Atlas**

_For the complete changelog, see [CHANGELOG.md](CHANGELOG.md)_
