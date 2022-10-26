/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media.graphassets.com"],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    graphcmsURI: process.env.NEXT_PUBLIC_GRAPHCMS_URI,
  },
};

module.exports = nextConfig;
