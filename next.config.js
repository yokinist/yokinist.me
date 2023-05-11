const path = require('path');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['gravatar.com', 'pbs.twimg.com', 'twemoji.maxcdn.com'],
  },
  eslint: {
    dirs: ['components', 'layouts', 'lib', 'pages'],
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias['~'] = path.join(__dirname, '.');
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
