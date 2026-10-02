import { SITE } from "@/lib/site";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * 構造化データ（JSON-LD）の組み立て。
 * - 画面に出していない情報は入れない（営業日・緯度経度・レビューなどは未確認のため出力しない）
 * - URL 系は NEXT_PUBLIC_SITE_URL が無いとき undefined になり、JSON.stringify で自然に落ちる
 */
type Json = Record<string, unknown>;

const id = (hash: string) => `${SITE_URL ?? ""}/#${hash}`;

const postalAddress = {
  "@type": "PostalAddress",
  postalCode: SITE.postalCode,
  addressRegion: SITE.address.region,
  addressLocality: SITE.address.locality,
  streetAddress: SITE.address.street,
  addressCountry: "JP",
};

export function organizationSchema(): Json {
  return {
    "@type": "Organization",
    "@id": id("organization"),
    name: SITE.name,
    alternateName: ["ニッポリシェアベース", "日暮里シェアベース"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/brand/logo-square.jpg"),
    email: SITE.email,
    telephone: SITE.tel,
    address: postalAddress,
    sameAs: [SITE.instagram],
    parentOrganization: { "@type": "Organization", name: SITE.operator },
  };
}

/** 設備。画面（/equipment）に掲載しているものだけ */
const AMENITIES = [
  "家庭用ミシン",
  "職業用ミシン",
  "ロックミシン",
  "カバーステッチミシン",
  "アイロン",
  "裁断台",
  "作業台・大テーブル",
  "ホワイトボード",
  "レーザー加工機",
  "カッティングマシーン",
];

export function localBusinessSchema(): Json {
  return {
    "@type": "LocalBusiness",
    "@id": id("localbusiness"),
    name: SITE.name,
    description: SITE.description,
    slogan: SITE.tagline,
    url: absoluteUrl("/"),
    image: [absoluteUrl("/og/default.jpg"), absoluteUrl("/images/space/space-main.jpg")].filter(Boolean),
    logo: absoluteUrl("/images/brand/logo-square.jpg"),
    telephone: SITE.tel,
    email: SITE.email,
    address: postalAddress,
    hasMap: SITE.mapLinkUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "東京都荒川区" },
      { "@type": "Place", name: "日暮里" },
      { "@type": "Place", name: "日暮里繊維街" },
    ],
    // 料金表（/price）に掲載している税抜価格の範囲
    priceRange: "¥300〜¥20,000",
    amenityFeature: AMENITIES.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    sameAs: [SITE.instagram],
    parentOrganization: { "@id": id("organization") },
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/reserve"),
      name: "予約する",
    },
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": id("website"),
    name: SITE.name,
    alternateName: "Nippori Share Base 公式サイト",
    url: absoluteUrl("/"),
    inLanguage: "ja",
    description: SITE.description,
    publisher: { "@id": id("organization") },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  const all = [{ name: "ホーム", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** 画面に表示している Q&A だけを渡すこと */
export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
}): Json {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? [absoluteUrl(input.image)] : undefined,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    articleSection: input.section,
    inLanguage: "ja",
    mainEntityOfPage: absoluteUrl(input.path),
    author: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
    publisher: { "@id": id("organization") },
  };
}

export function itemListSchema(name: string, items: { name: string; path?: string }[]): Json {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.path ? absoluteUrl(it.path) : undefined,
    })),
  };
}

/** 複数のスキーマを 1 つの @graph にまとめる */
export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}
