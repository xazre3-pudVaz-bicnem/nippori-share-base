# Nippori Share Base 公式サイト

日暮里繊維街・齊藤商店 2F のものづくりシェアスペース「Nippori Share Base」の公式サイトです。
Canva で作られていた 1 ページ構成のサイト（https://nipporisharebase.my.canva.site/）のデザインと世界観を引き継ぎ、
検索から見つけてもらえる複数ページのサイトとして作り直しました。

Next.js 16（App Router）/ TypeScript / Tailwind CSS v4。全ページ静的生成です。

---

## 🚨 公開前に必ずやること

### 1. 本番 URL を環境変数に設定する

```
NEXT_PUBLIC_SITE_URL=https://（本番のドメイン）
```

**これを設定するまで、全ページが `noindex` になり、canonical・OG の URL・sitemap は出力されません**
（プレビュー URL が検索結果に出るのを防ぐための安全装置です）。

- Vercel の場合：Settings → Environment Variables で **Production だけ** に設定する（Preview には入れない）
- `*.vercel.app` のホストには、設定に関係なく常に `X-Robots-Tag: noindex` が付きます（`next.config.ts`）

### 2. 公開直後に 3 か所を確認する

| 確認する URL | 正しい状態 |
| --- | --- |
| `/robots.txt` | `Allow: /` と `Sitemap:` の行がある |
| `/sitemap.xml` | ページの URL が並んでいる（空ではない） |
| トップページのソース | `<link rel="canonical" href="https://本番ドメイン">` があり、`noindex` が無い |

### 3. 内容の確認をお願いしたい点

`docs/VERIFIED_FACTS.md` の「確認できていないこと」「食い違っている点」をご覧ください。
とくに、ミシンの型番（TL-30DX か TL-30SP か）と、イベント利用規約のキャンセル規定（2 通りの記載）は、
公開前にご確認をお願いします。

### 4. 公開後にやると効果が大きいこと

- Google Search Console に登録し、`/sitemap.xml` を送信する（所有権確認コードは `GOOGLE_SITE_VERIFICATION` に設定できます）
- Google ビジネスプロフィールを登録・更新する。**名称・住所・電話番号はサイトと一字一句そろえる**（`lib/site.ts` の表記）
- Instagram のプロフィールリンクと、Canva サイトからのリンクを新しい URL に張り替える

---

