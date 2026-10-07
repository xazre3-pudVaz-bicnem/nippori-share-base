import Script from "next/script";
import { IS_PUBLIC } from "@/lib/seo";

/**
 * Google アナリティクス（GA4）。
 *
 * - 環境変数 NEXT_PUBLIC_GA_ID（例: G-XXXXXXXXXX）があり、かつ本番公開のビルドのときだけ読み込む。
 *   プレビューやローカルでは読み込まない（テストのアクセスが数字に混ざらないように）
 * - 読み込みはページの表示が終わってから（lazyOnload）。最初の表示速度に影響させない
 * - ページの移動は、GA4 の「拡張計測機能（ブラウザの履歴イベントに基づくページの変更）」が自動で数える。
 *   予約フォーム（Google フォーム）へのクリックも、同じ機能の「離脱クリック」で記録される
 *
 * 測定 ID は Vercel の Environment Variables（Production）に設定する。手順は README を参照。
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!GA_ID || !IS_PUBLIC) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga4" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_ID}");`}
      </Script>
    </>
  );
}
