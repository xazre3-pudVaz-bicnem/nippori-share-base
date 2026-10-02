import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * コラム（content/column/*.md）の読み込み。サーバー専用（fs を使う）。
 * クライアントコンポーネントや lib/nav.ts から import しないこと。
 *
 * 記事の追加方法は content/column/README.md を参照。
 * ファイル名が URL になる（例: rock-machine-basics.md → /column/rock-machine-basics）。
 * 「_」で始まるファイルと README.md は記事として扱わない。
 */
const DIR = path.join(process.cwd(), "content", "column");

export const COLUMN_CATEGORIES = {
  machine: { label: "ミシン", description: "家庭用・職業用・ロック・カバーステッチ。ミシンの種類と選び方、使い方の基本。" },
  sewing: { label: "洋裁", description: "裁断から仕上げまで。洋服づくりを楽しむための知識とコツ。" },
  handmade: { label: "ハンドメイド", description: "編み物や布小物など、手を動かしてつくる時間のヒント。" },
  "textile-town": { label: "日暮里繊維街", description: "生地の街・日暮里の歩き方と、買った生地を作品にするまで。" },
  workshop: { label: "ワークショップ", description: "教えたい人・集まりたい人のための、会場選びと準備。" },
  monozukuri: { label: "ものづくり", description: "道具や場所との付き合い方。つくることを続けるための考え方。" },
  event: { label: "イベント", description: "展示会・販売会・交流会をひらくための段取り。" },
} as const;

export type ColumnCategory = keyof typeof COLUMN_CATEGORIES;

export type ColumnMeta = {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  updated?: string;
  category: ColumnCategory;
  tags: string[];
  /** data/images.ts の IMG のキー */
  cover: string;
  /** 記事の最後に案内するページ */
  cta?: { href: string; label: string };
  readingMinutes: number;
  /** 同じ日付の記事の並び順（小さいほど先）。省略時は 999 */
  order: number;
};

export type Column = ColumnMeta & { body: string; headings: { id: string; text: string }[] };

function isCategory(v: unknown): v is ColumnCategory {
  return typeof v === "string" && v in COLUMN_CATEGORIES;
}

function toDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? "").slice(0, 10);
}

function load(file: string): Column {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);

  // 必須項目が欠けた記事は、公開前にビルドで気づけるよう落とす
  for (const key of ["title", "description", "date", "category"]) {
    if (!data[key]) throw new Error(`[column] ${file}: frontmatter の ${key} がありません`);
  }
  if (!isCategory(data.category)) {
    throw new Error(`[column] ${file}: category "${data.category}" は未定義です（lib/columns.ts の COLUMN_CATEGORIES を参照）`);
  }

  const body = content.trim();
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m, i) => ({ id: `sec-${i + 1}`, text: m[1].trim() }));
  const chars = body.replace(/[#*>\-\s|`\[\]()]/g, "").length;

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: toDate(data.date),
    updated: data.updated ? toDate(data.updated) : undefined,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "spaceMain"),
    cta: data.cta && data.cta.href && data.cta.label ? { href: String(data.cta.href), label: String(data.cta.label) } : undefined,
    readingMinutes: Math.max(1, Math.round(chars / 500)),
    order: typeof data.order === "number" ? data.order : 999,
    body,
    headings,
  };
}

let cache: Column[] | null = null;

/** 公開済みの記事（新しい順）。date が未来の記事と draft: true は含めない */
export function getAllColumns(): Column[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(DIR)) return [];
  const today = new Date().toISOString().slice(0, 10);
  const list = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    .filter((f) => !matter(fs.readFileSync(path.join(DIR, f), "utf8")).data.draft)
    .map(load)
    .filter((c) => c.date <= today)
    .sort((a, b) => (a.date !== b.date ? (a.date < b.date ? 1 : -1) : a.order !== b.order ? a.order - b.order : a.slug.localeCompare(b.slug)));
  cache = list;
  return list;
}

export function getColumn(slug: string): Column | undefined {
  return getAllColumns().find((c) => c.slug === slug);
}

export function getColumnsByCategory(category: ColumnCategory): Column[] {
  return getAllColumns().filter((c) => c.category === category);
}

/** 記事が1本以上あるカテゴリだけ（空の一覧ページを作らない） */
export function getActiveCategories(): ColumnCategory[] {
  const used = new Set(getAllColumns().map((c) => c.category));
  return (Object.keys(COLUMN_CATEGORIES) as ColumnCategory[]).filter((k) => used.has(k));
}

/** 同じカテゴリを優先して関連記事を選ぶ */
export function getRelatedColumns(column: Column, limit = 3): Column[] {
  const others = getAllColumns().filter((c) => c.slug !== column.slug);
  const score = (c: Column) => (c.category === column.category ? 2 : 0) + c.tags.filter((t) => column.tags.includes(t)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}
