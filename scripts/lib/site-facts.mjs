/**
 * コラムの自動生成に渡す「事実」の一覧を組み立てる。
 *
 * 店舗情報・料金・機種・設備・FAQ は、サイトが表示に使っているファイル（lib/site.ts・data/*.ts）から読む。
 * ここに数字や名前を書き写さないこと（食い違いのもとになる）。サイト側を直せば、次の生成から自動で反映される。
 *
 * 書き出したもの（data/site-facts.json）は「AI に何を渡しているか」を人が確かめるためのファイル。
 * 直接書き換えても、次の実行で上書きされる。
 */
import { loadSite } from "./load-site.mjs";

/**
 * 日暮里繊維街についての一般的な事実。出典は docs/VERIFIED_FACTS.md の「日暮里繊維街についての一般情報」。
 * サイトのデータファイルに無い情報は、ここに挙げたものだけを使ってよい。
 */
const TOWN = {
  name: "日暮里繊維街",
  english: "Nippori Fabric Town",
  facts: [
    "日暮里駅の東側から東日暮里にかけて、日暮里中央通りを中心に、生地・手芸材料・服飾資材の店が並ぶエリア",
    "日暮里駅から日暮里中央通りを中心に約1km、約90店",
    "大正時代の初めごろ、浅草方面の古繊維・裁落を扱う業者が日暮里・三河島周辺に集まったのが始まり",
    "Nippori Share Base がある齊藤商店は、駅から繊維街を進んだ奥のほう。「奥日暮里」とも呼ばれるあたりで、日暮里中央通りから少し入ったところ",
  ],
  caution: "個別の店の名前・営業時間・定休日・価格・品ぞろえは確認できていないので書かない（齊藤商店が1階の生地店であること以外）。",
};

/** サイト全体の立ち位置。文章のトーンと、書いてはいけない方向を決める */
const POSITIONING = [
  "Nippori Share Base は、日暮里繊維街の生地店・齊藤商店の2階にある、ものづくりのためのシェアスペース",
  "洋裁教室ではない。決まった課題やカリキュラムはなく、作りたいものを自分のペースで作る場所",
  "「レンタルミシン」は、スペースに来て使うという意味。ミシンを自宅へ持ち帰る貸し出しは行っていない",
  "交流への参加は自由。一人で集中する人も、仲間と集まる人も使える",
  "参加費・会費の徴収や商品の販売など、収益を伴う利用は原則として貸切利用",
  "コンセプトは「ヒト・モノ・コトが巡る場所」。キーワードは「つくる」「学ぶ」「ひろがる」",
];

/** 確認できていないので、書いてはいけないこと */
const DO_NOT_WRITE = [
  "ミシンや設備の台数、スペースの面積・定員",
  "「営業時間」「定休日」という言い方（お休みは不定休。使える時間は予約枠で案内する）",
  "利用者の声・口コミ・レビュー・体験談・満足度・評価の点数",
  "実際には開催していないイベントやワークショップ、その参加人数",
  "ここに無い機種・設備・サービス・料金・割引・キャンペーン",
  "ミシンの機種ごとの数値（回転数・重さ・価格・発売年など）。ここにある説明文の範囲だけを使う",
  "スタッフの本名・経歴・資格（ここにあること以外）",
  "他の店・他のスペースとの比較や順位づけ、「地域No.1」「最安」などの表現",
];

