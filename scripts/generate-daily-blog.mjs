/**
 * コラムを 1 本、自動で作る（毎日 GitHub Actions から実行される。.github/workflows/daily-blog.yml）。
 *
 *   node scripts/generate-daily-blog.mjs            … テーマを選んで生成し、検査に通れば content/column/ に書き出す
 *   node scripts/generate-daily-blog.mjs --dry-run  … 生成と検査だけ（ファイルは書かない。下書きは .daily-blog/ に残る）
 *   node scripts/generate-daily-blog.mjs --topic <id>   … テーマを指定する
 *   node scripts/generate-daily-blog.mjs --force    … 今日すでに自動の記事があっても生成する
 *   node scripts/generate-daily-blog.mjs --draft    … 公開せず、下書き（draft: true）として保存する
 *
 * 必要な環境変数：ANTHROPIC_API_KEY。モデルは ANTHROPIC_MODEL で変えられる（無ければ下の DEFAULT_MODEL）。
 *
 * 流れ
 *   1. 公開済みの記事・テーマの一覧（data/blog-topics.json）・サイトの事実（lib/site.ts と data/*.ts）を読む
 *   2. 今日の分がすでにあれば何もしない
 *   3. まだ使っていないテーマから、割合がいちばん足りていない分野のものを選ぶ（先頭の数件は日付で順番を回す）
 *   4. Claude に記事を書かせる（店について書いてよいのは、渡した事実だけ）
 *   5. 機械的な検査（scripts/lib/column-quality.mjs）と、別の呼び出しによる校閲にかける
 *   6. 通らなければ、指摘を渡して書き直させる（1 テーマ 3 回まで）。それでも通らなければ次のテーマを試す（1 日 2 テーマまで）。
 *      どれも通らなければ「今日は公開しない」で終わる
 *   7. 通った記事だけを content/column/<id>.md に書き、テーマを使用済みにする
 *
 * このスクリプトは commit も push もしない（ワークフローが、ビルドが通ったあとで行う）。
 * 終了コード：0 = 公開した／今日は公開しない（正常）、1 = 設定や API のエラー。
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { bigrams, checkArticle, headings, jaccard, keywordTokens, shingles, skeleton, squash, trimFixedLinks } from "./lib/column-quality.mjs";
import { loadSite } from "./lib/load-site.mjs";
import { buildSiteFacts, knownAmounts, knownModelCodes } from "./lib/site-facts.mjs";

/**
 * 既定のモデル（費用を抑える Haiku の現行世代、Claude Haiku 5.5）。文章の質を上げたいときは ANTHROPIC_MODEL に Sonnet（claude-sonnet-5-5）などを指定する。
 * Haiku 5.5 は考える処理（thinking）が標準で動き、その分も出力の上限（max_tokens）に含まれるので、上限は大きめにしている
 */
const DEFAULT_MODEL = "claude-haiku-5-5";

const ROOT = process.cwd();
const COLUMN_DIR = path.join(ROOT, "content", "column");
const TOPICS_FILE = path.join(ROOT, "data", "blog-topics.json");
const FACTS_FILE = path.join(ROOT, "data", "site-facts.json");
const WORK_DIR = path.join(ROOT, ".daily-blog");

/** 自動生成で使うカテゴリ（お知らせ・できごとは人が書く） */
const AUTO_CATEGORIES = ["machine", "sewing", "handmade", "textile-town", "workshop"];

/** 記事の最後に出すボタン（親の固定ページへ） */
const CTA_LABEL = {
  "/sewing-machine": "使えるミシンを見る",
  "/handmade": "洋裁・ハンドメイドでの使い方を見る",
  "/workshop": "ワークショップ・イベントの開催について見る",
  "/space": "レンタルスペースとしての使い方を見る",
  "/equipment": "設備・道具の一覧を見る",
  "/access": "場所と行き方を見る",
  "/first-time": "初めての方への案内を見る",
};

/** 本文からリンクしてよい固定ページ（ここに無い URL へのリンクは検査で落とす） */
const PAGE_LINKS = [
  ["/sewing-machine", "ミシンのページ（使えるミシンの種類・料金・利用の流れ）"],
  ["/sewing-machine#home", "家庭用ミシンの案内"],
  ["/sewing-machine#pro", "職業用ミシンの案内"],
  ["/sewing-machine#lock", "ロックミシンの案内"],
  ["/sewing-machine#cover", "カバーステッチミシンの案内"],
  ["/equipment", "設備・道具の一覧（機種ごとの説明）"],
  ["/equipment#tools", "アイロン・裁断台・作業台"],
  ["/equipment#digital", "レーザー加工機・カッティングマシーン"],
  ["/handmade", "洋裁・ハンドメイドでの使い方"],
  ["/workshop", "ワークショップ・イベントの開催（貸切利用）"],
  ["/space", "レンタルスペースとしての使い方"],
  ["/price", "料金表"],
  ["/price#option", "オプションとメンターサポートの料金"],
  ["/first-time", "初めての方へ（予約から当日までの流れ・持ち物）"],
  ["/first-time#mentor", "メンターサポートの案内"],
  ["/reserve", "空き状況・予約"],
  ["/reserve#private", "貸切・イベントの相談"],
  ["/access", "アクセス・地図"],
  ["/faq", "よくある質問"],
  ["/about", "私たちについて・スタッフ紹介"],
  ["/chums-sewing-club", "月額会員 Chum's Sewing Club"],
];

