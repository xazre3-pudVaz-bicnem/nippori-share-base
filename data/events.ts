import { EVENT_IMG, type Img } from "@/data/images";
import { SITE } from "@/lib/site";

/**
 * Nippori Share Base で開催する、参加者を募集するイベントの単一ソース。
 * 一覧（/events）、告知ページ（/events/[slug]）、トップページの「イベントのお知らせ」、sitemap、
 * 構造化データ（Event）が、すべてここを参照する。ページに日時や参加費を直接書かない。
 *
 * - 書くのは、主催者の告知（Instagram の投稿・告知画像・申込ページ）と、運営からの回答で確かめられたことだけ。出典は docs/VERIFIED_FACTS.md
 * - 参加費は告知どおり税込で持つ（税抜に直さない。表示は PriceInc）
 * - 申込ページの URL が決まるまでは apply.online.url を書かない（申込ボタンが出ない）
 * - 終わったイベントも消さない（ページに「終了しました」と出して残す）
 * - 日時は日本時間。開催日は YYYY-MM-DD、時刻は HH:MM、受付の開始・締切は ISO 8601（+09:00）
 */
export type EventSession = {
  date: string;
  /** 部の名前（告知の表記） */
  label: string;
  start: string;
  end: string;
  capacity: number;
  /** この回で作るもの（items の name） */
  item: string;
};

export type EventItem = {
  name: string;
  /** 参加費（税込） */
  inc: number;
  /** 見本の写真 */
  img?: Img;
  note?: string;
  /** 選べる生地。img は 1 つずつの写真、imgs は 1 枚に複数の生地が写っている写真 */
  fabrics?: { lead?: string; list: readonly { name: string; img?: Img }[]; imgs?: readonly Img[] };
};

export type NsbEvent = {
  /** URL（/events/◯◯）。一度公開したら変えない */
  slug: string;
  /** 正式名称（告知の表記） */
  title: string;
  /**
   * h1 の見せ方。kicker（小さめの 1 行目）と main（大きい 2 行目）に分ける。無ければ title をそのまま文節で折り返す。
   * 2 つをつなげると title と同じになるように書く
   */
  heading?: { kicker: string; main: string };
  /** 告知のキャッチコピー */
  catch: string;
  /** 一覧・検索結果・SNS に出す説明（120 字以内） */
  description: string;
  /** ページ冒頭のリード文 */
  lead: string;
  /** 主催（告知の並び順） */
  hosts: readonly string[];
  sessions: readonly EventSession[];
  /** 開催日ごとの補足（その日だけの実演など） */
  dayNotes?: Readonly<Record<string, string>>;
  /** 定員の説明（告知の表記） */
  capacityNote: string;
  /** 定員の短い表記（開催概要・一覧用） */
  capacityShort: string;
  /** 作るもの（参加費は 1 つずつ） */
  items: readonly EventItem[];
  /** 参加費に含まれるもの */
  includes: string;
  /** 「作るもの」の説明文 */
  itemsLead: string;
  /** 持ち物 */
  bring: string;
  /** 参加できる人 */
  audience: string;
  /** 特典（参加の仕方ごと） */
  perks?: { title: string; rows: readonly { who: string; gifts: readonly string[] }[] };
  apply: {
    /** 受付の締切（いちばん遅いもの）。これを過ぎたら「受付終了」 */
    closes: string;
    online: {
      name: string;
      note: string;
      /** 申込ページの URL。決まるまでは書かない */
      url?: string;
      opens: string;
      closes: string;
      steps: readonly { title: string; body: string }[];
    };
    phone?: {
      tel: string;
      note: string;
      opens: string;
      closes: string;
      /** 受付日時。time が無い日はお休み */
      hours: readonly { date: string; time?: string; note?: string }[];
      notes: readonly string[];
    };
  };
  /** 当日のこと */
  onTheDay: readonly { title: string; body: string }[];
  /** お持ち帰りできるもの */
  takeHome: readonly string[];
  /** 注意事項 */
  notes: readonly string[];
  /** このイベントの問い合わせ先 */
  contact: { name: string; instagram?: string; instagramHandle?: string; tel?: string };
  /** 告知の Instagram 投稿 */
  instagram?: string;
  /** この告知ページを公開した日。内容を実際に直したら updated に書く */
  published: string;
  updated?: string;
  keywords: readonly string[];
  /** 告知画像（data/images.ts の EVENT_IMG） */
  img?: Img;
  /** SNS 共有用の画像（1200×630。public/og/events/。scripts/prepare-event-images.mjs で作る） */
  ogImage?: string;
};

