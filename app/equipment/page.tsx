import type { Metadata } from "next";
import Link from "next/link";
import { EQUIPMENT } from "@/data/equipment";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { ALL_MACHINE_NAMES, LIMITED_MACHINES, LIMITED_UNTIL, MACHINE_CATEGORIES } from "@/data/machines";
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
import { ReserveCta } from "@/components/sections/ReserveCta";

/**
 * 担当する検索意図：日暮里 ミシン 設備／日暮里 洋裁 設備 と、設備名・機種名での検索。
 * 機種ごとの説明（旧サイトのミシン一覧の文章）はこのページにまとめている。
 * 「日暮里でミシンを使える場所」という探し方への答えは /sewing-machine の担当。
 */
export const metadata: Metadata = buildMetadata({
  title: "日暮里のミシン・洋裁設備｜機種と道具の一覧",
  description:
    "Nippori Share Base の設備一覧。JANOME・JUKI・brother・baby lock の家庭用／職業用／ロック／カバーステッチミシンの機種名と特徴、アイロン、裁断台、レーザー加工機、カッティングマシーンを紹介します。",
  path: "/equipment",
  og: "sewing-machine",
  keywords: ["日暮里 ミシン 設備", "日暮里 洋裁 設備", "日暮里 ロックミシン", "日暮里 カバーステッチミシン", "日暮里 レーザー加工機"],
});

const TOOLS = EQUIPMENT.slice(4, 8);
const DIGITAL = EQUIPMENT.slice(8);
const whatOf = (categoryId: string) => EQUIPMENT.find((e) => e.id === `${categoryId}-machine`)?.what ?? "";

