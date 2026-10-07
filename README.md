# Nippori Share Base 公式サイト

日暮里繊維街・齊藤商店 2F のものづくりシェアスペース「Nippori Share Base」の公式サイトです。

- 本番 URL：https://www.nipporisharebase.com
- 旧サイト（Canva）：https://nipporisharebase.my.canva.site/ … デザインと世界観の元
- Next.js 16（App Router）/ TypeScript / Tailwind CSS v4。全ページ静的生成。GitHub の `main` へ push すると Vercel が公開します

---

## 🚨 公開のしくみ（検索エンジンへの出し方）

本番 URL は **`next.config.ts` の `PRODUCTION_URL` の 1 か所**で決まります。canonical・sitemap・OG・構造化データは、すべてこの値を使います。

| どこで動いているか | 本番 URL | 検索エンジンへの出し方 |
| --- | --- | --- |
| Vercel の本番デプロイ（`main`） | `https://www.nipporisharebase.com` | index。canonical・sitemap あり |
| Vercel のプレビュー、ローカル | なし | 全ページ noindex、sitemap は空、robots は Disallow |
| `*.vercel.app` のホスト | — | 常に `X-Robots-Tag: noindex`（本番と同じ内容でも、検索には出さない） |

ドメインを変えるときは `PRODUCTION_URL` を直すか、環境変数 `NEXT_PUBLIC_SITE_URL` を Production 環境に設定します。

### デプロイのたびに見る 3 か所

| 確認する URL | 正しい状態 |
| --- | --- |
| https://www.nipporisharebase.com/robots.txt | `Allow: /` と `Sitemap:` の行がある |
| https://www.nipporisharebase.com/sitemap.xml | ページの URL が並んでいる（空ではない） |
| トップページのソース | `<link rel="canonical" href="https://www.nipporisharebase.com">` があり、`noindex` が無い |

### 環境変数（Vercel → Settings → Environment Variables）

| 名前 | 必須 | 内容 |
| --- | --- | --- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | 任意 | Search Console の所有権確認（HTML タグ方式）の `content` の値。入れると `<meta name="google-site-verification">` が出ます。空ならタグは出ません。設定後は再デプロイ |
| `NEXT_PUBLIC_GA_ID` | 任意 | Google アナリティクス（GA4）の測定 ID（`G-XXXXXXXXXX`）。Production 環境にだけ設定します。入れると本番でだけ計測タグが読み込まれます（プレビュー・ローカルでは読み込みません）。設定後は再デプロイ |
| `NEXT_PUBLIC_SITE_URL` | 不要 | 本番 URL を一時的に上書きしたいときだけ。Production 環境にのみ設定 |

### アクセス解析（GA4）を入れる

1. Google アナリティクスで GA4 のプロパティを作り、ウェブのデータストリームに `https://www.nipporisharebase.com` を登録する
2. 表示された測定 ID（`G-` で始まる）を、Vercel の Environment Variables に `NEXT_PUBLIC_GA_ID` として **Production にだけ**設定する
3. 再デプロイする（環境変数はビルド時に読み込まれるため）。GA4 の「リアルタイム」に自分のアクセスが出れば完了

計測は設定した日からしか始まりません。ページの移動と、予約フォーム（Google フォーム）へのクリックは、GA4 の拡張計測機能が自動で記録します
（`components/layout/Analytics.tsx`）。

### 公開後にやると効果が大きいこと

- Search Console に `https://www.nipporisharebase.com` を登録し、`/sitemap.xml` を送信する
- Google ビジネスプロフィールを登録・更新する。**名称・住所・電話番号はサイトと一字一句そろえる**（`lib/site.ts`）。
  登録できたら「共有 → 地図を埋め込む」の URL を `lib/site.ts` の `mapEmbedUrl` に入れると、地図のピンが店名つきになります
- Instagram のプロフィール、旧 Canva サイト、荒川102 の記事内リンクを新しい URL に張り替えてもらう
- Vercel の Domains で `nippori-share-base.vercel.app` を本番ドメインへ転送する設定にする（任意）

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

ローカルで本番と同じ出力（index・canonical あり）を確かめたいときは `VERCEL_ENV=production npm run build`。

## ページと、担当する検索意図

同じ言葉を複数のページで取り合わないよう、ページごとに役割を分けています。文章を足すときも、この分担を守ってください。

