import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/gallery", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
