/**
 * イベントの告知ページで使う画像を、主催者からいただいた原本（photos-original/events/）から作る。
 *   node scripts/prepare-event-images.mjs
 *
 * - public 直下に置かれた LINE の画像（S__*.jpg）は、下の ORIGINALS の名前で photos-original/events/<slug>/ へ移す
 * - 告知画像・見本の写真は、そのまま（幅 1600px まで）書き出す。生地の画像は、商品ページの画面写しなので生地の部分だけを切り出す
 * - SNS 共有用の画像（1200×630）は、告知画像と見本の写真 2 枚を並べて作る
 * - 文字だけの告知画像（申込方法・電話受付など）は、ページに文章で書くので配信しない（原本だけ残す）
 *
 * 写真の説明（alt）と、どこで使うかは data/images.ts（EVENT_IMG）を参照。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

/** maffon × かたがみスタイル × 齊藤商店 コラボワークショップ（2026-11-02 に齊藤さんから受領。掲載の許可あり） */
const SLUG = "maffon-workshop-2026-11";
const ORIGINAL = path.join(ROOT, "photos-original", "events", SLUG);
const OUT = path.join(PUBLIC, "images", "events", SLUG);
const ORIGINALS = {
  "S__94380046_0.jpg": "tracy-tshirt.jpg",
  "S__94380047_0.jpg": "flounder-skirt.jpg",
  "S__94380048_0.jpg": "flyer-main.jpg",
  "S__94380049_0.jpg": "flyer-sessions.jpg",
  "S__94380050_0.jpg": "flyer-highlights.jpg",
  "S__94380051_0.jpg": "tshirt-fabric-1.jpg",
  "S__94380052_0.jpg": "tshirt-fabric-2.jpg",
  "S__94380053_0.jpg": "tshirt-fabric-3.jpg",
  "S__94380054_0.jpg": "tshirt-fabric-4.jpg",
  "S__94380055_0.jpg": "tshirt-fabric-5.jpg",
  "S__94380057_0.jpg": "skirt-fabrics-1-2.jpg",
  "S__94380058_0.jpg": "skirt-fabrics-3-4.jpg",
  "S__94380059_0.jpg": "flyer-apply.jpg",
  "S__94380060.jpg": "flyer-phone.jpg",
};

fs.mkdirSync(ORIGINAL, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });
for (const [from, to] of Object.entries(ORIGINALS)) {
  const src = path.join(PUBLIC, from);
  if (fs.existsSync(src)) fs.renameSync(src, path.join(ORIGINAL, to));
}

const jpeg = (img) => img.jpeg({ quality: 84, mozjpeg: true });
const original = (name) => path.join(ORIGINAL, name);

// 告知画像と見本の写真
for (const name of ["flyer-main.jpg", "tracy-tshirt.jpg", "flounder-skirt.jpg", "skirt-fabrics-1-2.jpg", "skirt-fabrics-3-4.jpg"]) {
  await jpeg(sharp(original(name)).resize({ width: 1600, withoutEnlargement: true })).toFile(path.join(OUT, name.replace("flyer-main", "flyer")));
}

// Tシャツの生地（商品ページの画面写し）から、生地の写真の部分だけを正方形で切り出す。
// 左上の「トレイシーTシャツ」と右下の番号の文字が入らない位置（5 枚とも同じ配置）
for (let n = 1; n <= 5; n++) {
  const file = original(`tshirt-fabric-${n}.jpg`);
  const { width, height } = await sharp(file).metadata();
  const size = Math.round(width * 0.46);
  await jpeg(sharp(file).extract({ left: Math.round(width * 0.23), top: Math.round(height * 0.19), width: size, height: size }).resize(480, 480)).toFile(path.join(OUT, `tshirt-fabric-${n}.jpg`));
}

// SNS 共有用（1200×630）：左に告知画像、右に見本の写真 2 枚
const W = 1200;
const H = 630;
const side = Math.round((W - H) / 2);
const flyer = await sharp(original("flyer-main.jpg")).resize(H, H).toBuffer();
const tracy = await sharp(original("tracy-tshirt.jpg")).resize(side, H, { fit: "cover", position: "centre" }).toBuffer();
const skirt = await sharp(original("flounder-skirt.jpg")).resize(W - H - side, H, { fit: "cover", position: "centre" }).toBuffer();
fs.mkdirSync(path.join(PUBLIC, "og", "events"), { recursive: true });
await jpeg(
  sharp({ create: { width: W, height: H, channels: 3, background: "#fee65c" } }).composite([
    { input: flyer, left: 0, top: 0 },
    { input: tracy, left: H, top: 0 },
    { input: skirt, left: H + side, top: 0 },
  ]),
).toFile(path.join(PUBLIC, "og", "events", `${SLUG}.jpg`));

console.log(`[event-images] ${path.relative(ROOT, OUT)} と public/og/events/${SLUG}.jpg を作りました`);
