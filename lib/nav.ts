/**
 * ナビゲーションの定義。Header / Footer / スマホメニュー / sitemap が共有する。
 * クライアントコンポーネントからも読み込むので、fs を使うモジュールを import しないこと。
 *
 * ヘッダーの分け方（2026-10 に見直し）
 * - スペース …… 場所そのもの
 * - ミシン・設備 … 使える道具（ミシン／設備・道具）
 * - 楽しみ方 …… 使い方別の入口（洋裁・ハンドメイド／ワークショップ・イベント）
 * - 料金／アクセス
 * - ご案内 …… 初めての方へ、よくある質問、私たちについて、コラム・お知らせ、会員
 * 「楽しみ方」に設備やコラムを入れない（使い方の話ではないため）。
 */
export type NavItem = { href: string; label: string; en: string; description?: string };
export type NavLink = { type: "link"; item: NavItem };
export type NavGroup = { type: "group"; id: string; label: string; items: NavItem[] };

const SPACE: NavItem = { href: "/space", label: "スペース", en: "Space", description: "ものづくりに使えるレンタルスペース" };
const MACHINE: NavItem = { href: "/sewing-machine", label: "ミシン", en: "Sewing Machine", description: "日暮里でミシンが使える場所" };
const EQUIPMENT: NavItem = { href: "/equipment", label: "設備・道具", en: "Equipment", description: "ミシンの機種と、使える道具" };
const HANDMADE: NavItem = { href: "/handmade", label: "洋裁・ハンドメイド", en: "Handmade", description: "一人で集中する日も、仲間と集まる日も" };
const WORKSHOP: NavItem = { href: "/workshop", label: "ワークショップ・イベント", en: "Workshop", description: "講座・展示会・販売会をひらく" };
const PRICE: NavItem = { href: "/price", label: "料金", en: "Price", description: "利用料金とプラン" };
const ACCESS: NavItem = { href: "/access", label: "アクセス", en: "Access", description: "日暮里繊維街・齊藤商店2F" };
const FIRST_TIME: NavItem = { href: "/first-time", label: "初めての方へ", en: "First Time", description: "予約から当日までの流れと持ち物" };
const FAQ: NavItem = { href: "/faq", label: "よくある質問", en: "FAQ", description: "予約・料金・持ち物など" };
const ABOUT: NavItem = { href: "/about", label: "私たちについて", en: "About", description: "目指す場所と、スタッフ紹介" };
const COLUMN: NavItem = { href: "/column", label: "コラム・お知らせ", en: "Column", description: "読みものと、スペースのできごと" };
const CLUB: NavItem = { href: "/chums-sewing-club", label: "Chum's Sewing Club", en: "Membership", description: "月額会員のご案内" };

/** ヘッダー（PC）に並べる順。type: "group" は、開くと中のページが出るメニュー */
export const HEADER_NAV: (NavLink | NavGroup)[] = [
  { type: "link", item: SPACE },
  { type: "group", id: "machines", label: "ミシン・設備", items: [MACHINE, EQUIPMENT] },
  { type: "group", id: "enjoy", label: "楽しみ方", items: [HANDMADE, WORKSHOP] },
  { type: "link", item: PRICE },
  { type: "link", item: ACCESS },
  { type: "group", id: "guide", label: "ご案内", items: [FIRST_TIME, FAQ, ABOUT, COLUMN, CLUB] },
];

/** スマホメニューの大きい項目 */
export const MAIN_NAV: NavItem[] = [SPACE, MACHINE, EQUIPMENT, HANDMADE, WORKSHOP, PRICE, ACCESS];

/** スマホメニューの小さい項目 */
export const SUB_NAV: NavItem[] = [FIRST_TIME, FAQ, ABOUT, COLUMN, CLUB];

/**
 * いま開いているページが、そのメニュー項目の中かどうか。
 * コラムの記事（/column/...）や規約の下層でも、親の項目を「現在地」として扱う。
 */
export function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** フッターのリンク（3 グループ） */
export const FOOTER_NAV: { title: string; en: string; items: { href: string; label: string }[] }[] = [
  {
    title: "場所と道具・楽しみ方",
    en: "Use",
    items: [
      { href: "/space", label: "レンタルスペース" },
      { href: "/sewing-machine", label: "ミシン" },
      { href: "/equipment", label: "設備・道具" },
      { href: "/handmade", label: "洋裁・ハンドメイド" },
      { href: "/workshop", label: "ワークショップ・イベント" },
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
