/**
 * SNS 共有用の画像（public/og/*.jpg、1200×630）を作る。
 *
 *   1) npm run build && npm run start      … 別のターミナルでサーバーを起動しておく
 *   2) npm run og:make                     … http://localhost:3000 に接続して撮影する
 *      （ポートを変えたときは BASE=http://localhost:3117 npm run og:make）
 *
 * フォントと写真はサーバーから読み込むので、サイトと同じ見た目になる。
 * Playwright が必要（このプロジェクトの依存には入れていない）。未導入なら
 *   npm i -D playwright && npx playwright install chromium
 * を実行するか、環境変数 PLAYWRIGHT_PATH にインストール済みの場所を指定する。
 *
 * 画像の内容を変えるときは、下の VARIANTS を直して作り直す。
 * どのページがどの画像を使うかは lib/seo.ts の OgKey と、各ページの buildMetadata({ og }) を参照。
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const BASE = process.env.BASE || "http://localhost:3000";
const OUT = path.join(process.cwd(), "public", "og");

let chromium;
try {
  ({ chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright"));
} catch {
  console.error("Playwright が見つかりません。scripts/make-og.mjs 冒頭の説明をご覧ください。");
  process.exit(1);
}

const VARIANTS = [
  { key: "default", label: "日暮里のものづくりレンタルスペース", photo: "/images/space/space-main.jpg", pos: "50% 55%" },
  { key: "space", label: "ものづくりに使える、日暮里のレンタルスペース", photo: "/images/space/space-tables.jpg", pos: "50% 60%" },
  { key: "sewing-machine", label: "日暮里で、ミシンを使う。職業用・ロックミシンも", photo: "/images/space/shelf-lock-machines.jpg", pos: "50% 62%" },
  { key: "handmade", label: "日暮里のハンドメイド・洋裁スペース", photo: "/images/scene/knitting-circle.jpg", pos: "50% 45%" },
  { key: "workshop", label: "日暮里のワークショップ・イベントスペース", photo: "/images/space/layout-seminar.jpg", pos: "50% 60%" },
  { key: "column", label: "ミシン・洋裁・ハンドメイドのコラム", photo: "/images/space/space-large-table.jpg", pos: "50% 55%" },
];

const html = (v) => `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link rel="stylesheet" href="/fonts/zen-maru-gothic.css">
<style>
@font-face{font-family:"Train One";src:url("/fonts/train-one-basic.woff2") format("woff2");}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#fee65c;color:#231f20;font-family:"Zen Maru Gothic",sans-serif;display:flex;overflow:hidden}
.l{flex:1;padding:56px 0 52px 64px;display:flex;flex-direction:column}
.logo{width:150px;height:auto}
.label{margin-top:auto;font-size:27px;font-weight:700;letter-spacing:.06em;line-height:1.5;max-width:560px}
.name{margin-top:14px;font-family:"Train One";font-size:79px;line-height:1.04;letter-spacing:.01em}
.tag{margin-top:20px;font-size:27px;font-weight:700;letter-spacing:.2em}
.addr{margin-top:22px;font-size:20px;font-weight:500;letter-spacing:.04em;display:flex;align-items:center;gap:14px}
.stitch{width:90px;height:4px;background:repeating-linear-gradient(90deg,#231f20 0 20px,transparent 20px 34px)}
.r{width:500px;padding:48px 52px 48px 0}
.r div{width:100%;height:100%;border-radius:40px;background:url("${v.photo}") ${v.pos}/cover no-repeat}
</style></head><body>
<div class="l">
  <img class="logo" src="/images/brand/logo.png" alt="">
  <p class="label">${v.label}</p>
  <p class="name">Nippori<br>Share Base</p>
  <p class="tag">ヒト・モノ・コトが巡る場所</p>
  <p class="addr"><span class="stitch"></span>日暮里繊維街・齊藤商店 2F</p>
</div>
<div class="r"><div></div></div>
</body></html>`;

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const v of VARIANTS) {
  const url = `${BASE}/__og/${v.key}`;
  await page.route(url, (route) => route.fulfill({ contentType: "text/html; charset=utf-8", body: html(v) }));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png" });
  const file = path.join(OUT, `${v.key}.jpg`);
  const info = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(file);
  console.log(`✓ public/og/${v.key}.jpg  ${(info.size / 1024).toFixed(0)}KB`);
}
await browser.close();
