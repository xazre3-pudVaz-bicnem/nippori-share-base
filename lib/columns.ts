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
  news: { label: "お知らせ", description: "Nippori Share Base からのお知らせと、スペースで起きたできごと。" },
} as const;

export type ColumnCategory = keyof typeof COLUMN_CATEGORIES;

/**
 * 記事の種類。書き分けることで「検索向けの記事だけが並ぶサイト」にしない。
 * - report … 一次情報。スペースで実際にあったこと（開催レポート、縫ってみた記録、新しい道具、お知らせ）。いちばん大事
 * - local …… 地域の記事。日暮里繊維街や奥日暮里のこと
 * - guide …… 調べものに答える記事。ミシンの種類や選び方など
 */
export const COLUMN_TYPES = {
  report: { label: "できごと・お知らせ", lead: "Nippori Share Base で実際にあったこと。イベントの記録や、新しい道具のお知らせです。" },
  local: { label: "日暮里のこと", lead: "生地の街・日暮里繊維街の歩き方と楽しみ方。" },
  guide: { label: "ミシンと洋裁の読みもの", lead: "ミシンの種類や選び方、作業のコツ。" },
} as const;

export type ColumnType = keyof typeof COLUMN_TYPES;
export const COLUMN_TYPE_ORDER: ColumnType[] = ["report", "local", "guide"];

export type ColumnMeta = {
  slug: string;
  title: string;
  description: string;
  /** 公開日 YYYY-MM-DD。実際に公開した日を書く（検索のために変えない） */
  date: string;
  /** 内容を実際に直した日。直していないのに書き換えない */
  updated?: string;
  category: ColumnCategory;
  type: ColumnType;
  tags: string[];
  /** data/images.ts の IMG のキー */
  cover: string;
  /** 記事の最後に案内するページ */
  cta?: { href: string; label: string };
  /** 関連する Instagram の投稿（report の記事で、写真や動画を見てもらうためのリンク） */
  instagram?: string;
  /** 貸切・イベントの相談へ案内する記事（ワークショップ・イベント向け）なら true */
  forOrganizers: boolean;
  readingMinutes: number;
  /** 同じ日付の記事の並び順（小さいほど先）。省略時は 999 */
  order: number;
};

export type Column = ColumnMeta & { body: string; headings: { id: string; text: string }[] };

function isCategory(v: unknown): v is ColumnCategory {
  return typeof v === "string" && v in COLUMN_CATEGORIES;
}
function isType(v: unknown): v is ColumnType {
  return typeof v === "string" && v in COLUMN_TYPES;
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
  if (data.type && !isType(data.type)) {
    throw new Error(`[column] ${file}: type "${data.type}" は未定義です（report / local / guide のいずれか）`);
  }
  const date = toDate(data.date);
  const updated = data.updated ? toDate(data.updated) : undefined;
  if (updated && updated < date) throw new Error(`[column] ${file}: updated（${updated}）が date（${date}）より前になっています`);

  const body = content.trim();
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m, i) => ({ id: `sec-${i + 1}`, text: m[1].trim() }));
  const chars = body.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/[#*>\-\s|`\[\]()]/g, "").length;
  const category = data.category;

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date,
    updated,
    category,
    // 省略したときは、カテゴリから決める
    type: isType(data.type) ? data.type : category === "news" ? "report" : category === "textile-town" ? "local" : "guide",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "spaceMain"),
    cta: data.cta && data.cta.href && data.cta.label ? { href: String(data.cta.href), label: String(data.cta.label) } : undefined,
    instagram: typeof data.instagram === "string" && data.instagram.startsWith("https://www.instagram.com/") ? data.instagram : undefined,
    forOrganizers: category === "workshop" || category === "event",
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

/**
 * カテゴリ一覧を検索結果に出すのは、記事が 3 本以上あるカテゴリだけ。
 * 1〜2 本しかない一覧は、記事ページとほぼ同じ内容になるので noindex にする（ページ自体は見られる。記事が増えたら自動で解除）。
 */
export const CATEGORY_INDEX_MIN = 3;
export function isCategoryIndexable(category: ColumnCategory): boolean {
  return getColumnsByCategory(category).length >= CATEGORY_INDEX_MIN;
}

/** 同じカテゴリ・同じタグを優先して関連記事を選ぶ */
export function getRelatedColumns(column: Column, limit = 3): Column[] {
  const others = getAllColumns().filter((c) => c.slug !== column.slug);
  const score = (c: Column) => (c.category === column.category ? 2 : 0) + (c.type === column.type ? 1 : 0) + c.tags.filter((t) => column.tags.includes(t)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}