/**
 * 出典：齊藤商店の Instagram の告知（2026-10-30）と告知画像、齊藤さんからの回答と追加の告知文（LINE、2026-11-01・02）。
 * 未確認（docs/VERIFIED_FACTS.md）：特典の「1部のみ」は「1つの部だけに参加」と読んでいる。
 */
export const EVENTS: readonly NsbEvent[] = [
  {
    slug: "maffon-workshop-2026-11",
    title: "maffon × かたがみスタイル × 齊藤商店 コラボワークショップ",
    heading: { kicker: "maffon × かたがみスタイル × 齊藤商店", main: "コラボワークショップ" },
    catch: "ものづくりを楽しむ、特別な2日間",
    description:
      "2026年11月27日（金）・28日（土）、日暮里繊維街の Nippori Share Base で開催。かたがみスタイルの型紙と maffon の生地で、第1部はトレイシーTシャツ、第2部はフランダースカートを縫います。各回10名・先着順。",
    lead: "かたがみスタイルの型紙と maffon の生地で、第1部はトレイシーTシャツ、第2部はフランダースカートを縫います。両方でも、片方だけでも参加できます。",
    hosts: ["maffon", "かたがみスタイル", "齊藤商店"],
    sessions: [
      { date: "2026-11-27", label: "第1部", start: "10:00", end: "12:00", capacity: 10, item: "トレイシーTシャツ" },
      { date: "2026-11-27", label: "第2部", start: "14:00", end: "16:00", capacity: 10, item: "フランダースカート" },
      { date: "2026-11-28", label: "第1部", start: "10:00", end: "12:00", capacity: 10, item: "トレイシーTシャツ" },
      { date: "2026-11-28", label: "第2部", start: "14:00", end: "16:00", capacity: 10, item: "フランダースカート" },
    ],
    dayNotes: { "2026-11-27": "この日は、Clover（クロバー）の商品実演会も体験できます" },
    capacityNote: "各回10名、合計40名の限定です。先着順で参加者を決定します。",
    capacityShort: "各回10名（先着順）",
    items: [
      {
        name: "トレイシーTシャツ",
        inc: 15800,
        img: EVENT_IMG.maffonTracy,
        fabrics: {
          lead: "リバーシブルジャガードニット生地（無地×メッシュ）",
          list: [
            { name: "杢グレー／レモン", img: EVENT_IMG.maffonTshirtFabric1 },
            { name: "オフミント／アイボリー", img: EVENT_IMG.maffonTshirtFabric2 },
            { name: "ジェイブルー／アイボリー", img: EVENT_IMG.maffonTshirtFabric3 },
            { name: "杢グレー／アイボリー", img: EVENT_IMG.maffonTshirtFabric4 },
            { name: "杢グレー／ネイビー", img: EVENT_IMG.maffonTshirtFabric5 },
          ],
        },
      },
      {
        name: "フランダースカート",
        inc: 17500,
        img: EVENT_IMG.maffonFlounder,
        note: "ワークショップでは共布（同じ生地）で作るため、写真の見本とはデザインが異なります。",
        fabrics: {
          list: [{ name: "パズル柄（黒／アイボリー）" }, { name: "プティアンブレム柄（ネイビー／アイボリー）" }, { name: "クッカペロット柄（ネイビー／アイボリー）" }, { name: "ダリア柄（ネイビー／シナモン）" }],
          imgs: [EVENT_IMG.maffonSkirtFabrics12, EVENT_IMG.maffonSkirtFabrics34],
        },
      },
    ],
    includes: "材料費・生地代込み",
    itemsLead: "第1部と第2部で、作るものが違います。両方でも、片方だけでも参加できます。生地は、お申し込みのときに maffon がセレクトした生地から選べます。",
    bring: "なし",
    audience: "初心者の方も参加できます",
    perks: {
      title: "第1部と第2部、両方の参加で特典がスペシャルに",
      rows: [
        { who: "1つの部に参加", gifts: ["かたがみスタイルで使える10％OFFクーポン", "齊藤商店で使える10％OFFクーポン"] },
        { who: "第1部・第2部の両方に参加", gifts: ["かたがみスタイルで使える20％OFFクーポン", "齊藤商店か Nippori Share Base で使える500円OFFチケット×3枚"] },
      ],
    },
    apply: {
      closes: "2026-11-11T23:59:00+09:00",
      online: {
        name: "WARP and WEFT",
        note: "齊藤商店のオンラインショップ",
        url: "https://warpandweft.theshop.jp/",
        opens: "2026-11-02T12:30:00+09:00",
        closes: "2026-11-11T23:59:00+09:00",
        steps: [
          { title: "WARP and WEFT を開く", body: "齊藤商店のオンラインショップで、参加チケットを販売しています。" },
          { title: "チケットと生地を選んで購入", body: "生地は、チケットの購入時に選べます。" },
          { title: "決済の完了で、予約確定", body: "ご購入・決済の完了をもって、ご予約が確定します。" },
        ],
      },
      phone: {
        tel: SITE.tel,
        note: "齊藤商店の店舗",
        opens: "2026-11-02T12:30:00+09:00",
        closes: "2026-11-04T17:00:00+09:00",
        hours: [
          { date: "2026-11-02", time: "12:30〜17:00" },
          { date: "2026-11-03", note: "祝日のため、受付はお休み" },
          { date: "2026-11-04", time: "10:00〜17:00", note: "この日で締め切り" },
        ],
        notes: [
          "電話受付分には定員があります。電話受付分の在庫は、ネットショップの在庫とは別に管理しています。",
          "お電話が混み合い、つながりにくい場合があります。あらかじめご了承ください。",
          "電話受付は11月4日（水）17:00でいったん締め切ります。その時点で残っている席は、11月5日（木）からネットショップ「WARP and WEFT」で再販売します。",
        ],
      },
    },
    onTheDay: [
      { title: "生地は裁断済み", body: "maffon の生地は裁断した状態で用意しています。当日は、縫うところから始めます。" },
      { title: "かたがみスタイルの型紙付き", body: "新品の型紙を持ち帰れるので、別の布でも作れます。" },
      { title: "スタッフのサポート付き", body: "ベビーロック・スタジオ日暮里と、Nippori Share Base のスタッフがサポートします。初心者の方も大丈夫です。" },
      { title: "Clover の商品実演会（11月27日のみ）", body: "11月27日（金）は、Clover（クロバー）の商品実演会も体験できます。" },
      { title: "持ち物はありません", body: "参加費に材料費・生地代が含まれています。手ぶらでお越しください。" },
    ],
    takeHome: ["新品の型紙（かたがみスタイル）", "制作に使った生地の余り", "本縫いで使ったシャッペスパン（ミシン糸）"],
    notes: ["ワークショップで作るスカートは共布で作るため、写真の見本とはデザインが異なります。", "キャンセル規定などの詳細は、WARP and WEFT の商品ページでご確認ください。"],
    contact: { name: "齊藤商店", instagram: "https://www.instagram.com/saitoshoten_npr/", instagramHandle: "@saitoshoten_npr", tel: SITE.tel },
    instagram: "https://www.instagram.com/p/DfHMg7ZoDeg/",
    published: "2026-11-02",
    keywords: ["maffon ワークショップ", "かたがみスタイル ワークショップ", "トレイシーTシャツ", "フランダースカート"],
    img: EVENT_IMG.maffonFlyer,
    ogImage: "/og/events/maffon-workshop-2026-11.jpg",
  },
];
