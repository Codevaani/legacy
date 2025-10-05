/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ik.imagekit.io', 'firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
