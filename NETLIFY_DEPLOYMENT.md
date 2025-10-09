# Deploying LUXE to Netlify

This guide will help you deploy your LUXE e-commerce application to Netlify.

## Prerequisites

1. A [Netlify](https://www.netlify.com/) account (free tier works)
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for your production database
3. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with a username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Netlify Functions access
5. Get your connection string (it should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/luxe_ecommerce?retryWrites=true&w=majority
   ```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select your LUXE repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: (leave empty, handled by plugin)

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts to connect your site
```

## Step 3: Configure Environment Variables

In your Netlify site dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

### Required Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Random secure string | Secret key for JWT tokens (generate a strong random string) |
| `JWT_EXPIRES_IN` | `7d` | JWT token expiration time |
| `NEXTAUTH_URL` | `https://your-site.netlify.app` | Your Netlify site URL |
| `NEXTAUTH_SECRET` | Random secure string | Secret for NextAuth (generate a strong random string) |
| `NODE_ENV` | `production` | Environment mode |

### Generate Secure Secrets

You can generate secure secrets using:

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online
# Visit: https://generate-secret.vercel.app/32
```

## Step 4: Initialize Database

After deployment, you need to seed your MongoDB database:

1. Install MongoDB Compass or use MongoDB Atlas web interface
2. Connect to your database using your connection string
3. Create the database `luxe_ecommerce`
4. Run the seed script locally (pointing to your production database):

```bash
# Create a .env.production file with your production MongoDB URI
MONGODB_URI=your-production-uri npm run db:seed
```

Or use the Netlify CLI to run it as a function:

```bash
netlify functions:invoke db-seed --env production
```

## Step 5: Verify Deployment

1. Visit your Netlify URL
2. Test the following:
   - Home page loads ✓
   - Products page works ✓
   - Sign up / Login works ✓
   - Add items to cart ✓
   - Checkout process ✓

## Troubleshooting

### Build Failures

If your build fails:
1. Check the build logs in Netlify dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node version compatibility (using Node 18+)

### Database Connection Issues

If you can't connect to MongoDB:
1. Verify your MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Check that your connection string is correct
3. Ensure the database user has read/write permissions

### API Routes Not Working

If API routes return 404:
1. Check that `netlify.toml` is in the root directory
2. Verify the `@netlify/plugin-nextjs` is being used
3. Check Netlify function logs in the dashboard

### Environment Variables Not Loading

If environment variables aren't working:
1. Ensure they're set in Netlify dashboard (not just in `.env` files)
2. Redeploy the site after adding variables
3. Check variable names match exactly (case-sensitive)

## Continuous Deployment

Netlify automatically deploys when you push to your connected Git branch:

- Push to `main` branch → Automatic production deployment
- Create a PR → Automatic deploy preview

## Custom Domain (Optional)

To add a custom domain:

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

## Performance Optimization

For better performance:

1. Enable Netlify's Asset Optimization in Site settings
2. Use Netlify's Image CDN for images
3. Consider enabling Netlify Analytics

## Security Checklist

- ✓ MongoDB connection string is not in code
- ✓ JWT_SECRET is a strong random string
- ✓ NEXTAUTH_SECRET is a strong random string
- ✓ Environment variables are set in Netlify dashboard only
- ✓ MongoDB Atlas IP whitelist is configured
- ✓ HTTPS is enabled (automatic on Netlify)

## Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

**Ready to deploy?** Push your code and follow the steps above! 🚀

