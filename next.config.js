const path = require("path");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  // notion-client waits 60-75s on a 429 before retrying
  staticPageGenerationTimeout: 300,
  images: {
    domains: ["gravatar.com", "pbs.twimg.com", "twemoji.maxcdn.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["~"] = path.join(__dirname, ".");
    return config;
  },
};

module.exports = nextConfig;
