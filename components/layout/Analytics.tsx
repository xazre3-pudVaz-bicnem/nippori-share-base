import Script from "next/script";
import { IS_PUBLIC, SITE_URL } from "@/lib/seo";

/**
 * Google アナリティクス（GA4）。
 *
 * - 測定 ID は下の GA_MEASUREMENT_ID（2026-10-07 に発行）。測定 ID はページのソースに出る公開情報なので、コードに書いてよい。
 *   別のプロパティに切り替えるときは、この値を直すか、環境変数 NEXT_PUBLIC_GA_ID で上書きする
 * - 読み込むのは、本番公開のビルドで、かつ本番のドメインで開かれたときだけ。
 *   プレビュー・ローカル・*.vercel.app では読み込まない（テストのアクセスが数字に混ざらないように）
 * - 読み込みはページの表示が終わってから（lazyOnload）。最初の表示速度に影響させない
 * - ページの移動は、GA4 の「拡張計測機能（ブラウザの履歴イベントに基づくページの変更）」が自動で数える。
 *   予約フォーム（Google フォーム）へのクリックも、同じ機能の「離脱クリック」で記録される
 */
const GA_MEASUREMENT_ID = "G-TL2CLDZ3ZB";

const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || GA_MEASUREMENT_ID).trim();

export function Analytics() {
  if (!GA_ID || !IS_PUBLIC || !SITE_URL) return null;
  const host = new URL(SITE_URL).hostname;
  return (
    <Script id="ga4" strategy="lazyOnload">
      {`(function(){if(location.hostname!==${JSON.stringify(host)})return;var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}";document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA_ID}");})();`}
    </Script>
  );
}
