/**
 * 写真の原本（photos-original/）から、サイトで配信する画像（public/images/）を作る。
 *   npm run images:prepare
 *
 * - LINE アルバムの原本は日本語ファイル名なので、内容が分かる英数字の名前に付け替える
 * - 最初の1回だけ、public 直下に置かれた LINE_ALBUM_*.jpg を photos-original/line-album/ へ移す
 * - 幅は最大 1600px（拡大はしない）。配信時のリサイズ・AVIF/WebP 変換は next/image が行う
 * - 写真を差し替えるときは、原本を入れ替えてこのスクリプトを実行する
 *
 * どの写真をどこで使っているかは data/images.ts を参照。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const ORIGINAL = path.join(ROOT, "photos-original");
const LINE = path.join(ORIGINAL, "line-album");
const CURRENT = path.join(ORIGINAL, "from-current-site");
const OUT = path.join(PUBLIC, "images");

// 1) public 直下の原本を退避
fs.mkdirSync(LINE, { recursive: true });
for (const f of fs.readdirSync(PUBLIC)) {
  if (/^LINE_ALBUM_.*\.jpe?g$/i.test(f)) fs.renameSync(path.join(PUBLIC, f), path.join(LINE, f));
}

const SPACE = "LINE_ALBUM_ロゴ・スペース写真・イベント時の配置_261002_";
const MACHINE = "LINE_ALBUM_ミシン写真_261002_";

/** [原本, 出力先, 内容メモ] */
const JOBS = [
  // ── スペース ──
  [`${LINE}/${SPACE}12.jpg`, "space/space-main.jpg", "作業台にミシンが並ぶ全景（時計・アイロン台・道具ワゴン）"],
  [`${LINE}/${SPACE}1.jpg`, "space/space-tables.jpg", "作業台と職業用ミシン、奥まで続くスペース"],
  [`${LINE}/${SPACE}7.jpg`, "space/space-large-table.jpg", "作業台を合わせた大テーブルとホワイトボード"],
  [`${LINE}/${SPACE}11.jpg`, "space/shelf-lock-machines.jpg", "ロックミシン・カバーステッチミシンが並ぶ棚"],
  [`${LINE}/${SPACE}9.jpg`, "space/shelf-home-machines.jpg", "家庭用ミシン・職業用ミシンが並ぶ棚"],
  [`${LINE}/${SPACE}10.jpg`, "space/shelf-singer-machines.jpg", "SINGER のミシンが並ぶ棚"],
  [`${LINE}/${SPACE}5.jpg`, "space/layout-floor-open.jpg", "イベント時の配置：机を寄せて床を広く使う"],
  [`${LINE}/${SPACE}6.jpg`, "space/layout-seminar.jpg", "イベント時の配置：椅子を並べた講座スタイル"],
  [`${LINE}/${SPACE}8.jpg`, "space/layout-seminar-back.jpg", "イベント時の配置：椅子を並べた講座スタイル（後方から）"],
  [`${LINE}/${SPACE}3.jpg`, "access/saito-shoten-exterior.jpg", "齊藤商店の外観（1階が生地店、2階が Nippori Share Base）"],
  [`${LINE}/${SPACE}2.jpg`, "access/stairs-sign.jpg", "階段の案内サイン（1F→2F Nippori Share Base）"],
  [`${CURRENT}/space-tables-yellow-stool.jpg`, "space/space-yellow-stool.jpg", "作業台と黄色いスツール"],
  // ── 利用シーン（現在の公式サイトに掲載されている写真） ──
  [`${CURRENT}/scene-sewing-together.png`, "scene/sewing-together.jpg", "作業台でミシンを使う利用風景"],
  [`${CURRENT}/scene-knitting-circle.png`, "scene/knitting-circle.jpg", "大テーブルを囲む編み会"],
  [`${CURRENT}/scene-laser-workshop.jpg`, "scene/laser-workshop.jpg", "レーザー加工した木のパーツを使うワークショップ"],
  // ── ミシン（文字なしの写真：現在の公式サイト掲載分） ──
  [`${CURRENT}/machine-janome-cantare-tj-1sp.jpg`, "machines/janome-cantare-tj-1sp.jpg", ""],
  [`${CURRENT}/machine-brother-compal-700.jpg`, "machines/brother-compal-700.jpg", ""],
  [`${CURRENT}/machine-juki-sl-3700.jpg`, "machines/juki-sl-3700-mina-perhonen.jpg", ""],
  [`${CURRENT}/machine-janome-haute-couture-ecru-2000.jpg`, "machines/janome-haute-couture-ecru-2000.jpg", ""],
  [`${CURRENT}/machine-juki-spur-30dx.jpg`, "machines/juki-spur-30dx-tl-30dx.jpg", ""],
  [`${CURRENT}/machine-babylock-imagine-wave-ble3atwj.jpg`, "machines/babylock-imagine-wave-ble3atwj.jpg", ""],
  [`${CURRENT}/machine-babylock-sakura-bls-5.jpg`, "machines/babylock-sakura-bls-5.jpg", ""],
  [`${CURRENT}/machine-juki-mo-3000.jpg`, "machines/juki-mo-3000.jpg", ""],
  [`${CURRENT}/machine-babylock-kanade-blc-7j.jpg`, "machines/babylock-kanade-blc-7j.jpg", ""],
  [`${CURRENT}/machine-babylock-tumugi-blc-70tj.jpg`, "machines/babylock-tumugi-blc-70tj.jpg", ""],
  [`${CURRENT}/machine-babylock-flatlock-bl72s.jpg`, "machines/babylock-flatlock-bl72s.jpg", ""],
  // ── 期間限定ミシン（機種名ラベル入りの写真のみ提供） ──
  [`${LINE}/${MACHINE}12.jpg`, "machines/singer-vivace-trx-9300.jpg", ""],
  [`${LINE}/${MACHINE}13.jpg`, "machines/singer-heavy-duty-hd4423.jpg", ""],
  [`${LINE}/${MACHINE}14.jpg`, "machines/singer-hh-2500.jpg", ""],
];