| URL | 役割 | 主に担当する検索語 |
| --- | --- | --- |
| `/` | ブランドを伝え、目的別のページへ送る | 日暮里 レンタルスペース／ものづくり／シェアスペース、日暮里繊維街 レンタルスペース |
| `/space` | 「会議室ではなく、ものづくりに使える場所」 | 日暮里 レンタルスペース／レンタルルーム／貸しスペース／作業スペース、荒川区 レンタルスペース |
| `/sewing-machine` | 日暮里でミシンが使える場所（スペース内で使う） | 日暮里 ミシン／レンタルミシン／ミシン レンタル／ミシン 使える場所、日暮里繊維街 ミシンレンタル、荒川区 ミシン |
| `/handmade` | 何を、どんなふうに作る場所か | 日暮里 洋裁／ハンドメイド／制作スペース／ソーイング／アトリエ／手芸 |
| `/workshop` | 会をひらきたい主催者向け | 日暮里 ワークショップ／イベントスペース／展示会／販売会、荒川区 ワークショップ |
| `/equipment` | 機種名・設備名の一覧と説明 | 日暮里 ミシン 設備／洋裁 設備、機種名 |
| `/access` | 場所と行き方 | Nippori Share Base アクセス（＋日暮里・東日暮里・荒川区・日暮里繊維街・齊藤商店） |
| `/about` | 誰が、なぜ運営しているか。スタッフ紹介 | Nippori Share Base（指名検索） |
| `/price` `/reserve` `/first-time` `/faq` `/chums-sewing-club` | ご利用案内 | 指名検索、ロングテール |
| `/column` ほか | できごと・地域のこと・読みもの | 情報収集の検索語 |
| `/terms` `/terms/event` | 規約 | — |

- 「レンタルミシン」は、**スペース内で使う**という意味で使っています。持ち帰りの貸し出しではないことを、`/sewing-machine` の冒頭と FAQ に明記しています
- 機種ごとの説明は `/equipment` にあり、`/sewing-machine` は機種名の一覧からリンクするだけです
- 記事が 3 本未満のコラムのカテゴリ一覧は `noindex`（記事が増えると自動で解除）

## 予約の導線

目的が 2 つあるので、ページの内容に合わせて出し分けています（`components/sections/ReserveCta.tsx` の `variant`）。

| 目的 | 文言 | 行き先 | 主に出すページ |
| --- | --- | --- | --- |
| 自分でミシン・スペースを使う | 空き状況を見て予約する | `/reserve` | トップ、ミシン、洋裁・ハンドメイド、初めての方へ |
| ワークショップ・展示会などで貸切する | 貸切利用を相談する | `/reserve#private` | ワークショップ、ワークショップ系のコラム |
| 両方 | 2 つ並べる | — | スペース、料金、FAQ、私たちについて |

スマホでは、少しスクロールすると画面右下に小さなボタンが出ます（`components/layout/MobileCta.tsx`）。
最初の画面と、ページ下部の予約セクション・フッターでは隠れます。

## よくある更新

| やりたいこと | 直すファイル |
| --- | --- |
| 住所・電話・メール・予約フォームの URL・メディア掲載 | `lib/site.ts`（ここだけ。全ページと構造化データに反映されます） |
| 料金・会員特典・キャンセル料 | `data/pricing.ts`（税抜の金額を書くと、税込は自動で計算されます。`PRICE_AS_OF` も更新） |
| ミシンの機種の追加・入れ替え | `data/machines.ts` |
| 設備の追加 | `data/equipment.ts` |
| よくある質問 | `data/faqs.ts`（`/faq` と構造化データに自動反映） |
| 規約の改定 | `data/terms.ts` |
| コラム・お知らせを書く | `content/column/` に `.md` を 1 つ置く → 書き方は `content/column/README.md` |
| メニューの項目 | `lib/nav.ts`（ヘッダーの分け方：スペース／ミシン・設備／楽しみ方／料金／アクセス／ご案内） |
| スタッフ紹介 | `data/staff.ts`（ご本人の自己紹介からの抜粋。言い回しを書き換えない） |
| 最寄り駅・バス・駐車場・お支払い方法・お休み | `lib/site.ts` |
| メンターサポート、レーザー加工・カッティングマシーンの料金 | `data/pricing.ts`（`MENTOR`・`LASER`・`CUTTING_MACHINE`） |

### 料金の表示

旧サイトの料金表は税抜で書かれているため、`data/pricing.ts` には税抜の金額を持ち、画面には **1 行目に「税込 2,200円」、2 行目に税抜を小さく**表示しています
（標準税率 10％）。利用規約に税込で書かれているもの（Ito Share、ミシンガード、針交換）は、その金額のままです。
レーザー加工の料金は、税込・税抜の別を確認できていないため「円」だけで表示しています（確認できたら `LASER.taxConfirmed` を直す）。

### 写真を差し替える・足す

1. 原本を `photos-original/line-album/` に入れる（`public/` の直下に `LINE_ALBUM_*.jpg` を置いた場合は、スクリプトが自動で移します）
2. `scripts/prepare-images.mjs` の対応表（`JOBS`）に 1 行足す
3. `npm run images:prepare` を実行する（`public/images/` に書き出されます。暗い写真は、ほかの写真にそろうよう自動で明るさを持ち上げます）
4. `data/images.ts` に写真の名前と alt（写っているものの説明。検索語は入れない）を足す

原本の写真は `photos-original/` に保管しています（サイトでは配信されません）。
`from-current-site/` は旧サイトに掲載されていた写真、`staff/` はスタッフの自己紹介カードです。

