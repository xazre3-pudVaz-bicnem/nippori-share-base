/**
 * コラムの記事を SNS で共有したときの画像を、記事の写真から作る。
 *   npm run og:photos
 *
 * data/images.ts にある写真 1 枚ごとに、public/og/photo/<写真の名前>.jpg（1200×630）を書き出す。
 * SNS のカードは横長なので、縦長の写真をそのまま使うと上下が大きく切れる。あらかじめ横長に切り出しておく。
 * 写真を足した・差し替えたときに実行する（npm run images:prepare のあと）。
 * 画像が無い写真の記事は、共通の画像（public/og/column.jpg）になる。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { loadSite } from "./lib/load-site.mjs";

const PUBLIC = path.join(process.cwd(), "public");
const OUT = path.join(PUBLIC, "og", "photo");
fs.mkdirSync(OUT, { recursive: true });

const { IMG } = await loadSite("data/images");
const keys = Object.keys(IMG).filter((k) => k !== "logo");

/**
 * 切り出す位置を指定したい写真（0 = 上端、1 = 下端）。
 * 指定の無い写真は、目を引く部分（人・ミシン・作品）が残るように自動で切り出す。
 * 自動だと主役が切れてしまう写真だけ、ここに足す。
 */
const POSITION = { shelfLock: 0.52, spaceLargeTable: 0.8, workPincushions: 0.3, workScrunchies: 0.8 };

const W = 1200;
const H = 630;

for (const key of keys) {
  const src = path.join(PUBLIC, IMG[key].src.src);
  const out = path.join(OUT, `${key}.jpg`);
  let pipeline;
  if (key in POSITION) {
    const resized = await sharp(src).resize({ width: W }).toBuffer();
    const { height } = await sharp(resized).metadata();
    pipeline = height > H ? sharp(resized).extract({ left: 0, top: Math.round((height - H) * POSITION[key]), width: W, height: H }) : sharp(src).resize(W, H, { fit: "cover" });
  } else {
    pipeline = sharp(src).resize(W, H, { fit: "cover", position: sharp.strategy.attention });
  }
  const info = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`✓ og/photo/${key}.jpg  ${(info.size / 1024).toFixed(0)}KB`);
}

// いまは無い写真の画像を消す
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith(".jpg") && !keys.includes(f.replace(/\.jpg$/, ""))) fs.rmSync(path.join(OUT, f));
}
