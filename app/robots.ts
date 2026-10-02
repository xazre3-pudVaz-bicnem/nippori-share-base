import type { MetadataRoute } from "next";
import { IS_PUBLIC, SITE_URL } from "@/lib/seo";

/**
 * NEXT_PUBLIC_SITE_URL が未設定のあいだ（プレビューなど）は全ページを Disallow にする。
 * 公開前に /robots.txt が「Allow: /」になっていることを必ず確認すること。
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PUBLIC) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
