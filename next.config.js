/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.dicebear.com", "utfs.io"],
    dangerouslyAllowSVG: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
