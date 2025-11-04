/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Vercel has built-in image optimization, so we enable it
  // Images in /public folder and external images will be automatically optimized
  images: {
    // Vercel automatically optimizes images - no need for unoptimized: true
  },
}

export default nextConfig
