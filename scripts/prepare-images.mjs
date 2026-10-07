/**
 * 写真の原本（photos-original/）から、サイトで配信する画像（public/images/）を作る。
 *   npm run images:prepare
 *
 * - LINE アルバムの原本は日本語ファイル名なので、内容が分かる英数字の名前に付け替える
 * - public 直下に置かれた LINE_ALBUM_*.jpg は、実行時に photos-original/line-album/ へ移す
 * - 幅は最大 1600px（拡大はしない）。配信時のリサイズ・AVIF/WebP 変換は next/image が行う
 * - 暗い室内写真は、明るい写真にそろうよう自動で明るさを持ち上げる（下の brighten）
 * - 写真を差し替えるときは、原本を入れ替えてこのスクリプトを実行する
 *
 * どの写真をどこで使っているかは data/images.ts を参照。
 *
 * 旧サイトにあった利用風景の 3 枚（ミシン・編み会・レーザーのワークショップ）は AI で生成された画像と分かったため、
 * サイトでは使っていない（原本は photos-original/from-current-site/ に残してある）。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const ORIGINAL = path.join(ROOT, "photos-original");
const LINE = path.join(ORIGINAL, "line-album");
const CURRENT = path.join(ORIGINAL, "from-current-site");
const STAFF = path.join(ORIGINAL, "staff");
const OUT = path.join(PUBLIC, "images");

// 1) public 直下の原本を退避
fs.mkdirSync(LINE, { recursive: true });
for (const f of fs.readdirSync(PUBLIC)) {
  if (/^LINE_ALBUM_.*\.jpe?g$/i.test(f)) fs.renameSync(path.join(PUBLIC, f), path.join(LINE, f));
}

const SPACE = "LINE_ALBUM_ロゴ・スペース写真・イベント時の配置_261002_";
const SPACE2 = "LINE_ALBUM_ロゴ・スペース写真・イベント時の配置_261007_";
const MACHINE = "LINE_ALBUM_ミシン写真_261002_";

/**
 * 明るさの目安（0〜255 の平均輝度）。これより暗い写真は、ここまで持ち上げる。
 * 明るく写っている基準の写真（space-tables など）が 170 前後なので、少し手前で止める。
 * 白い部分が飛ばないよう、全体を掛け算で明るくするのではなく、中間の明るさだけを持ち上げる（ガンマ補正）。
 */
const BRIGHT_TARGET = 162;
const BRIGHT_BELOW = 150;

/**
 * [原本, 出力先, オプション]
 * - bright: false … 明るさ補正をしない
 * - width … 出力する幅（既定 1600）
 * - crop: { top, height } … 原本の高さに対する割合で、縦方向の一部だけを切り出す（1 枚の写真から別の構図を作るとき）
 */
const JOBS = [
  // ── スペース ──
  [`${LINE}/${SPACE}12.jpg`, "space/space-main.jpg"],
  [`${LINE}/${SPACE}1.jpg`, "space/space-tables.jpg"],
  [`${LINE}/${SPACE}7.jpg`, "space/space-large-table.jpg"],
  [`${LINE}/${SPACE}11.jpg`, "space/shelf-lock-machines.jpg"],
  [`${LINE}/${SPACE}9.jpg`, "space/shelf-home-machines.jpg"],
  [`${LINE}/${SPACE}10.jpg`, "space/shelf-singer-machines.jpg"],
  [`${LINE}/${SPACE}5.jpg`, "space/layout-floor-open.jpg"],
  [`${LINE}/${SPACE}6.jpg`, "space/layout-seminar.jpg"],
  [`${LINE}/${SPACE}8.jpg`, "space/layout-seminar-back.jpg"],
  [`${LINE}/${SPACE}3.jpg`, "access/saito-shoten-exterior.jpg"],
  [`${LINE}/${SPACE}2.jpg`, "access/stairs-sign.jpg"],
  [`${CURRENT}/space-tables-yellow-stool.jpg`, "space/space-yellow-stool.jpg"],
  // ── 利用風景・作品（2026-10-07 受領。実際の Nippori Share Base で撮影されたもの） ──
  [`${LINE}/${SPACE2}3.jpg`, "scene/pattern-and-sewing.jpg"],
  // 同じ写真の手前（裁断台に広げた型紙）だけを切り出したもの
  [`${LINE}/${SPACE2}3.jpg`, "scene/pattern-on-cutting-table.jpg", { crop: { top: 0.44, height: 0.56 } }],
  [`${LINE}/${SPACE2}1.jpg`, "works/scrunchies.jpg"],
  [`${LINE}/${SPACE2}2.jpg`, "works/leather-scissor-cases.jpg"],
  [`${LINE}/${SPACE2}4.jpg`, "works/pincushions-and-coaster.jpg"],
  // ── ミシン（旧サイトのミシン一覧ページに掲載されている、正面からの写真） ──
  [`${CURRENT}/machine-janome-cantare-tj-1sp.jpg`, "machines/janome-cantare-tj-1sp.jpg", { bright: false }],
  [`${CURRENT}/machine-brother-compal-700.jpg`, "machines/brother-compal-700.jpg", { bright: false }],
  [`${CURRENT}/machine-juki-sl-3700.jpg`, "machines/juki-sl-3700-mina-perhonen.jpg", { bright: false }],
  [`${CURRENT}/machine-janome-haute-couture-ecru-2000.jpg`, "machines/janome-haute-couture-ecru-2000.jpg", { bright: false }],
  [`${CURRENT}/machine-juki-spur-30dx.jpg`, "machines/juki-spur-30dx-tl-30dx.jpg", { bright: false }],
  [`${CURRENT}/machine-babylock-imagine-wave-ble3atwj.jpg`, "machines/babylock-imagine-wave-ble3atwj.jpg", { bright: false }],
  [`${CURRENT}/machine-babylock-sakura-bls-5.jpg`, "machines/babylock-sakura-bls-5.jpg", { bright: false }],
  [`${CURRENT}/machine-juki-mo-3000.jpg`, "machines/juki-mo-3000.jpg", { bright: false }],
  [`${CURRENT}/machine-babylock-kanade-blc-7j.jpg`, "machines/babylock-kanade-blc-7j.jpg", { bright: false }],
  [`${CURRENT}/machine-babylock-tumugi-blc-70tj.jpg`, "machines/babylock-tumugi-blc-70tj.jpg", { bright: false }],
  [`${CURRENT}/machine-babylock-flatlock-bl72s.jpg`, "machines/babylock-flatlock-bl72s.jpg", { bright: false }],
  // ── 期間限定ミシン（機種名ラベル入りの写真のみ提供） ──
  [`${LINE}/${MACHINE}12.jpg`, "machines/singer-vivace-trx-9300.jpg", { bright: false }],
  [`${LINE}/${MACHINE}13.jpg`, "machines/singer-heavy-duty-hd4423.jpg", { bright: false }],
  [`${LINE}/${MACHINE}14.jpg`, "machines/singer-hh-2500.jpg", { bright: false }],
  // ── スタッフ紹介のカード（Instagram の自己紹介投稿の画像。2026-10-07 受領） ──
  [`${STAFF}/S__91611189.jpg`, "staff/rika.jpg", { bright: false, width: 900 }],
  [`${STAFF}/S__91611191.jpg`, "staff/waka.jpg", { bright: false, width: 900 }],
  [`${STAFF}/S__91611194.jpg`, "staff/chum.jpg", { bright: false, width: 900 }],
  [`${STAFF}/S__91611196.jpg`, "staff/rapi.jpg", { bright: false, width: 900 }],
];

