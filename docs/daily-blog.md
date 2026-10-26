# コラムの自動投稿（毎日 1 本）

Claude API で記事を 1 本作り、検査に通ったものだけを GitHub に commit して、Vercel が公開するしくみです。
WordPress も、Vercel 上のファイル書き込みも使いません。記事は、これまでと同じ `content/column/*.md` に増えていきます。

```
GitHub Actions（毎朝 8:17 に予約。GitHub の混み具合で遅れることがある）
  → 記事を生成（Claude API）
  → 機械的な検査 ＋ 別の呼び出しによる校閲
  → lint・型チェック・ビルド
  → 通ったものだけ commit → main へ push
  → Vercel が自動で公開
```

**毎日かならず公開する、というしくみではありません。** 検査かビルドに通らなかった日は、何も commit しません（サイトは変わりません）。

## 最初に設定すること

GitHub のリポジトリ → Settings → Secrets and variables → Actions。

| 種類 | 名前 | 必須 | 内容 |
| --- | --- | --- | --- |
| Secret | `ANTHROPIC_API_KEY` | ○ | Claude API のキー（https://console.anthropic.com で発行。利用分だけ課金されます） |
| Variable | `ANTHROPIC_MODEL` |  | 使うモデル。無ければ `claude-haiku-4-5-20251001`（費用を抑える Haiku）。文章の質を上げたいときは `claude-sonnet-5-5` など |
| Variable | `ANTHROPIC_REVIEW_MODEL` |  | 校閲だけ別のモデルにしたいとき |
| Variable | `DAILY_BLOG_MODE` |  | `draft` にすると、公開せず下書き（`draft: true`）として保存します。人が読んでから公開したいとき |
| Variable | `GIT_AUTHOR_NAME` / `GIT_AUTHOR_EMAIL` |  | commit の作者。無ければ `github-actions[bot]` |
| Secret | `VERCEL_DEPLOY_HOOK_URL` |  | push だけでは Vercel が公開しないときの保険（下の「Vercel 側」を参照） |

main へ push する権限は、ワークフロー自身が宣言しています（`permissions: contents: write`）。
「commit して push する」で失敗するときだけ、Settings → Actions → General → Workflow permissions と、main のブランチ保護
（Actions からの push を許可しているか）を確かめてください。

## Vercel 側

基本は何も要りません。main への push で、これまでどおり自動で公開されます。

自動投稿の commit だけ公開されないとき（Vercel の Deployments に出てこない、または「作者にこのプロジェクトの権限がない」と表示されるとき）は、どちらかで直ります。

- **作者を自分にする**：Variables に `GIT_AUTHOR_NAME` と `GIT_AUTHOR_EMAIL` を、Vercel に連携している GitHub アカウントの名前とメールアドレスで登録する
- **Deploy Hook を使う**：Vercel → Project → Settings → Git → Deploy Hooks で main 用の Hook を作り、その URL を Secret `VERCEL_DEPLOY_HOOK_URL` に登録する

## 毎日の流れ（scripts/generate-daily-blog.mjs）

1. 公開済みの記事、テーマの一覧（`data/blog-topics.json`）、サイトの事実を読む
2. 今日（日本時間）の自動の記事がすでにあれば、何もしない
3. まだ使っていないテーマを選ぶ。分野ごとの割合（ミシン 35％／日暮里 20％／洋裁・ハンドメイド 15％／スペース 10％／ワークショップ 10％／設備・初心者 10％）に対して、いちばん足りていない分野を優先する。
   優先度の高い先頭の数件は日付で順番を回すので、書きにくいテーマがあっても、毎日同じテーマで止まらない
4. Claude に記事を書かせる。店について書いてよいのは、渡した事実だけ
5. 機械的な検査（`scripts/lib/column-quality.mjs`）
   - 長さ、見出しの数、決まり文句、箇条書きの割合、検索語の繰り返し
   - 金額がサイトの料金と一致するか、存在しない型番が無いか、台数・面積・口コミなど書いてはいけない表現が無いか
   - リンク先が実在するか（固定ページ 1 本以上、既存の記事 2 本以上）、写真が実在するか
   - 既存の記事との重なり（文章・タイトル・見出し・検索意図）、直近の記事と見出しの型が同じでないか
6. 校閲（別の呼び出し）。事実の裏づけ、架空の体験談、重複、読む価値、文章を点検する
7. どちらかに通らなければ、指摘を渡して書き直させる（1 テーマ 3 回まで）。それでも通らなければ次のテーマを試す（1 日 2 テーマまで）。
   どれも通らなければ「今日は公開しない」。
   公開を止めるのは、事実の裏づけが無い・架空・誤り・重複の指摘と、点数の不足。言い回しの好みだけの指摘は、最後の書き直しのあとなら公開を止めない
8. 通った記事を `content/column/<テーマの id>.md` に書き、テーマを使用済みにする
9. ワークフローが lint・型チェック・ビルドを行い、通れば commit して push する

記事を足すだけで、コラムの一覧・カテゴリ一覧・関連記事・親の固定ページの「このテーマのコラム」・sitemap・RSS に自動で入ります。

### サイトの事実はどこから来るか

料金・機種・設備・店舗情報・FAQ は、サイトが表示に使っているファイル（`lib/site.ts`、`data/*.ts`）から、生成のたびに読み直します。
`data/site-facts.json` は、その結果を書き出したもの（AI に何を渡しているかを確かめるためのファイル）で、手で直す必要はありません。
**料金や機種を直すときは、これまでどおり `data/pricing.ts` などを直すだけ**で、次の記事から反映されます。

## 手で動かす