## 動かし方

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 本番ビルド
npm run start      # ビルドしたものを起動
npm run lint
npm run typecheck
```

## ページ構成

| URL | 内容 | 主に狙う検索語 |
| --- | --- | --- |
| `/` | トップ | 日暮里 レンタルスペース／レンタルルーム／ミシン／ものづくり |
| `/space` | レンタルスペース | 日暮里 レンタルスペース・貸しスペース・作業スペース、荒川区・東日暮里 レンタルスペース |
| `/sewing-machine` | ミシン（4 種類と機種一覧） | 日暮里 ミシン／レンタルミシン／ミシン レンタル、日暮里繊維街 ミシン、荒川区 ミシン |
| `/handmade` | ハンドメイド・洋裁 | 日暮里 ハンドメイド／洋裁／ソーイング／手芸／制作スペース／アトリエ |
| `/workshop` | ワークショップ・イベント | 日暮里 ワークショップ／イベントスペース／展示会／販売会、荒川区 ワークショップ |
| `/equipment` | 設備・道具 | 設備名 × 日暮里 |
| `/price` | 料金表 | 日暮里 ミシン 料金 など |
| `/reserve` | 予約（空き状況カレンダー＋申込フォーム） | 指名検索 |
| `/first-time` | 初めての方へ | 日暮里 ミシン 初心者 など |
| `/access` | アクセス | 指名検索＋地域名 |
| `/faq` | よくある質問（FAQPage 構造化データ） | ロングテール |
| `/chums-sewing-club` | 月額会員 | 指名検索 |
| `/column`、`/column/[slug]`、`/column/category/[category]` | コラム | 情報収集系の検索語 |
| `/terms`、`/terms/event` | 利用規約・イベント利用規約 | — |

「予約する」ボタンはすべて `/reserve` に集め、そこから現在と同じ Google フォーム・Google カレンダーを使います。

## よくある更新

| やりたいこと | 直すファイル |
| --- | --- |
| 住所・電話・メール・予約フォームの URL | `lib/site.ts`（ここだけ。全ページと構造化データに反映されます） |
| 料金・会員特典・キャンセル料 | `data/pricing.ts`（`PRICE_AS_OF` の日付も更新） |
| ミシンの機種の追加・入れ替え | `data/machines.ts` |
| 設備の追加 | `data/equipment.ts` |
| よくある質問 | `data/faqs.ts`（`/faq` と構造化データに自動反映） |
| 規約の改定 | `data/terms.ts` |
| コラムを書く | `content/column/` に `.md` を 1 つ置く → 書き方は `content/column/README.md` |
| メニューの項目 | `lib/nav.ts` |

### 写真を差し替える・足す

1. 原本を `photos-original/line-album/` に入れる
2. `scripts/prepare-images.mjs` の対応表（`JOBS`）に 1 行足す
3. `npm run images:prepare` を実行する（`public/images/` に書き出されます）
4. `data/images.ts` に写真の名前と alt（写っているものの説明）を足す

原本の写真は `photos-original/` に保管しています（サイトでは配信されません）。
`from-current-site/` は、現在の公式サイトに掲載されている写真（利用風景 3 枚と、文字の入っていないミシン写真）です。

### SNS 共有用の画像（OG 画像）を作り直す

`public/og/*.jpg`。`scripts/make-og.mjs` の冒頭に手順があります。

## 設計メモ

### 事実だけを書くための仕組み

- 店舗情報・料金・機種・設備・FAQ・規約は、それぞれ 1 つのファイル（`lib/site.ts`、`data/*.ts`）にまとめ、
  ページ側には直接書いていません。表記のずれ（NAP の不一致）が起きないようにするためです
- 確認できた事実と出典は `docs/VERIFIED_FACTS.md` に記録しています。営業日・駅からの分数・駐車場・設備の台数など、
  確認できていないことはサイトのどこにも書いていません
- 架空の口コミ・利用者の声・「No.1」表現はありません

### SEO

- 全ページに title / description / canonical / OGP / Twitter Card（`lib/seo.ts` の `buildMetadata`）
- 構造化データ：`Organization`・`LocalBusiness`・`WebSite`（全ページ）、`BreadcrumbList`（下層全ページ）、
  `FAQPage`（`/faq` のみ。同じ Q&A を複数ページでマークアップしない）、`Article`（コラム）、`ItemList`（ミシン・設備）
- `sitemap.xml`・`robots.txt` は自動生成
- h1 は各ページ 1 つ。トップは「日暮里のものづくりレンタルスペース」＋ロゴタイトルを 1 つの h1 にしています
- 固定ページは「日暮里で◯◯できる場所を探す人」、コラムは「◯◯について知りたい人」と役割を分け、
  同じ検索語を取り合わないようにしています（`docs/column-backlog.md`）

### デザイン

現在の公式サイトから引き継いだもの：黄色 `#FEE65C`・クリーム `#FFF5BD`・濃い黄 `#FFD230`・墨色 `#231F20` の配色、
ロゴタイトルの書体（Train One）、「What about」の等幅書体、丸ゴシックの見出し、花形に切り抜いたミシン写真、
ピル型のボタン、破線（並縫い）の見出し、黄色と白が交互に続く帯。

### 表示速度

- 本文は端末標準のゴシック。欧文の 2 書体だけを小さなファイルで配信し、日本語の丸ゴシック（Zen Maru Gothic）は
  PC 幅のときだけ、最初の描画のあとで読み込みます（`app/layout.tsx`）
- 写真は `next/image` で AVIF/WebP に変換・遅延読み込み。画面外の区画は `content-visibility` で描画を後回しにしています
- 計測値（Lighthouse 12、ローカル、各 3〜5 回の中央値）
  - スマホ：Performance 93〜96 ／ Accessibility 100 ／ Best Practices 100 ／ SEO 100、CLS 0
  - PC：4 項目すべて 100

## ディレクトリ

```
app/                  ページ（App Router）
components/layout/    Header・Footer・メニュー
components/sections/  ページを組み立てるセクション
components/ui/        汎用部品（写真枠・見出し・パンくず・アイコン）
content/column/       コラムの Markdown
data/                 料金・機種・設備・FAQ・規約・写真の一覧
lib/                  店舗情報・SEO・構造化データ・ナビ・コラムの読み込み
docs/                 確認済みの事実、コラムの候補
photos-original/      写真の原本（配信されない）
public/               配信する画像・フォント・OG 画像
scripts/              画像・フォント・OG 画像の生成
```
