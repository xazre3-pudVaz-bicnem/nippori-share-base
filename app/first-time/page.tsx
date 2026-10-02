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
import { Steps } from "@/components/sections/Steps";

export const metadata: Metadata = buildMetadata({
  title: "初めての方へ｜予約から当日までの流れと持ち物",
  description:
    "Nippori Share Base を初めて利用する方へ。予約から当日の流れ、持ち物、ミシン初心者の方や一人での利用についての不安にお答えします。洋裁教室ではないので、自分のペースで使えます。",
  path: "/first-time",
  keywords: ["Nippori Share Base 使い方", "日暮里 ミシン 初心者", "日暮里 洋裁 初めて"],
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
    link: { href: "/reserve", label: "空き状況を見て予約する" },
  },
  {
    title: "当日、齊藤商店の2階へ",
    body: "日暮里繊維街の生地店・齊藤商店が目印です。階段の壁にある木のサインに沿って2階へお上がりください。",
    link: { href: "/access", label: "地図と行き方" },
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

/** こんな方に（トップページから移した一覧） */
const RECOMMEND = [
  "日暮里でミシンを使える場所を探している",
  "自宅では広げられない大きな生地を裁断したい",
  "職業用ミシンやロックミシンを、買う前に試してみたい",
  "一人で集中して、作品づくりを進めたい",
  "洋裁やハンドメイドの仲間と、同じ場所で手を動かしたい",
  "洋裁をはじめたいけれど、道具をそろえる前に試したい",
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

      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Message" title="先生はいないけれど、道具と場所があります" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              Nippori Share Base は洋裁教室ではありません。決まった課題やカリキュラムはなく、作りたいものを、自分のペースで作る場所です。
            </p>
            <p>
              洋裁やものづくりへのハードルを少しでも下げて、「やってみたい！」を気軽にカタチにできるように。初心者の方も、経験者の方も歓迎しています。使い方に不安がある方向けに、メンターサポートという制度もあります（内容と料金はお問い合わせください）。
            </p>
          </div>

          <h3 className="mt-12 text-lg">こんな方に、使っていただきたい場所です</h3>
          <ul className="rows mt-4 text-[0.95rem]">
            {RECOMMEND.map((r) => (
              <li key={r} className="flex items-start gap-3 py-3.5" data-reveal>
                <span aria-hidden className="mt-[0.72em] size-2 shrink-0 rounded-full bg-sun-deep" />
                {r}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 流れ */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Flow" title="ご利用の5ステップ" />
          <div className="mt-9 [&_.rows>*]:border-ink/30">
            <Steps items={STEPS} />
          </div>
        </Container>
      </section>

      {/* 持ち物 */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading align="left" en="What to bring" title="持ち物" lead="ミシン、アイロン、裁断台はスペースにあります。お持ちいただくのは、作品の材料です。" />
            <dl className="rows mt-8">
              {BRING.map((b) => (
                <div key={b.title} className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[9rem_1fr]" data-reveal>
                  <dt className="font-round text-lg font-bold">{b.title}</dt>
                  <dd className="text-[0.95rem]">{b.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-7">＊火気を使うもの、危険物、強い臭気を発するもの、大量の粉塵や振動が発生するものなどは、お持ち込みをお断りする場合があります。</p>
          </div>
          <div className="mx-auto w-full max-w-sm lg:max-w-none" data-reveal>
            <Photo img={IMG.spaceYellowStool} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 384px, 420px" position="50% 60%" />
            <p className="mt-4 text-[0.8rem] leading-6 sm:text-sm">作業台とミシン、黄色いスツール。必要なものは手の届く範囲にあります。</p>
          </div>
        </Container>
      </section>

      {/* 不安に答える */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Q & A" title="はじめての方から、よくいただく質問" />
          <div className="mt-9">
            <FaqList items={firstGroup.items} />
          </div>
        </Container>
      </section>

      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="More" title="予約・料金・当日のこと" />
          <div className="mt-9">
            <FaqList items={more} />
          </div>
          <p className="mt-8">
            <Link href="/faq" className="link inline-flex items-center gap-1.5 text-sm">
              すべての質問を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <ReserveCta variant="general" title="まずは一度、使ってみませんか。" links={[{ href: "/sewing-machine", label: "使えるミシンを見る" }]} />
    </>
  );
}