/** 記事の写真の候補（カテゴリごと）。内容に合うものを Claude が選び、直近の記事と同じ写真は避ける */
const COVER_POOL = {
  machine: ["shelfHome", "shelfLock", "shelfSinger", "spaceYellowStool", "spaceTables", "spaceMain"],
  sewing: ["cuttingPattern", "scenePattern", "spaceLargeTable", "workScissorCases", "spaceTables", "spaceYellowStool"],
  handmade: ["workScrunchies", "workPincushions", "spaceLargeTable", "scenePattern", "workScissorCases", "spaceMain"],
  "textile-town": ["exterior", "stairsSign", "cuttingPattern", "scenePattern", "spaceMain", "workScrunchies"],
  workshop: ["layoutSeminar", "layoutSeminarBack", "layoutFloor", "spaceLargeTable", "spaceMain"],
};

// ───────── 引数 ─────────
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const value = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : undefined;
};
const DRY_RUN = flag("dry-run");
const FORCE = flag("force");
const AS_DRAFT = flag("draft");
const TOPIC_ID = value("topic");
const MOCK_DIR = value("mock");
/** 日本時間の今日（YYYY-MM-DD） */
const TODAY = value("date") ?? new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
const MODEL = (process.env.ANTHROPIC_MODEL || "").trim() || DEFAULT_MODEL;
const REVIEW_MODEL = (process.env.ANTHROPIC_REVIEW_MODEL || "").trim() || MODEL;

const usage = { input: 0, output: 0, calls: 0 };
const log = (...a) => console.log(...a);

// ───────── 結果の書き出し（GitHub Actions 向け） ─────────
function finish({ published, slug = "", title = "", reason = "", detail = "", exitCode = 0 }) {
  const lines = [
    `## 今日のコラム（${TODAY}）`,
    "",
    published ? `**${AS_DRAFT ? "下書きとして保存" : DRY_RUN ? "検査に合格（お試しのため公開はしていません）" : "公開"}**：${title}` : exitCode ? `**エラー**：${reason}` : `**今日は公開しません**：${reason}`,
    slug ? `- ファイル：\`content/column/${slug}.md\`` : "",
    `- モデル：\`${MODEL}\`${REVIEW_MODEL !== MODEL ? `（校閲：\`${REVIEW_MODEL}\`）` : ""}`,
    usage.calls ? `- API の呼び出し：${usage.calls} 回（入力 ${usage.input.toLocaleString()} トークン、出力 ${usage.output.toLocaleString()} トークン）` : "",
    detail ? `\n${detail}` : "",
  ].filter(Boolean);
  log("\n" + lines.join("\n"));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=${published && !DRY_RUN}\nslug=${slug}\n`);
  process.exit(exitCode);
}

function saveWork(name, text) {
  fs.mkdirSync(WORK_DIR, { recursive: true });
  fs.writeFileSync(path.join(WORK_DIR, name), text);
}

// ───────── 読み込み ─────────
function loadColumns() {
  return fs
    .readdirSync(COLUMN_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(COLUMN_DIR, file), "utf8"));
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "").slice(0, 10);
      const body = content.trim();
      const hs = headings(body, 2);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        date,
        category: String(data.category ?? ""),
        keyword: typeof data.keyword === "string" ? data.keyword : "",
        parent: typeof data.parent === "string" ? data.parent.split("#")[0] : "",
        topic: typeof data.topic === "string" ? data.topic : "",
        auto: data.auto === true,
        draft: data.draft === true,
        cover: String(data.cover ?? ""),
        headings: hs,
        // 検査用
        shingles: shingles(body),
        titleBigrams: bigrams(String(data.title ?? "")),
        headingSet: new Set(hs.map(squash)),
        skeleton: skeleton(hs),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

const groupOfCategory = (c) => ({ machine: "machine", "textile-town": "nippori", sewing: "sewing", handmade: "sewing", workshop: "workshop", event: "workshop" })[c] ?? "basics";

/**
 * 今日試すテーマの候補（多くて 2 つ）。割合（targetShare）に対して、いちばん足りていない分野から選ぶ。
 * 同じ分野の中では優先度の高い順だが、先頭の数件は日付で順番を回す
 * （うまく書けないテーマがあっても、毎日そのテーマだけを試し続けないように）。
 */
