import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { ALL_MACHINE_NAMES, LIMITED_MACHINES, MACHINE_CATEGORIES } from "@/data/machines";
import { OPTIONS } from "@/data/pricing";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { MachineCard } from "@/components/sections/MachineCard";
import { PageHero } from "@/components/sections/PageHero";
import { MachinePriceTable } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "日暮里でミシンが使えるスペース｜職業用・ロックも",
  description:
    "日暮里繊維街でミシンを使うなら Nippori Share Base。家庭用・職業用・ロック・カバーステッチミシンを半日・1日の枠で利用できます。買った生地をその場で裁断・縫製。洋裁初心者の方も歓迎です。",
  path: "/sewing-machine",
  og: "sewing-machine",
  keywords: ["日暮里 ミシン", "日暮里 レンタルミシン", "日暮里 ミシン レンタル", "日暮里 ミシン スペース", "日暮里 繊維街 ミシン", "日暮里 洋裁", "荒川区 ミシン"],
});

const FLOW = [
  { title: "空き状況を見て予約", body: "カレンダーで空いている日と時間帯（Team AM／Team PM／All Day）を確認し、フォームから申し込みます。" },
  { title: "生地と糸を用意して来店", body: "生地・型紙・糸・副資材はお持ち込みください。日暮里繊維街で選んだ生地を持って、そのまま2階へ上がれます。" },
  { title: "受付・お支払い", body: "当日の受付時にお支払いください。初めて使う機種は、スタッフの説明や案内を確認してから使いはじめます。" },
  { title: "制作、そして片付け", body: "ミシン・アイロン・裁断台を使って制作。利用時間には準備と片付けも含まれます。使った道具を元の場所へ戻して終了です。" },
];

