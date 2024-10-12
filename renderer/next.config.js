const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.+(js|jsx|mjs|ts|tsx)$/,
      use: defaultLoaders.babel,
      include: [
        path.join(__dirname, '..', 'main', 'common'),
        path.join(__dirname, '..', 'main', 'remote-states', 'use-remote-state.ts')
      ]
    });

    // Set the target to electron-renderer
    config.target = 'electron-renderer';

    // Use a more modern source map option for better performance
    config.devtool = dev ? 'eval-source-map' : 'source-map';

    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
  // Use standalone output
  output: 'standalone',
};

module.exports = nextConfig;