**旧サイトの利用風景 3 枚（ミシン・編み会・レーザーのワークショップ）は AI で生成された画像だったため、サイトでは使っていません。**
サイトの写真は、すべて実際の Nippori Share Base で撮ったものです。この方針は変えないでください（生成画像を「利用風景」として載せない）。

いまある写真は、スペース・設備・外観が中心です。作品の写真、イベント当日の写真、ミシンを使っている手元の写真が増えると、
ページごとに違う写真を使えて、サイトの実在感がさらに上がります。

### SNS 共有用の画像（OG 画像）を作り直す

`public/og/*.jpg`。`scripts/make-og.mjs` の冒頭に手順があります。

## 設計メモ

### 事実だけを書くための仕組み

- 店舗情報・料金・機種・設備・FAQ・規約は、それぞれ 1 つのファイルにまとめ、ページ側には直接書いていません（NAP の表記ゆれを防ぐため）
- 確認できた事実と出典は `docs/VERIFIED_FACTS.md` に記録しています。設備の台数・面積・定員など、
  確認できていないことはサイトのどこにも書いていません
- 架空の口コミ・利用者の声・実績・「No.1」表現はありません。第三者の記事（荒川102）に基づく内容には出典を添えています

### 構造化データ

`Organization`・`LocalBusiness`・`WebSite`（全ページ）、`BreadcrumbList`（下層全ページ）、`FAQPage`（`/faq` のみ。画面に出している Q&A だけ）、
`Article`（コラム。公開日・更新日は記事ファイルの値）、`AboutPage`（`/about`）、`ItemList`（`/equipment`）。
`Review`・`AggregateRating`・`openingHours` は出していません（実在するレビューが無く、営業日は予約カレンダーに依存するため）。

### デザイン

旧サイトから引き継いだもの：黄色 `#FEE65C`・クリーム `#FFF5BD`・濃い黄 `#FFD230`・墨色 `#231F20`、ロゴタイトルの書体（Train One）、
「What about」の等幅書体、丸ゴシックの見出し、花形に切り抜いたミシン写真、ピル型のボタン、破線（並縫い）の見出し。

「説明 → カード → 説明 → カード」の繰り返しにならないよう、枠と影で囲むカードは最小限にし、破線・余白・写真で区切っています。
黄色い帯の下端はピンキングばさみで切った布の形（`.pinked`）、写真の後ろには布見本のような色の面（`.swatch`）。

2026-10 の見直しで決めたこと（`app/globals.css` にコメントがあります）：

- **破線の一覧（`.rows`）**：線は項目の下にだけ引く。見出しのすぐ下に来る 1 件目の上には引かない。見出しと一覧のあいだにリード文があるときだけ `.rows-top` を足す
- **ボタン**：乗せたときは色を反転させる（黒 ⇄ 白、黄・クリーム → 黒）。少し浮く動きはそのまま
- **下層ページの冒頭（`PageHero`）**：写真は黄色い帯の中に収める。下へはみ出させない
- **ページ内リンクの着地位置**：`html` の `scroll-padding-top`（ヘッダーの高さ）だけで決める。区画に `scroll-mt-*` を重ねない
- **改行**：見出しとリード文は、文節で折り返す（`lib/budou.tsx`。BudouX で切れ目を求めて `<wbr>` を入れる）。見出しの行を指定したいときは、文字列の配列で渡す
- **ヘッダー**：いま開いているページの項目に、常に下線を出す（`components/layout/HeaderNav.tsx`）
- **ミシンの種類の色**：一覧の行に乗せたときの下線と写真の縁は、その種類の色にする（`data/machines.ts` の `color`）

### 表示速度

- 本文は端末標準のゴシック。欧文の 2 書体だけを小さなファイルで配信し、日本語の丸ゴシック（Zen Maru Gothic）は PC 幅のときだけ、最初の描画のあとで読み込みます
- 写真は `next/image` で AVIF/WebP に変換。最初に見える写真だけ先読み、ほかは遅延読み込み。地図・カレンダー・フォームの埋め込みも遅延読み込み
- 計測値（Lighthouse 12、ローカル、各 3 回の中央値）
  - スマホ：Performance 90〜96 ／ Accessibility 100 ／ Best Practices 100 ／ SEO 100、CLS 0
  - PC：4 項目とも 99〜100

## ディレクトリ

```
app/                  ページ（App Router）
components/layout/    Header・Footer・メニュー・スマホの固定ボタン
components/sections/  ページを組み立てるセクション
components/ui/        汎用部品（写真枠・見出し・パンくず・アイコン）
content/column/       コラム・お知らせの Markdown
data/                 料金・機種・設備・FAQ・規約・写真の一覧・スタッフ紹介
lib/                  店舗情報・SEO・構造化データ・ナビ・コラムの読み込み
docs/                 確認済みの事実、コラムの候補、修正依頼書（requests/。PDF は git に入れない）
photos-original/      写真の原本（配信されない）
public/               配信する画像・フォント・OG 画像
scripts/              画像・フォント・OG 画像の生成
```
