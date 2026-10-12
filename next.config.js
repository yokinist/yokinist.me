/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  // notion-client waits 60-75s on a 429 before retrying
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "gravatar.com" }],
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
};

module.exports = nextConfig;
