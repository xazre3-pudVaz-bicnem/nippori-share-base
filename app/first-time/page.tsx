import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { FAQ_GROUPS, pickFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "初めての方へ｜ご利用の流れと持ち物・よくある不安",
  description:
    "Nippori Share Base を初めて利用する方へ。予約から当日の流れ、持ち物、ミシン初心者の方や一人での利用についての不安にお答えします。日暮里繊維街で買った生地の持ち込みもできます。",
  path: "/first-time",
  keywords: ["日暮里 ミシン 初心者", "日暮里 洋裁 初心者", "日暮里 ミシン 一人", "Nippori Share Base 使い方"],
});

const STEPS = [
  {
    title: "作りたいものと、使い方を決める",
    body: "ミシンを使うなら「ミシン利用」、編み物や手芸なら「ハンドメイド利用」。作りたいものが決まっていなくても大丈夫です。どのミシンが合うか迷ったら、ご相談ください。",
    link: { href: "/price", label: "プランと料金" },
  },
  {
    title: "空き状況を見て、予約する",
    body: "カレンダーで空いている日・時間帯を確認し、予約申込フォームを送信します。ご利用になる方お一人ずつ、個別にお申し込みください。",
    link: { href: "/reserve", label: "空き状況と予約フォーム" },
  },
  {
    title: "当日、齊藤商店の2階へ",
    body: "日暮里繊維街の生地店・齊藤商店が目印です。階段の壁にある木のサインに沿って2階へお上がりください。",
    link: { href: "/access", label: "アクセス" },
  },
  {
    title: "受付とお支払い、道具の案内",
    body: "受付で料金をお支払いください。初めて使う機種は、スタッフの説明や案内を確認してから使いはじめます。",
  },
  {
    title: "制作して、片付ける",
    body: "利用時間には準備と片付けも含まれます。終了時間までに作業を終え、使った道具を元の場所へ戻してください。",
  },
];

const BRING = [
  { title: "生地・型紙", body: "作るものに必要な分をお持ちください。日暮里繊維街で買ってから来ることもできます。" },
  { title: "ミシン糸", body: "原則として各自ご持参ください。試し縫い用の糸はご用意しています。忘れた場合は「いとシェア」（税込220円）もあります。" },
  { title: "副資材", body: "ファスナー、ボタン、接着芯、ゴムなど、作品に使うもの。" },
  { title: "使い慣れた道具", body: "まち針、チャコ、糸切りばさみなど。道具もお持ち込みいただけます。" },
];

export default function FirstTimePage() {
  const firstGroup = FAQ_GROUPS.find((g) => g.id === "first")!;
  const more = pickFaqs(["how-to-reserve", "price", "cancel", "break-machine", "kids", "parking"]);

  return (
    <>
      <PageHero
        crumbs={[{ name: "初めての方へ", path: "/first-time" }]}
        en="First Time"
        title={
          <>
            初めての方へ。
            <br />
            予約から当日までの流れ
          </>
        }
        lead="「ミシンは久しぶり」「一人で行っても平気？」——はじめての場所は、少し緊張するものです。当日の流れと、よくいただく質問をまとめました。"
        img={IMG.stairsSign}
        position="50% 55%"
      />

      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Message" title="ハードルを、少しでも低く" />
          <div className="mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              Nippori Share Base は、洋裁やものづくりへのハードルを少しでも下げて、「やってみたい！」を気軽にカタチにできる場所でありたいと考えています。
            </p>
            <p>
              初心者の方も、経験者の方も、それぞれのペースで。作品をつくるだけでなく、人と出会い、道具を試し、新しいアイデアが生まれる場所を目指しています。
            </p>
          </div>
        </Container>
      </section>

      {/* 流れ */}
      <section className="bg-sun py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Flow" title="ご利用の5ステップ" />
          <ol className="mt-10 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-3xl bg-white p-5 sm:gap-6 sm:p-7" data-reveal>
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-xl font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem]">{s.body}</p>
                  {s.link ? (
                    <Link href={s.link.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm">
                      {s.link.label}
                      <ArrowIcon />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 持ち物 */}
      <section className="cv py-16 sm:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading align="left" en="What to bring" title="持ち物" lead="ミシン、アイロン、裁断台はスペースにあります。お持ちいただくのは、作品の材料です。" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {BRING.map((b) => (
                <li key={b.title} className="rounded-3xl bg-butter p-5" data-reveal>
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-7">{b.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7">
              ＊火気を使うもの、危険物、強い臭気を発するもの、大量の粉塵や振動が発生するものなどは、お持ち込みをお断りする場合があります。
            </p>
          </div>
          <div data-reveal>
            <Photo img={IMG.spaceMain} ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 460px" position="50% 70%" />
            <p className="mt-3 text-sm leading-7">作業台、ミシン、アイロン台、道具を載せたワゴン。必要なものは手の届く範囲にあります。</p>
          </div>
        </Container>
      </section>

      {/* 不安に答える */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Q & A" title="はじめての方から、よくいただく質問" />
          <div className="mt-10">
            <FaqList items={firstGroup.items} />
          </div>
        </Container>
      </section>

      <section className="cv py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="More" title="予約・料金・当日のこと" />
          <div className="mt-10">
            <FaqList items={more} />
          </div>
          <p className="mt-9 text-center">
            <Link href="/faq" className="btn btn-line">
              すべての質問を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <ReserveCta title="まずは一度、使ってみませんか。" secondary={{ href: "/sewing-machine", label: "使えるミシンを見る" }} />
    </>
  );
}