/** 平均輝度を測る */
async function luminance(input) {
  const s = await sharp(input).stats();
  return 0.2126 * s.channels[0].mean + 0.7152 * s.channels[1].mean + 0.0722 * s.channels[2].mean;
}

/** 中間の明るさを持ち上げる（暗い部分・明るい部分の端は動かさない） */
async function brighten(buffer, from) {
  // out = 255 * (in / 255) ^ (1 / g)。平均が BRIGHT_TARGET 付近になる g を選ぶ（上げすぎないよう上限あり）
  const g = Math.min(1.5, Math.log(from / 255) / Math.log(BRIGHT_TARGET / 255));
  const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
  const lut = new Uint8Array(256);
  for (let i = 0; i < 256; i++) lut[i] = Math.round(255 * Math.pow(i / 255, 1 / g));
  for (let i = 0; i < data.length; i++) data[i] = lut[data[i]];
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
}

// 以前の生成物のうち、いまは使っていないものを消す
for (const stale of ["scene/sewing-together.jpg", "scene/knitting-circle.jpg", "scene/laser-workshop.jpg"]) {
  const p = path.join(OUT, stale);
  if (fs.existsSync(p)) fs.rmSync(p);
}

let total = 0;
for (const [src, rel, opt = {}] of JOBS) {
  if (!fs.existsSync(src)) {
    console.warn(`× 原本が見つかりません: ${path.relative(ROOT, src)}`);
    continue;
  }
  const out = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  let input = await sharp(src).rotate().toBuffer();
  if (opt.crop) {
    const meta = await sharp(input).metadata();
    input = await sharp(input)
      .extract({ left: 0, top: Math.round(meta.height * opt.crop.top), width: meta.width, height: Math.round(meta.height * opt.crop.height) })
      .toBuffer();
  }
  const resized = await sharp(input)
    .resize({ width: opt.width ?? 1600, withoutEnlargement: true })
    .removeAlpha()
    .toBuffer();
  const before = await luminance(resized);
  const needs = opt.bright !== false && before < BRIGHT_BELOW;
  const pipeline = needs ? await brighten(resized, before) : sharp(resized);
  const info = await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  total += info.size;
  const after = needs ? await luminance(out) : before;
  console.log(`✓ ${rel}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB${needs ? `  明るさ ${Math.round(before)} → ${Math.round(after)}` : ""}`);
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
  // ファビコンは 192px・減色で十分（512px の PNG は 130KB を超える）
  await sharp(src).resize(192, 192).png({ palette: true, colors: 64, compressionLevel: 9 }).toFile(path.join(ROOT, "app", "icon.png"));
  await sharp(src).resize(180, 180).png({ palette: true, colors: 64, compressionLevel: 9 }).toFile(path.join(ROOT, "app", "apple-icon.png"));
  console.log("✓ brand/logo.png, brand/logo-square.jpg, app/icon.png, app/apple-icon.png");
}

console.log(`\n合計 ${(total / 1024 / 1024).toFixed(1)}MB（public/images）`);
