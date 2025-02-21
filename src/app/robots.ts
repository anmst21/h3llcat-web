import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/fonts", "/api", "/admin"],
    },
    sitemap: [
      "https://www.h3llcat.app/sitemap.xml",
      "https://www.display.app/sitemap.xml",
    ],
  };
}