function pickTopics(topicsFile, columns) {
  const { topics, targetShare } = topicsFile;
  const bySlug = new Map(columns.map((c) => [c.slug, c]));
  const usedIds = new Set(columns.flatMap((c) => (c.topic ? [c.topic] : [])));

  const isFree = (t) => {
    if (t.used || t.manual || usedIds.has(t.id) || bySlug.has(t.id)) return false;
    if (!AUTO_CATEGORIES.includes(t.category)) return false;
    // すでにある記事と検索意図が重なるテーマは選ばない
    const mine = keywordTokens(t.targetKeyword);
    return !columns.some((c) => c.keyword && jaccard(mine, keywordTokens(c.keyword)) >= 0.67);
  };

  if (TOPIC_ID) {
    const t = topics.find((x) => x.id === TOPIC_ID);
    if (!t) throw new Error(`テーマ「${TOPIC_ID}」が data/blog-topics.json にありません`);
    if (bySlug.has(t.id)) throw new Error(`テーマ「${TOPIC_ID}」の記事はすでにあります（content/column/${t.id}.md）`);
    return [t];
  }

  const free = topics.filter(isFree);
  if (free.length === 0) return [];

  const counted = columns.filter((c) => c.category !== "news");
  const count = {};
  for (const c of counted) {
    const g = topics.find((t) => t.id === c.topic)?.group ?? groupOfCategory(c.category);
    count[g] = (count[g] ?? 0) + 1;
  }
  const total = counted.length + 1;
  const deficit = (g) => (targetShare[g] ?? 0) * total - (count[g] ?? 0);
  const groups = [...new Set(free.map((t) => t.group))].sort((a, b) => deficit(b) - deficit(a));
  const ordered = groups.flatMap((g) => {
    const list = free.filter((t) => t.group === g).sort((a, b) => a.priority - b.priority);
    // 先頭の 5 件（優先度の高いもの）だけ、日付で順番を回す
    const head = list.slice(0, Math.min(5, list.length));
    const shift = DAY_NUMBER % Math.max(1, head.length);
    return [...head.slice(shift), ...head.slice(0, shift), ...list.slice(head.length)];
  });
  return ordered.slice(0, MAX_TOPICS_PER_RUN);
}

/** 1 回の実行で試すテーマの数と、1 テーマあたりの書き直しの回数 */
const MAX_TOPICS_PER_RUN = 2;
const MAX_ATTEMPTS = 3;
/** 日付（日本時間）を通し番号にしたもの。テーマの順番を回すのに使う */
const DAY_NUMBER = Math.floor(Date.parse(`${TODAY}T00:00:00Z`) / 86400000);

