import type { NextConfig } from "next";

/**
 * 本番ドメイン。サイト内で URL を書くのはここ 1 か所だけ
 * （canonical・sitemap・OG・構造化データは、すべてここから決まる値を使う）。
 * ドメインを変えるときは、この行を直すか、環境変数 NEXT_PUBLIC_SITE_URL で上書きする。
 * www なしの https://nipporisharebase.com は www へ転送されるので、www ありを正とする。
 */
const PRODUCTION_URL = "https://www.nipporisharebase.com";

/**
 * 本番 URL の決め方
 *
 * 1. 環境変数 NEXT_PUBLIC_SITE_URL があれば、それを使う
 * 2. 無ければ、Vercel の「本番デプロイ」（VERCEL_ENV=production）のときだけ PRODUCTION_URL を使う
 * 3. どちらでもない（プレビュー・ローカル）ときは空。全ページ noindex、sitemap は空、robots は Disallow になる
 *
 * NODE_ENV は見ない（Vercel のプレビューも production ビルドのため、本番の判定には使えない）。
 * Vercel が教えてくれる VERCEL_PROJECT_PRODUCTION_URL も使わない（www なしのドメインが返ることがあり、
 * 転送元の URL を canonical にしてしまうため）。
 */
const explicitUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
const siteUrl = (explicitUrl || (process.env.VERCEL_ENV === "production" ? PRODUCTION_URL : "")).replace(/\/+$/, "");
const productionHost = siteUrl ? new URL(siteUrl).host : "";

/**
 * *.vercel.app は原則 noindex（プレビュー URL や、デプロイごとの固有 URL が検索結果に出ないように）。
 * ただし本番 URL そのものが vercel.app のときは、そのホストだけ対象から外す。
 */
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const vercelPreviewHost = productionHost.endsWith(".vercel.app")
  ? `(?!${escapeRegex(productionHost)}$)(?<sub>.*)\\.vercel\\.app`
  : "(?<sub>.*)\\.vercel\\.app";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 親ディレクトリに別の lockfile があるため、ワークスペースのルートを明示する
  turbopack: { root: process.cwd() },
  // 上で決めた本番 URL を、サーバー・クライアントの両方に同じ値で渡す
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  images: {
    formats: ["image/avif", "image/webp"],
    // 写真は 65、ロゴなど線画は既定の 75
    qualities: [65, 75],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: vercelPreviewHost }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
