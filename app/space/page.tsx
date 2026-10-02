import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { MACHINE_PLANS, OTHER_PLANS } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { Price } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";

/**
 * 担当する検索意図：日暮里 レンタルスペース（＋レンタルルーム／貸しスペース／作業スペース／荒川区）。
 * 「会議室・パーティールームではなく、ものづくりに使える場所」という違いを伝えるページ。
 * ミシンの機種や洋裁の進め方は書かない（/sewing-machine・/handmade の担当）。
 */
export const metadata: Metadata = buildMetadata({
  title: "日暮里のレンタルスペース｜ものづくり・洋裁・作業に",
  description:
    "日暮里繊維街・東日暮里のレンタルスペース。作業台とミシン、裁断台がそろい、作品制作や共同作業、展示会・販売会に使えます。荒川区で、ものづくり向けの貸しスペース・作業スペースをお探しの方へ。",
  path: "/space",
  og: "space",
  keywords: ["日暮里 レンタルスペース", "日暮里 レンタルルーム", "日暮里 貸しスペース", "日暮里 作業スペース", "荒川区 レンタルスペース"],
});

const FEATURES = [
  {
    title: "道具が、はじめからある",
    body: "ミシン、アイロン、裁断台と裁ち鋏。机と椅子だけの貸しスペースでは持ち込むしかない道具を、その場で使えます。",
  },
  {
    title: "机が動くから、使い方が変わる",
    body: "作業台はキャスター付き。1台ずつ離して作業机に、合わせて大テーブルに、壁へ寄せて床を広く。内容に合わせて組み替えられます。",
  },
  {
    title: "生地の街の、なかにある",
    body: "1階は生地店、まわりは日暮里繊維街。材料を買ってすぐ作業に移れる立地は、ものづくりのためのレンタルスペースならではです。",
  },
];

const USES = [
  {
    group: "つくる",
    en: "Make",
    items: [
      { title: "作品制作", body: "イベント出展や展示に向けた制作の追い込みに。自宅では広げきれない材料や型紙も、一度に並べられます。" },
      { title: "共同制作", body: "衣装や舞台小道具、グループ展の作品など。同じテーブルを囲み、ホワイトボードで段取りを共有できます。" },
      { title: "アトリエとして", body: "決まった曜日に通う、制作の拠点に。自分の部屋とは別に「つくる場所」を持つと、気持ちの切り替えがしやすくなります。" },
      { title: "打ち合わせ・準備作業", body: "マルシェやイベントに向けた、出店者同士の打ち合わせや共同作業に。資料も試作品も広げたまま話せます。" },
    ],
  },
  {
    group: "学ぶ・教える",
    en: "Learn & Teach",
    items: [
      { title: "ワークショップ", body: "参加者が手を動かす会に必要な、机・椅子・道具がそろっています。" },
      { title: "講座・勉強会", body: "椅子を前向きに並べ、ホワイトボードを使った講座スタイルにも。少人数の勉強会にも向いています。" },
    ],
  },
  {
    group: "ひろがる",
    en: "Share",
    items: [
      { title: "展示会・作品発表会", body: "つくったものを見てもらう場に。制作の道具が並ぶ空間は、作品の背景まで伝えてくれます。" },
      { title: "販売会・ポップアップ", body: "ハンドメイド作品や生地、資材の販売会に。販売を伴うご利用は、内容をうかがったうえで貸切でお受けします。" },
      { title: "交流会・イベント", body: "同じ「好き」を持つ人が顔を合わせる場として。地域のコミュニティ活動にもお使いいただけます。" },
    ],
  },
];

const LAYOUTS = [
  { img: IMG.spaceLargeTable, title: "大テーブルの配置", body: "作業台を合わせて、囲んで使う大きなテーブルに。共同制作や打ち合わせ、編み会に。" },
  { img: IMG.layoutSeminar, title: "講座スタイル", body: "椅子を前向きに並べた配置。講座や説明会、トークイベントに。" },
  { img: IMG.layoutFloor, title: "床を広く使う配置", body: "作業台を壁側へ寄せて、中央を広く。大きなものを広げる制作や、展示・販売会に。" },
];

