import type { Metadata } from "next";
import Link from "next/link";
import { EQUIPMENT } from "@/data/equipment";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "設備・道具一覧｜ミシン・裁断台・レーザー加工機",
  description:
    "Nippori Share Base で使える設備の一覧。家庭用・職業用・ロック・カバーステッチミシン、アイロン、裁断台、作業台、レーザー加工機、カッティングマシーン。それぞれの用途を初心者向けに解説します。",
  path: "/equipment",
  og: "sewing-machine",
  keywords: ["日暮里 ミシン", "日暮里 ロックミシン", "日暮里 レーザー加工機", "日暮里 裁断台", "日暮里 作業スペース"],
});

const SEWING = EQUIPMENT.slice(0, 4);
const TOOLS = EQUIPMENT.slice(4, 8);
const DIGITAL = EQUIPMENT.slice(8);

function EquipmentCard({ e }: { e: (typeof EQUIPMENT)[number] }) {
  return (
    <li id={e.id} className="flex scroll-mt-28 flex-col rounded-3xl bg-white p-6 shadow-[0_0_0_2px_var(--color-line)] sm:p-7" data-reveal>
      <p className="eyebrow text-xs text-ash">{e.en}</p>
      <h3 className="mt-1 text-xl">{e.name}</h3>
      <p className="mt-3 text-[0.95rem]">{e.what}</p>
      <p className="mt-4 text-xs font-bold tracking-wider">こんな制作に</p>
      <ul className="mt-2 flex flex-wrap gap-2 text-sm">
        {e.goodFor.map((g) => (
          <li key={g} className="rounded-full bg-cream px-3 py-1">
            {g}
          </li>
        ))}
      </ul>
      {e.ask ? <p className="mt-4 rounded-2xl bg-butter px-4 py-3 text-sm leading-6">＊{e.ask}</p> : null}
      {e.link ? (
        <p className="mt-auto pt-4">
          <Link href={e.link.href} className="link inline-flex items-center gap-1.5 text-sm">
            {e.link.label}
            <ArrowIcon />
          </Link>
        </p>
      ) : null}
    </li>
  );
}

export default function EquipmentPage() {
  const faqs = pickFaqs(["other-equipment", "break-machine", "cutting-only", "bring"]);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...itemListSchema("Nippori Share Base の設備・道具", EQUIPMENT.map((e) => ({ name: e.name }))) }} />

      <PageHero
        crumbs={[{ name: "設備・道具", path: "/equipment" }]}
        en="Equipment"
        title={
          <>
            ミシンからレーザー加工機まで。
            <br />
            使える設備と道具
          </>
        }
        lead="Nippori Share Base にある、ものづくりのための設備をまとめました。それぞれ「どんな道具で、何を作るのに向いているか」を、はじめての方にもわかるように説明します。"
        img={IMG.shelfLock}
        position="50% 60%"
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading en="Sewing machines" title="ミシン（4種類）" lead="縫い方の得意分野が異なる4種類。作るものに合わせて使い分けます。" />
          <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
            {SEWING.map((e) => (
              <EquipmentCard key={e.id} e={e} />
            ))}
          </ul>
          <p className="mt-9 text-center">
            <Link href="/sewing-machine" className="btn btn-sun">
              機種の一覧を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <section className="bg-sun py-16 sm:py-24">
        <Container>
          <SectionHeading en="Tools & tables" title="洋裁の道具と、作業する台" lead="縫う前後の工程を支える道具です。ミシンと同じくらい、仕上がりを左右します。" />
          <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
            {TOOLS.map((e) => (
              <EquipmentCard key={e.id} e={e} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="cv py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div data-reveal>
              <Photo img={IMG.sceneLaser} ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 440px" />
            </div>
            <div>
              <SectionHeading align="left" en="Digital fabrication" title="洋裁以外のものづくりに" lead="レーザー加工機やカッティングマシーンなど、洋裁以外のものづくりも楽しめます。写真は、レーザー加工した木のパーツを使ったワークショップの様子です。" />
              <ul className="mt-8 grid gap-5">
                {DIGITAL.map((e) => (
                  <EquipmentCard key={e.id} e={e} />
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Please note" title="設備を使うときのお願い" />
          <ul className="mt-9 space-y-3 text-[0.95rem]">
            {[
              "設備は多くの方が共同で使うものです。譲り合いながら、大切にお使いください。",
              "初めて使う機種は、スタッフの説明または案内を確認してからお使いください。",
              "異音や不具合を感じたら、そのまま使い続けず、すぐにスタッフへお知らせください。",
              "使い終わった設備・備品は元の場所へ。備品や道具の持ち出しはできません。",
            ].map((t) => (
              <li key={t} className="rounded-2xl bg-white px-5 py-4 shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
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

      <section className="cv py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="設備についてのよくある質問" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
