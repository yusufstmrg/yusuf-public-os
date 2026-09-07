import type { MetadataRoute } from "next";
import { getPublishedProjectDates } from "@/lib/db/publications";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yusuf-platform.vercel.app";
  const projectRows = await getPublishedProjectDates(100);
  const projectUrls = projectRows.map((item: { public_slug: string; published_at: string }) => ({
    url: `${baseUrl}/projects/${item.public_slug}`,
    lastModified: new Date(item.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/expertise`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.75 },
    ...projectUrls,
  ];
}