// ───────── Claude への指示 ─────────
const WRITER_SYSTEM = `あなたは、東京・日暮里繊維街にあるものづくりシェアスペース「Nippori Share Base」のコラムを書く編集者です。
読者は、検索で調べものをしている人です。検索エンジンのためではなく、その人の疑問がこの記事だけで解決することを目指します。

# 絶対に守ること（事実）
- Nippori Share Base について書いてよいのは、<facts> にあることだけです。そこに無い設備・機種・サービス・料金・時間・人数・できごとを書いてはいけません。
- 金額は <facts> にある金額だけを、そこに書かれている形のまま書きます。それ以外の金額（相場、ミシンや道具の価格、材料費など）は、数字で書きません。
- 利用者の声、体験談、口コミ、レビュー、開催したイベントの様子、「先日こんな方が来ました」のような話を作ってはいけません。
- 自分が実際に縫った・試したかのような一人称の体験を書いてはいけません。一般に知られている知識として書きます。
- <facts> の doNotWrite にあることは書きません。
- 一般的な知識（ミシンの仕組み、生地の性質、作業の手順）は書いて構いませんが、確かでないことを断定しません。メーカーや機種ごとの数値・仕様は書きません。
- ほかの店・サービスの名前を出した比較や、順位づけをしません。
- Nippori Share Base は洋裁教室ではありません。「教えてもらえる」「レッスン」のように書きません（スタッフが製作を支える「メンターサポート」は <facts> のとおりに書けます）。
- 「レンタルミシン」は、スペースに来て使うという意味です。持ち帰れるかのように書きません。

# 書けないと判断したら
上の約束を守ったままでは読む価値のある記事にならないと判断したら、無理に書かず、decision を "skip" にして理由を書いてください。それで構いません。

# 記事の内容
- 1 記事 1 テーマ。<topic> の検索意図に、最初の見出しまでで答えを示し、そのあとで理由と具体的なやり方を書きます。
- 一般論だけで終わらせません。テーマに関係がある場合に限り、<facts> の中から、実際に置いているミシンや設備、生地の街の中にあるという立地、利用のしかたを 1〜3 か所、自然に入れます。関係が薄いテーマに宣伝を足しません。
- 「日暮里」「Nippori Share Base」という言葉を必要以上に繰り返しません。検索語を不自然に並べません。
- 固定ページが受け持っている言葉（<facts> の pages の ownedKeywords）を、記事の主題にしません。場所を探している人は、固定ページへのリンクで案内します。
- <existing> の記事と同じ内容にしません。重なる部分は短く触れるだけにして、その記事へリンクします。
- 長さは本文 2,000〜3,500 字が目安。内容に必要な長さで構いません。水増しはしません。

# 文章
- です・ます調。やわらかく、落ち着いた調子。読者が思い当たる場面や疑問から書き出します。
- 次のような決まり文句は使いません：「〜について詳しく解説します」「〜を見ていきましょう」「〜をご紹介します」「いかがでしたか」「ぜひ参考にしてください」「参考になれば幸いです」「〜と言えるでしょう」「徹底解説」。「〜ではないでしょうか」は多くて 1 回。
- 見出しは、内容が分かる具体的な言葉にします。「まとめ」「おわりに」という見出しは使いません。「〜とは」「メリット」「選び方」を毎回同じ順番で並べません。<recent> の記事とは、見出しの並べ方を変えます。
- 箇条書きは、並べたほうが分かりやすいところだけ。段落で説明できることは段落で書きます。
- 絵文字は使いません。感嘆符や強調を多用しません。太字は 1 記事に 3 か所まで。

# 形式（Markdown）
- 大見出しは「## 」、小見出しは「### 」。「# 」は使いません（タイトルは別に書きます）。大見出しは 4〜6 個。
- 書き出しは、見出しのない段落から。目次は書きません（自動で付きます）。
- リンクは <links> にある URL だけを使います。固定ページへのリンクを 1〜2 本、<existing> の記事へのリンクを 2〜4 本、本文の流れの中に入れます。リンクの文字は、リンク先の内容が分かる言葉にします（「こちら」は使いません）。記事の最後にリンクをまとめて並べません。
- 外部サイトへのリンクは入れません。
- 写真は、内容と合うものがある場合だけ、本文に 0〜1 枚。書き方は ![写真の下に出る短い説明](/photo/キー) 。説明には、写真に実際に写っているものだけを書きます。
- 表は、比べる項目が 3 つ以上あるときだけ使えます。

# 出力
次の形だけを出力します。前後に説明を付けません。

<meta>
{"decision":"write","skipReason":"","title":"…","description":"…","tags":["…","…","…"],"cover":"写真のキー","storeFacts":["記事の中で使った Nippori Share Base の事実を、短く列挙"]}
</meta>
<article>
（本文の Markdown）
</article>

- title：28〜40 字。検索した人が知りたい内容がそのまま分かる、自然な日本語。店名は入れません。「【】」は使いません。
- description：80〜120 字。記事を読むと何が分かるかを書きます。
- tags：3〜5 個。
- cover：<photos> の候補から、内容にいちばん合う写真のキーを 1 つ。`;

const REVIEWER_SYSTEM = `あなたは、Nippori Share Base のコラムを公開前に点検する校閲者です。書き手とは別の人として、厳しく読みます。
<facts> は、この店について確認できている事実のすべてです。ここに無い店の情報は、すべて「確認できない」として扱います。

次の観点で点検します。

1. unsupported（最重要）：Nippori Share Base について、<facts> に無いことが書かれていないか（設備・機種・サービス・料金・時間・人数・できごと・スタッフ）。金額や機種名が <facts> と一致しているか。doNotWrite に触れていないか。洋裁教室であるかのように、またはミシンを持ち帰れるかのように書いていないか。
2. fabricated：架空の利用者の声・体験談・レビュー・開催したイベント、書き手自身が縫った・試したかのような体験が書かれていないか。
3. dubious：一般的な知識として、明らかな誤りや、根拠なく断定している箇所がないか。メーカー・機種ごとの数値を書いていないか。
4. duplicate：<existing> のどれかと、答えている疑問が実質同じになっていないか。
5. value：検索した人の疑問（<topic> の検索意図）に、この記事だけで答えられているか。一般論の寄せ集めで終わっていないか。内容が薄くないか。
6. style：決まり文句、同じ言い回しの繰り返し、検索語の不自然な繰り返し、宣伝の押しつけ、過度な箇条書き、どの記事にも使えそうな中身のない段落がないか。

verdict の決め方
- "pass"：そのまま公開してよい。
- "revise"：直せば公開できる。issues に、直す箇所と直し方を具体的に書く。
- "reject"：テーマや内容そのものに問題があり、直しても公開すべきでない（既存の記事と重複、読む価値がない、事実に基づけない）。

unsupported・fabricated・dubious・duplicate が 1 つでもあれば、"pass" にしてはいけません。迷ったら "revise" にします。
style は、読者の理解を妨げるもの・決まり文句・不自然な繰り返しだけを挙げます。言い回しの好みの違い（「こんな」と「次のような」など）は挙げません。

次の形だけを出力します。前後に説明を付けず、コードブロック（\`\`\`）も使わず、<review> と </review> で囲みます。

<review>
{"verdict":"pass または revise または reject","scores":{"factual":0,"value":0,"originality":0,"style":0},"issues":[],"summary":"一言で"}
</review>

- scores は、それぞれ 1〜5 の整数（5 が最良）。factual＝事実の確かさ、value＝読む価値、originality＝既存の記事と重ならないこと、style＝文章。
- issues は、指摘 1 つにつき {"type":"unsupported / fabricated / dubious / duplicate / value / style のいずれか","quote":"該当箇所を短く","fix":"どう直すか"} 。指摘が無ければ空の配列。
- <review> の中は、1 つの正しい JSON にします。`;

