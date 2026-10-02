import type { MetadataRoute } from "next";
import { getActiveCategories, getAllColumns } from "@/lib/columns";
import { STATIC_ROUTES } from "@/lib/nav";
import { IS_PUBLIC, absoluteUrl } from "@/lib/seo";
import { PRICE_AS_OF } from "@/data/pricing";

/** 本番 URL が未設定のときは空（存在しないドメインの URL を検索エンジンに教えない） */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PUBLIC) return [];

  const columns = getAllColumns();
  const latest = columns[0]?.updated ?? columns[0]?.date ?? PRICE_AS_OF;

  const pages: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path)!,
    lastModified: r.path === "/column" || r.path === "/" ? latest : PRICE_AS_OF,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const categoryPages: MetadataRoute.Sitemap = getActiveCategories().map((c) => ({
    url: absoluteUrl(`/column/category/${c}`)!,
    lastModified: latest,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  const columnPages: MetadataRoute.Sitemap = columns.map((c) => ({
    url: absoluteUrl(`/column/${c.slug}`)!,
    lastModified: c.updated ?? c.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...categoryPages, ...columnPages];
}
