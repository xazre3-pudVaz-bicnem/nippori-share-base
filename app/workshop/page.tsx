import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { SITE, mailHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, InstagramIcon, MailIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { OtherPlanCards } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "日暮里のワークショップ・イベントスペース｜展示会にも",
  description:
    "日暮里繊維街でワークショップや講座、展示会、販売会をひらくなら Nippori Share Base。ミシンや作業台がそろい、レイアウトも自由。荒川区でワークショップ会場をお探しの主催者さまへ。",
  path: "/workshop",
  og: "workshop",
  keywords: ["日暮里 ワークショップ", "日暮里 ワークショップ スペース", "日暮里 イベントスペース", "荒川区 ワークショップ", "日暮里 展示会", "日暮里 販売会"],
});

/** イベント利用規約 第1条の利用目的 */
const EVENT_TYPES = [
  { title: "ワークショップ・講座", body: "洋裁、編み物、クラフトなど。参加者が手を動かす会に必要な机と道具があります。" },
  { title: "展示会・作品発表会", body: "制作の成果を見てもらう場に。卒業制作やグループ展の会場としても。" },
  { title: "販売会・ポップアップ", body: "ハンドメイド作品や資材の販売に。販売内容は事前に確認させていただきます。" },
  { title: "イベント・交流会", body: "同じ趣味を持つ人が集まる会、作り手同士の情報交換の場に。" },
  { title: "撮影会", body: "作品や制作風景の撮影に。ライブ配信は基本的にお受けしていません。" },
  { title: "地域活動・コミュニティ活動", body: "地域の集まりや、個人で運営するコミュニティの活動拠点として。" },
];

const LAYOUTS = [
  { img: IMG.layoutSeminar, title: "講座スタイル", body: "椅子を前向きに並べ、正面に作業台を。実演を見せながら進める講座に。" },
  { img: IMG.layoutSeminarBack, title: "椅子を列に並べる", body: "後方から見た様子。説明会やトークイベントなど、聞く時間が中心の会に。" },
  { img: IMG.layoutFloor, title: "床を広く使う", body: "作業台を壁へ寄せ、中央を空けた配置。展示や、大きなものを広げる制作に。" },
  { img: IMG.spaceLargeTable, title: "大テーブルを囲む", body: "作業台を合わせた島をつくる配置。手元を見せ合うワークショップに。" },
];

/** イベント利用規約 第3条・第4条 */
const STEPS = [
  { title: "ご相談・お申し込み", body: "利用希望日、内容、人数、利用目的をお知らせください。販売や参加費の徴収がある場合は、この時点でお伝えください。" },
  { title: "仮予約", body: "内容を確認のうえ、利用枠を一時的に確保します。この時点では、まだ予約は確定していません。" },
  { title: "本予約", body: "予約日の2週間前までに利用料金の50％をお支払いいただき、入金を確認した時点で本予約が確定します。" },
  { title: "残金のお支払い", body: "残りの50％は、開催日までにお支払いください。お支払いは店舗での現金手渡し、または銀行振込です。" },
  { title: "開催当日", body: "設営・準備から撤収・原状回復までを、利用時間内に行ってください。告知や参加者の受付は主催者さまにお願いしています。" },
];

const RULES = [
  { title: "飲食はできます。調理はできません", body: "飲み物やお菓子を出す会は開催できます。調理を伴う利用、火気や強い臭気を発するものの使用はできません。" },
  { title: "販売・参加費は事前に申告を", body: "商品販売や参加費を徴収するワークショップは、内容を事前にお知らせください。利用内容に応じた追加料金、または売上に応じた利用料をお願いする場合があります。" },
  { title: "告知は主催者さまで", body: "イベントの告知・宣伝は主催者さまご自身でお願いします。当スペースの名称・ロゴ・写真を使う場合は、事前にご相談ください。" },
  { title: "参加者の安全管理", body: "参加者・来場者の安全管理と人数管理は、主催者さまの責任で行ってください。お子さまが参加する会は、保護者またはスタッフによる見守りをお願いします。" },
];

