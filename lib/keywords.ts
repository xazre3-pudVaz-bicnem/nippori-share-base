/**
 * ページごとの「担当する検索意図」（単一ソース）。
 *
 * 同じ言葉を複数のページで取り合わないよう、どのページがどの検索語を受け持つかをここで決める。
 * - 各ページの metadata（keywords）は、ここから取る（pageKeywords()）
 * - コラムの自動生成（scripts/generate-daily-blog.mjs）も、ここを見て固定ページと同じ言葉を狙わないようにする
 * - README の「ページと、担当する検索意図」の表は、この内容を人が読める形にしたもの
 *
 * 決めごと
 * - 「日暮里 ＋ ◯◯」で場所を探す言葉（来店目的）は、固定ページが受け持つ
 * - コラムは「知りたい・調べたい」に答える言葉を受け持ち、最後に固定ページへ案内する
 * - 「日暮里 ＋ ミシンの種類」は /sewing-machine、メーカー名・機種名は /equipment
 *
 * meta keywords そのものは検索順位に使われない。ここは「担当の表」として保つことに意味がある。
 */
export type PageKeywords = {
  /** このページの役割（誰の、どんな探し方に答えるか） */
  role: string;
  primary: readonly string[];
  secondary: readonly string[];
};

export const PAGE_KEYWORDS = {
  "/": {
    role: "ブランドを伝え、目的別のページへ送る広い入口",
    primary: ["日暮里 レンタルスペース"],
    // 最後の 1 語は、SEO 担当の指定（2026-10-05）で「日暮里繊維街 レンタルスペース」
    secondary: ["日暮里 シェアスペース", "日暮里 ものづくり", "東日暮里 レンタルスペース", "荒川区 レンタルスペース", "日暮里繊維街 レンタルスペース"],
  },
  "/space": {
    role: "会議室ではなく、ものづくりに使えるスペースを探す人へ",
    primary: ["日暮里 レンタルスペース", "日暮里 レンタルルーム"],
    secondary: ["日暮里 貸しスペース", "日暮里 作業スペース", "日暮里 アトリエ", "荒川区 レンタルスペース"],
  },
  "/sewing-machine": {
    role: "日暮里でミシンが使える場所を探す人へ（スペース内で使う。持ち帰りではない）",
    primary: ["日暮里 ミシン", "日暮里 レンタルミシン"],
    secondary: [
      "日暮里 ミシン レンタル",
      "日暮里 ミシン 使える場所",
      "日暮里 ミシン 作業スペース",
      "日暮里 繊維街 ミシン",
      "日暮里 職業用ミシン",
      "日暮里 ロックミシン",
      "日暮里 カバーステッチミシン",
      "日暮里繊維街 ミシンレンタル",
      "荒川区 ミシン",
    ],
  },
  "/handmade": {
    role: "何を、どんなふうに作る場所かを知りたい人へ",
    primary: ["日暮里 ハンドメイド", "日暮里 洋裁"],
    secondary: ["日暮里 ソーイング", "日暮里 手芸", "日暮里 洋裁スペース", "日暮里 ハンドメイドスペース", "日暮里 制作スペース"],
  },
  "/workshop": {
    role: "会をひらきたい主催者へ",
    primary: ["日暮里 ワークショップ"],
    secondary: ["日暮里 ワークショップ スペース", "日暮里 イベントスペース", "荒川区 ワークショップ", "日暮里 展示会", "日暮里 販売会", "日暮里 ポップアップ"],
  },
  "/equipment": {
    role: "機種名・設備名で調べる人へ（機種ごとの説明はここだけ）",
    primary: ["日暮里 ミシン 設備", "日暮里 洋裁 設備"],
    secondary: ["JUKI SL-3700", "JANOME haute couture ecru 2000", "baby lock ロックミシン", "baby lock カバーステッチミシン", "日暮里 レーザー加工機", "日暮里 カッティングマシーン"],
  },
  "/access": {
    role: "場所と行き方（店舗そのものを探す人へ）",
    primary: ["Nippori Share Base アクセス"],
    secondary: ["日暮里繊維街 齊藤商店", "日暮里駅 徒歩", "東日暮里", "荒川区 東日暮里"],
  },
} as const satisfies Record<string, PageKeywords>;

export type KeywordPage = keyof typeof PAGE_KEYWORDS;

/** metadata の keywords 用（primary → secondary の順） */
export function pageKeywords(path: KeywordPage): string[] {
  const k = PAGE_KEYWORDS[path];
  return [...k.primary, ...k.secondary];
}
