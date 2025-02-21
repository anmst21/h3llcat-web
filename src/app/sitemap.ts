//// task's for future: add react images to sitemap!!!!
import { getBlogposts } from "@/sanity/sanity-utils";
import type { MetadataRoute } from "next";

const baseHellcat = "https://www.h3llcat.app";
const baseDisplay = "https://www.display.app";

const staticRoutes = [
  "/",
  "/beta",
  "/blog",
  "/contacts",
  "/subscribe",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogposts } = await getBlogposts();

  const createEntries = (base: string) => {
    const staticEntries = staticRoutes.map((route) => {
      const url = route === "/" ? base : `${base}${route}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: "weekly" as const, // Cast literal type
        priority: base === baseDisplay ? 1 : 0.8,
      };
    });

    // Map dynamic blog posts to sitemap entries.
    // Assumes each blog post object has a 'slug' and a '_createdAt' date string.
    const blogEntries = blogposts.map(({ slug, _createdAt }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(_createdAt),
      changeFrequency: "monthly" as const, // Cast literal type
      priority: 0.5,
    }));

    return [...staticEntries, ...blogEntries];
  };

  // Combine sitemap entries for both domains.
  return [...createEntries(baseHellcat), ...createEntries(baseDisplay)];
}
