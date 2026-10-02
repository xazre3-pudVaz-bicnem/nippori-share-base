import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "日暮里のレンタルスペース｜ものづくりの貸しスペース",
  description:
    "日暮里繊維街・東日暮里のレンタルスペース。ミシンや作業台、裁断台を備え、洋裁・ハンドメイド・ワークショップ・展示会・販売会に使えます。荒川区で作業スペースや貸しスペースをお探しの方へ。",
  path: "/space",
  og: "space",
  keywords: ["日暮里 レンタルスペース", "日暮里 レンタルルーム", "日暮里 貸しスペース", "日暮里 作業スペース", "荒川区 レンタルスペース", "東日暮里 レンタルスペース"],
});

const FEATURES = [
  {
    title: "道具が、はじめからある",
    body: "家庭用・職業用・ロック・カバーステッチの各ミシン、アイロン、裁断台と裁ち鋏。机と椅子だけの貸しスペースでは持ち込むしかない道具を、その場で使えます。",
  },
  {
    title: "机が動くから、使い方が変わる",
    body: "作業台はキャスター付き。1台ずつ離してミシン台に、2台合わせて大テーブルに、壁へ寄せて床を広く。内容に合わせて配置を組み替えられます。",
  },
  {
    title: "生地の街の、なかにある",
    body: "1階は生地店、まわりは日暮里繊維街。材料を買ってすぐ作業に移れる立地は、ものづくりのためのレンタルスペースならではです。",
  },
];

const USES = [
  {
    group: "つくる",
    en: "Make",
    items: [
      { title: "洋裁", body: "型紙を写して裁断し、ミシンで縫い、アイロンで仕上げる。洋服づくりの一連の流れを、ひとつの場所で進められます。", plan: "ミシン利用" },
      { title: "ハンドメイド", body: "編み物、布小物、アクセサリーのパーツづくり。ミシンを使わない手仕事にも、広い机が役立ちます。", plan: "ハンドメイド利用" },
      { title: "作品制作", body: "イベント出展や展示に向けた制作の追い込みに。自宅では広げきれない材料や型紙も、一度に並べられます。", plan: "ミシン利用／ハンドメイド利用" },
      { title: "共同制作", body: "衣装や舞台小道具、グループ展の作品など。複数人で同じテーブルを囲み、ホワイトボードで段取りを共有できます。", plan: "ハンドメイド利用／貸切利用" },
      { title: "アトリエとして", body: "決まった曜日に通う、制作の拠点に。自分の部屋とは別に「つくる場所」を持つと、気持ちの切り替えがしやすくなります。", plan: "ミシン利用／ハンドメイド利用" },
    ],
  },
  {
    group: "学ぶ・教える",
    en: "Learn & Teach",
    items: [
      { title: "ワークショップ", body: "洋裁、編み物、クラフト。参加者が手を動かす会に必要な机・椅子・道具がそろっています。", plan: "貸切利用" },
      { title: "講座・勉強会", body: "椅子を前向きに並べ、ホワイトボードを使った講座スタイルにも。少人数の勉強会や打ち合わせにも向いています。", plan: "ハンドメイド利用／貸切利用" },
    ],
  },
  {
    group: "ひろがる",
    en: "Share",
    items: [
      { title: "展示会・作品発表会", body: "つくったものを見てもらう場に。制作の道具が並ぶ空間は、作品の背景まで伝えてくれます。", plan: "貸切利用" },
      { title: "販売会・ポップアップ", body: "ハンドメイド作品や生地、資材の販売会に。販売を伴うご利用は、事前に内容をうかがったうえで貸切でお受けします。", plan: "貸切利用" },
      { title: "交流会・イベント", body: "洋裁仲間の集まりや、地域のコミュニティ活動に。同じ「好き」を持つ人が顔を合わせる場としてお使いください。", plan: "貸切利用" },
    ],
  },
];

