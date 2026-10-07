import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { LIMITED_MACHINES, LIMITED_UNTIL, MACHINE_CATEGORIES } from "@/data/machines";
import { MENTOR, OPTIONS } from "@/data/pricing";
import { SITE } from "@/lib/site";
import { Budou } from "@/lib/budou";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { MachineNameList } from "@/components/sections/MachineCard";
import { PageHero } from "@/components/sections/PageHero";
import { MachinePriceTable, Price, PriceInc } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { Steps } from "@/components/sections/Steps";

/**
 * 担当する検索意図：日暮里 ミシン／日暮里 レンタルミシン（＋ミシン レンタル、使える場所、繊維街 ミシン、荒川区 ミシン）。
 *
 * 「レンタルミシン」で探す人には、持ち帰りの貸し出しを想像している人もいる。
 * ここは「スペースに来て使う」場所なので、ページの冒頭ではっきり書く（誤解させる書き方はしない）。
 * 機種ごとのくわしい説明は /equipment の担当。このページは機種名の一覧からリンクするだけにする。
 */
export const metadata: Metadata = buildMetadata({
  title: "日暮里でミシンが使える場所・レンタルミシン",
  description:
    "日暮里繊維街でミシンを使える場所、Nippori Share Base。家庭用・職業用・ロック・カバーステッチミシンを、スペース内で半日・1日単位で使えます（持ち帰りの貸し出しではありません）。買った生地をその場で裁断・縫製。",
  path: "/sewing-machine",
  og: "sewing-machine",
  keywords: ["日暮里 ミシン", "日暮里 レンタルミシン", "日暮里 ミシン レンタル", "日暮里 ミシン 使える場所", "日暮里繊維街 ミシンレンタル", "荒川区 ミシン"],
});

const FLOW = [
  {
    title: "空き状況を見て予約",
    body: "カレンダーで空いている日と時間帯（Team AM／Team PM／All Day）を確認し、フォームから申し込みます。",
    link: { href: "/reserve", label: "空き状況を見る" },
  },
  { title: "生地と糸を用意して来店", body: "生地・型紙・糸・副資材はお持ち込みください。日暮里繊維街で選んだ生地を持って、そのまま2階へ上がれます。" },
  { title: "受付・お支払い", body: `当日の受付時にお支払いください（${SITE.payments.join("・")}が使えます）。初めて使う機種は、スタッフの説明や案内を確認してから使いはじめます。` },
  { title: "制作、そして片付け", body: "利用時間には準備と片付けも含まれます。使った道具を元の場所へ戻して終了です。" },
];


