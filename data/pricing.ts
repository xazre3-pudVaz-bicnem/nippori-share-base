/**
 * 料金（単一ソース）。
 *
 * 出典：旧公式サイト（Canva）の「利用料」「Chum's Sewing Club」ページ、および利用規約（2026-10-02 時点）。
 *
 * 表示の方針
 * - 旧サイトの料金表は「税抜き価格」で書かれている。このファイルには、その税抜の金額をそのまま持つ（ex）
 * - 画面には、支払う総額が分かるよう **税込を主、税抜を従** で出す。税込は標準税率 10％ で計算する（withTax）
 * - 利用規約に税込で書かれているもの（いとシェア・ミシンガード550・針交換）は、税込の金額をそのまま持つ
 * - 金額を推測で足さない。確認できていない料金（メンターサポート、レーザー加工機など）は載せない
 *
 * 料金を改定するときは、このファイルの ex の値と PRICE_AS_OF を直す。ページ側に金額を直接書かないこと
 * （文章の中で金額に触れるときは priceText() を使う）。
 */
export const PRICE_AS_OF = "2026-10-02";

/** 消費税率（標準税率） */
export const TAX_RATE = 0.1;

/** 税抜 → 税込（円未満は四捨五入。現在の料金はすべて割り切れる） */
export const withTax = (ex: number) => Math.round(ex * (1 + TAX_RATE));

/** 3 桁区切り */
export const yen = (n: number) => n.toLocaleString("ja-JP");

/** 文章の中で使う表記。例: priceText(2000) → "2,200円（税込）" */
export const priceText = (ex: number) => `${yen(withTax(ex))}円（税込）`;

/** ミシンを利用する方向け（1人あたり） */
export const MACHINE_PLANS = {
  slots: [
    { id: "am", name: "Team AM", time: "10:00〜13:30" },
    { id: "pm", name: "Team PM", time: "14:00〜17:30" },
    { id: "all", name: "All Day", time: "10:00〜17:30" },
  ],
  rows: [
    { id: "general", label: "一般価格", ex: [2000, 2000, 4000] },
    { id: "member", label: "Chum's Sewing Club 会員価格", ex: [1500, 1500, 2900] },
  ],
  hourly: {
    label: "1時間利用",
    ex: 1000,
    note: "事前のご予約はお受けしておりません。当日空きがある場合にのみご案内させていただきます。",
  },
  notes: [
    "1人あたりの料金です。",
    "準備・片付けを含めた利用時間となります。",
    "キャンセル・予約変更は、利用規約をお読みのうえお早めにご連絡ください。",
    "参加費・会費の徴収、商品の販売、その他の収益を伴う活動を目的としたご利用は、原則として貸切利用をご利用ください。",
  ],
} as const;

/** ミシン利用以外の方向け */
export const OTHER_PLANS = [
  {
    id: "break",
    name: "休憩利用",
    reception: "当日受付",
    ex: 500,
    unit: "1時間",
    from: false,
    priceNote: "ワンドリンク制",
    use: "お買い物の合間の休憩・ご歓談などに",
    includes: "椅子",
  },
  {
    id: "cutting",
    name: "裁断台利用",
    reception: "当日受付",
    ex: 300,
    unit: "15分",
    from: false,
    priceNote: "",
    use: "裁断だけしたい方、繊維街でお買い物された生地のシェアなどに",
    includes: "裁断台、裁ち鋏",
  },
  {
    id: "handmade",
    name: "ハンドメイド利用",
    reception: "事前予約",
    ex: 3000,
    unit: "半日",
    from: false,
    priceNote: "グループ利用可",
    use: "編み会やその他ハンドメイド作業などに",
    includes: "大テーブル＋椅子（最大6脚）、作業台＋椅子（最大4脚）、ホワイトボード",
  },
  {
    id: "private",
    name: "貸切利用",
    reception: "事前予約",
    ex: 20000,
    unit: "",
    from: true,
    priceNote: "基本料金。内容により応相談／日・祝利用可",
    use: "ワークショップや展示会などのイベント利用に",
    includes: "応相談",
  },
] as const;