export default function SewingMachinePage() {
  const faqs = pickFaqs(["machine-types", "which-machine", "take-home", "beginner", "thread", "break-machine", "needle"]);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...itemListSchema("Nippori Share Base で使えるミシン", ALL_MACHINE_NAMES.map((name) => ({ name }))) }} />

      <PageHero
        crumbs={[{ name: "ミシン", path: "/sewing-machine" }]}
        en="Sewing Machine"
        title={
          <>
            日暮里で、ミシンを使う。
            <br />
            家庭用から職業用・ロックまで
          </>
        }
        lead="日暮里繊維街の生地店の2階に、家庭用・職業用・ロック・カバーステッチの各ミシンをそろえました。持ち帰りのレンタルではなく、スペースに来て、半日や1日の枠で使うスタイルです。"
        img={IMG.spaceMain}
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
          </ul>
        </nav>
      </PageHero>

      {/* 導入 */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div data-reveal>
            <SectionHeading align="left" en="Why here" title="ミシンは「持つ」前に、「使ってみる」" />
            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                ミシンは種類によって、できることがはっきり違います。直線をきれいに縫う職業用ミシン、布端をかがるロックミシン、Tシャツの裾を仕上げるカバーステッチミシン。すべてを自宅にそろえるのは、置き場所の面でも費用の面でも簡単ではありません。
              </p>
              <p>
                Nippori Share Base では、作りたいものに合わせてミシンを選び、必要な時間だけ使えます。<strong>購入を迷っている機種を、自分の生地で試してみる</strong>という使い方もおすすめです。
              </p>
              <p>ミシンのそばにはアイロンと裁断台。裁つ・縫う・かがる・仕上げるまで、洋裁の流れが一か所で完結します。</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" data-reveal>
            <Photo img={IMG.shelfLock} ratio="aspect-[3/4]" sizes="(max-width: 1023px) 46vw, 240px" className="rounded-2xl sm:rounded-3xl" />
            <Photo img={IMG.shelfHome} ratio="aspect-[3/4]" sizes="(max-width: 1023px) 46vw, 240px" className="mt-8 rounded-2xl sm:rounded-3xl" />
          </div>
        </Container>
      </section>

      {/* 種類ごと */}
      {MACHINE_CATEGORIES.map((c, i) => (
        <section key={c.id} id={c.id} className={`scroll-mt-20 py-16 sm:py-24 ${i % 2 === 0 ? "bg-sun" : "bg-cream"} ${i > 0 ? "cv" : ""}`}>
          <Container>
            {/* 現在の公式サイトと同じ、並縫いの線で挟んだ見出し */}
            <div className="flex items-center gap-4 sm:gap-8" data-reveal>
              <span className="stitch flex-1" aria-hidden />
              <h2 className="shrink-0 text-center text-[1.6rem] sm:text-4xl">{c.name}</h2>
              <span className="stitch flex-1" aria-hidden />
            </div>
            <p className="eyebrow mt-2 text-center text-sm text-ink/80">{c.en}</p>

            <p className="mx-auto mt-6 max-w-3xl text-[0.95rem] sm:text-center sm:text-lg sm:leading-9" data-reveal>
              {c.lead}
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-[1fr_1.15fr]" data-reveal>
              <div className="rounded-3xl bg-white p-6">
                <h3 className="text-base">3つのポイント</h3>
                <ul className="mt-3 space-y-1.5 text-[0.95rem] font-medium">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className={`mt-2.5 size-2.5 shrink-0 rounded-full ${c.tone}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white p-6">
                <h3 className="text-base">こんな作品・作業に</h3>
                <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                  {c.goodFor.map((g) => (
                    <li key={g} className="rounded-full bg-butter px-3 py-1 shadow-[0_0_0_1.5px_var(--color-line)]">
                      {g}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-7">{c.recommend}</p>
              </div>
            </div>

            <h3 className="mt-12 text-center text-xl sm:text-2xl">使える{c.name}</h3>
            <ul className={`mx-auto mt-6 grid gap-5 sm:grid-cols-2 ${c.machines.length === 2 ? "max-w-3xl" : "lg:grid-cols-3"}`}>
              {c.machines.map((m) => (
                <li key={m.id}>
                  <MachineCard machine={m} categoryName={c.name} headingLevel="h4" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      {/* 期間限定 */}
      <section id="limited" className="cv scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading
            en="Limited time"
            title="期間限定で使えるミシン"
            lead="HappyJapan 様よりお借りしている SINGER のミシンです。設置期間が限られるため、使ってみたい機種がある方は、ご予約時にお問い合わせください。"
          />
          <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {LIMITED_MACHINES.map((m) => (
              <li key={m.id}>
                <MachineCard machine={m} categoryName="期間限定ミシン" square />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 日暮里繊維街との関係 */}
      <section id="textile-town" className="cv scroll-mt-20 bg-butter py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Photo img={IMG.exterior} ratio="aspect-[4/3]" sizes="(max-width: 1023px) 100vw, 520px" position="50% 78%" />
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Nippori Textile Town" title="日暮里繊維街で買った生地を、その日のうちに" />
            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                日暮里繊維街を歩いていると、「この生地で何か作りたい」という気持ちが湧いてきます。ところが家に帰るころには熱が冷めて、生地は棚の中へ——そんな経験はありませんか。
              </p>
              <p>
                Nippori Share Base は繊維街の生地店の2階。買ったばかりの生地を裁断台に広げ、その勢いのままミシンに向かえます。糸の色が合わなければ、すぐ買い足しに出られるのもこの場所ならではです。
              </p>
              <p>生地は、繊維街のどのお店で購入されたものでも、ご自宅からお持ちになったものでも構いません。</p>
            </div>
            <p className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="/column/nippori-textile-town-after-shopping" className="link inline-flex items-center gap-1.5">
                日暮里繊維街で生地を買ったあとにできること
                <ArrowIcon />
              </Link>
              <Link href="/access" className="link inline-flex items-center gap-1.5">
                アクセス
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* 利用の流れ */}
      <section className="cv py-16 sm:py-24">
        <Container>
          <SectionHeading en="Flow" title="ミシン利用の流れ" />
          <ol className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <li key={f.title} className="relative rounded-3xl bg-butter p-6" data-reveal>
                <span aria-hidden className="grid size-11 place-items-center rounded-full bg-ink text-xl font-medium text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-7">{f.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-9 text-center">
            <Link href="/first-time" className="link inline-flex items-center gap-1.5 text-sm">
              初めての方へ：持ち物と当日の過ごし方
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* 料金と安心のしくみ */}
      <section className="cv bg-sun py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Price" title="ミシン利用の料金" lead="1人あたり・税抜の料金です。準備と片付けの時間を含みます。" />
          <div className="mt-9" data-reveal>
            <MachinePriceTable />
          </div>
          <h3 className="mt-12 text-center text-xl">安心して使うためのしくみ</h3>
          <ul className="mt-6 space-y-4">
            {OPTIONS.map((o) => (
              <li key={o.name} className="rounded-3xl bg-white p-6" data-reveal>
                <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-round text-lg font-bold">{o.name}</span>
                  <span className="rounded-full bg-cream px-3 py-0.5 text-sm font-bold">{o.price}</span>
                </p>
                <p className="mt-2 text-[0.92rem]">{o.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href="/price" className="btn btn-cream">
              料金表をくわしく見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="ミシン利用のよくある質問" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <section className="cv py-16 sm:py-20">
        <Container>
          <SectionHeading en="Related" title="あわせて読みたい" />
          <div className="mt-10">
            <RelatedLinks
              items={[
                { href: "/column/home-vs-professional-sewing-machine", en: "Column", title: "家庭用ミシンと職業用ミシンの違い", body: "縫い目・パワー・できることの違いを、選ぶ基準と一緒に整理しました。" },
                { href: "/column/what-is-overlock-machine", en: "Column", title: "ロックミシンとは？初心者向けに解説", body: "布端の始末とニットソーイング。ロックミシンでできることの基本。" },
                { href: "/equipment", en: "Equipment", title: "ミシン以外の設備・道具", body: "アイロン、裁断台、レーザー加工機、カッティングマシーンなど。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta title="使ってみたいミシンは、見つかりましたか。" />
    </>
  );
}
