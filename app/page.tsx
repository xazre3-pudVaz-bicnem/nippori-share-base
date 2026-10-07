import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { MACHINE_PLANS, MENTOR, planById, priceText } from "@/data/pricing";
import { getAllColumns } from "@/lib/columns";
import { Budou, BudouLines } from "@/lib/budou";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { CTA_LABEL, RESERVE_PATH, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccessBlock } from "@/components/sections/AccessBlock";
import { ColumnCard } from "@/components/sections/ColumnCard";
import { FaqList } from "@/components/sections/FaqList";
import { MachineTypeGrid } from "@/components/sections/MachineTypeGrid";
import { Price } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

/**
 * トップページの役割：ブランドを伝える → 何ができるかを伝える → 自分に合う使い方のページへ送る → 予約。
 * くわしい説明は各ページに任せ、ここでは繰り返さない（検索語の担当は README の表を参照）。
 */
export const metadata: Metadata = buildMetadata({
  title: `日暮里のレンタルスペース・ミシン｜${SITE.name}`,
  rawTitle: true,
  description: SITE.description,
  path: "/",
  keywords: ["日暮里 レンタルスペース", "日暮里 ものづくり", "日暮里 シェアスペース", "日暮里繊維街 レンタルスペース"],
});

/** できること（旧サイトの文章をそのまま使用） */
const CAN_DO = [
  {
    title: "ものづくりを存分に楽しむ！",
    body: "ミシンやアイロンなどの道具を使って、好きな時間に自由にものづくり。自宅ではなかなかできない制作にも挑戦できます。レーザー加工機やカッティングマシーンなど、洋裁以外のものづくりも楽しめます。",
    href: "/handmade",
    link: "洋裁・ハンドメイドでの使い方",
  },
  {
    title: "学ぶ・教える",
    body: "洋裁やものづくりのワークショップ、講座や交流会など。「やってみたい人」と「教えたい人」をつなぐ場としてご利用いただけます。",
    href: "/workshop",
    link: "ワークショップをひらく",
  },
  {
    title: "イベント・展示会をひらく",
    body: "ワークショップや販売会、展示会、交流イベントなど、さまざまな用途でご利用いただけます。個人・チーム・企業を問わず、まずはお気軽にご相談ください。",
    href: "/workshop#private",
    link: "貸切利用について",
  },
];

/**
 * こんな場所です（文章は旧サイトのもの）。写真は 3 枚とも、実際の Nippori Share Base で撮ったもの。
 * レーザー加工はオーダー制（ご自身で操作する体験ではない）なので、2 つ目の文章だけ言い回しを合わせている。
 */
const SCENES = [
  {
    img: IMG.scenePattern,
    position: "50% 30%",
    title: "みんなでミシン",
    sub: "洋裁仲間との交流や情報交換",
    body: "普段おうちで一人でやっているミシンも、いつもと違う場所で、誰かとやったら新たなときめきや、思わぬ発見があるかも。",
  },
  {
    img: IMG.workPincushions,
    position: "50% 45%",
    title: "ハンドメイドを楽しく",
    sub: "ミシンだけじゃない",
    body: "みんなで集まって編み会をしたり。レーザー加工で、オリジナルグッズを作ったり。ハンドメイドの無限の可能性をみんなで楽しみましょう。",
  },
  {
    img: IMG.layoutSeminarBack,
    position: "50% 50%",
    title: "楽しさをシェア",
    sub: "ワークショップやイベント開催",
    body: "ハンドメイドが楽しくなってきたら今度はシェアする楽しみを。ワークショップやイベント開催でハンドメイドの楽しさをシェアしましょう。",
  },
];

/** 目的から、いちばん合うページへ（1 目的 1 リンク） */
const WAYS = [
  { want: "日暮里でミシンを使いたい", to: "ミシン", href: "/sewing-machine" },
  { want: "ものづくりに使えるレンタルスペースを探している", to: "スペース", href: "/space" },
  { want: "洋裁やハンドメイドを、広い机で進めたい", to: "洋裁・ハンドメイド", href: "/handmade" },
  { want: "ワークショップや展示会をひらきたい", to: "ワークショップ・イベント", href: "/workshop" },
];

