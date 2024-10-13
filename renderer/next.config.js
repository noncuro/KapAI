const withNextron = require('nextron')({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    return config;
  }
});

module.exports = withNextron({
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

    config.devtool = dev ? 'eval-source-map' : 'source-map';

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
  output: 'standalone',
});