function buildContext({ topic, facts, columns, coverCandidates, recentCovers }) {
  const published = columns.filter((c) => !c.draft && c.date <= TODAY);
  // 既存の記事：すべてのタイトルと検索意図。見出しは、テーマが近い 20 本だけ（記事が増えても入力が膨らみすぎないように）
  const mine = keywordTokens(`${topic.targetKeyword} ${topic.titleIdea}`);
  const ranked = published
    .filter((c) => c.category !== "news")
    .map((c) => ({ c, s: jaccard(mine, keywordTokens(`${c.keyword} ${c.title}`)) + (c.parent === topic.parentPage ? 0.2 : 0) + (c.category === topic.category ? 0.1 : 0) }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.c);
  const near = new Set(ranked.slice(0, 20).map((c) => c.slug));
  // 本文からリンクする記事の候補（テーマの近い順）。ここから 2〜3 本を選ばせる
  const linkCandidates = ranked.slice(0, 6).map((c) => `- /column/${c.slug} ｜ ${c.title}`).join("\n");
  const existing = published
    .map((c) => `- /column/${c.slug} ｜ ${c.title} ｜ 検索意図：${c.keyword || "（未設定）"}${near.has(c.slug) ? ` ｜ 見出し：${c.headings.join(" / ")}` : ""}`)
    .join("\n");
  const recent = columns
    .slice(0, 5)
    .map((c) => `- ${c.title}：${c.headings.join(" → ")}`)
    .join("\n");
  const photos = coverCandidates.map((key) => `- ${key}：${facts.photos.find((p) => p.key === key)?.shows ?? ""}${recentCovers.includes(key) ? "（直近の記事で使用。できれば避ける）" : ""}`).join("\n");

  return `<topic>
テーマの案：${topic.titleIdea}
検索意図：${topic.searchIntent}
想定する検索語：${topic.targetKeyword}
カテゴリ：${topic.category}
親になる固定ページ：${topic.parentPage}（記事の最後に、このページへのボタンが自動で付きます）
${topic.note ? `注意：${topic.note}` : ""}
</topic>

<facts>
${JSON.stringify(facts, null, 1)}
</facts>

<links>
固定ページ（リンクしてよい URL。本文中で 1〜2 本だけ使う。3 本以上にしない）
${PAGE_LINKS.map(([href, label]) => `- ${href} ｜ ${label}`).join("\n")}

テーマの近い既存の記事（この中から 2〜3 本を選び、本文の流れの中でリンクする。必須）
${linkCandidates || "（まだありません）"}
</links>

<existing>
${existing || "（まだありません）"}
</existing>

<recent>
${recent || "（まだありません）"}
</recent>

<photos>
${photos}
</photos>`;
}

/**
 * 出力の中から JSON を取り出す。決めた形（<tag>…</tag>）を基本にしつつ、
 * モデルによってはコードブロック（```json）だけで返すことがあるので、その形も読む。
 */
function extractJson(text, tag) {
  const tagged = text.match(new RegExp(`<${tag}>\\s*([\\s\\S]*?)\\s*</${tag}>`));
  let src = tagged ? tagged[1] : undefined;
  if (src === undefined) {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (fenced) src = fenced[1];
  }
  if (src === undefined) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) src = text.slice(start, end + 1);
  }
  if (src === undefined) throw new Error(`出力に <${tag}> がありません`);
  src = src.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
  try {
    return JSON.parse(src);
  } catch (e) {
    throw new Error(`<${tag}> の JSON を読めません：${e.message}`);
  }
}

function parseDraft(text) {
  const json = extractJson(text.split(/<article>/)[0], "meta");
  if (json.decision === "skip") return { meta: json, body: "" };
  const article = text.match(/<article>\s*([\s\S]*?)\s*(?:<\/article>|$)/);
  if (!article || !article[1].trim()) throw new Error("出力に <article> がありません");
  return { meta: json, body: article[1].replace(/\r\n/g, "\n").trim() };
}