const LAYOUTS = [
  { img: IMG.spaceMain, title: "ふだんの配置", body: "作業台を1台ずつ並べた、ミシン利用の基本の形。それぞれの台で、自分の制作に集中できます。" },
  { img: IMG.spaceLargeTable, title: "大テーブルの配置", body: "作業台を合わせて、囲んで使う大きなテーブルに。編み会や共同制作、打ち合わせに。" },
  { img: IMG.layoutSeminar, title: "講座スタイル", body: "椅子を前向きに並べた配置。講座や説明会、トークイベントに。" },
  { img: IMG.layoutFloor, title: "床を広く使う配置", body: "作業台を壁側へ寄せて、中央を広く。大きなものを広げる制作や、展示・販売会の配置に。" },
];

const PLANS = [
  { name: "ミシン利用", when: "ミシンを使って洋裁・制作をする", price: "Team AM／Team PM 各 ¥2,000、All Day ¥4,000", reserve: "事前予約（空きがあれば当日も可）" },
  { name: "ハンドメイド利用", when: "ミシンを使わない手仕事・集まり", price: "¥3,000／半日（グループ利用可）", reserve: "事前予約" },
  { name: "裁断台利用", when: "生地の裁断だけしたい", price: "¥300／15分", reserve: "当日受付" },
  { name: "休憩利用", when: "買い物の合間にひと休み", price: "¥500／1時間（ワンドリンク制）", reserve: "当日受付" },
  { name: "貸切利用", when: "ワークショップ・展示会・販売会・イベント", price: "基本料金 ¥20,000〜（応相談）", reserve: "事前予約" },
];