function EquipmentRow({ e, stacked = false }: { e: (typeof EQUIPMENT)[number]; /** 幅の狭い段組みの中で使うとき（名前と説明を縦に並べる） */ stacked?: boolean }) {
  return (
    <div id={e.id} className={`grid scroll-mt-4 gap-x-10 gap-y-2 py-7 ${stacked ? "" : "md:grid-cols-[15rem_1fr]"}`} data-reveal>
      <dt>
        <span className="eyebrow block text-xs text-ash">{e.en}</span>
        <span className="font-round text-xl font-bold">{e.name}</span>
        {e.model ? <span className="mt-0.5 block text-sm font-medium">機種：{e.model}</span> : null}
      </dt>
      <dd className="text-[0.95rem]">
        <p>{e.what}</p>
        <p className="mt-2 text-sm text-ash">向いている作業：{e.goodFor.join("、")}</p>
        {e.details ? (
          <dl className="mt-4 space-y-2.5 rounded-xl bg-butter px-4 py-4 text-sm leading-7 sm:px-5">
            {e.details.map((d) => (
              <div key={d.label} className="grid gap-x-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">{d.label}</dt>
                <dd>{d.body}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {e.ask ? <p className="mt-3 text-sm">＊{e.ask}</p> : null}
        {e.link ? (
          <Link href={e.link.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm">
            {e.link.label}
            <ArrowIcon />
          </Link>
        ) : null}
      </dd>
    </div>
  );
}

export default function EquipmentPage() {
  const faqs = pickFaqs(["other-equipment", "break-machine", "cutting-only"]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...itemListSchema("Nippori Share Base の設備・ミシンの機種", [...ALL_MACHINE_NAMES, ...[...TOOLS, ...DIGITAL].map((e) => e.name)].map((name) => ({ name }))),
        }}
      />

      <PageHero
        crumbs={[{ name: "設備・道具", path: "/equipment" }]}
        en="Equipment"
        title={["ミシンと洋裁の設備一覧。", "機種名と、使える道具"]}
        lead="Nippori Share Base にある設備を、機種名まで含めてまとめました。それぞれ「どんな道具で、何を作るのに向いているか」を、はじめての方にもわかるように説明します。"
        img={IMG.shelfLock}
        position="50% 60%"
      >
        <nav aria-label="設備の種類">
          <ul className="flex flex-wrap gap-2.5">
            <li>
              <a href="#machines" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                ミシンの機種
              </a>
            </li>
            <li>
              <a href="#tools" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                道具・作業台
              </a>
            </li>
            <li>
              <a href="#digital" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                レーザー加工機ほか
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      {/* ミシンの機種 */}
      <section id="machines" className="py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Sewing machines" title="ミシンの機種" lead="縫い方の得意分野が異なる4種類。メーカーと機種名、それぞれの特徴です。" />

          {MACHINE_CATEGORIES.map((c) => (
            <div key={c.id} id={`${c.id}-machine`} className="mt-16 scroll-mt-8 sm:mt-20">
              <div className="flex items-center gap-4 sm:gap-8">
                <h3 className="shrink-0 text-2xl sm:text-3xl">{c.name}</h3>
                <span className="stitch flex-1 text-ink/35" aria-hidden />
              </div>
              <p className="measure mt-4 text-[0.95rem]">{whatOf(c.id)}</p>
              <ul className={`mt-8 grid gap-6 sm:grid-cols-2 ${c.machines.length === 2 ? "lg:max-w-[52rem]" : "lg:grid-cols-3"}`}>
                {c.machines.map((m) => (
                  <li key={m.id}>
                    <MachineCard machine={m} categoryName={c.name} headingLevel="h4" />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="limited-machine" className="mt-16 scroll-mt-8 sm:mt-20">
            <div className="flex items-center gap-4 sm:gap-8">
              <h3 className="shrink-0 text-2xl sm:text-3xl">期間限定のミシン</h3>
              <span className="stitch flex-1 text-ink/35" aria-hidden />
            </div>
            <p className="measure mt-4 text-[0.95rem]">HappyJapan 様よりお借りしている SINGER のミシンです。設置は{LIMITED_UNTIL}の予定です。使ってみたい機種がある方は、ご予約時にお知らせください。</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LIMITED_MACHINES.map((m) => (
                <li key={m.id}>
                  <MachineCard machine={m} categoryName="期間限定ミシン" headingLevel="h4" square />
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-14 text-[0.95rem]">
            ミシンの使い方・料金・予約の流れは
            <Link href="/sewing-machine" className="link">
              ミシンのページ
            </Link>
            でご案内しています。
          </p>
        </Container>
      </section>

      {/* 道具と台 */}
      <section id="tools" className="pinked bg-sun py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Tools & tables" title="洋裁の道具と、作業する台" lead="縫う前後の工程を支える道具です。ミシンと同じくらい、仕上がりを左右します。" />
          <dl className="rows rows-top mt-10 [&>*]:border-ink/30">
            {TOOLS.map((e) => (
              <EquipmentRow key={e.id} e={e} />
            ))}
          </dl>
        </Container>
      </section>

      {/* デジタル工作 */}
      <section id="digital" className="py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <Photo img={IMG.workPincushions} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 420px" position="50% 40%" />
            <p className="mt-4 text-[0.8rem] leading-6 sm:text-sm">スペースのロゴを彫った木の板と、木の台を使ったアームピンクッション。</p>
          </div>
          <div>
            <SectionHeading align="left" en="Digital fabrication" title="洋裁以外のものづくりに" lead="レーザー加工機とカッティングマシーンがあります。レーザー加工はオーダー制、カッティングマシーンは時間単位でのご利用です。" />
            <dl className="rows rows-top mt-8">
              {DIGITAL.map((e) => (
                <EquipmentRow key={e.id} e={e} stacked />
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* お願い */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Please note" title="設備を使うときのお願い" />
          <ul className="rows mt-9 text-[0.95rem]">
            {[
              "設備は多くの方が共同で使うものです。譲り合いながら、大切にお使いください。",
              "初めて使う機種は、スタッフの説明または案内を確認してからお使いください。",
              "異音や不具合を感じたら、そのまま使い続けず、すぐにスタッフへお知らせください。",
              "使い終わった設備・備品は元の場所へ。備品や道具の持ち出しはできません。",
            ].map((t) => (
              <li key={t} className="py-4 first:pt-0" data-reveal>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7">
            ＊設備の内容は変わることがあります。使いたい設備が決まっている場合は、ご予約時にお問い合わせください。くわしいルールは
            <Link href="/terms" className="link">
              利用規約
            </Link>
            をご覧ください。
          </p>
        </Container>
      </section>

      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="設備についてのよくある質問" />
          <div className="mt-9">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <ReserveCta variant="general" />
    </>
  );
}
