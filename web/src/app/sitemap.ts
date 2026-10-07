import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicios } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    {
      url: site.url,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicios.map((s) => ({
      url: `${site.url}/servicios/${s.slug}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