export type OtherPlanId = (typeof OTHER_PLANS)[number]["id"];

export const planById = (id: OtherPlanId) => OTHER_PLANS.find((p) => p.id === id)!;

/** 文章用。例: planPriceText("cutting") → "15分 330円（税込）" */
export function planPriceText(id: OtherPlanId): string {
  const p = planById(id);
  const amount = `${yen(withTax(p.ex))}円${p.from ? "〜" : ""}（税込）`;
  return p.unit ? `${p.unit} ${amount}` : amount;
}

export const OTHER_PLAN_NOTES = [
  "当日受付のものは、店頭にてお申し付けください。",
  "準備・片付けを含めた利用時間となります。",
  "キャンセル・予約変更は、利用規約をお読みのうえお早めにご連絡ください。",
] as const;

/** 利用規約に定めのあるサービス（規約に税込で記載されている） */
export const OPTIONS = [
  {
    name: "いとシェア（糸貸しサービス）",
    price: "220円（税込）",
    body: "当スペースにある在庫の糸をご利用いただけます。家庭用ミシン・ロックミシン糸などが対象です。色に限りがあるため、ご希望の場合は色の確認をお問い合わせください。",
  },
  {
    name: "ミシンガード550",
    price: "1回 550円（税込）",
    body: "加入された場合、通常の使用方法で発生したミシン本体の故障・破損について、原則として修理費等を請求いたしません。針・ボビン等の消耗品や、故意・重大な過失による故障などは対象外です。",
  },
  {
    name: "ミシン針の交換",
    price: "2本目以降 1本 55円（税込）",
    body: "使用中に針が折れた場合、1回目の針交換は無料です。同じ利用時間内に再度折れた場合は、使用方法や縫製内容を確認のうえ、2本目以降の交換を有料で承ります。",
  },
] as const;

/** 通常利用のキャンセル料（利用規約 第9条） */
export const CANCEL_POLICY = [
  { when: "利用日の3日前まで", fee: "無料" },
  { when: "前々日", fee: "利用料金の30％" },
  { when: "前日", fee: "利用料金の50％" },
  { when: "当日・無断キャンセル", fee: "利用料金の100％" },
] as const;

/** 月額会員「Chum's Sewing Club」 */
const generalEx = MACHINE_PLANS.rows[0].ex;
const memberEx = MACHINE_PLANS.rows[1].ex;
/** 会員になると安くなる額（税込）。Team AM/PM と All Day */
export const MEMBER_DISCOUNT = {
  half: withTax(generalEx[0]) - withTax(memberEx[0]),
  allDay: withTax(generalEx[2]) - withTax(memberEx[2]),
};

export const CLUB = {
  name: "Chum's Sewing Club",
  monthlyEx: 700,
  yearlyEx: 8000,
  benefits: [
    {
      title: "Nippori Share Base を会員価格で",
      body: `ミシン利用が ${yen(MEMBER_DISCOUNT.half)}円引き（All Day は ${yen(MEMBER_DISCOUNT.allDay)}円引き）になります（税込）。月2回以上のご利用でお得です。`,
    },
    {
      title: "齊藤商店でお得にお買い物",
      body: "対象商品を 10％ OFF。利用回数の制限はありません。",
    },
    {
      title: "毎月、接着芯を 50cm プレゼント",
      body: "対象の白または黒の接着芯です。品番はお選びいただけません。",
    },
    {
      title: "Shareハギ・ShareParts プレゼント",
      body: "Shareハギ 300g・ShareParts 100g が毎月自由に使えます。",
    },
    {
      title: "ミシンガード",
      body: "何かあった時のためのセーフティプランが付帯します。",
    },
  ],
  notes: [
    "お申込みは店頭にて承ります。会費の決済には Airpay オンライン決済を利用いたします。",
    "クレジットカード情報が必要となります。事前にリクルートIDをご準備いただくとお手続きがスムーズです。",
    "特典のご利用・獲得は、会員証をご提示のうえお客様よりご申告ください。",
    "申告がなく獲得できなかった特典を、次月に繰り越すことはできません。",
    "特典の内容は予告なく変更する場合がございます。",
  ],
} as const;