export default function WorkshopPage() {
  const faqs = pickFaqs(["event-types", "paid-workshop", "private-price", "event-food", "event-flow", "photo"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "ワークショップ・イベント", path: "/workshop" }]}
        en="Workshop & Event"
        title={
          <>
            日暮里で、ワークショップや
            <br />
            展示会・販売会をひらく
          </>
        }
        lead="ハンドメイドが楽しくなってきたら、今度はシェアする楽しみを。Nippori Share Base は、教えたい人・見せたい人・集まりたい人のための会場としてもお使いいただけます。"
        img={IMG.sceneLaser}
        position="50% 50%"
      />

      {/* 主催者へ */}
      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="For organizers" title="「教えたい人」と「やってみたい人」をつなぐ場所" />
          <div className="mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              ワークショップの会場探しで悩ましいのは、道具の運搬です。ミシンを何台も持ち込むのは現実的ではありませんし、アイロンや裁断のできる台まで用意してくれる会議室は、そう多くありません。
            </p>
            <p>
              Nippori Share Base には、ミシン、アイロン、作業台、ホワイトボードがそろっています。どの設備を使うかは内容をうかがって一緒に決めるので、<strong>主催者さまは、教える内容と材料の準備に集中できます。</strong>しかも場所は日暮里繊維街。当日の材料の買い足しも、参加者との生地選びも、会場のすぐ外で叶います。
            </p>
            <p>学生・アマチュア・プロを問わずご利用いただけます。はじめての開催で不安な方も、まずは内容をお聞かせください。</p>
          </div>
        </Container>
      </section>

      {/* 開催できる内容 */}
      <section className="bg-sun py-16 sm:py-24">
        <Container>
          <SectionHeading en="What you can hold" title="こんな会をひらけます" />
          <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((e) => (
              <li key={e.title} className="rounded-3xl bg-white p-6" data-reveal>
                <h3 className="text-lg">{e.title}</h3>
                <p className="mt-2 text-sm leading-7">{e.body}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7">
            ＊内容や規模によっては、お受けできない場合があります。上記以外の内容も、当スペースが適切と判断したものはご利用いただけますので、まずはご相談ください。
          </p>
        </Container>
      </section>

      {/* レイアウト */}
      <section className="cv py-16 sm:py-24">
        <Container>
          <SectionHeading en="Layout" title="イベント時のレイアウト例" lead="作業台はキャスター付きで、動かして配置を変えられます。写真は実際に組んだ配置です。" />
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {LAYOUTS.map((l) => (
              <li key={l.title} data-reveal>
                <Photo img={l.img} ratio="aspect-[4/5]" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 270px" />
                <h3 className="mt-4 text-lg">{l.title}</h3>
                <p className="mt-1.5 text-sm leading-7">{l.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-9 text-center text-sm">
            定員や使える備品は、内容に合わせてご相談のうえ決めています。使える設備は
            <Link href="/equipment" className="link">
              設備一覧
            </Link>
            をご覧ください。
          </p>
        </Container>
      </section>

      {/* 貸切利用 */}
      <section id="private" className="cv scroll-mt-20 bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Private use" title="貸切利用の料金と時間" />
          <div className="mt-9">
            <OtherPlanCards only={["private"]} />
          </div>
          <dl className="mt-6 divide-y-2 divide-dashed divide-ink/20 rounded-3xl bg-white px-6 py-2 text-[0.95rem] sm:px-8" data-reveal>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">利用時間</dt>
              <dd>原則として1日単位（9:00〜17:30）、または当スペースが定める時間帯。準備・設営・撤収・原状回復の時間を含みます。</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">料金</dt>
              <dd>基本料金 ¥20,000（税抜）〜。利用内容によって変わるため、お申し込み時にご案内します。地域活動や個人で運営するコミュニティには、通常とは異なる料金を設定する場合があります。</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">日曜・祝日</dt>
              <dd>ご利用いただけます。カレンダーに表示のない日付をご希望の場合は、予約申込の際にその旨をご記載ください。</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">少人数の集まり</dt>
              <dd>
                参加費や販売を伴わない仲間内の集まりは、
                <Link href="/price#plan-handmade" className="link">
                  ハンドメイド利用（¥3,000／半日）
                </Link>
                もご利用いただけます。
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* 流れ */}
      <section className="cv py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Flow" title="開催までの5ステップ" />
          <ol className="mt-10 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-3xl bg-butter p-5 sm:gap-6 sm:p-7" data-reveal>
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-xl font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-7">
            ＊キャンセル規定を含む正式な条件は、
            <Link href="/terms/event" className="link">
              イベント利用規約
            </Link>
            をご確認ください。
          </p>
        </Container>
      </section>

      {/* ルール */}
      <section className="cv bg-sun py-16 sm:py-24">
        <Container>
          <SectionHeading en="Rules" title="開催前に知っておきたい4つのこと" />
          <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
            {RULES.map((r) => (
              <li key={r.title} className="rounded-3xl bg-white p-6 sm:p-8" data-reveal>
                <h3 className="text-lg">{r.title}</h3>
                <p className="mt-2 text-[0.95rem]">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 相談 */}
      <section className="cv py-16 sm:py-24">
        <Container size="narrow" className="text-center">
          <SectionHeading en="Contact" title="まずは、内容を聞かせてください" lead="「こんな会はできる？」「何人くらい入れる？」といった段階のご相談で構いません。開催したい内容と時期をお知らせください。" />
          <div className="mt-9 flex flex-col items-center gap-4" data-reveal>
            <Link href="/reserve" className="btn btn-sun w-full max-w-sm text-lg">
              予約・ご相談フォームへ
              <ArrowIcon />
            </Link>
            <a href={mailHref} className="btn btn-line w-full max-w-sm break-all text-sm">
              <MailIcon />
              {SITE.email}
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 text-sm">
              <InstagramIcon className="size-4" />
              これまでのイベントの様子は Instagram で
            </a>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="ワークショップ・イベントのよくある質問" />
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
                { href: "/column/how-to-choose-workshop-venue", en: "Column", title: "ワークショップ会場の選び方", body: "はじめて主催する人が、会場選びで確認しておきたいポイント。" },
                { href: "/space", en: "Space", title: "レンタルスペースとしての使い方", body: "スペースの特徴と、内容に合わせたプランの選び方。" },
                { href: "/terms/event", en: "Terms", title: "イベント利用規約", body: "予約の確定、お支払い、キャンセル、禁止事項などの正式な条件。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta title="ひらいてみたい会が、ありますか。" body="空き状況はカレンダーでご確認いただけます。カレンダーに表示のない日付の貸切も、ご相談に応じます。" secondary={{ href: "/terms/event", label: "イベント利用規約" }} />
    </>
  );
}
