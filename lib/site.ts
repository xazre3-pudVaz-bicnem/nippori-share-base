/**
 * 店舗情報の単一ソース。
 * NAP（名称・住所・電話）はサイト内のすべての表示・構造化データがここを参照する。
 * 表記を変えるときはこのファイルだけを直すこと（ページごとに書き分けない）。
 *
 * 出典は docs/VERIFIED_FACTS.md を参照。確認できていない情報（営業日、駅からの所要時間、
 * 駐車場、設備の台数など）はここに書かない。
 */
export const SITE = {
  name: "Nippori Share Base",
  nameKana: "ニッポリ シェア ベース",
  /** ブランドのタグライン */
  tagline: "ヒト・モノ・コトが巡る場所",
  /** ブランドコンセプト */
  concept: "ものづくりの街・日暮里から「やってみたい」をカタチに。",
  /** 検索結果・SNS 共有時の既定の説明文 */
  description:
    "日暮里繊維街・東日暮里のものづくりシェアスペース「Nippori Share Base」。家庭用・職業用・ロック・カバーステッチミシンを使った洋裁やハンドメイド、ワークショップ、イベント、展示会などに利用できます。",
  /** 運営（利用規約の記載による） */
  operator: "齊藤商店",
  postalCode: "116-0014",
  address: {
    region: "東京都",
    locality: "荒川区",
    street: "東日暮里4-33-3 齊藤商店2F",
  },
  /** サイト内で統一して使う住所表記 */
  addressFull: "東京都荒川区東日暮里4-33-3 齊藤商店2F",
  tel: "03-3803-4007",
  /** 電話は1階の齊藤商店につながる */
  telNote: "齊藤商店",
  email: "sharebase.nippori@gmail.com",
  instagram: "https://www.instagram.com/sharebase_nippori/",
  instagramHandle: "@sharebase_nippori",
  /** 予約申込フォーム（現在の公式サイトと同じ Google フォーム） */
  reserveFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdXvCBbb7nuBxiv1iImoM07RG7I3EoiMUGh81kz5QY-OUfYnQ/viewform",
  /** 空き状況カレンダー（現在の公式サイトと同じ Google カレンダー） */
  calendarEmbedUrl:
    "https://calendar.google.com/calendar/embed?src=da6ba1e8a7a95ea9e89208e441b011fa873f2885264a5a6145a509bd4dbeb805%40group.calendar.google.com&ctz=Asia%2FTokyo",
  /** Google マップ（住所検索。API キー不要の埋め込み） */
  mapEmbedUrl: "https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%8D%92%E5%B7%9D%E5%8C%BA%E6%9D%B1%E6%97%A5%E6%9A%AE%E9%87%8C4-33-3&hl=ja&z=17&output=embed",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%8D%92%E5%B7%9D%E5%8C%BA%E6%9D%B1%E6%97%A5%E6%9A%AE%E9%87%8C4-33-3+%E9%BD%8A%E8%97%A4%E5%95%86%E5%BA%97",
  /**
   * 本格稼働した日。出典：荒川102 の記事（2026-09-24 掲載）
   * 「2026年の年明けから企画はスタート。今年の夏から内容を固め、9/1より本格稼働」
   */
  openedOn: "2026-09-01",
  /** メディア掲載。実際に掲載されたものだけを足す（記事の本文は転載しない。リンクだけ） */
  media: [
    {
      outlet: "荒川102",
      outletNote: "荒川区の地域情報サイト",
      title: "ものづくりのハードルを下げたい！日暮里繊維街に誕生したNippori Share Base",
      url: "https://arakawa102.com/business/nippori-share-base/",
      date: "2026-09-24",
    },
  ],
  /** 予約枠（利用規約 第7条・料金表より） */
  slots: [
    { name: "Team AM", time: "10:00〜13:30" },
    { name: "Team PM", time: "14:00〜17:30" },
    { name: "All Day", time: "10:00〜17:30" },
  ],
} as const;

export const telHref = `tel:${SITE.tel.replace(/-/g, "")}`;
export const mailHref = `mailto:${SITE.email}`;

/** 一般のご利用（ミシン・ハンドメイド）の予約。空き状況カレンダー＋申込フォームのページ */
export const RESERVE_PATH = "/reserve";
/** 貸切・イベント利用の相談。予約ページの中の「貸切のご相談」の位置 */
export const PRIVATE_PATH = "/reserve#private";
/** 貸切の相談メール（件名を入れた状態でメールソフトが開く） */
export const privateMailHref = `mailto:${SITE.email}?subject=${encodeURIComponent("貸切利用の相談")}`;

/** 予約導線の文言。ページによって言い方がばらつかないよう、ここから使う */
export const CTA_LABEL = {
  general: "空き状況を見て予約する",
  generalShort: "空き状況・予約",
  private: "貸切利用を相談する",
  privateShort: "貸切の相談",
} as const;