export async function buildSiteFacts() {
  const [{ SITE, walkText }, pricing, machines, { EQUIPMENT }, { FAQ_GROUPS }, { STAFF }, { IMG }, { STATIC_ROUTES }, { PAGE_KEYWORDS }] = await Promise.all([
    loadSite("lib/site"),
    loadSite("data/pricing"),
    loadSite("data/machines"),
    loadSite("data/equipment"),
    loadSite("data/faqs"),
    loadSite("data/staff"),
    loadSite("data/images"),
    loadSite("lib/nav"),
    loadSite("lib/keywords"),
  ]);
  const { withTax, yen } = pricing;
  const inc = (ex) => `${yen(withTax(ex))}円（税込）`;

  return {
    _note: "このファイルは自動で作られます（npm run facts:build）。もとは lib/site.ts と data/*.ts。直接書き換えず、もとのファイルを直してください。",
    store: {
      name: SITE.name,
      reading: SITE.nameKana,
      tagline: SITE.tagline,
      concept: SITE.concept,
      operator: SITE.operator,
      address: `〒${SITE.postalCode} ${SITE.addressFull}`,
      tel: `${SITE.tel}（${SITE.telNote}。1階の齊藤商店につながる）`,
      email: SITE.email,
      instagram: SITE.instagram,
      openedOn: SITE.openedOn,
      closed: SITE.closed,
      slots: SITE.slots.map((s) => `${s.name} ${s.time}`),
      access: { walk: walkText, bus: `${SITE.bus.routes.join("／")}で「${SITE.bus.stop}」下車、徒歩約${SITE.bus.minutes}分`, parking: SITE.parking, bicycle: SITE.bicycle },
      payments: [...SITE.payments],
      reservation: "基本的に事前予約制。空き状況カレンダーを見て、予約申込フォームから申し込む。空きがあれば当日利用もできる。支払いは当日の受付時",
      media: SITE.media.map((m) => `${m.outlet}（${m.outletNote}）に ${m.date} 掲載`),
    },
    positioning: POSITIONING,
    pricing: {
      note: "金額はすべて税込。ここにある金額だけを書いてよい",
      machine: [
        ...pricing.MACHINE_PLANS.rows.flatMap((row) => pricing.MACHINE_PLANS.slots.map((slot, i) => `${row.label}・${slot.name}（${slot.time}）：${inc(row.ex[i])}`)),
        `${pricing.MACHINE_PLANS.hourly.label}：${inc(pricing.MACHINE_PLANS.hourly.ex)}（${pricing.MACHINE_PLANS.hourly.note}）`,
      ],
      machineNotes: [...pricing.MACHINE_PLANS.notes],
      other: pricing.OTHER_PLANS.map((p) => `${p.name}：${p.unit ? `${p.unit} ` : ""}${yen(withTax(p.ex))}円${p.from ? "〜" : ""}（税込）／${p.reception}／${p.use}／使えるもの：${p.includes}${p.priceNote ? `／${p.priceNote}` : ""}`),
      mentor: { name: pricing.MENTOR.name, price: `1時間 ${inc(pricing.MENTOR.exPerHour)}（ミシン利用の料金とは別）`, about: pricing.MENTOR.lead, notes: [...pricing.MENTOR.notes] },
      options: pricing.OPTIONS.map((o) => `${o.name}${o.sub ? `（${o.sub}）` : ""}：${o.price}／${o.body}`),
      cancel: pricing.CANCEL_POLICY.map((c) => `${c.when}：${c.fee}`),
      eventCancel: pricing.EVENT_CANCEL_POLICY.map((c) => `${c.when}：${c.fee}`),
      club: {
        name: pricing.CLUB.name,
        price: `月額 ${inc(pricing.CLUB.monthlyEx)}、年払い ${inc(pricing.CLUB.yearlyEx)}`,
        benefits: pricing.CLUB.benefits.map((b) => `${b.title}：${b.body}`),
      },
    },
    machines: {
      note: "ここにある機種だけが、Nippori Share Base で使えるミシン。説明文はサイトに掲載しているもの",
      categories: machines.MACHINE_CATEGORIES.map((c) => ({
        name: c.name,
        about: c.lead,
        points: [...c.points],
        goodFor: [...c.goodFor],
        recommendedFor: c.recommend,
        models: c.machines.map((m) => ({ name: `${m.maker} ${m.model}`, about: m.description ?? "", note: m.note ?? "" })),
      })),
      limited: { note: `HappyJapan 様よりお借りしている SINGER のミシン。設置は${machines.LIMITED_UNTIL}の予定`, models: machines.LIMITED_MACHINES.map((m) => `${m.maker} ${m.model}`) },
    },
    equipment: EQUIPMENT.filter((e) => !e.id.endsWith("-machine")).map((e) => ({
      name: e.name,
      model: e.model ?? "",
      about: e.what,
      goodFor: [...e.goodFor],
      details: (e.details ?? []).map((d) => `${d.label}：${d.body}`),
      note: e.ask ?? "",
    })),
    faqs: FAQ_GROUPS.flatMap((g) => g.items.map((f) => ({ q: f.q, a: f.a }))),
    staff: STAFF.map((s) => ({ name: s.name, role: s.role, mentorSupport: s.mentor, facts: s.facts.map((f) => `${f.label}：${f.body}`) })),
    town: TOWN,
    pages: STATIC_ROUTES.filter((r) => !r.path.startsWith("/terms")).map((r) => ({
      path: r.path,
      ...(PAGE_KEYWORDS[r.path] ? { role: PAGE_KEYWORDS[r.path].role, ownedKeywords: [...PAGE_KEYWORDS[r.path].primary, ...PAGE_KEYWORDS[r.path].secondary] } : {}),
    })),
    photos: Object.entries(IMG)
      .filter(([key]) => key !== "logo")
      .map(([key, img]) => ({ key, shows: img.alt, ...(img.note ? { note: img.note } : {}) })),
    doNotWrite: DO_NOT_WRITE,
  };
}

/** 事実の一覧に出てくる金額（「2,200円」の数字の部分）。記事の中の金額がここに無ければ、確認できない金額として弾く */
export function knownAmounts(facts) {
  return new Set([...JSON.stringify(facts).matchAll(/([\d,]+)\s*円/g)].map((m) => m[1].replace(/,/g, "")));
}

/** 事実の一覧に出てくる機種の型番らしき文字列（SL-3700、BLS-5 など） */
export function knownModelCodes(facts) {
  return new Set([...JSON.stringify(facts.machines).matchAll(/[A-Z]{1,4}-?\d{1,5}[A-Z0-9]*/g)].map((m) => m[0]));
}
