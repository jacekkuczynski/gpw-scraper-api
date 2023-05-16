/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
