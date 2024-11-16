import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
