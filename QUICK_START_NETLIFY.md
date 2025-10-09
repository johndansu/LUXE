# 🚀 Quick Start: Deploy to Netlify

## 5-Minute Setup

### 1. Prepare MongoDB Atlas (2 min)

```
✓ Create free MongoDB Atlas account
✓ Create cluster → Get connection string
✓ Whitelist IP: 0.0.0.0/0
```

### 2. Deploy to Netlify (1 min)

```
✓ Go to netlify.com → "Add new site"
✓ Connect your GitHub repo
✓ Netlify will auto-detect settings ✨
```

### 3. Add Environment Variables (2 min)

In Netlify Dashboard → Site Settings → Environment Variables:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/luxe_ecommerce
JWT_SECRET=<generate-random-32-chars>
JWT_EXPIRES_IN=7d
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=<generate-random-32-chars>
NODE_ENV=production
```

**Generate secrets:**
```bash
openssl rand -base64 32
```

### 4. Deploy & Seed Database

```bash
# After first deploy, seed your database:
MONGODB_URI=<your-production-uri> npm run db:seed
```

### ✅ Done!

Visit `https://your-site.netlify.app`

---

**Need help?** See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for detailed guide.

