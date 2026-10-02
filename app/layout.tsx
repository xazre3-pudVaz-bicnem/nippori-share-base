import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { JsonLd } from "@/components/ui/JsonLd";
import { graph, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { IS_PUBLIC, SITE_URL } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: {
    default: `日暮里のレンタルスペース・ミシン｜${SITE.name}`,
    template: "%s",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "レンタルスペース・ものづくりシェアスペース",
  robots: IS_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: SITE.name, locale: "ja_JP", type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, address: false, email: false },
  // Search Console の所有権確認。値があるときだけ <meta name="google-site-verification"> を出す（空のタグは出さない）
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fee65c",
};

/**
 * フォントの読み込み方針（スマホの表示速度を最優先）
 *
 * - 欧文（Train One / M PLUS 1 Code）… ラテン文字だけの1ファイルずつ。@font-face は globals.css。
 *   ロゴタイトルは最初の描画で使うので Train One だけ先読みする。
 * - 日本語の見出し（Zen Maru Gothic）… 画面幅 1024px 以上のときだけ、最初の描画が終わってから読み込む。
 *   日本語フォントは unicode-range で 100 以上に分割されていて、1 ページで数十ファイルを取りに行く。
 *   スマホで読むと最初の表示が数秒遅れるため、スマホは端末の丸ゴシック／ゴシックで表示する
 *   （iPhone・Mac は標準搭載の「ヒラギノ丸ゴ」になるので、丸みのある雰囲気は保たれる）。
 * - 本文は端末標準のゴシック。
 */
const FONT_LOADER = `(function(){if(!window.matchMedia||!matchMedia("(min-width:1024px)").matches)return;var done=false,t;function add(){if(done)return;done=true;var l=document.createElement("link");l.rel="stylesheet";l.href="/fonts/zen-maru-gothic.css";document.head.appendChild(l)}function arm(){clearTimeout(t);t=setTimeout(add,350)}function start(){try{new PerformanceObserver(arm).observe({type:"largest-contentful-paint",buffered:true})}catch(e){}arm();setTimeout(add,4000)}if(document.readyState==="complete")start();else addEventListener("load",start,{once:true})})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload("/fonts/train-one-basic.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <script dangerouslySetInnerHTML={{ __html: FONT_LOADER }} />
        <noscript>
          {/* JS が無効な環境向け。通常は上のスクリプトが後から読み込む */}
          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link rel="stylesheet" href="/fonts/zen-maru-gothic.css" media="(min-width: 1024px)" />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-white"
        >
          本文へ移動
        </a>
        <Header />
        {/*
          ここで {children} を <Suspense> で囲まないこと。
          囲むと静的 HTML で本文が <main> の外に回り、JS を実行しないクローラーから本文が見えなくなる。
        */}
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <RevealObserver />
        <JsonLd data={graph(organizationSchema(), localBusinessSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
