import type { NextConfig } from 'next';

const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
const AWS_DB_HOST = process.env.NEXT_PUBLIC_DB_HOST;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: `https://${AWS_DB_HOST}`,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${PROTOCOL}://${AWS_DB_HOST}/p4u-api/auth/:path*`,
      },
      {
        source: '/card/:path*',
        destination: `${PROTOCOL}://${AWS_DB_HOST}/p4u-api/card/:path*`,
      },
      {
        source: '/tag/:path*',
        destination: `${PROTOCOL}://${AWS_DB_HOST}/p4u-api/tag/:path*`,
      },
      {
        source: '/user/:path*',
        destination: `${PROTOCOL}://${AWS_DB_HOST}/p4u-api/user/:path*`,
      },
      {
        source: '/thanks/:path*',
        destination: `${PROTOCOL}://${AWS_DB_HOST}/p4u-api/thanks/:path*`,
      },
    ];
  },
};

export default nextConfig;
