/**
 * ナビゲーションの定義。Header / Footer / パンくず / sitemap が共有する。
 * クライアントコンポーネントからも読み込むので、fs を使うモジュールを import しないこと。
 */
export type NavItem = { href: string; label: string; en: string; description?: string };

/** ヘッダーに常に出す主要ページ */
export const MAIN_NAV: NavItem[] = [
  { href: "/space", label: "スペース", en: "Space", description: "ものづくりに使えるレンタルスペース" },
  { href: "/sewing-machine", label: "ミシン", en: "Sewing Machine", description: "家庭用・職業用・ロック・カバーステッチ" },
  { href: "/handmade", label: "ハンドメイド", en: "Handmade", description: "洋裁・編み物・制作スペース" },
  { href: "/workshop", label: "ワークショップ", en: "Workshop", description: "講座・展示会・販売会をひらく" },
  { href: "/equipment", label: "設備", en: "Equipment", description: "使える道具と設備" },
  { href: "/price", label: "料金", en: "Price", description: "利用料金とプラン" },
  { href: "/access", label: "アクセス", en: "Access", description: "日暮里繊維街・齊藤商店2F" },
];

/** メニューとフッターに出す、そのほかのページ */
export const SUB_NAV: NavItem[] = [
  { href: "/first-time", label: "初めての方へ", en: "First Time" },
  { href: "/faq", label: "よくある質問", en: "FAQ" },
  { href: "/column", label: "コラム", en: "Column" },
  { href: "/chums-sewing-club", label: "Chum's Sewing Club", en: "Membership" },
];

export const LEGAL_NAV: NavItem[] = [
  { href: "/terms", label: "利用規約", en: "Terms" },
  { href: "/terms/event", label: "イベント利用規約", en: "Event Terms" },
];

/** sitemap に載せる固定ページ（コラムは lib/columns.ts から追加する） */
export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/space", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sewing-machine", priority: 0.9, changeFrequency: "monthly" },
  { path: "/handmade", priority: 0.8, changeFrequency: "monthly" },
  { path: "/workshop", priority: 0.8, changeFrequency: "monthly" },
  { path: "/equipment", priority: 0.7, changeFrequency: "monthly" },
  { path: "/price", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reserve", priority: 0.7, changeFrequency: "monthly" },
  { path: "/first-time", priority: 0.7, changeFrequency: "monthly" },
  { path: "/access", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chums-sewing-club", priority: 0.5, changeFrequency: "monthly" },
  { path: "/column", priority: 0.7, changeFrequency: "weekly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms/event", priority: 0.2, changeFrequency: "yearly" },
];
