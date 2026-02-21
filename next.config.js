/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  async rewrites() {
    const ghostUrl = process.env.GHOST_URL || "http://213.131.1.29";
    return [
      {
        source: "/content/images/:path*",
        destination: `${ghostUrl.replace(/\/$/, "")}/content/images/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
