/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],

    domains: [
      "hellcat.nyc3.cdn.digitaloceanspaces.com",
      "cdn.sanity.io",
      "f8n-production-collection-assets.imgix.net",
      "f8n-production.imgix.net",
    ],
  },
};

export default nextConfig;
