/**
 * ナビゲーションの定義。Header / Footer / スマホメニュー / sitemap が共有する。
 * クライアントコンポーネントからも読み込むので、fs を使うモジュールを import しないこと。
 *
 * ヘッダーには主要な導線だけを出す（スペース／ミシン／楽しみ方／料金／アクセス＋予約）。
 * そのほかのページは「楽しみ方」の中、スマホメニュー、フッターから行ける。
 */
export type NavItem = { href: string; label: string; en: string; description?: string };

/** 「楽しみ方」にまとめるページ（使い方別の入口） */
export const ENJOY_NAV: NavItem[] = [
  { href: "/handmade", label: "洋裁・ハンドメイド", en: "Handmade", description: "一人で集中する日も、仲間と集まる日も" },
  { href: "/workshop", label: "ワークショップ・イベント", en: "Workshop", description: "講座・展示会・販売会をひらく" },
  { href: "/equipment", label: "設備・道具", en: "Equipment", description: "ミシンの機種と、使える道具" },
  { href: "/column", label: "コラム・お知らせ", en: "Column", description: "読みものと、スペースのできごと" },
];

/** ヘッダー（PC）に並べる順。type: "enjoy" の位置に「楽しみ方」のメニューが入る */
export const HEADER_NAV: ({ type: "link"; item: NavItem } | { type: "enjoy" })[] = [
  { type: "link", item: { href: "/space", label: "スペース", en: "Space", description: "ものづくりに使えるレンタルスペース" } },
  { type: "link", item: { href: "/sewing-machine", label: "ミシン", en: "Sewing Machine", description: "日暮里でミシンが使える場所" } },
  { type: "enjoy" },
  { type: "link", item: { href: "/price", label: "料金", en: "Price", description: "利用料金とプラン" } },
  { type: "link", item: { href: "/access", label: "アクセス", en: "Access", description: "日暮里繊維街・齊藤商店2F" } },
];

/** スマホメニューの大きい項目 */
export const MAIN_NAV: NavItem[] = [
  { href: "/space", label: "スペース", en: "Space", description: "ものづくりに使えるレンタルスペース" },
  { href: "/sewing-machine", label: "ミシン", en: "Sewing Machine", description: "日暮里でミシンが使える場所" },
  { href: "/handmade", label: "洋裁・ハンドメイド", en: "Handmade", description: "一人で集中する日も、仲間と集まる日も" },
  { href: "/workshop", label: "ワークショップ・イベント", en: "Workshop", description: "講座・展示会・販売会をひらく" },
  { href: "/price", label: "料金", en: "Price", description: "利用料金とプラン" },
  { href: "/access", label: "アクセス", en: "Access", description: "日暮里繊維街・齊藤商店2F" },
];

/** スマホメニューの小さい項目 */
export const SUB_NAV: NavItem[] = [
  { href: "/first-time", label: "初めての方へ", en: "First Time" },
  { href: "/equipment", label: "設備・道具", en: "Equipment" },
  { href: "/faq", label: "よくある質問", en: "FAQ" },
  { href: "/column", label: "コラム・お知らせ", en: "Column" },
  { href: "/about", label: "私たちについて", en: "About" },
  { href: "/chums-sewing-club", label: "Chum's Sewing Club", en: "Membership" },
];

/** フッターのリンク（3 グループ） */
export const FOOTER_NAV: { title: string; en: string; items: { href: string; label: string }[] }[] = [
  {
    title: "使い方",
    en: "Use",
    items: [
      { href: "/space", label: "レンタルスペース" },
      { href: "/sewing-machine", label: "ミシン" },
      { href: "/handmade", label: "洋裁・ハンドメイド" },
      { href: "/workshop", label: "ワークショップ・イベント" },
      { href: "/equipment", label: "設備・道具" },
    ],
  },
  {
    title: "ご利用案内",
    en: "Guide",
    items: [
      { href: "/first-time", label: "初めての方へ" },
      { href: "/price", label: "料金" },
      { href: "/reserve", label: "空き状況・予約" },
      { href: "/access", label: "アクセス" },
      { href: "/faq", label: "よくある質問" },
    ],
  },
  {
    title: "Nippori Share Base",
    en: "About",
    items: [
      { href: "/about", label: "私たちについて" },
      { href: "/column", label: "コラム・お知らせ" },
      { href: "/chums-sewing-club", label: "Chum's Sewing Club" },
      { href: "/terms", label: "利用規約" },
      { href: "/terms/event", label: "イベント利用規約" },
    ],
  },
];

/** sitemap に載せる固定ページ（コラムは lib/columns.ts から追加する）。404 や開発用のページは入れない */
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
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chums-sewing-club", priority: 0.5, changeFrequency: "monthly" },
  { path: "/column", priority: 0.7, changeFrequency: "weekly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms/event", priority: 0.2, changeFrequency: "yearly" },
];
