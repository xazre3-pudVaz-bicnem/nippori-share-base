import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { LIMITED_MACHINES, MACHINE_CATEGORIES } from "@/data/machines";
import { aboutPageSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { SITE, mailHref, telHref } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon, InstagramIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReserveCta } from "@/components/sections/ReserveCta";

/**
 * 「誰が、どこで、何のために運営している場所か」を伝えるページ。
 * 書いてよいのは確認できた事実だけ（docs/VERIFIED_FACTS.md）。運営メンバーの名前・経歴・資格は、
 * ご本人から提供されるまで書かない。第三者の記事に基づく内容には、出典を添える。
 */
export const metadata: Metadata = buildMetadata({
  title: "Nippori Share Base について｜私たちが目指す場所",
  rawTitle: true,
  description:
    "Nippori Share Base は、日暮里繊維街の生地店・齊藤商店の2階で運営している、ものづくりのためのシェアスペースです。コンセプト「ヒト・モノ・コトが巡る場所」と、できた背景、齊藤商店との関係をご紹介します。",
  path: "/about",
  keywords: ["Nippori Share Base", "Nippori Share Base 運営", "齊藤商店 日暮里", "日暮里繊維街 シェアスペース"],
});

export default function AboutPage() {
  const media = SITE.media[0];
  const donated = MACHINE_CATEGORIES.flatMap((c) => c.machines.filter((m) => m.note).map((m) => `${m.maker} ${m.model}`));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...aboutPageSchema() }} />

      <section className="pinked bg-sun">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-5 sm:px-8 sm:pb-20">
          <Breadcrumbs crumbs={[{ name: "私たちについて", path: "/about" }]} />
          <div className="mt-8 grid items-center gap-8 sm:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow text-base text-ink/80 sm:text-lg">About us</p>
              <h1 className="mt-2 text-[1.55rem] leading-[1.5] min-[400px]:text-[1.7rem] sm:text-4xl sm:leading-[1.4] lg:text-[2.5rem]">
                <span className="whitespace-nowrap">Nippori Share Base</span> について
                <span className="mt-1 block text-[0.72em] font-medium">私たちが目指す場所</span>
              </h1>
              <p className="measure mt-5 text-[0.95rem] sm:text-base">
                日暮里繊維街の生地店・齊藤商店の2階で、ものづくりのためのシェアスペースを運営しています。どんな場所で、なぜ始めたのかをお伝えします。
              </p>
            </div>
            <Image src={IMG.logo.src} alt={IMG.logo.alt} preload sizes="(max-width: 1023px) 60vw, 380px" className="mx-auto h-auto w-[58%] max-w-[23rem] lg:w-full" />
          </div>
        </div>
      </section>

      {/* コンセプト */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Concept" title="ヒト・モノ・コトが巡る場所" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              Nippori Share Base は、「ヒト・モノ・コトが巡る場所」をコンセプトにした、ものづくりのシェアスペースです。
            </p>
            <p>作品をつくるだけでなく、人と出会い、道具を試し、新しいアイデアが生まれる場所でありたいと考えています。</p>
            <p>初心者の方も、経験者の方も、それぞれのペースでものづくりを楽しみ、心地よく過ごせる空間を目指しています。</p>
          </div>
          <p className="mt-8 font-round text-lg font-bold tracking-wider sm:text-xl">「つくる」「学ぶ」「ひろがる」</p>
          <p className="measure mt-3 text-[0.95rem] sm:text-base">この3つをキーワードに、ものづくりの街・日暮里から、あなたの「やってみたい」をカタチにします。</p>
        </Container>
      </section>

      {/* 背景 */}
      <section className="bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Background" title="洋裁のハードルを、少しでも下げたい" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              ミシンは置き場所を取り、種類によってできることが違います。家では作業しづらい、買う前にいろいろ試したい。そう感じている人が、もっと気軽にものづくりを始められるように——そんな思いから、この場所は生まれました。
            </p>
            <p>
              Nippori Share Base は洋裁教室ではありません。決まった課題はなく、道具と場所、そして同じように手を動かす人たちがいます。{media.outlet}の取材では、「先生はいないけれど、詳しい先輩はいっぱいいる」という考え方が紹介されています。
            </p>
            <p>
              同じ記事によると、企画が始まったのは2026年の年明け。夏に内容を固め、{formatDateJa(SITE.openedOn)}に本格的に動きはじめました。それぞれ異なる分野と経験を持つ3人のメンバーで運営しています。
            </p>
          </div>
          <p className="mt-6 text-sm">
            <a href={media.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
              出典：{media.outlet}「{media.title}」
              <ExternalIcon />
            </a>
          </p>
        </Container>
      </section>

      {/* 齊藤商店・日暮里繊維街 */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <Photo img={IMG.exterior} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 480px" position="50% 70%" />
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Saito Shoten" title="生地店・齊藤商店の2階で" />
            <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                Nippori Share Base は、日暮里繊維街にある生地店・齊藤商店が運営しています。1階が生地店、階段を上がった2階がスペースです。店先には「Since 1947」と書かれた黒板看板が立っています。
              </p>
              <p>
                場所は、駅から繊維街を進んだ奥のほう。「奥日暮里」とも呼ばれるあたりです。生地や材料を買ったら、そのまま2階で裁断して、縫いはじめる。<strong>生地の街のなかにある</strong>ことが、この場所のいちばんの特徴です。
              </p>
              <p>月額会員の Chum&rsquo;s Sewing Club には、齊藤商店でのお買い物が割引になる特典もあります。</p>
            </div>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="/access" className="link inline-flex items-center gap-1.5">
                地図と行き方
                <ArrowIcon />
              </Link>
              <Link href="/chums-sewing-club" className="link inline-flex items-center gap-1.5">
                Chum&rsquo;s Sewing Club
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* モノが巡る */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Things go around" title="道具も、巡ってきます" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>スペースに並ぶミシンのなかには、譲っていただいたものや、お借りしているものがあります。</p>
          </div>
          <dl className="rows mt-7 text-[0.95rem] [&>*]:border-ink/30">
            <div className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[11rem_1fr]" data-reveal>
              <dt className="font-round font-bold">寄贈いただいたミシン</dt>
              <dd>{donated.join("、")}</dd>
            </div>
            <div className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[11rem_1fr]" data-reveal>
              <dt className="font-round font-bold">お借りしているミシン</dt>
              <dd>
                HappyJapan 様より、期間限定で SINGER のミシンをお借りしています（{LIMITED_MACHINES.map((m) => m.model).join("、")}）。
              </dd>
            </div>
          </dl>
          <p className="measure mt-6 text-[0.95rem]">使われなくなった道具が、次に使う人の手に渡る。そんな巡りも、この場所で起きていることのひとつです。</p>
          <p className="mt-6">
            <Link href="/equipment" className="link inline-flex items-center gap-1.5 text-sm decoration-ink/40">
              ミシンの機種と設備の一覧
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* メディア掲載 */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Media" title="メディア掲載" />
          <ul className="rows mt-9">
            {SITE.media.map((m) => (
              <li key={m.url} className="py-6" data-reveal>
                <p className="text-sm text-ash">
                  <time dateTime={m.date}>{formatDateJa(m.date)}</time>
                  <span className="mx-2" aria-hidden>
                    ／
                  </span>
                  {m.outletNote}「{m.outlet}」
                </p>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-flex items-start gap-1.5 text-[0.98rem]">
                  <span>{m.title}</span>
                  <ExternalIcon className="mt-1.5 size-4 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 基本情報 */}
      <section className="bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Information" title="基本情報" />
          <dl className="rows mt-9 text-[0.95rem]">
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-round font-bold">名称</dt>
              <dd>{SITE.name}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-round font-bold">運営</dt>
              <dd>{SITE.operator}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-round font-bold">所在地</dt>
              <dd>
                〒{SITE.postalCode}
                <br />
                {SITE.addressFull}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-round font-bold">電話番号</dt>
              <dd>
                <a href={telHref} className="link">
                  {SITE.tel}
                </a>
                <span className="text-sm">（{SITE.telNote}）</span>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-round font-bold">メール</dt>
              <dd className="break-all">
                <a href={mailHref} className="link">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-round font-bold">Instagram</dt>
              <dd>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                  <InstagramIcon className="size-4" />
                  {SITE.instagramHandle}
                </a>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <ReserveCta variant="both" />
    </>
  );
}
