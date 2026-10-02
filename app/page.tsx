import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { getAllColumns } from "@/lib/columns";
import { buildMetadata } from "@/lib/seo";
import { RESERVE_PATH, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccessBlock } from "@/components/sections/AccessBlock";
import { ColumnCard } from "@/components/sections/ColumnCard";
import { FaqList } from "@/components/sections/FaqList";
import { MachineTypeGrid } from "@/components/sections/MachineTypeGrid";
import { MachinePriceTable } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: `日暮里のレンタルスペース・ミシン・洋裁｜${SITE.name}`,
  rawTitle: true,
  description: SITE.description,
  path: "/",
  keywords: ["日暮里 レンタルスペース", "日暮里 レンタルルーム", "日暮里 ミシン", "日暮里 ものづくり", "日暮里繊維街", "荒川区 レンタルスペース"],
});

/** できること（現在の公式サイトの文章をそのまま使用） */
const CAN_DO = [
  {
    title: "ものづくりを存分に楽しむ！",
    body: "ミシンやアイロンなどの道具を使って、好きな時間に自由にものづくり。自宅ではなかなかできない制作にも挑戦できます。レーザー加工機やカッティングマシーンなど、洋裁以外のものづくりも楽しめます。",
    href: "/handmade",
    link: "ハンドメイド・洋裁での使い方",
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
    link: "貸切・イベント利用について",
  },
];

/** こんな場所です（現在の公式サイトの文章をそのまま使用） */
const PLACES = [
  {
    img: IMG.sceneSewing,
    title: "みんなでミシン",
    sub: "洋裁仲間との交流や情報交換",
    body: "普段おうちで一人でやっているミシンも、いつもと違う場所で、誰かとやったら新たなときめきや、思わぬ発見があるかも。",
    href: "/sewing-machine",
  },
  {
    img: IMG.sceneKnitting,
    title: "ハンドメイドを楽しく",
    sub: "ミシンだけじゃない",
    body: "みんなで集まって編み会をしたり。レーザー加工機を使って、オリジナルグッズを作ったり。ハンドメイドの無限の可能性をみんなで楽しみましょう。",
    href: "/handmade",
  },
  {
    img: IMG.sceneLaser,
    title: "楽しさをシェア",
    sub: "ワークショップやイベント開催",
    body: "ハンドメイドが楽しくなってきたら今度はシェアする楽しみを。ワークショップやイベント開催でハンドメイドの楽しさをシェアしましょう。",
    href: "/workshop",
  },
];

const USE_CASES = [
  {
    title: "生地を買った、その足で縫いたい",
    body: "日暮里繊維街で選んだ生地を、そのまま2階へ。裁断台で裁って、ミシンで縫いはじめられます。",
    href: "/sewing-machine#textile-town",
  },
  {
    title: "家にミシンがない、出すのが大変",
    body: "ミシンもアイロンも作業台も、使う時間だけ。置き場所や片付けを気にせず制作に集中できます。",
    href: "/sewing-machine",
  },
  {
    title: "ロックミシンを試してみたい",
    body: "買う前に、まず使ってみる。ロックミシンやカバーステッチミシンの仕上がりを自分の生地で確かめられます。",
    href: "/sewing-machine#lock",
  },
  {
    title: "大きな台で、まっすぐ裁断したい",
    body: "床に広げるしかなかった長い生地も、裁断台なら立ったまま。裁断だけの利用もできます。",
    href: "/equipment#cutting-table",
  },
  {
    title: "仲間と集まって、手を動かしたい",
    body: "編み会や手芸の集まりに。大テーブルを囲んで、おしゃべりしながら作る時間を。",
    href: "/handmade#together",
  },
  {
    title: "教えたい、見せたい、売りたい",
    body: "ワークショップ・講座・展示会・販売会の会場として。レイアウトは内容に合わせて組み替えられます。",
    href: "/workshop",
  },
];

const GALLERY = [
  { img: IMG.spaceTables, caption: "キャスター付きの作業台。1台ずつミシン台として使えます" },
  { img: IMG.shelfLock, caption: "棚に並ぶロックミシンとカバーステッチミシン" },
  { img: IMG.spaceLargeTable, caption: "作業台を合わせれば、囲んで使える大テーブルに" },
  { img: IMG.shelfHome, caption: "家庭用ミシンと職業用ミシン" },
  { img: IMG.layoutSeminar, caption: "椅子を並べた講座スタイルの配置" },
  { img: IMG.stairsSign, caption: "階段の案内サイン。1階の生地店から2階へ" },
];