let total = 0;
for (const [src, rel] of JOBS) {
  if (!fs.existsSync(src)) {
    console.warn(`× 原本が見つかりません: ${path.relative(ROOT, src)}`);
    continue;
  }
  const out = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const info = await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  total += info.size;
  console.log(`✓ ${rel}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

// ロゴ：白い背景を外側からだけ透過にする（手の白い部分は残す）
{
  const src = `${LINE}/${SPACE}4.jpg`;
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const isBg = (i) => data[i] > 236 && data[i + 1] > 236 && data[i + 2] > 232;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (!isBg(p * 4)) continue;
    data[p * 4 + 3] = 0;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  fs.mkdirSync(path.join(OUT, "brand"), { recursive: true });
  const logo = sharp(data, { raw: { width: w, height: h, channels: 4 } });
  await logo.clone().trim().resize({ width: 900 }).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, "brand/logo.png"));
  // 白い背景つき（SNS・構造化データ用）
  await sharp(src).resize(1200, 1200).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUT, "brand/logo-square.jpg"));
  // ファビコン類
  // ファビコンは 192px・減色で十分（512px の PNG は 130KB を超える）
  await sharp(src).resize(192, 192).png({ palette: true, colors: 64, compressionLevel: 9 }).toFile(path.join(ROOT, "app", "icon.png"));
  await sharp(src).resize(180, 180).png({ palette: true, colors: 64, compressionLevel: 9 }).toFile(path.join(ROOT, "app", "apple-icon.png"));
  console.log("✓ brand/logo.png, brand/logo-square.jpg, app/icon.png, app/apple-icon.png");
}

console.log(`\n合計 ${(total / 1024 / 1024).toFixed(1)}MB（public/images）`);
