/**
 * 自動生成したコラムの機械的な検査。
 * ここで見るのは、数えれば分かること（長さ・重なり・リンク・金額・型番・禁止表現）。
 * 内容が正しいか・読む価値があるかは、別に AI の校閲（generate-daily-blog.mjs の review）で見る。
 * どちらかに通らなかった記事は公開しない。
 */

/** Markdown の記号を外した本文 */
export function plain(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\|?[\s:|-]+\|?$/gm, "")
    .replace(/[*_`>|]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/** 比べやすい形（空白と記号を取り除く） */
export const squash = (s) => s.replace(/[\s　、。，．・「」『』（）()！？!?：:；;〜~\-—―…｜|/]/g, "");

export const charCount = (md) => squash(plain(md)).length;

export function headings(md, level = 2) {
  const re = new RegExp(`^${"#".repeat(level)}\\s+(.+)$`, "gm");
  return [...md.matchAll(re)].map((m) => m[1].trim());
}

/** n 文字ずつの切れ端の集合。文章の写し・焼き直しを見つけるのに使う */
export function shingles(text, n = 7) {
  const s = squash(plain(text));
  const set = new Set();
  for (let i = 0; i + n <= s.length; i++) set.add(s.slice(i, i + n));
  return set;
}

/** a の切れ端のうち、b にも出てくる割合（0〜1） */
export function containment(a, b) {
  if (a.size === 0) return 0;
  let hit = 0;
  for (const x of a) if (b.has(x)) hit++;
  return hit / a.size;
}

export function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 0;
  let hit = 0;
  for (const x of a) if (b.has(x)) hit++;
  return hit / (a.size + b.size - hit);
}

export const bigrams = (s) => {
  const t = squash(s);
  const set = new Set();
  for (let i = 0; i + 2 <= t.length; i++) set.add(t.slice(i, i + 2));
  return set;
};

export const keywordTokens = (k) => new Set((k ?? "").split(/[\s　]+/).filter(Boolean));

/** 見出しの「型」。毎回「〜とは → メリット → 選び方 → まとめ」になっていないかを見る */
const GENERIC = ["とは", "メリット", "デメリット", "選び方", "注意点", "ポイント", "コツ", "まとめ", "よくある質問", "おすすめ", "違い", "手順", "準備"];
export function skeleton(hs) {
  return hs.map((h) => GENERIC.find((g) => h.includes(g)) ?? "・").join(">");
}

/** 使わない決まり文句（AI の文章に出やすいもの）。1 つでもあれば書き直し */
export const BANNED_PHRASES = [
  "について詳しく解説",
  "について解説します",
  "をご紹介します",
  "を見ていきましょう",
  "見ていきます",
  "いかがでしたか",
  "いかがでしたでしょうか",
  "いかがだったでしょうか",
  "ぜひ参考にしてください",
  "参考にしてみてください",
  "参考になれば幸いです",
  "お役に立てれば幸いです",
  "と言えるでしょう",
  "言っても過言ではありません",
  "徹底解説",
  "完全ガイド",
];

/** 店について書いてはいけない方向の表現（確認できない・誇張・架空の声） */
export const FORBIDDEN_CLAIMS = [
  [/口コミ|クチコミ|レビュー|お客様の声|利用者の声|体験談|ご利用者様から|お客様から(は)?「/, "利用者の声・口コミ・体験談"],
  [/No\.?\s?1|ナンバーワン|地域最安|業界(最|初)|日本(一|初)|満足度\s?\d|評価\s?\d|★/, "順位・満足度・評価の点数"],
  [/年中無休|定休日は|営業時間は|24\s?時間/, "営業時間・定休日（お休みは不定休。時間は予約枠で案内する）"],
  [/駐車場(を)?(完備|あり)|専用駐車場が(あり|ござい)/, "駐車場（専用の駐車場は無い）"],
  [/全\s?\d+\s?台|ミシン(を|が)?\s?\d+\s?台|\d+\s?台(の(ミシン|ロック|職業用)|を(完備|用意|設置)|完備|設置)/, "ミシン・設備の台数"],
  [/\d+\s?(㎡|平米|坪|畳)/, "スペースの面積"],
  [/(定員|最大)\s?\d+\s?(名|人)/, "スペースの定員"],
  [/ミシンの?(貸し出し|レンタル)(も|を)?(行って|して)(い|お)ります|持ち帰(り|って)(いただけ|でき|可能)/, "ミシンの持ち帰り（行っていない）"],
  [/(先日|この前|以前)、?(ご)?(利用|来店)(された|いただいた)|という(方|お客様)が(いらっしゃ|来られ|来店)/, "架空の来店エピソード"],
  [/洋裁教室(です|として|を(開講|運営))|講師が(常駐|丁寧に指導)|レッスン(を|が)(受けられ|開講)/, "洋裁教室という位置づけ（教室ではない）"],
];

/**
 * 記事を検査する。errors が 1 つでもあれば公開しない。
 * @param {{ meta: any, body: string, topic: any, existing: any[], recentAuto: any[], amounts: Set<string>, modelCodes: Set<string>, allowedLinks: Set<string>, columnSlugs: Set<string>, photoKeys: Set<string> }} input
 */
export function checkArticle({ meta, body, topic, existing, recentAuto, amounts, modelCodes, allowedLinks, columnSlugs, photoKeys }) {
  const errors = [];
  const warnings = [];
  const text = plain(body);
  const chars = charCount(body);
  const h2 = headings(body, 2);

  // ── 形 ──
  const titleLen = [...(meta.title ?? "")].length;
  if (titleLen < 18 || titleLen > 46) errors.push(`タイトルの長さが ${titleLen} 字（18〜46 字に）`);
  if (/【|】|Nippori Share Base|｜\s*$/.test(meta.title ?? "")) errors.push("タイトルに「【】」や店名を入れない");
  const descLen = [...(meta.description ?? "")].length;
  if (descLen < 60 || descLen > 130) errors.push(`description の長さが ${descLen} 字（80〜120 字を目安に）`);
  if (!Array.isArray(meta.tags) || meta.tags.length < 2 || meta.tags.length > 6) errors.push("tags は 3〜5 個");
  if (/^#\s/m.test(body)) errors.push("本文に「# 」（h1）を使わない");
  if (/^##\s/.test(body.trimStart())) errors.push("書き出しは見出しではなく段落から");
  if (h2.length < 3 || h2.length > 8) errors.push(`大見出しが ${h2.length} 個（4〜6 個に）`);
  if (chars < 1600) errors.push(`本文が ${chars} 字（短すぎる。目安は 2,000〜3,500 字）`);
  if (chars > 6000) errors.push(`本文が ${chars} 字（長すぎる）`);
  if (h2.some((h) => /^(まとめ|おわりに|最後に|さいごに)$/.test(h))) errors.push("「まとめ」「おわりに」だけの見出しは使わない（内容が分かる見出しにする）");

  // ── 文章 ──
  for (const p of BANNED_PHRASES) if (text.includes(p)) errors.push(`決まり文句「${p}」を使わない`);
  const deshou = (text.match(/ではないでしょうか/g) ?? []).length;
  if (deshou > 1) errors.push(`「〜ではないでしょうか」が ${deshou} 回（多くて 1 回）`);
  const lines = body.split("\n").filter((l) => l.trim());
  const bullets = lines.filter((l) => /^\s*([-*]|\d+\.)\s+/.test(l)).length;
  if (lines.length > 0 && bullets / lines.length > 0.4) errors.push(`箇条書きが多すぎる（${Math.round((bullets / lines.length) * 100)}％）。段落で説明する`);
  if ((body.match(/\*\*[^*]+\*\*/g) ?? []).length > 5) warnings.push("太字が多い");
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(body)) errors.push("絵文字を使わない");

  // ── 検索語の詰め込み ──
  const head = [...keywordTokens(topic.targetKeyword)][0] ?? "";
  if (head.length >= 2) {
    const n = text.split(head).length - 1;
    const density = (n * head.length) / Math.max(1, chars);
    if (density > 0.07) errors.push(`「${head}」が ${n} 回（本文の ${(density * 100).toFixed(1)}％）。繰り返しすぎ`);
  }
  const nippori = text.split("日暮里").length - 1;
  if (nippori > 14) errors.push(`「日暮里」が ${nippori} 回。繰り返しすぎ`);
  const brand = text.split("Nippori Share Base").length - 1;
  if (brand > 8) errors.push(`店名が ${brand} 回。宣伝が多すぎる`);

  // ── 店についての事実（数えれば分かるもの）──
  for (const m of text.matchAll(/([\d,]+)\s*円/g)) {
    const v = m[1].replace(/,/g, "");
    if (!amounts.has(v)) errors.push(`確認できない金額「${m[0]}」（事実の一覧にある金額だけを書く）`);
  }
  for (const m of text.matchAll(/\d+\s*万\s*円|数万円|数千円/g)) errors.push(`確認できない金額「${m[0]}」`);
  for (const m of text.matchAll(/[A-Z]{1,4}-?\d{2,5}[A-Z0-9]*/g)) {
    if (!modelCodes.has(m[0]) && !/^(A[3-5]|B[4-5]|S|M|L|LL|T\d*)$/.test(m[0])) errors.push(`事実の一覧に無い型番らしき文字「${m[0]}」`);
  }
  for (const [re, label] of FORBIDDEN_CLAIMS) {
    const m = text.match(re);
    if (m) errors.push(`書いてはいけない表現（${label}）：「${m[0]}」`);
  }

  // ── リンク ──
  const links = [...body.matchAll(/(?<!!)\[([^\]]*)\]\(([^)\s]+)\)/g)].map((m) => ({ text: m[1], href: m[2] }));
  let fixed = 0;
  let columns = 0;
  for (const l of links) {
    if (!l.href.startsWith("/")) {
      errors.push(`外部へのリンクは入れない：${l.href}`);
      continue;
    }
    if (l.href.startsWith("/column/")) {
      const slug = l.href.slice("/column/".length).split("#")[0];
      if (!columnSlugs.has(slug)) errors.push(`存在しない記事へのリンク：${l.href}`);
      else columns++;
    } else if (allowedLinks.has(l.href)) fixed++;
    else errors.push(`存在しないページへのリンク：${l.href}`);
    if (/^(こちら|ここ|詳しくはこちら|詳細はこちら|このページ|リンク)$/.test(l.text.trim())) errors.push(`リンクの文字「${l.text}」では行き先が分からない`);
  }
  if (fixed < 1) errors.push("固定ページへのリンクが無い（1〜2 本）");
  if (fixed > 4) errors.push(`固定ページへのリンクが ${fixed} 本（多すぎる）`);
  const needColumns = Math.min(2, columnSlugs.size);
  if (columns < needColumns) errors.push(`既存の記事へのリンクが ${columns} 本（${needColumns} 本以上）`);
  if (columns > 5) errors.push(`既存の記事へのリンクが ${columns} 本（多すぎる）`);
  const hrefs = links.map((l) => l.href);
  if (new Set(hrefs).size < hrefs.length - 1) warnings.push("同じリンクを繰り返している");

  // ── 写真 ──
  const photos = [...body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);
  for (const p of photos) {
    if (!p.startsWith("/photo/") || !photoKeys.has(p.slice("/photo/".length))) errors.push(`存在しない写真：${p}`);
  }
  if (photos.length > 2) errors.push("本文の写真は 1 枚まで");
  if (!photoKeys.has(meta.cover)) errors.push(`cover「${meta.cover}」は写真の一覧に無い`);

  // ── 既存の記事との重なり ──
  const mine = shingles(body);
  const myHeads = new Set(h2.map(squash));
  const myTitle = bigrams(meta.title ?? "");
  let worst = { slug: "", value: 0 };
  for (const e of existing) {
    const c = containment(mine, e.shingles);
    if (c > worst.value) worst = { slug: e.slug, value: c };
    if (c >= 0.18) errors.push(`既存の記事「${e.slug}」と文章が重なっている（${Math.round(c * 100)}％）`);
    const t = jaccard(myTitle, e.titleBigrams);
    if (t >= 0.6) errors.push(`既存の記事「${e.title}」とタイトルが似ている`);
    const h = jaccard(myHeads, e.headingSet);
    if (h >= 0.5) errors.push(`既存の記事「${e.slug}」と見出しがほぼ同じ`);
    const k = jaccard(keywordTokens(topic.targetKeyword), keywordTokens(e.keyword));
    if (e.keyword && k >= 0.67) errors.push(`既存の記事「${e.slug}」と検索意図（${e.keyword}）が重なっている`);
  }
  const mySkeleton = skeleton(h2);
  if (h2.length >= 3 && mySkeleton.replace(/[>・]/g, "").length > 0 && recentAuto.some((r) => r.skeleton === mySkeleton)) {
    errors.push("見出しの型が、直近の記事と同じ（並べ方を変える）");
  }

  return { errors, warnings, stats: { chars, h2: h2.length, links: { fixed, columns }, photos: photos.length, maxOverlap: worst } };
}