function parseReview(text) {
  const r = extractJson(text, "review");
  r.issues = Array.isArray(r.issues) ? r.issues : [];
  r.scores = r.scores ?? {};
  return r;
}

/** 公開を止める指摘（事実・架空・誤り・重複）。文章の指摘（style）と価値の指摘（value）は、書き直しには使うが、点数で判断する */
const BLOCKING = ["unsupported", "fabricated"];

/**
 * 校閲の結果から、公開してよいかを決める。
 * - 店について事実の一覧に無いこと（unsupported）、架空の声・体験・できごと（fabricated）の指摘が 1 つでもあれば、公開しない。
 *   これはどの回でも、点数に関係なく止める
 * - 点数（事実 4・価値 4・独自性 3・文章 3 以上）に届かなければ、公開しない。
 *   既存の記事との重なりは「独自性」の点数で、一般論の言い切りは「事実」の点数で判断する
 * - 校閲者が pass と言えば公開。revise の場合は、指摘を渡して書き直させ、最後の書き直しのあとでも上の 2 つを満たしていれば公開する
 *
 * 校閲役は、頼まれれば必ず何かしら指摘を返す。指摘が 1 つでも残れば止めるルールだと、事実に問題のない記事も
 * 1 本も通らなかった（2026-10-26 に確認）。止める理由は「事実」と「点数」に絞り、細かな指摘は書き直しに使う。
 */
function reviewPasses(r, { lastAttempt }) {
  if (r.verdict === "reject") return false;
  if (r.issues.some((i) => BLOCKING.includes(i.type))) return false;
  const s = r.scores;
  const scoresOk = (s.factual ?? 0) >= 4 && (s.value ?? 0) >= 4 && (s.originality ?? 0) >= 3 && (s.style ?? 0) >= 3;
  if (!scoresOk) return false;
  return r.verdict === "pass" || (lastAttempt && r.verdict === "revise");
}

// ───────── Claude の呼び出し ─────────
async function createCaller() {
  if (MOCK_DIR) {
    // テスト用：API を呼ばず、用意した文章を順に返す（draft.txt → review.txt → draft2.txt → review2.txt）
    const seq = { draft: 0, review: 0 };
    return async ({ kind }) => {
      const n = ++seq[kind];
      const file = path.join(MOCK_DIR, `${kind}${n > 1 ? n : ""}.txt`);
      if (!fs.existsSync(file)) throw new Error(`テスト用のファイルがありません：${file}`);
      usage.calls++;
      return fs.readFileSync(file, "utf8");
    };
  }
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY が設定されていません（GitHub の Settings → Secrets and variables → Actions で登録します）");
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 3, timeout: 10 * 60 * 1000 });
  return async ({ kind, system, messages }) => {
    const stream = client.messages.stream({ model: kind === "review" ? REVIEW_MODEL : MODEL, max_tokens: kind === "review" ? 16000 : 32000, system, messages });
    const message = await stream.finalMessage();
    usage.calls++;
    usage.input += message.usage?.input_tokens ?? 0;
    usage.output += message.usage?.output_tokens ?? 0;
    if (message.stop_reason === "max_tokens") throw new Error("Claude の出力が途中で切れました（max_tokens）");
    if (message.stop_reason === "refusal") return `<meta>{"decision":"skip","skipReason":"モデルが回答を控えました"}</meta>`;
    return message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
  };
}

