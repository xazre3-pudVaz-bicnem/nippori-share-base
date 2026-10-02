import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/**
 * 本番 URL は NEXT_PUBLIC_SITE_URL の 1 つだけ。値は next.config.ts が決めて渡している
 * （環境変数に指定があればそれ、無ければ Vercel の本番デプロイのときだけ本番ドメイン、それ以外は空）。
 * 空のときは canonical / OG の URL / sitemap を一切出さず、robots は noindex にする。
 * ページやコンポーネントに URL を直接書かず、必ず absoluteUrl() を通すこと。
 *
 * このファイルはクライアントコンポーネントから読み込まれても動くよう、
 * fs などサーバー専用のモジュールを import しないこと。
 */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
export const SITE_URL: string | undefined = RAW_SITE_URL ? RAW_SITE_URL.replace(/\/+$/, "") : undefined;
export const IS_PUBLIC = Boolean(SITE_URL);

if (!IS_PUBLIC && process.env.NODE_ENV === "production" && typeof window === "undefined") {
  console.warn(
    "[Nippori Share Base] 本番 URL が決まっていません（ローカル・プレビューでは正常）。canonical/OG/sitemap は出力されず、全ページ noindex になります。",
  );
}

export function absoluteUrl(path = "/"): string | undefined {
  if (!SITE_URL) return undefined;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_TITLE_SUFFIX = `｜${SITE.name}`;

/** SNS 共有用の画像（public/og/*.jpg）。無指定は default */
export type OgKey = "default" | "space" | "sewing-machine" | "handmade" | "workshop" | "column";

type BuildMetadataInput = {
  /** 「｜Nippori Share Base」を付ける前のタイトル */
  title: string;
  /** 120 字以内を目安に */
  description: string;
  /** 先頭スラッシュから始まるパス */
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  og?: OgKey;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  /** 検索結果に出さないページ */
  noindex?: boolean;
  /** タイトルを末尾サフィックスなしでそのまま使う（トップページ用） */
  rawTitle?: boolean;
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = input.rawTitle ? input.title : `${input.title}${SITE_TITLE_SUFFIX}`;
  const url = absoluteUrl(input.path);
  const ogImage = absoluteUrl(`/og/${input.og ?? "default"}.jpg`);
  const noindex = input.noindex || !IS_PUBLIC;

  return {
    title,
    description: input.description,
    keywords: input.keywords,
    alternates: url ? { canonical: url } : undefined,
    // 本番URL未設定（プレビュー）は noindex,nofollow。意図的な noindex ページは follow を残す
    robots: noindex
      ? { index: false, follow: IS_PUBLIC }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      title,
      description: input.description,
      siteName: SITE.name,
      locale: "ja_JP",
      type: input.type ?? "website",
      url,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: `${input.title}｜${SITE.name}` }] } : {}),
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, section: input.section, tags: input.tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/** YYYY-MM-DD → 2026年10月2日 */
export function formatDateJa(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}年${m}月${d}日`;
}
