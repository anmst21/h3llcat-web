import { getBlogposts } from "@/sanity/sanity-utils";
import type { MetadataRoute } from "next";

const base = "https://www.displaymint.app";

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

  const staticEntries = staticRoutes.map((route) => ({
    url: route === "/" ? base : `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const blogEntries = blogposts.map(({ slug, _createdAt }) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(_createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
