/** @type {import('next').NextConfig} */
const nextConfig = {
  serverComponentsExternalPackages: ["@prisma/client", "prisma"],

  images: {
    formats: ["image/webp"],
    unoptimized: true,
    domains: [
      "hellcat.nyc3.cdn.digitaloceanspaces.com",
      "cdn.sanity.io",
      "f8n-production-collection-assets.imgix.net",
      "f8n-production.imgix.net",
      "plus.unsplash.com",
      "images.unsplash.com",
      "d2ybmb80bbm9ts.cloudfront.net",
      "cryptoiconsstorage.blob.core.windows.net",
    ],
  },
};

export default nextConfig;
