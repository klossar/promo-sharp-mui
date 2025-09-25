/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Add alias for src directory absolute imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'components': path.resolve(__dirname, 'src/components'),
      'examples': path.resolve(__dirname, 'src/examples'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'layouts': path.resolve(__dirname, 'src/layouts'),
      'react-router-dom': path.resolve(__dirname, 'src/lib/next-router-stub.js'),
    };

    return config;
  },
};

module.exports = nextConfig;