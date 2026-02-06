/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ["agencyadmin.innothinklabs.com", "localhost"],
  },
  // Removed experimental.missingSuspenseWithCSRBailout (deprecated in Next.js 15)
};

export default nextConfig;