const RECOMMEND = [
  "日暮里でミシンを使える場所を探している",
  "自宅では広げられない大きな生地を裁断したい",
  "職業用ミシンやロックミシンを、買う前に試してみたい",
  "一人で集中して、作品づくりを進めたい",
  "洋裁やハンドメイドの仲間と、同じ場所で手を動かしたい",
  "洋裁をはじめたいけれど、道具をそろえる前に試したい",
  "ワークショップ・講座・展示会・販売会の会場を探している",
];

export default function HomePage() {
  const columns = getAllColumns().slice(0, 3);
  const faqs = pickFaqs(["how-to-reserve", "beginner", "bring", "textile-town", "price"]);

  return (
    <>
      {/* ───────── ヒーロー：黄色い帯にロゴタイトル、その下に大きな写真とボタン ───────── */}
      <section className="bg-sun">
        <div className="mx-auto max-w-6xl px-4 pt-9 text-center sm:px-8 sm:pt-12 lg:pt-14">
          <h1>
            <span className="block font-round text-[0.82rem] font-bold tracking-[0.18em] sm:text-base">日暮里のものづくりレンタルスペース</span>
            <span className="display mt-3 block text-[clamp(3.3rem,18vw,4.75rem)] sm:mt-4 sm:text-[4.25rem] lg:text-[5.75rem]">
              Nippori <br className="sm:hidden" />
              Share <br className="sm:hidden" />
              Base
            </span>
          </h1>
          <p className="mt-4 font-round text-lg font-bold tracking-[0.22em] sm:mt-5 sm:text-2xl">{SITE.tagline}</p>

          <div className="relative mx-auto mt-8 max-w-[68.5rem] sm:mt-12">
            <div className="relative aspect-[6/7] overflow-hidden rounded-t-3xl bg-cream sm:aspect-[16/9] lg:aspect-[2.13/1]">
              <Image
                src={IMG.spaceMain.src}
                alt={IMG.spaceMain.alt}
                fill
                preload
                fetchPriority="high"
                quality={65}
                placeholder="blur"
                sizes="(max-width: 1127px) 100vw, 1096px"
                className="object-cover object-[50%_58%] sm:object-[50%_54%]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-[11%] flex flex-col items-center justify-center gap-3.5 px-6 sm:flex-row sm:gap-10 lg:gap-32">
              <Link href={RESERVE_PATH} className="btn w-56 bg-ink/85 text-white hover:bg-ink sm:w-64 lg:w-[17.5rem]">
                予約する
              </Link>
              <Link href="/sewing-machine" className="btn w-56 bg-ink/85 text-white hover:bg-ink sm:w-64 lg:w-[17.5rem]">
                ミシンリスト
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── What about Nippori Share Base ───────── */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Image
            src={IMG.logo.src}
            alt={IMG.logo.alt}
            sizes="(max-width: 1023px) 80vw, 480px"
            className="mx-auto h-auto w-[78%] max-w-[30rem] lg:w-full"
            data-reveal
          />
          <div className="text-center" data-reveal>
            <h2 className="tracking-normal">
              <span className="eyebrow block text-[2.1rem] sm:text-5xl">What about</span>
              <span className="display mt-1 block text-[2.1rem] sm:text-5xl">Nippori Share Base</span>
            </h2>
            <div className="mt-8 space-y-6 text-[0.95rem] leading-[1.75] sm:text-[1.05rem]">
              <p>
                ものづくりの街・日暮里から
                <br />
                <strong>「やってみたい」</strong>をカタチに。
              </p>
              <p>
                Nippori Share Baseは、
                <br />
                日暮里繊維街・齊藤商店の2階にある、
                <br />
                ものづくりのためのシェアスペースです。
              </p>
              <p>
                ミシンを使った作品づくりから、
                <br />
                ワークショップやイベント、展示会まで。
              </p>
              <p>
                洋裁やものづくりへのハードルを少しでも下げ、
                <br />
                「やってみたい！」を気軽にカタチにできる
              </p>
              <p>
                人とつながり、道具と出会い、
                <br />
                「やってみたい」が生まれる
              </p>
              <p>
                <strong>ヒト・モノ・コト</strong>が巡る場所であることが
                <br />
                Nippori Share Baseの目指す空間です
              </p>
            </div>
          </div>
        </Container>
        <Container size="narrow" className="mt-12 sm:mt-16">
          <div className="stitch-box rounded-3xl px-6 py-7 text-ink/60 sm:px-9" data-reveal>
            <p className="text-[0.95rem] text-ink">
              家庭用・職業用・ロック・カバーステッチの各ミシンに、アイロン、裁断台、広い作業台。日暮里でレンタルスペースやミシンを使える場所を探している方へ、道具ごと使える制作の拠点としてひらいています。会議室やパーティールームではなく、<strong>ものづくりのためのレンタルスペース</strong>です。
            </p>
            <p className="mt-4 text-right">
              <Link href="/space" className="link inline-flex items-center gap-1.5 text-sm text-ink">
                スペースについてくわしく
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ───────── できること ───────── */}
      <section className="bg-sun py-16 sm:py-24">
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
                ミシンや道具を使って自由に制作したり、
                <br />
                誰かに教えたり、イベントを開催したり。
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

      {/* ───────── 使えるミシン ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            en="Sewing machines"
            title="使えるミシン"
            lead="家庭用から職業用、ロック、カバーステッチまで。作りたいものに合わせて選べます。自宅にはない種類のミシンを、まず試してみる場所としてもどうぞ。"
          />
          <div className="mt-10 sm:mt-14">
            <MachineTypeGrid />
          </div>
          <p className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <Link href="/sewing-machine" className="link inline-flex items-center gap-1.5">
              日暮里で使えるミシンの機種一覧
              <ArrowIcon />
            </Link>
            <Link href="/equipment" className="link inline-flex items-center gap-1.5">
              ミシン以外の設備・道具
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── こんな場所です ───────── */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container>
          <SectionHeading en="Scenes" title="こんな場所です" />
          <ul className="mt-10 grid gap-12 sm:mt-14 md:grid-cols-3 md:gap-8">
            {PLACES.map((p) => (
              <li key={p.title} className="text-center" data-reveal>
                <Photo img={p.img} ratio="aspect-square" sizes="(max-width: 767px) 80vw, 300px" className="mx-auto max-w-[17rem] rounded-3xl" />
                <h3 className="mt-5 text-xl tracking-[0.1em] sm:text-2xl">{p.title}</h3>
                <p className="text-sm underline decoration-ink/60 underline-offset-4">{p.sub}</p>
                <p className="mx-auto mt-4 max-w-[19rem] text-[0.92rem] leading-[1.8]">{p.body}</p>
                <Link href={p.href} className="link mt-3 inline-flex items-center gap-1.5 text-sm">
                  くわしく見る
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── 利用シーン ───────── */}
      <section className="cv py-16 sm:py-24">
        <Container>
          <SectionHeading
            en="Use cases"
            title="こんなときに、どうぞ"
            lead="洋裁、ハンドメイド、共同制作、打ち合わせ、ワークショップ。使い方は一つではありません。"
          />
          <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <li key={u.title} data-reveal>
                <Link
                  href={u.href}
                  className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_0_0_2px_var(--color-line)] transition-shadow duration-300 hover:shadow-[0_0_0_3px_var(--color-sun-deep)]"
                >
                  <span aria-hidden className="display text-3xl text-ink/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg">{u.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7">{u.body}</p>
                  <span className="mt-3 inline-flex items-center gap-2 self-end text-sm font-bold">
                    <span className="grid size-7 place-items-center rounded-full bg-sun transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── 日暮里繊維街と Nippori Share Base ───────── */}
      <section className="cv bg-sun py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Photo img={IMG.exterior} ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 520px" position="50% 70%" />
          </div>
          <div data-reveal>
            <p className="eyebrow text-sm text-ink/80 sm:text-base">Nippori Textile Town</p>
            <h2 className="mt-1 text-[1.65rem] sm:text-4xl">
              生地・材料を買った、
              <br />
              その先へ。
            </h2>
            <div className="stitch mt-4 w-28" aria-hidden />
            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                日暮里繊維街は、生地や手芸材料の店が軒を連ねる「生地の街」。Nippori Share Base は、その一角にある生地店・齊藤商店の2階にあります。「FABRICS 齊藤商店」の黒板看板が目印です。
              </p>
              <p>
                気に入った生地を見つけたら、そのまま階段を上がって裁断し、ミシンに向かう。糸や副資材が足りなければ、また街へ。<strong>生地の街のなかにあるから、買うことと作ることがひと続きになります。</strong>
              </p>
              <p>生地や材料は、どのお店で選んだものでもお持ち込みいただけます。</p>
            </div>
            <p className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="/access" className="link inline-flex items-center gap-1.5 decoration-ink/40">
                アクセス・行き方
                <ArrowIcon />
              </Link>
              <Link href="/column/nippori-textile-town-after-shopping" className="link inline-flex items-center gap-1.5 decoration-ink/40">
                日暮里繊維街で生地を買ったあとにできること
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ───────── スペースの写真 ───────── */}
      <section className="cv py-16 sm:py-24">
        <Container>
          <SectionHeading en="Gallery" title="スペースの様子" lead="木の棚と作業台、黄色い椅子。手を動かす時間が心地よくなるように整えた、明るいスペースです。" />
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 md:grid-cols-3 md:gap-x-6">
            {GALLERY.map((g) => (
              <li key={g.caption} data-reveal>
                <figure>
                  <Photo img={g.img} ratio="aspect-[4/5]" sizes="(max-width: 767px) 46vw, 350px" className="rounded-2xl sm:rounded-3xl" />
                  <figcaption className="mt-2.5 text-[0.78rem] leading-6 sm:text-sm">{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href="/space" className="btn btn-line">
              レンタルスペースとしての使い方
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── おすすめな方 ───────── */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="For you" title="こんな方におすすめです" />
          <ul className="mt-10 space-y-3">
            {RECOMMEND.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 text-[0.95rem] shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
                <svg aria-hidden viewBox="0 0 24 24" className="mt-1.5 size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10.5" fill="var(--color-sun)" stroke="none" />
                  <path d="m7.5 12.5 3 3 6-6.5" />
                </svg>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-[0.95rem]">
            初めてのご利用で不安なことは、
            <Link href="/first-time" className="link">
              初めての方へ
            </Link>
            にまとめています。
          </p>
        </Container>
      </section>

      {/* ───────── イベント・ワークショップ ───────── */}
      <section className="cv py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2" data-reveal>
            <div className="grid grid-cols-2 gap-4">
              <Photo img={IMG.layoutSeminarBack} ratio="aspect-[3/4]" sizes="(max-width: 1023px) 46vw, 250px" className="rounded-2xl sm:rounded-3xl" />
              <Photo img={IMG.layoutFloor} ratio="aspect-[3/4]" sizes="(max-width: 1023px) 46vw, 250px" className="mt-8 rounded-2xl sm:rounded-3xl" />
            </div>
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Workshop & Event" title="ワークショップ・イベントをひらく" />
            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                講座、交流会、展示会、販売会。作業台はキャスター付きなので、椅子を並べた講座スタイルにも、床を広く使うレイアウトにも組み替えられます。
              </p>
              <p>
                学生・アマチュア・プロを問わずご利用いただけます。参加費をいただく会や販売を伴う会は貸切利用で、内容をうかがいながら一緒に形にしていきます。
              </p>
              <p>開催中のイベントやワークショップのお知らせは、Instagram で発信しています。</p>
            </div>
            <p className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/workshop" className="btn btn-sun">
                ワークショップ・イベント利用
                <ArrowIcon />
              </Link>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 text-sm">
                <InstagramIcon className="size-4" />
                Instagram を見る
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* ───────── 料金のめやす ───────── */}
      <section className="cv bg-sun py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Price" title="料金のめやす" lead="ミシンをご利用の場合の料金です（税抜・1人あたり）。ミシンを使わないハンドメイド利用や裁断台利用、貸切利用もあります。" />
          <div className="mt-9" data-reveal>
            <MachinePriceTable />
          </div>
          <p className="mt-8 text-center">
            <Link href="/price" className="btn btn-cream">
              料金表をくわしく見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── コラム ───────── */}
      {columns.length > 0 ? (
        <section className="cv py-16 sm:py-24">
          <Container>
            <SectionHeading en="Column" title="ものづくりのコラム" lead="ミシンの選び方、日暮里繊維街の楽しみ方、ワークショップのひらき方。つくる時間に役立つ読みものです。" />
            <ul className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {columns.map((c) => (
                <li key={c.slug}>
                  <ColumnCard column={c} />
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center">
              <Link href="/column" className="btn btn-line">
                コラム一覧
                <ArrowIcon />
              </Link>
            </p>
          </Container>
        </section>
      ) : null}

      {/* ───────── アクセス ───────── */}
      <section className="cv bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading en="Access" title="アクセス" lead="日暮里繊維街の生地店・齊藤商店の2階。東京都荒川区東日暮里にあります。" />
          <div className="mt-10 sm:mt-14">
            <AccessBlock />
          </div>
          <p className="mt-8 text-center">
            <Link href="/access" className="link inline-flex items-center gap-1.5 text-sm">
              入口・階段の写真つきの案内を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="よくある質問" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
          <p className="mt-9 text-center">
            <Link href="/faq" className="btn btn-line">
              すべての質問を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