export default function SpacePage() {
  const faqs = pickFaqs(["how-to-reserve", "slots", "alone", "paid-workshop"]);
  const general = MACHINE_PLANS.rows[0].ex;
  return (
    <>
      <PageHero
        crumbs={[{ name: "レンタルスペース", path: "/space" }]}
        en="Rental Space"
        title={
          <>
            ものづくりに使える、
            <br />
            日暮里のレンタルスペース
          </>
        }
        lead="Nippori Share Base は、日暮里繊維街の生地店・齊藤商店の2階にあるレンタルスペースです。机と椅子だけの貸し会議室とは違い、ミシンやアイロン、裁断台といった道具がはじめからそろっています。"
        img={IMG.spaceTables}
        position="50% 60%"
      />

      {/* 位置づけ */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="left"
            en="Concept"
            title="会議室でも、パーティールームでもなく"
            lead="日暮里でレンタルスペースやレンタルルームを探すと、会議や撮影、パーティー向けの部屋が多く見つかります。Nippori Share Base が大切にしているのは、手を動かして何かをつくる時間です。"
          />
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-10">
            {FEATURES.map((f, i) => (
              <li key={f.title} data-reveal>
                <span aria-hidden className="display block text-4xl text-ink/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="stitch mt-3 w-full text-ink/30" aria-hidden />
                <h3 className="mt-5 text-xl">{f.title}</h3>
                <p className="mt-3 text-[0.95rem]">{f.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 使い方 */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="How to use" title="作業スペースとしての、9つの使い方" lead="「つくる」「学ぶ」「ひろがる」。Nippori Share Base の3つのキーワードに沿ってご紹介します。" />
          <div className="mt-12 space-y-12">
            {USES.map((g) => (
              <div key={g.group} className="grid gap-x-12 gap-y-4 lg:grid-cols-[13rem_1fr]" data-reveal>
                <h3 className="text-2xl">
                  「{g.group}」<span className="eyebrow mt-1 block text-sm font-normal text-ink/75">{g.en}</span>
                </h3>
                <dl className="rows [&>*]:border-ink/30">
                  {g.items.map((it) => (
                    <div key={it.title} className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[11rem_1fr]">
                      <dt className="font-round text-lg font-bold">{it.title}</dt>
                      <dd className="text-[0.95rem]">{it.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[0.95rem]">
            ミシンを使う洋裁は
            <Link href="/sewing-machine" className="link decoration-ink/40">
              ミシンのページ
            </Link>
            、編み物や手芸は
            <Link href="/handmade" className="link decoration-ink/40">
              洋裁・ハンドメイドのページ
            </Link>
            でご案内しています。
          </p>
        </Container>
      </section>

      {/* レイアウト */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Layout" title="内容に合わせて、配置を変える" lead="同じスペースが、目的によってこれだけ変わります。" />
          <ul className="mt-12 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {LAYOUTS.map((l, i) => (
              <li key={l.title} className={i === 1 ? "md:mt-10" : ""} data-reveal>
                <Photo img={l.img} ratio="aspect-[4/5]" sizes="(max-width: 767px) 100vw, 350px" />
                <h3 className="mt-5 text-lg">{l.title}</h3>
                <p className="mt-1.5 text-sm leading-7">{l.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* プラン */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Plans" title="使い方で選ぶプラン" lead="個人で使う日も、貸切でイベントをひらく日も。料金は税込で表示しています。" />
          <dl className="rows mt-10" data-reveal>
            <div className="flex items-center justify-between gap-4 py-5">
              <dt>
                <span className="font-round text-lg font-bold">ミシン利用</span>
                <span className="block text-sm">半日（Team AM／Team PM）・1人あたり</span>
              </dt>
              <dd className="shrink-0 text-right">
                <Price ex={general[0]} />
              </dd>
            </div>
            {OTHER_PLANS.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 py-5">
                <dt>
                  <span className="font-round text-lg font-bold">{p.name}</span>
                  <span className="block text-sm">{p.use}</span>
                </dt>
                <dd className="shrink-0 text-right">
                  <Price ex={p.ex} from={p.from} />
                  {p.unit ? <span className="block text-xs font-bold">{p.unit}あたり</span> : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8">
            <Link href="/price" className="link inline-flex items-center gap-1.5 text-sm">
              料金表をくわしく見る
              <ArrowIcon />
            </Link>
          </p>

          <div className="stitch-box mt-12 rounded-2xl px-6 py-6 text-ink/45 sm:px-8" data-reveal>
            <h3 className="text-lg text-ink">個人でのご利用と、貸切のちがい</h3>
            <p className="mt-3 text-[0.95rem] text-ink">
              ミシン利用・ハンドメイド利用は、ご自身の制作や仲間内の集まりのためのプランです。参加費・会費をいただく会や、商品の販売など収益を伴う活動は、原則として貸切利用でお申し込みください。内容をうかがったうえで、利用時間や料金をご案内します。
            </p>
            <p className="mt-3">
              <Link href="/workshop" className="link inline-flex items-center gap-1.5 text-sm text-ink">
                ワークショップ・イベントでの貸切利用
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* 場所 */}
      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Location" title="荒川区東日暮里、生地店の2階" />
          <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              所在地は {SITE.addressFull}。1階が生地店、階段を上がった2階が Nippori Share Base です。生地や副資材を買い足しながら作業できるので、イベントの材料調達にも便利です。
            </p>
          </div>
          <p className="mt-7">
            <Link href="/access" className="link inline-flex items-center gap-1.5 text-sm">
              地図と行き方
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="レンタルスペース利用のよくある質問" />
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
                { href: "/workshop", en: "Workshop", title: "ワークショップ・イベントをひらく", body: "開催できる内容、貸切の流れ、知っておきたいルール。" },
                { href: "/equipment", en: "Equipment", title: "設備・道具の一覧", body: "ミシンの機種、アイロン、裁断台、レーザー加工機など。" },
                { href: "/first-time", en: "First time", title: "初めての方へ", body: "予約から当日までの流れと、持ち物。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta variant="both" />
    </>
  );
}
