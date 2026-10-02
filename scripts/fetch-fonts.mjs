/**
 * フォントを自前でホストする。
 *   npm run fonts:fetch
 *
 * 方針（スマホの表示速度を優先）
 * - 欧文のロゴ書体「Train One」は英数字と基本の記号だけ、英字見出し用の「M PLUS 1 Code」は
 *   ラテン文字のファイルだけを public/fonts に置く（各 1 ファイル）。@font-face は app/globals.css。
 * - 日本語の見出し用「Zen Maru Gothic」は unicode-range で 100 以上に分割されている。
 *   next/font/google に渡すとその @font-face が全部ページ CSS に入って描画をブロックするので、
 *   woff2 と CSS を public/fonts に落とし、app/layout.tsx から PC 幅のときだけ後読みする。
 * - 本文は端末標準のゴシック。
 */
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "fonts");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
fs.mkdirSync(OUT_DIR, { recursive: true });

async function getCss(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`CSSの取得に失敗: ${res.status} ${url}`);
  return res.text();
}
async function download(url, file) {
  if (fs.existsSync(file)) return;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`フォントの取得に失敗: ${r.status} ${url}`);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
}

// 1) 欧文だけ使う書体
// Train One は英数字と基本の記号だけに絞る（latin 全体だと 33KB、絞ると 14KB。ロゴタイトルの表示が速くなる）。
// 収録文字を変えたら、app/globals.css の unicode-range も合わせて直すこと。
const TRAIN_ONE_TEXT = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,'’!?&-";
const LATIN_ONLY = [
  { out: "train-one-basic.woff2", url: "https://fonts.googleapis.com/css2?family=Train+One&text=" + encodeURIComponent(TRAIN_ONE_TEXT), any: true },
  { out: "m-plus-1-code-latin.woff2", url: "https://fonts.googleapis.com/css2?family=M+PLUS+1+Code:wght@400&display=swap" },
];
for (const f of LATIN_ONLY) {
  const css = await getCss(f.url);
  // 通常は「/* latin */」の直後の @font-face から woff2 の URL を取る。
  // text= を指定したときは @font-face が 1 つだけ返るので、その URL をそのまま使う
  const m = f.any
    ? css.match(/url\((https:\/\/[^)]+)\)/)
    : css.match(/\/\*\s*latin\s*\*\/\s*@font-face\s*{[^}]*?url\((https:\/\/[^)]+\.woff2)\)/);
  if (!m) throw new Error(`@font-face が見つかりません: ${f.url}`);
  const file = path.join(OUT_DIR, f.out);
  await download(m[1], file);
  console.log(`✓ public/fonts/${f.out} (${(fs.statSync(file).size / 1024).toFixed(0)}KB)`);
}

// 2) 日本語の見出し用（PC 幅のみ後読み）
const FAMILIES = [
  {
    dir: "zen-maru-gothic",
    css: "zen-maru-gothic.css",
    url: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&display=swap",
  },
];
for (const family of FAMILIES) {
  const dir = path.join(OUT_DIR, family.dir);
  fs.mkdirSync(dir, { recursive: true });
  let css = await getCss(family.url);
  const urls = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+)\)/g)].map((m) => m[1]))];
  console.log(`${family.dir}: ${urls.length} files`);
  for (const url of urls) {
    const name = path.basename(new URL(url).pathname);
    await download(url, path.join(dir, name));
    css = css.split(url).join(`/fonts/${family.dir}/${name}`);
  }
  fs.writeFileSync(path.join(OUT_DIR, family.css), css, "utf8");
  const total = fs.readdirSync(dir).reduce((a, f) => a + fs.statSync(path.join(dir, f)).size, 0);
  console.log(`✓ public/fonts/${family.css} (${(fs.statSync(path.join(OUT_DIR, family.css)).size / 1024).toFixed(0)}KB) / woff2 ${(total / 1024 / 1024).toFixed(1)}MB`);
}
