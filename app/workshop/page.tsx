import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { planPriceText } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { CTA_LABEL, PRIVATE_PATH, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon, InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { PlanList } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { Steps } from "@/components/sections/Steps";

/**
 * 担当する検索意図：日暮里 ワークショップ（＋ワークショップ スペース、イベントスペース、展示会、販売会、荒川区 ワークショップ）。
 * 読むのは「会をひらきたい主催者」。予約導線は「貸切利用を相談する」を主にする。
 */
export const metadata: Metadata = buildMetadata({
  title: "日暮里のワークショップ・イベントスペース",
  description:
    "日暮里繊維街でワークショップや講座、展示会、販売会をひらくなら Nippori Share Base。作業台とミシンがそろい、レイアウトも自由。荒川区でワークショップ会場をお探しの主催者さまは、貸切利用をご相談ください。",
  path: "/workshop",
  og: "workshop",
  keywords: ["日暮里 ワークショップ", "日暮里 ワークショップ スペース", "日暮里 イベントスペース", "日暮里 展示会", "日暮里 販売会", "荒川区 ワークショップ"],
});

/** イベント利用規約 第1条の利用目的 */
const EVENT_TYPES = [
  { title: "ワークショップ・講座", body: "洋裁、編み物、クラフトなど。参加者が手を動かす会に必要な机と道具があります。" },
  { title: "展示会・作品発表会", body: "制作の成果を見てもらう場に。グループ展の会場としても。" },
  { title: "販売会・ポップアップ", body: "ハンドメイド作品や資材の販売に。販売内容は事前に確認させていただきます。" },
  { title: "イベント・交流会", body: "同じ趣味を持つ人が集まる会、作り手同士の情報交換の場に。" },
  { title: "撮影会", body: "作品や制作風景の撮影に。ライブ配信は基本的にお受けしていません。" },
  { title: "地域活動・コミュニティ活動", body: "地域の集まりや、個人で運営するコミュニティの活動拠点として。" },
];

const LAYOUTS = [
  { img: IMG.layoutSeminar, title: "講座スタイル", body: "椅子を前向きに並べ、正面に作業台を。実演を見せながら進める講座に。" },
  { img: IMG.layoutSeminarBack, title: "椅子を列に並べる", body: "後方から見た様子。説明会やトークイベントなど、聞く時間が中心の会に。" },
  { img: IMG.layoutFloor, title: "床を広く使う", body: "作業台を壁へ寄せ、中央を空けた配置。展示や、大きなものを広げる制作に。" },
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
  const faqs = pickFaqs(["event-types", "paid-workshop", "private-price", "event-food", "event-flow"]);
  const media = SITE.media[0];
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
      >
        <Link href={PRIVATE_PATH} className="btn btn-ink">
          {CTA_LABEL.private}
          <ArrowIcon />
        </Link>
      </PageHero>

      {/* 主催者へ */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="For organizers" title="「教えたい人」と「やってみたい人」をつなぐ場所" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
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
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="What you can hold" title="こんな会をひらけます" />
          <dl className="mt-10 grid gap-x-14 md:grid-cols-2">
            {EVENT_TYPES.map((e) => (
              <div key={e.title} className="border-t-2 border-dashed border-ink/30 py-6" data-reveal>
                <dt className="font-round text-lg font-bold">{e.title}</dt>
                <dd className="mt-1.5 text-[0.92rem]">{e.body}</dd>
              </div>
            ))}
          </dl>
          <p className="measure mt-6 text-sm leading-7">
            ＊内容や規模によっては、お受けできない場合があります。上記以外の内容も、当スペースが適切と判断したものはご利用いただけますので、まずはご相談ください。
          </p>
        </Container>
      </section>

      {/* これまでの利用例（第三者の記事で紹介された事実だけ。記事の文章は転載しない） */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="So far" title="これまでに、こんな使われ方をしています" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              {media.outletNote}「{media.outlet}」の記事では、これまでの利用例として、子どもたちが廃材でドレスを作ってファッションショーを行う会や、カッティングマシンの展示会、マルシェ出店者どうしの打ち合わせと共同作業などが紹介されています。
            </p>
            <p>ものづくりの会だけでなく、準備や打ち合わせの場としても使われています。</p>
          </div>
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href={media.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
              {media.outlet}の記事を読む
              <ExternalIcon />
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
              <InstagramIcon className="size-4" />
              イベントの様子は Instagram で
            </a>
          </p>
        </Container>
      </section>

      {/* レイアウト */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Layout" title="イベント時のレイアウト例" lead="作業台はキャスター付きで、動かして配置を変えられます。写真は実際に組んだ配置です。" />
          <ul className="mt-12 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {LAYOUTS.map((l, i) => (
              <li key={l.title} className={i === 1 ? "md:mt-10" : ""} data-reveal>
                <Photo img={l.img} ratio="aspect-[4/5]" sizes="(max-width: 767px) 100vw, 350px" />
                <h3 className="mt-5 text-lg">{l.title}</h3>
                <p className="mt-1.5 text-sm leading-7">{l.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm">
            定員や使える備品は、内容に合わせてご相談のうえ決めています。設備は
            <Link href="/equipment" className="link">
              設備・道具の一覧
            </Link>
            をご覧ください。
          </p>
        </Container>
      </section>

      {/* 貸切利用 */}
      <section id="private" className="cv scroll-mt-20 py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Private use" title="貸切利用の料金と時間" />
          <div className="mt-9">
            <PlanList only={["private"]} />
          </div>
          <dl className="rows mt-0 text-[0.95rem] [&>*:first-child]:border-t-0" data-reveal>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">利用時間</dt>
              <dd>原則として1日単位（9:00〜17:30）、または当スペースが定める時間帯。準備・設営・撤収・原状回復の時間を含みます。</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">料金</dt>
              <dd>利用内容によって変わるため、お申し込み時にご案内します。地域活動や個人で運営するコミュニティには、通常とは異なる料金を設定する場合があります。</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">日曜・祝日</dt>
              <dd>ご利用いただけます。カレンダーに表示のない日付をご希望の場合は、予約申込の際にその旨をご記載ください。</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="font-round font-bold">少人数の集まり</dt>
              <dd>
                参加費や販売を伴わない仲間内の集まりは、
                <Link href="/price#plan-handmade" className="link">
                  ハンドメイド利用（{planPriceText("handmade")}）
                </Link>
                もご利用いただけます。
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* 流れ */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Flow" title="開催までの5ステップ" />
          <div className="mt-9">
            <Steps items={STEPS} />
          </div>
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
      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Rules" title="開催前に知っておきたい4つのこと" />
          <dl className="rows mt-9">
            {RULES.map((r) => (
              <div key={r.title} className="py-6" data-reveal>
                <dt className="font-round text-lg font-bold">{r.title}</dt>
                <dd className="measure mt-1.5 text-[0.95rem]">{r.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="ワークショップ・イベントのよくある質問" />
          <div className="mt-9">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <section className="cv py-20 sm:py-24">
        <Container>
          <SectionHeading align="left" en="Next" title="次に読むなら" />
          <div className="mt-9">
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

      <ReserveCta variant="private" body="ワークショップ、展示会、販売会、交流会。「こんな会はできる？」という段階のご相談で構いません。開催したい内容と時期をお知らせください。" />
    </>
  );
}