// ───────── 本体 ─────────
async function main() {
  log(`[daily-blog] ${TODAY}（日本時間）  モデル：${MODEL}${DRY_RUN ? "  ※お試し（公開しない）" : ""}`);

  const topicsFile = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  const columns = loadColumns();

  // 1 日 1 本まで
  const todays = columns.find((c) => c.auto && c.date === TODAY);
  if (todays && !FORCE) return finish({ published: false, reason: `今日の分はすでにあります（${todays.slug}）` });

  // サイトの事実（毎回、もとのファイルから作り直す）
  const facts = await buildSiteFacts();
  const factsText = JSON.stringify(facts, null, 2) + "\n";
  const { STATIC_ROUTES } = await loadSite("lib/nav");
  const routes = new Set(STATIC_ROUTES.map((r) => r.path));
  for (const [href] of PAGE_LINKS) if (!routes.has(href.split("#")[0])) throw new Error(`PAGE_LINKS の ${href} は存在しないページです`);
  const photoKeys = new Set(facts.photos.map((p) => p.key));
  for (const key of Object.values(COVER_POOL).flat()) if (!photoKeys.has(key)) throw new Error(`COVER_POOL の ${key} は data/images.ts にありません`);

  const candidates = pickTopics(topicsFile, columns);
  if (candidates.length === 0) return finish({ published: false, reason: "使えるテーマが残っていません（data/blog-topics.json にテーマを足してください）" });

  const recentCovers = columns.slice(0, 3).map((c) => c.cover);
  const baseCheck = {
    existing: columns,
    recentAuto: columns.slice(0, 5),
    amounts: knownAmounts(facts),
    modelCodes: knownModelCodes(facts),
    allowedLinks: new Set(PAGE_LINKS.map(([href]) => href)),
    columnSlugs: new Set(columns.filter((c) => !c.draft && c.date <= TODAY).map((c) => c.slug)),
    photoKeys,
  };

  const call = await createCaller();
  const report = [];
  let accepted;

  // テーマを 1 つずつ試す（多くて MAX_TOPICS_PER_RUN）。1 テーマにつき、書かせて点検し、通らなければ指摘を渡して書き直させる（多くて MAX_ATTEMPTS 回）
  for (const [ti, topic] of candidates.entries()) {
    if (accepted) break;
    log(`[daily-blog] テーマ：${topic.id}（${topic.targetKeyword}）`);
    const coverCandidates = COVER_POOL[topic.category] ?? COVER_POOL.handmade;
    const context = buildContext({ topic, facts, columns, coverCandidates, recentCovers });
    const checkInput = { ...baseCheck, topic };
    const writerMessages = [{ role: "user", content: context }];
    const tag = `t${ti + 1}`;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const lastAttempt = attempt === MAX_ATTEMPTS;
      const raw = await call({ kind: "draft", system: WRITER_SYSTEM, messages: writerMessages });
      saveWork(`${tag}-draft-${attempt}.txt`, raw);
      let draft;
      try {
        draft = parseDraft(raw);
      } catch (error) {
        // 出力の形が崩れていた場合も、やり直させる（エラーで止めない）
        log(`[daily-blog] ${attempt} 回目：出力を読めません（${error.message}）`);
        report.push({ topic: topic.id, attempt, title: "", errors: [`出力の形式を読めませんでした：${error.message}`], warnings: [] });
        writerMessages.push({ role: "assistant", content: raw }, { role: "user", content: `出力の形式を読み取れませんでした（${error.message}）。<meta> の中は 1 行の正しい JSON にして、<meta>…</meta> と <article>…</article> の形だけで、もう一度すべて出力してください。` });
        continue;
      }
      if (draft.meta.decision === "skip") {
        log(`[daily-blog] 書き手が見送りました：${draft.meta.skipReason || "理由なし"}`);
        report.push({ topic: topic.id, attempt, title: "", errors: [`書き手が見送りました：${draft.meta.skipReason || "理由なし"}`], warnings: [] });
        break;
      }

      // 固定ページへのリンクが多すぎるときは、3 本目以降をリンクのない文字に戻す
      draft.body = trimFixedLinks(draft.body, 2);

      // 写真：候補に無い・直近と同じ場合は、候補の中から入れ替える
      if (!coverCandidates.includes(draft.meta.cover) || recentCovers.includes(draft.meta.cover)) {
        draft.meta.cover = coverCandidates.find((k) => !recentCovers.includes(k)) ?? coverCandidates[0];
      }

      const checked = checkArticle({ ...checkInput, meta: draft.meta, body: draft.body });
      log(`[daily-blog] ${attempt} 回目：${checked.stats.chars} 字・大見出し ${checked.stats.h2} 個・リンク 固定 ${checked.stats.links.fixed}／記事 ${checked.stats.links.columns}・機械検査の不合格 ${checked.errors.length} 件`);

      let review;
      if (checked.errors.length === 0) {
        // 校閲。出力の形が崩れて読めなかったときは、1 回だけ校閲をやり直す（それでも読めなければ合格にしない）
        for (let r = 1; r <= 2 && !review; r++) {
          const reviewRaw = await call({
            kind: "review",
            system: REVIEWER_SYSTEM,
            messages: [{ role: "user", content: `${context}\n\n<draft>\nタイトル：${draft.meta.title}\n説明文：${draft.meta.description}\n\n${draft.body}\n</draft>` }],
          });
          saveWork(`${tag}-review-${attempt}${r > 1 ? "-retry" : ""}.txt`, reviewRaw);
          try {
            review = parseReview(reviewRaw);
          } catch (error) {
            log(`[daily-blog] 校閲の出力を読めません（${error.message}）${r === 1 ? "。校閲をやり直します" : ""}`);
            if (r === 2) review = { verdict: "revise", scores: {}, issues: [], summary: `校閲の出力を読めませんでした（${error.message}）` };
          }
        }
        log(`[daily-blog] 校閲：${review.verdict}  ${JSON.stringify(review.scores)}  指摘 ${review.issues.length} 件（${review.issues.map((i) => i.type).join("・") || "なし"}）`);
      }

      report.push({ topic: topic.id, attempt, title: draft.meta.title, errors: checked.errors, warnings: checked.warnings, review });

      if (checked.errors.length === 0 && review && reviewPasses(review, { lastAttempt })) {
        accepted = { ...draft, topic, review, stats: checked.stats };
        break;
      }
      if (review?.verdict === "reject") break;
      if (lastAttempt) break;

      // 書き直しの指示（機械的な検査の不合格と、校閲の指摘をそのまま渡す）
      const fixes = [
        ...checked.errors.map((e) => `- ${e}`),
        ...(review?.issues ?? []).map((i) => `- （${i.type}）${i.quote ? `「${i.quote}」→ ` : ""}${i.fix ?? ""}`),
        ...(review && checked.errors.length === 0 && review.issues.length === 0 ? [`- 校閲の評価が基準に届いていません（${JSON.stringify(review.scores)}）。${review.summary ?? ""}`] : []),
      ];
      writerMessages.push({ role: "assistant", content: raw }, { role: "user", content: `公開前の点検で、次の指摘がありました。すべて直した完全な記事を、同じ形式（<meta> と <article>）でもう一度出力してください。指摘されていない部分も、同じ問題がないか見直してください。事実の一覧で裏づけられない文は、言い換えるのではなく削ってください。直せない場合は decision を "skip" にしてください。\n\n${fixes.join("\n")}` });
    }
  }

  const detail = report
    .map((r) => {
      const lines = [`### ${r.topic}・${r.attempt} 回目：${r.title ?? ""}`];
      if (r.errors.length) lines.push("機械的な検査の不合格", ...r.errors.map((e) => `- ${e}`));
      if (r.review) lines.push(`校閲：**${r.review.verdict}** ${JSON.stringify(r.review.scores)} ${r.review.summary ?? ""}`, ...r.review.issues.map((i) => `- （${i.type}）${i.quote ?? ""} → ${i.fix ?? ""}`));
      return lines.join("\n");
    })
    .join("\n\n");

  if (!accepted) return finish({ published: false, reason: "品質の基準を満たす記事になりませんでした", detail: `試したテーマ：${candidates.map((t) => `\`${t.id}\``).join("、")}（明日は別のテーマから試します）\n\n${detail}` });
  const topic = accepted.topic;

  // ───────── 書き出し ─────────
  const data = {
    title: accepted.meta.title.trim(),
    description: accepted.meta.description.trim(),
    date: TODAY,
    category: topic.category,
    type: topic.category === "textile-town" ? "local" : "guide",
    tags: accepted.meta.tags.map((t) => String(t).trim()).filter(Boolean),
    keyword: topic.targetKeyword,
    parent: topic.parentPage,
    topic: topic.id,
    auto: true,
    cover: accepted.meta.cover,
    ...(CTA_LABEL[topic.parentPage] ? { cta: { href: topic.parentPage, label: CTA_LABEL[topic.parentPage] } } : {}),
    ...(AS_DRAFT ? { draft: true } : {}),
  };
  const file = matter.stringify(`\n${accepted.body}\n`, data, { lineWidth: -1 });
  saveWork("accepted.md", file);

  if (!DRY_RUN) {
    fs.writeFileSync(path.join(COLUMN_DIR, `${topic.id}.md`), file);
    const t = topicsFile.topics.find((x) => x.id === topic.id);
    t.used = true;
    t.usedOn = TODAY;
    // 手で書いた記事などで、すでに使われているテーマも使用済みにそろえる
    for (const x of topicsFile.topics) if (!x.used && columns.some((c) => c.topic === x.id || c.slug === x.id)) x.used = true;
    fs.writeFileSync(TOPICS_FILE, JSON.stringify(topicsFile, null, 2) + "\n");
    const prevFacts = fs.existsSync(FACTS_FILE) ? fs.readFileSync(FACTS_FILE, "utf8").replace(/\r\n/g, "\n") : "";
    if (prevFacts !== factsText) fs.writeFileSync(FACTS_FILE, factsText);
  }

  finish({
    published: true,
    slug: topic.id,
    title: data.title,
    detail: `- テーマ：\`${topic.id}\`（${topic.targetKeyword}）\n- 本文：${accepted.stats.chars.toLocaleString()} 字、大見出し ${accepted.stats.h2} 個、リンク 固定ページ ${accepted.stats.links.fixed} 本・記事 ${accepted.stats.links.columns} 本\n- 既存の記事との文章の重なり：最大 ${Math.round(accepted.stats.maxOverlap.value * 100)}％（${accepted.stats.maxOverlap.slug || "なし"}）\n- 校閲：${JSON.stringify(accepted.review.scores)} ${accepted.review.summary ?? ""}\n\n${detail}`,
  });
}

main().catch((error) => {
  // API のエラー（認証・残高・混雑など）や設定の誤り。記事は書かれていないので、サイトには影響しない
  const status = error?.status ? `（HTTP ${error.status}）` : "";
  finish({ published: false, reason: `${error?.message ?? error}${status}`, exitCode: 1 });
});