GitHub → Actions → **Daily column** → Run workflow。

| 入力 | 使いどころ |
| --- | --- |
| （何も入れない） | いつもの生成を、いますぐ実行する |
| `dry_run` にチェック | お試し。生成と検査だけ行い、公開しない。結果は実行結果の Summary と、Artifacts の下書きで見られる |
| `topic` に id | テーマを指定する（`data/blog-topics.json` の `id`） |
| `force` にチェック | 今日すでに自動の記事があっても、もう 1 本作る |

**最初の 1 回は、`dry_run` で試すことをおすすめします。**

手元で動かすとき：

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run blog:generate -- --dry-run   # お試し（ファイルは書かない）
ANTHROPIC_API_KEY=sk-ant-... npm run blog:generate                # content/column/ に書き出す（commit はしない）
npm run blog:generate -- --topic overlock-thread-how-to-choose    # テーマを指定
```

下書きと校閲の記録は `.daily-blog/` に残ります（git には入りません）。

## うまくいかないとき

GitHub → Actions → Daily column → 該当の実行を開くと、Summary にその日の結果が出ます。

| 表示 | 意味 | 対応 |
| --- | --- | --- |
| 公開：（タイトル） | 記事を commit した | Vercel の公開を待つ |
| 今日は公開しません：今日の分はすでにあります | 同じ日に 2 回動いた | 対応不要 |
| 今日は公開しません：品質の基準を満たす記事になりませんでした | 2 テーマとも、書き直しても検査か校閲に通らなかった | Summary に理由が出る。対応不要（翌日は別のテーマから試す）。何日も続くなら、Summary の指摘を見て、指示文（`WRITER_SYSTEM`）か、モデル（`ANTHROPIC_MODEL`）を見直す |
| 今日は公開しません：書き手が見送りました | 事実だけでは書けないと Claude が判断した | 同上 |
| 今日は公開しません：使えるテーマが残っていません | テーマを使い切った | `data/blog-topics.json` にテーマを足す |
| エラー：ANTHROPIC_API_KEY が設定されていません | Secret が無い | 登録する |
| エラー：…（HTTP 401） | API キーが無効 | キーを作り直して登録する |
| エラー：…（HTTP 400／429／529 など） | 残高不足・利用上限・混雑 | Anthropic のコンソールで残高と上限を確かめる。混雑は翌日に直る |
| 「検査とビルド」で失敗 | 記事は書けたが、ビルドが通らなかった | commit されていないのでサイトは無事。ログのエラーを確かめる |
| 「commit して push する」で失敗 | push の権限が無い | 「最初に設定すること」の Workflow permissions を確かめる |

エラーで終わった実行は赤く表示され、GitHub から通知のメールが届きます。どの場合も、記事が commit されないだけで、サイトが壊れることはありません。

公開された記事に誤りを見つけたときは、`content/column/` の該当ファイルを直す（`updated` に直した日を書く）か、ファイルを消して push します。

### 止める・減らす

- 止める：Actions → Daily column → 右上の「…」→ Disable workflow
- 人が読んでから公開する：Variable `DAILY_BLOG_MODE` を `draft` にする。記事は `draft: true` で保存されるので、読んで問題なければその行を消して push する
- 回数を減らす：`.github/workflows/daily-blog.yml` の `cron` を変える（例：`17 23 * * 0,3` で月・木の朝）

## テーマの一覧（data/blog-topics.json）

1 テーマ 1 検索意図。`id` がそのまま記事のファイル名（＝URL）になります。

| 項目 | 内容 |
| --- | --- |
| `id` | 英小文字とハイフン。一度使ったら変えない |
| `group` | 割合を数える分野（machine／nippori／sewing／space／workshop／basics） |
| `category` | コラムのカテゴリ（machine／sewing／handmade／textile-town／workshop） |
| `parentPage` | 親になる固定ページ。記事の最後のボタンと、そのページの「このテーマのコラム」に使う |
| `targetKeyword` / `searchIntent` / `titleIdea` | 狙う検索語、その人が知りたいこと、タイトルの案 |
| `priority` | 1 が先 |
| `note` | 書くときの注意（事実に関わること） |
| `manual` | `true` なら自動では選ばない（人が書くための控え） |
| `used` / `usedOn` | 自動で入る |

テーマを足すときの約束：

- 固定ページが受け持つ言葉（`lib/keywords.ts`）と同じ言葉を狙わない。「日暮里 ミシン」のような場所を探す言葉は固定ページの役割
- すでにある記事・テーマと、答える疑問が同じにならないようにする
- 店の事実が無いと書けないテーマ（機種ごとの使い心地、イベントの様子）は `manual: true` にして、人が書く

## 知っておいてほしいこと

- **Google は、検索順位のために大量に作られた、独自の価値が薄い記事を評価しません**（作り方が人か AI かは問いません）。
  このしくみは、事実の裏づけ・重複・薄さを検査して通ったものだけを出しますが、検査は万能ではありません。
  最初の数週間は、公開された記事を実際に読んで、内容と文章を確かめてください。気になる傾向があれば、
  `scripts/generate-daily-blog.mjs` の指示文（`WRITER_SYSTEM`）と `scripts/lib/column-quality.mjs` の検査を直します
- 自動で書くのは、調べものに答える記事（`guide`・`local`）だけです。**スペースで実際にあったこと（`report`）は、これまでどおり人が書きます。**
  サイトの信頼を作るのは、そちらの記事です（`content/column/README.md`）
- 機種ごとの記事（使い心地、機種の比較）は、実際に縫った記録と仕様の確認が要るため、自動では作りません（テーマ一覧の `manual: true`）