export default function SewingMachinePage() {
  const faqs = pickFaqs(["take-home", "which-machine", "beginner", "thread", "break-machine", "needle"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "ミシン", path: "/sewing-machine" }]}
        en="Sewing Machine"
        title="日暮里で、ミシンが使える場所"
        sub="スペースで使うレンタルミシン"
        lead="家庭用・職業用・ロック・カバーステッチ。日暮里繊維街の生地店の2階に、4種類のミシンをそろえています。ミシンを持ち帰るレンタルではなく、スペースに来て、半日または1日の枠で使うスタイルです。"
        img={IMG.shelfHome}
        position="50% 62%"
      >
        <nav aria-label="ミシンの種類">
          <ul className="flex flex-wrap gap-2.5">
            {MACHINE_CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                  {c.short}
                </a>
              </li>
            ))}
            <li>
              <a href="#limited" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                期間限定
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      {/* 導入 */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div data-reveal>
            <SectionHeading align="left" en="Why here" title="ミシンは「持つ」前に、「使ってみる」" />
            <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                ミシンは種類によって、できることがはっきり違います。直線をきれいに縫う職業用ミシン、布端をかがるロックミシン、Tシャツの裾を仕上げるカバーステッチミシン。すべてを自宅にそろえるのは、置き場所の面でも費用の面でも簡単ではありません。
              </p>
              <p>
                Nippori Share Base では、作りたいものに合わせてミシンを選び、必要な日だけ使えます。<strong>購入を迷っている機種を、自分の生地で試してみる</strong>という使い方もおすすめです。
              </p>
              <p>ミシンのそばにはアイロンと裁断台。裁つ・縫う・かがる・仕上げるまで、洋裁の流れが一か所で進みます。</p>
            </div>
            <div className="stitch-box mt-8 rounded-2xl px-5 py-4 text-ink/45">
              <p className="text-sm leading-7 text-ink">
                <strong>「レンタルミシン」について：</strong>
                ミシンを自宅へ持ち帰る貸し出しは行っていません。Nippori Share Base のスペース内でお使いいただく形です。
              </p>
            </div>
          </div>
          <div data-reveal>
            <Photo img={IMG.spaceYellowStool} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 460px" position="50% 60%" />
          </div>
        </Container>
      </section>

      {/* 種類ごと */}
      {MACHINE_CATEGORIES.map((c, i) => (
        <section key={c.id} id={c.id} className={`py-16 sm:py-24 ${i % 2 === 0 ? "bg-butter" : ""} ${i > 0 ? "cv" : ""}`}>
          <Container>
            {/* 旧サイトと同じ、並縫いの線で挟んだ見出し */}
            <div className="flex items-center gap-4 sm:gap-8" data-reveal>
              <span className="stitch flex-1" aria-hidden />
              <h2 className="shrink-0 text-center text-[1.6rem] sm:text-4xl">{c.name}</h2>
              <span className="stitch flex-1" aria-hidden />
            </div>
            <p className="eyebrow mt-2 text-center text-sm text-ash">{c.en}</p>

            <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div data-reveal>
                <p className="measure text-[0.98rem] sm:text-lg sm:leading-9">
                  <Budou>{c.lead}</Budou>
                </p>
                <ul className="mt-6 space-y-1.5 text-[0.95rem] font-medium">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden className={`mt-[0.7em] size-2.5 shrink-0 rounded-full ${c.tone}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 text-base">こんな作品・作業に</h3>
                <p className="measure mt-2 text-[0.95rem]">{c.goodFor.join("、")}。</p>
                <p className="measure mt-3 text-sm leading-7 text-ash">{c.recommend}</p>
              </div>
              <div data-reveal>
                <h3 className="text-base">使える{c.name}</h3>
                <div className="mt-3">
                  <MachineNameList machines={c.machines} categoryName={c.name} color={c.color} />
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* 期間限定 */}
      <section id="limited" className="cv bg-butter py-16 sm:py-24">
        <Container className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal>
            <Photo img={IMG.shelfSinger} ratio="aspect-[4/3]" sizes="(max-width: 1023px) 100vw, 440px" position="50% 55%" />
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Limited time" title="期間限定で使えるミシン" />
            <p className="measure mt-6 text-[0.95rem]">
              HappyJapan 様よりお借りしている SINGER のミシンです。設置は{LIMITED_UNTIL}の予定です。使ってみたい機種がある方は、ご予約時にお知らせください。
            </p>
            <div className="mt-5">
              <MachineNameList machines={LIMITED_MACHINES} categoryName="期間限定ミシン" color="var(--color-cat-limited)" topLine />
            </div>
          </div>
        </Container>
      </section>

      {/* 日暮里繊維街との関係 */}
      <section id="textile-town" className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Nippori Fabric Town" title="日暮里繊維街で買った生地を、その日のうちに" />
          <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              日暮里繊維街を歩いていると、「この生地で何か作りたい」という気持ちが湧いてきます。ところが家に帰るころには熱が冷めて、生地は棚の中へ——そんな経験はありませんか。
            </p>
            <p>
              Nippori Share Base は繊維街の生地店の2階。買ったばかりの生地を裁断台に広げ、その勢いのままミシンに向かえます。糸の色が合わなければ、すぐ買い足しに出られるのもこの場所ならではです。
            </p>
            <p>生地は、繊維街のどのお店で購入されたものでも、ご自宅からお持ちになったものでも構いません。</p>
          </div>
        </Container>
      </section>

      {/* 利用の流れ */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Flow" title="ミシン利用の流れ" />
          <div className="mt-9">
            <Steps items={FLOW} />
          </div>
        </Container>
      </section>

      {/* 料金と安心のしくみ */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Price" title="ミシン利用の料金" lead="1人あたりの料金です。準備と片付けの時間を含みます。" />
          <div className="mt-9" data-reveal>
            <MachinePriceTable />
          </div>
          <h3 className="mt-14 text-xl">安心して使うためのしくみ</h3>
          <dl className="rows mt-5 [&>*]:border-ink/30">
            {/* メンターサポート（予約申込フォームの記載による）＋利用規約に定めのあるオプション */}
            <div className="pb-5" data-reveal>
              <dt className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <span className="font-round text-lg font-bold">{MENTOR.name}</span>
                <span className="flex items-start gap-2">
                  <span className="pt-[0.3em] text-sm font-bold">1時間</span>
                  <Price ex={MENTOR.exPerHour} size="sm" />
                </span>
              </dt>
              <dd className="mt-1.5 text-[0.92rem]">
                {MENTOR.lead}
                {MENTOR.notes[0]}
              </dd>
            </div>
            {OPTIONS.map((o) => (
              <div key={o.name} className="py-5" data-reveal>
                <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-round text-lg font-bold">
                    {o.name}
                    {o.sub ? <span className="ml-2 text-xs font-medium">{o.sub}</span> : null}
                  </span>
                  <PriceInc inc={o.inc} prefix={o.prefix} />
                </dt>
                <dd className="mt-1.5 text-[0.92rem]">{o.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/first-time#mentor" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              メンターサポートについて
              <ArrowIcon />
            </Link>
            <Link href="/price" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              ミシンを使わないプランも含めた料金表
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="ミシン利用のよくある質問" />
          <div className="mt-9">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <section className="cv bg-butter py-20 sm:py-24">
        <Container>
          <SectionHeading align="left" en="Next" title="次に読むなら" />
          <div className="mt-9">
            <RelatedLinks
              items={[
                { href: "/equipment", en: "Equipment", title: "機種ごとの説明を見る", body: "各ミシンの特徴と、アイロン・裁断台などの道具。" },
                { href: "/column/home-vs-professional-sewing-machine", en: "Column", title: "家庭用ミシンと職業用ミシンの違い", body: "縫い目・パワー・できることの違いを、選ぶ基準と一緒に。" },
                { href: "/first-time", en: "First time", title: "初めての方へ", body: "持ち物と、予約から当日までの流れ。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta variant="general" title="使ってみたいミシンは、見つかりましたか。" />
    </>
  );
}
