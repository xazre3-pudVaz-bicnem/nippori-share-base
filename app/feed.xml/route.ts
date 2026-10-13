import { COLUMN_CATEGORIES, getAllColumns } from "@/lib/columns";
import { FEED_PATH, IS_PUBLIC, absoluteUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

/**
 * 新着コラムの RSS（/feed.xml）。ビルド時に作る静的なファイル。
 * - 載せるのは公開済みの記事だけ（新しい順に 30 本）。記事ファイルを足せば自動で入る
 * - 日付は記事の date（公開日）。ビルドした時刻は入れない（内容が変わっていないのに更新されたように見せない）
 * - 本番 URL が無いビルド（プレビュー・ローカル）では出さない
 */
export const dynamic = "force-static";

const LIMIT = 30;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/** YYYY-MM-DD（日本の日付）→ RSS の日付形式。時刻は朝 9 時（日本時間）にそろえる */
const pubDate = (date: string) => new Date(`${date}T09:00:00+09:00`).toUTCString();

export function GET() {
  if (!IS_PUBLIC) return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });

  const columns = getAllColumns().slice(0, LIMIT);
  const items = columns
    .map((c) => {
      const url = absoluteUrl(`/column/${c.slug}`)!;
      return `    <item>
      <title>${esc(c.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(c.description)}</description>
      <category>${esc(COLUMN_CATEGORIES[c.category].label)}</category>
      <pubDate>${pubDate(c.date)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} コラム・お知らせ</title>
    <link>${absoluteUrl("/column")}</link>
    <description>${esc("日暮里繊維街・齊藤商店2Fのものづくりシェアスペース「Nippori Share Base」のコラムとお知らせ。")}</description>
    <language>ja</language>
    <atom:link href="${absoluteUrl(FEED_PATH)}" rel="self" type="application/rss+xml" />
${columns[0] ? `    <lastBuildDate>${pubDate(columns[0].updated ?? columns[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
