# Nippori Share Base 公式サイト — プロジェクトルール

ルート（`c:\projects\CLAUDE.md`）のマスタールールに加えて、このプロジェクトでは次を守る。
本番は https://www.nipporisharebase.com（GitHub `main` → Vercel）。

## いちばん大事なこと

1. **既存ブランドを壊さない。** 旧 Canva サイト（https://nipporisharebase.my.canva.site/）の配色・書体・写真の見せ方・
   手づくり感を引き継ぐ。目指すのは「SEO 会社が作ったレンタルスペースサイト」ではなく、
   「日暮里のものづくりコミュニティが運営している、実在感のあるサイト」
2. **確認できた事実だけを書く。** 出典は `docs/VERIFIED_FACTS.md`。営業日・駅からの分数・駐車場・設備の台数・
   運営メンバーの名前や経歴・レーザー加工機の仕様などは未確認なので書かない。分からないことは「お問い合わせください」と案内する
3. **「洋裁教室」と位置づけない。** 先生から習う場所ではなく、道具・場所・人とのつながりで「やってみたい」を形にする
   シェアスペース。一般的な会議室・パーティールームとも違う
4. 架空の口コミ・利用者の声・実績・料金・サービス、「地域No.1」のような根拠のない表現は禁止
5. キーワードを不自然に並べない。「日暮里」を無意味に繰り返さない
6. **正しく動いているものを作り直さない。** 必要な箇所だけ直す

## ページの役割（同じ検索語を取り合わない）

README の「ページと、担当する検索意図」の表が正。要点：

- `/` は広い入口。くわしい説明は各ページに任せ、トップで繰り返さない
- `/sewing-machine`＝日暮里でミシンが使える場所。「レンタルミシン」は**スペース内で使う**意味で、持ち帰りではないと冒頭に書く
- 機種ごとの説明は `/equipment`。`/sewing-machine` は機種名からリンクするだけ
- `/handmade` はミシンの種類を説明しない。`/space` は洋裁の進め方を説明しない
- コラムは「知りたい」に答える。来店目的の検索語は固定ページの担当（`docs/column-backlog.md`）

## 単一ソース（ページに直接書かない）

| 情報 | ファイル |
| --- | --- |
| 名称・住所・電話・メール・予約 URL・予約枠・メディア掲載・CTA の文言 | `lib/site.ts` |
| 本番 URL | `next.config.ts` の `PRODUCTION_URL`（ページでは `absoluteUrl()` を使う） |
| 料金・会員・キャンセル料 | `data/pricing.ts`（税抜で持ち、表示は税込が主。文章中は `priceText()` / `planPriceText()`） |
| ミシンの種類と機種 | `data/machines.ts` |
| 設備 | `data/equipment.ts` |
| FAQ | `data/faqs.ts` |
| 規約 | `data/terms.ts`（公式の原文。要約・加筆しない） |
| 写真と alt | `data/images.ts`（alt は写っているものだけ。検索語を入れない） |

NAP 表記は「Nippori Share Base／〒116-0014 東京都荒川区東日暮里4-33-3 齊藤商店2F／03-3803-4007（齊藤商店）」で統一。

## 実装上の決まり

- 予約導線は 2 種類。一般＝「空き状況を見て予約する」（`/reserve`）、貸切＝「貸切利用を相談する」（`/reserve#private`）。
  `ReserveCta` の `variant` をページの内容で選ぶ。全ページに同じものを機械的に出さない
- 料金は税込を主に表示する。税抜だけを大きく出さない。金額の数字をページに直接書かない
- コラムの `date` は実際の公開日、`updated` は実際に直した日。検索のために日付を変えない
- FAQPage の構造化データは `/faq` だけ。他ページは `pickFaqs()` で表示のみ。Review / AggregateRating / openingHours は出さない
- 回答・本文はアコーディオンで隠さない
- 枠と影で囲むカードを増やさない。区切りは破線（`.rows`）・余白・写真で。絵文字とアイコンの多用は禁止
- 同じ写真を何ページにも使い回さない（ページごとに、目的に合う写真を選ぶ）
- 本番 URL が無いビルド（プレビュー・ローカル）は全ページ noindex。NODE_ENV で本番判定しない
- 日本語の Web フォントはスマホで読み込まない（`app/layout.tsx`）。Train One は英数字だけ収録しているので日本語に当てない
- globals.css のカスタムクラスは `@layer components` の中に書く
- `[data-reveal]` の表示演出は IntersectionObserver だけで判定する。`getBoundingClientRect` を全要素に呼ぶと
  `.cv`（content-visibility）の区画が一度に描画されて TBT が 4 倍になる（実測）
- `.pinked`（下端のギザギザ）を付けた区画には `.cv` を付けない（はみ出した部分が切れる）
- JSX 内の日本語の段落は 1 行で書く（改行すると半角スペースが入る）

## 検証

`npm run lint && npm run typecheck && npm run build` のあと、スマホ幅（320 / 375 / 390）で横はみ出しがないこと、
本番 URL なしのビルドで `robots.txt` が `Disallow: /`、`VERCEL_ENV=production` のビルドで canonical が
`https://www.nipporisharebase.com` になることを確認する。
