# Nippori Share Base 公式サイト — プロジェクトルール

ルート（`c:\projects\CLAUDE.md`）のマスタールールに加えて、このプロジェクトでは次を守る。

## いちばん大事なこと

1. **既存ブランドを壊さない。** 現在の Canva サイト（https://nipporisharebase.my.canva.site/）の配色・書体・写真の見せ方・
   手づくり感を引き継ぐ。「AI が作った SEO サイト」に見える無機質なデザイン、テンプレート風の装飾は入れない
2. **確認できた事実だけを書く。** 出典は `docs/VERIFIED_FACTS.md`。営業日・駅からの分数・駐車場・設備の台数・
   レーザー加工機の仕様などは未確認なので書かない。分からないことは「お問い合わせください」と案内する
3. **「洋裁教室」と位置づけない。** 先生から習う場所ではなく、道具・場所・人とのつながりで「やってみたい」を形にする
   シェアスペース。一般的な会議室・パーティールームとも違う
4. 架空の口コミ・利用者の声・料金・サービス、「地域No.1」のような根拠のない表現は禁止
5. キーワードを不自然に並べない。「日暮里」を無意味に繰り返さない

## 単一ソース（ページに直接書かない）

| 情報 | ファイル |
| --- | --- |
| 名称・住所・電話・メール・予約 URL・予約枠 | `lib/site.ts` |
| 料金・会員・キャンセル料 | `data/pricing.ts` |
| ミシンの種類と機種 | `data/machines.ts` |
| 設備 | `data/equipment.ts` |
| FAQ | `data/faqs.ts` |
| 規約 | `data/terms.ts`（公式サイトの原文。要約・加筆しない） |
| 写真と alt | `data/images.ts` |

NAP 表記は「Nippori Share Base／東京都荒川区東日暮里4-33-3 齊藤商店2F／03-3803-4007」で統一。

## 実装上の決まり

- 「予約する」は `/reserve` へ。主 CTA だが、営業色を強くしない（1 画面に何個も置かない）
- FAQPage の構造化データは `/faq` だけ。他ページは `pickFaqs()` で表示のみ
- 回答・本文はアコーディオンで隠さない
- `NEXT_PUBLIC_SITE_URL` が無いと全ページ noindex（`lib/seo.ts`）。NODE_ENV で本番判定しない
- 日本語の Web フォントはスマホで読み込まない（`app/layout.tsx`）。Train One は英数字だけ収録しているので日本語に当てない
- globals.css のカスタムクラスは `@layer components` の中に書く
- `[data-reveal]` の表示演出は IntersectionObserver だけで判定する。`getBoundingClientRect` を全要素に呼ぶと
  `.cv`（content-visibility）の区画が一度に描画されて TBT が 4 倍になる（実測）
- JSX 内の日本語の段落は 1 行で書く（改行すると半角スペースが入る）
- コラムは固定ページと検索語を取り合わない（`docs/column-backlog.md`）

## 検証

`npm run lint && npm run typecheck && npm run build` のあと、スマホ幅（320 / 360 / 390）で横はみ出しがないこと、
`NEXT_PUBLIC_SITE_URL` 未設定で `robots.txt` が `Disallow: /` になることを確認する。