export default function SpacePage() {
  const faqs = pickFaqs(["how-to-reserve", "slots", "alone", "paid-workshop", "private-price"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "レンタルスペース", path: "/space" }]}
        en="Rental Space"
        title={
          <>
            ものづくりに使える、
            <br />
            日暮里のレンタルスペース
          </>
        }
        lead="Nippori Share Base は、日暮里繊維街の生地店・齊藤商店の2階にあるレンタルスペースです。机と椅子だけの貸し会議室とは違い、ミシンやアイロン、裁断台といった道具がはじめからそろっています。"
        img={IMG.spaceTables}
        position="50% 60%"
      />

      {/* 位置づけ */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            en="Concept"
            title={
              <>
                会議室でも、パーティールームでもなく
              </>
            }
            lead="日暮里でレンタルスペースやレンタルルームを探すと、会議や撮影、パーティー向けの部屋が多く見つかります。Nippori Share Base が大切にしているのは、手を動かして何かをつくる時間です。"
          />
          <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="rounded-3xl bg-butter p-6 sm:p-7" data-reveal>
                <span aria-hidden className="display text-4xl text-ink/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl">{f.title}</h3>
                <p className="mt-3 text-[0.95rem]">{f.body}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.95rem]">
            東日暮里・荒川区周辺で、作業スペースや貸しスペースを探している方へ。使える道具は
            <Link href="/equipment" className="link">
              設備一覧
            </Link>
            に、ミシンの機種は
            <Link href="/sewing-machine" className="link">
              ミシンのページ
            </Link>
            にまとめています。
          </p>
        </Container>
      </section>

      {/* 使い方 */}
      <section className="bg-sun py-16 sm:py-24">
        <Container>
          <SectionHeading en="How to use" title="10の使い方" lead="「つくる」「学ぶ」「ひろがる」。Nippori Share Base が掲げる3つのキーワードに沿って、使い方をご紹介します。" />
          <div className="mt-10 space-y-10 sm:mt-14">
            {USES.map((g) => (
              <div key={g.group} className="rounded-[2rem] bg-white px-5 py-8 sm:px-10 sm:py-10" data-reveal>
                <h3 className="flex items-baseline gap-3 text-2xl">
                  「{g.group}」
                  <span className="eyebrow text-sm font-normal text-ash">{g.en}</span>
                </h3>
                <ul className="mt-6 grid gap-x-10 gap-y-7 md:grid-cols-2">
                  {g.items.map((it) => (
                    <li key={it.title}>
                      <h4 className="text-lg">{it.title}</h4>
                      <p className="mt-1.5 text-[0.95rem]">{it.body}</p>
                      <p className="mt-2 inline-block rounded-full bg-cream px-3 py-0.5 text-xs font-bold">{it.plan}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-9 text-center text-[0.95rem]">
            ワークショップや展示会・販売会の開催は、
            <Link href="/workshop" className="link decoration-ink/40">
              ワークショップ・イベント利用
            </Link>
            でくわしくご案内しています。
          </p>
        </Container>
      </section>

      {/* レイアウト */}
      <section className="cv py-16 sm:py-24">
        <Container>
          <SectionHeading en="Layout" title="内容に合わせて、配置を変える" lead="同じスペースが、目的によってこれだけ変わります。写真はすべて実際の Nippori Share Base です。" />
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {LAYOUTS.map((l) => (
              <li key={l.title} data-reveal>
                <Photo img={l.img} ratio="aspect-[4/5]" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 270px" />
                <h3 className="mt-4 text-lg">{l.title}</h3>
                <p className="mt-1.5 text-sm leading-7">{l.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* プラン */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container>
          <SectionHeading en="Plans" title="使い方で選ぶ、5つのプラン" lead="料金はすべて税抜です。ミシン利用は1人あたりの料金です。" />
          <ul className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((p) => (
              <li key={p.name} className="rounded-3xl bg-white p-6 shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-ash">{p.when}</p>
                <p className="mt-4 font-round text-[1.05rem] font-bold leading-7">{p.price}</p>
                <p className="mt-3 inline-block rounded-full bg-cream px-3 py-0.5 text-xs font-bold">{p.reserve}</p>
              </li>
            ))}
            <li className="flex items-center justify-center rounded-3xl bg-sun p-6" data-reveal>
              <Link href="/price" className="btn btn-cream w-full">
                料金表をくわしく見る
                <ArrowIcon />
              </Link>
            </li>
          </ul>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-6 text-[0.95rem] sm:p-8" data-reveal>
            <h3 className="text-lg">個人でのご利用と、貸切のちがい</h3>
            <p className="mt-3">
              ミシン利用・ハンドメイド利用は、ご自身の制作や仲間内の集まりのためのプランです。参加費・会費をいただく会や、商品の販売など収益を伴う活動は、原則として貸切利用でお申し込みください。内容をうかがったうえで、利用時間や料金をご案内します。
            </p>
          </div>
        </Container>
      </section>

      {/* 場所 */}
      <section className="cv py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Photo img={IMG.stairsSign} ratio="aspect-[4/3]" sizes="(max-width: 1023px) 100vw, 520px" position="50% 55%" />
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Location" title="荒川区東日暮里、生地店の2階" />
            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                所在地は東京都荒川区東日暮里4-33-3。日暮里繊維街にある生地店・齊藤商店の建物で、1階が生地店、階段を上がった2階が Nippori Share Base です。
              </p>
              <p>生地や副資材を買い足しながら作業できるので、ワークショップの材料調達にも便利です。</p>
            </div>
            <p className="mt-7">
              <Link href="/access" className="btn btn-line">
                アクセスを見る
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="レンタルスペース利用のよくある質問" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
          <p className="mt-8 text-center">
            <Link href="/faq" className="link inline-flex items-center gap-1.5 text-sm">
              ほかの質問を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <section className="cv py-16 sm:py-20">
        <Container>
          <SectionHeading en="Related" title="あわせて読みたい" />
          <div className="mt-10">
            <RelatedLinks
              items={[
                { href: "/sewing-machine", en: "Sewing Machine", title: "日暮里で使えるミシン", body: "家庭用・職業用・ロック・カバーステッチ。機種ごとの特徴をまとめました。" },
                { href: "/handmade", en: "Handmade", title: "ハンドメイド・洋裁の制作スペース", body: "一人で集中する日も、仲間と集まる日も。手仕事のための使い方。" },
                { href: "/workshop", en: "Workshop", title: "ワークショップ・イベントをひらく", body: "開催できる内容、貸切の流れ、知っておきたいルール。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