const GALLERY = [
  { img: IMG.spaceTables, caption: "キャスター付きの作業台。1台ずつミシン台として使えます", ratio: "aspect-[4/5]" },
  { img: IMG.shelfLock, caption: "棚に並ぶロックミシンとカバーステッチミシン", ratio: "aspect-[4/5]" },
  { img: IMG.shelfHome, caption: "家庭用ミシンと職業用ミシン", ratio: "aspect-[4/5]" },
];

export default function HomePage() {
  const columns = getAllColumns().slice(0, 3);
  const faqs = pickFaqs(["how-to-reserve", "beginner", "bring", "textile-town"]);
  const general = MACHINE_PLANS.rows[0].ex;
  const media = SITE.media[0];

  return (
    <>
      {/* ───────── 1. ヒーロー：実際のスペースの写真を大きく。黄色のラベルに名前と予約の入口をまとめる ───────── */}
      <section className="pinked bg-sun lg:pb-10">
        <div className="relative mx-auto max-w-[100rem]">
          <div className="grid lg:grid-cols-[1.4fr_1fr] lg:gap-1.5">
            <div className="relative aspect-[5/6] bg-cream min-[480px]:aspect-[4/3] lg:aspect-auto lg:h-[clamp(35rem,74vh,45rem)]">
              <Image
                src={IMG.spaceMain.src}
                alt={IMG.spaceMain.alt}
                fill
                preload
                fetchPriority="high"
                quality={65}
                placeholder="blur"
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover object-[50%_40%] lg:object-[50%_56%]"
              />
            </div>
            <div className="relative hidden bg-cream lg:block">
              <Image
                src={IMG.spaceLargeTable.src}
                alt={IMG.spaceLargeTable.alt}
                fill
                // スマホでは非表示。lazy なので、表示されない画面では読み込まれない
                loading="lazy"
                quality={65}
                sizes="(max-width: 1023px) 1px, 42vw"
                className="object-cover object-[50%_58%]"
              />
            </div>
          </div>

          <div className="relative mx-3 -mt-20 rounded-[1.75rem] bg-sun px-5 pb-9 pt-7 text-center min-[480px]:mx-6 lg:absolute lg:bottom-0 lg:left-8 lg:mx-0 lg:mt-0 lg:w-[33rem] lg:rounded-b-none lg:px-10 lg:pb-4 lg:pt-9 lg:text-left xl:left-14">
            <h1>
              <span className="block font-round text-[0.84rem] font-bold tracking-[0.14em] sm:text-base">日暮里のものづくりレンタルスペース</span>
              <span className="display mt-2.5 block text-[clamp(2.45rem,12.4vw,3.6rem)] lg:text-[4.1rem]">
                Nippori
                <br />
                Share Base
              </span>
            </h1>
            <p className="mt-3.5 font-round text-[1.05rem] font-bold tracking-[0.2em] sm:text-xl">{SITE.tagline}</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href={RESERVE_PATH} className="btn btn-ink w-full max-w-xs px-5 sm:w-auto">
                {CTA_LABEL.general}
              </Link>
              <Link href="/first-time" className="btn btn-line w-full max-w-xs px-5 sm:w-auto">
                初めての方へ
              </Link>
            </div>
            <p className="mt-5 text-xs leading-6 sm:text-[0.82rem]">日暮里繊維街・齊藤商店の2階（東京都荒川区東日暮里）</p>
          </div>
        </div>
      </section>

      {/* ───────── 2. What about Nippori Share Base ───────── */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Image src={IMG.logo.src} alt={IMG.logo.alt} sizes="(max-width: 1023px) 70vw, 440px" className="mx-auto h-auto w-[68%] max-w-[27rem] lg:w-[82%]" data-reveal />
          <div className="text-center" data-reveal>
            <h2 className="tracking-normal">
              <span className="eyebrow block text-[2rem] sm:text-5xl">What about</span>
              <span className="display mt-1 block text-[2rem] sm:text-5xl">Nippori Share Base</span>
            </h2>
            {/* 旧サイトと同じ行分け。画面が狭くて 1 行に収まらないときも、文節の途中では折り返さない（lib/budou.tsx） */}
            <div className="mt-8 space-y-6 text-balance text-[0.95rem] leading-[1.75] sm:text-[1.05rem]">
              <p>
                <span className="block">ものづくりの街・日暮里から</span>
                <span className="block">
                  <strong>「やってみたい」</strong>をカタチに。
                </span>
              </p>
              <p>
                <BudouLines lines={["Nippori Share Baseは、", "日暮里繊維街・齊藤商店の2階にある、", "ものづくりのためのシェアスペースです。"]} />
              </p>
              <p>
                <BudouLines lines={["ミシンを使った作品づくりから、", "ワークショップやイベント、展示会まで。"]} />
              </p>
              <p>
                <BudouLines lines={["洋裁やものづくりへのハードルを少しでも下げ、", "「やってみたい！」を気軽にカタチにできる"]} />
              </p>
              <p>
                <BudouLines lines={["人とつながり、道具と出会い、", "「やってみたい」が生まれる"]} />
              </p>
              <p>
                <span className="block">
                  <strong>ヒト・モノ・コト</strong>
                  <Budou>が巡る場所であることが</Budou>
                </span>
                <BudouLines lines={["Nippori Share Baseの目指す空間です"]} />
              </p>
            </div>
            <p className="mt-9">
              <Link href="/about" className="link inline-flex items-center gap-1.5 text-sm">
                私たちについて
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ───────── 3. できること ───────── */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-center" data-reveal>
            <p className="eyebrow text-sm text-ink/80 sm:text-base">What we can do</p>
            <h2 className="mt-1 text-[2.6rem] font-medium tracking-[0.12em] sm:text-6xl">できること</h2>
            <div className="mt-7 space-y-5 text-[0.95rem] leading-[1.7] sm:text-base">
              <p>
                Nippori Share Baseでは、
                <br />
                ものづくりを楽しむための
                <br />
                さまざまな使い方ができます。
              </p>
              <p>
                <strong>「つくる」「学ぶ」「ひろがる」</strong>
              </p>
              <p>
                をキーワードに
                <br />
                あなたの<strong>「やってみたい」</strong>を
                <br />
                カタチにします。
              </p>
            </div>
          </div>
          <ol className="space-y-9 rounded-[2rem] bg-white px-6 py-9 sm:px-12 sm:py-14" data-reveal>
            {CAN_DO.map((c, i) => (
              <li key={c.title}>
                <h3 className="flex items-center gap-4 text-xl sm:text-2xl">
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-sans text-xl font-medium text-white">
                    {i + 1}
                  </span>
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.75] sm:text-base">{c.body}</p>
                <Link href={c.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm">
                  {c.link}
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────── 4. ミシン・設備のハイライト ───────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading en="Sewing machines" title="使えるミシン" lead="家庭用、職業用、ロック、カバーステッチ。日暮里でミシンを使える場所として、4種類をそろえています。" />
          <div className="mt-12 sm:mt-16">
            <MachineTypeGrid />
          </div>
          <p className="measure mx-auto mt-12 text-center text-[0.95rem]">
            ミシンのほかに、アイロン、裁断台、レーザー加工機、カッティングマシーンもあります。
            <Link href="/equipment" className="link">
              設備・道具の一覧
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── 5. 利用シーン ───────── */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container>
          <SectionHeading en="Scenes" title="こんな場所です" />
          <ul className="mt-12 grid gap-14 sm:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
            {SCENES.map((p) => (
              <li key={p.title} className="text-center" data-reveal>
                <Photo img={p.img} ratio="aspect-[4/5]" position={p.position} sizes="(max-width: 767px) 88vw, 360px" className="rounded-2xl" />
                <h3 className="mt-6 text-xl tracking-[0.1em] sm:text-2xl">{p.title}</h3>
                <p className="text-sm underline decoration-ink/60 underline-offset-4">{p.sub}</p>
                <p className="mx-auto mt-4 max-w-[20rem] text-[0.92rem] leading-[1.8]">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-20 max-w-3xl sm:mt-24">
            <h3 className="text-center text-xl sm:text-2xl">目的から、ページを選ぶ</h3>
            <ul className="rows mt-7">
              {WAYS.map((w) => (
                <li key={w.href} className="first:[&>a]:pt-0" data-reveal>
                  <Link href={w.href} className="group flex items-center justify-between gap-4 py-5">
                    <span className="text-[0.95rem] sm:text-base">{w.want}</span>
                    <span className="flex shrink-0 items-center gap-3 font-round text-sm font-bold sm:text-base">
                      <span className="hidden sm:inline">{w.to}</span>
                      <span aria-hidden className="grid size-9 place-items-center rounded-full bg-sun transition-[transform,background-color,color] duration-300 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-white">
                        <ArrowIcon />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───────── 6. 日暮里繊維街との関係 ───────── */}
      <section className="cv py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <Photo img={IMG.exterior} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 480px" position="50% 70%" />
          </div>
          <div data-reveal>
            <p className="eyebrow text-sm text-ash sm:text-base">Nippori Fabric Town</p>
            <h2 className="mt-1 text-[1.65rem] sm:text-4xl">
              生地・材料を買った、
              <br />
              その先へ。
            </h2>
            <div className="stitch mt-4 w-28" aria-hidden />
            <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                日暮里繊維街は、生地や手芸材料の店が軒を連ねる「生地の街」。Nippori Share Base は、その奥にある生地店・齊藤商店の2階にあります。
              </p>
              <p>
                気に入った生地を見つけたら、そのまま階段を上がって裁断し、ミシンに向かう。<strong>生地の街のなかにあるから、買うことと作ることがひと続きになります。</strong>
              </p>
            </div>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="/column/nippori-textile-town-after-shopping" className="link inline-flex items-center gap-1.5">
                生地を買ったあとにできること
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

      {/* ───────── 7. 実際のスペース ───────── */}
      <section className="cv pb-20 sm:pb-28">
        <Container>
          <SectionHeading align="left" en="The space" title="木の棚と作業台、黄色い椅子" lead="写真はすべて、実際の Nippori Share Base です。" />
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 md:grid-cols-3 md:gap-x-7">
            {GALLERY.map((g, i) => (
              <li key={g.caption} className={i === 0 ? "col-span-2 md:col-span-1" : ""} data-reveal>
                <figure>
                  <Photo img={g.img} ratio={i === 0 ? "aspect-[4/3] md:aspect-[4/5]" : g.ratio} sizes="(max-width: 767px) 92vw, 350px" position="50% 60%" />
                  <figcaption className="mt-3 text-[0.8rem] leading-6 sm:text-sm">{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link href="/space" className="link inline-flex items-center gap-1.5 text-sm">
              レンタルスペースとしての使い方・配置の例
              <ArrowIcon />
            </Link>
          </p>

          {/* メディア掲載（事実だけを小さく。記事の内容は転載しない） */}
          <div className="mt-16 border-y-2 border-dashed border-ink/20 py-5 text-sm sm:flex sm:items-baseline sm:gap-6" data-reveal>
            <p className="eyebrow shrink-0 text-xs text-ash">Media</p>
            <p className="mt-1 sm:mt-0">
              {media.outletNote}「{media.outlet}」で紹介されました（{formatDateJa(media.date)}）。
              <a href={media.url} target="_blank" rel="noopener noreferrer" className="link ml-1 inline-flex items-center gap-1">
                記事を読む
                <ExternalIcon />
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* ───────── 8. 料金の簡易案内 ───────── */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading en="Price" title="料金のめやす" lead="ミシンを使う場合は、半日または1日の枠でのご利用です（1人あたり）。" />
          <dl className="rows rows-top mt-10" data-reveal>
            <div className="flex items-center justify-between gap-4 py-5">
              <dt>
                <span className="font-round text-lg font-bold">ミシン利用（半日）</span>
                <span className="block text-xs sm:text-sm">Team AM 10:00〜13:30 ／ Team PM 14:00〜17:30</span>
              </dt>
              <dd className="shrink-0 text-right">
                <Price ex={general[0]} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-5">
              <dt>
                <span className="font-round text-lg font-bold">ミシン利用（1日）</span>
                <span className="block text-xs sm:text-sm">All Day 10:00〜17:30</span>
              </dt>
              <dd className="shrink-0 text-right">
                <Price ex={general[2]} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-5">
              <dt>
                <span className="font-round text-lg font-bold">裁断台利用</span>
                <span className="block text-xs sm:text-sm">{planById("cutting").unit}ごと・当日受付</span>
              </dt>
              <dd className="shrink-0 text-right">
                <Price ex={planById("cutting").ex} />
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-center">
            <Link href="/price" className="btn btn-cream">
              料金表を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── 9. 初めての方へ ───────── */}
      <section className="cv py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div data-reveal>
            <SectionHeading align="left" en="First time" title="初めての方へ" />
            <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                洋裁教室ではないので、決まった課題はありません。作りたいものと材料を持って、自分のペースでどうぞ。ミシンが久しぶりの方も、初めての方も歓迎しています。
              </p>
              <p>
                初めて使う機種は、スタッフの説明や案内を確認してから使いはじめます。一人で作るのが不安な方には、スタッフが製作をサポートする「{MENTOR.name}」（1時間 {priceText(MENTOR.exPerHour)}）もあります。
              </p>
            </div>
            <p className="mt-8">
              <Link href="/first-time" className="btn btn-sun">
                予約から当日までの流れ
                <ArrowIcon />
              </Link>
            </p>
          </div>
          <div data-reveal>
            <Photo img={IMG.stairsSign} ratio="aspect-[5/4]" sizes="(max-width: 1023px) 100vw, 480px" position="50% 55%" />
            <p className="mt-3 text-[0.8rem] leading-6 sm:text-sm">階段の案内サイン。1階の生地店から、2階の Nippori Share Base へ。</p>
          </div>
        </Container>
      </section>

      {/* ───────── 10. 最新コラム ───────── */}
      {columns.length > 0 ? (
        <section className="cv bg-butter py-20 sm:py-28">
          <Container>
            <SectionHeading align="left" en="Column" title="コラム・お知らせ" />
            <ul className="mt-10 grid gap-12 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
              {columns.map((c) => (
                <li key={c.slug}>
                  <ColumnCard column={c} />
                </li>
              ))}
            </ul>
            <p className="mt-10">
              <Link href="/column" className="link inline-flex items-center gap-1.5 text-sm">
                コラム・お知らせの一覧
                <ArrowIcon />
              </Link>
            </p>
          </Container>
        </section>
      ) : null}

      {/* ───────── 11. アクセス ───────── */}
      <section className="cv py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Access" title="アクセス" lead="日暮里繊維街の生地店・齊藤商店の2階。東京都荒川区東日暮里にあります。" />
          <div className="mt-10 sm:mt-12">
            <AccessBlock />
          </div>
        </Container>
      </section>

      {/* ───────── 12. FAQ（4問だけ。ほかは /faq へ） ─────────
          最後の区画には .cv を付けない（描画を後回しにすると、検査ツールがこの区画のリンクとフッターの位置を重なって測る） */}
      <section className="bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="よくある質問" />
          <div className="mt-9">
            <FaqList items={faqs} />
          </div>
          <p className="mt-8">
            <Link href="/faq" className="link inline-flex items-center gap-1.5 text-sm">
              すべての質問を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── 13. 予約 ───────── */}
      <ReserveCta variant="general" />
    </>
  );
}
