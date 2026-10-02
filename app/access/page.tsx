import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { SITE, mailHref, telHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "アクセス｜日暮里繊維街・東日暮里の齊藤商店2F",
  description:
    "Nippori Share Base へのアクセス。所在地は東京都荒川区東日暮里4-33-3 齊藤商店2F。日暮里繊維街にある生地店の2階です。地図、入口と階段の写真、お問い合わせ先をご案内します。",
  path: "/access",
  keywords: ["Nippori Share Base アクセス", "日暮里繊維街 齊藤商店", "東日暮里 レンタルスペース", "荒川区 レンタルスペース"],
});

const WAY = [
  {
    img: IMG.exterior,
    position: "50% 75%",
    title: "「FABRICS 齊藤商店」の黒板看板が目印",
    body: "白い建物の1階が、生地店の齊藤商店です。入口に「FABRICS 齊藤商店」と書かれた黒板の立て看板、建物の角に縦長の「齊藤商店」の看板があります。",
  },
  {
    img: IMG.stairsSign,
    position: "50% 55%",
    title: "階段のサインに沿って、2階へ",
    body: "階段の壁に、木でつくった「1F → 2F Nippori Share Base」の案内サインがあります。そのまま階段を上がってください。",
  },
  {
    img: IMG.spaceTables,
    position: "50% 60%",
    title: "2階が Nippori Share Base",
    body: "木の棚と作業台が並ぶ明るいスペースです。着いたら、スタッフにお声がけください。",
  },
];

export default function AccessPage() {
  const faqs = pickFaqs(["where", "parking", "slots", "kids", "contact"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "アクセス", path: "/access" }]}
        en="Access"
        title={
          <>
            日暮里繊維街、
            <br />
            生地店・齊藤商店の2階です
          </>
        }
        lead="Nippori Share Base は、東京都荒川区東日暮里にあります。生地や手芸材料の店が集まる日暮里繊維街のなか、生地店の2階がものづくりのスペースです。"
        img={IMG.exterior}
        position="50% 72%"
      />

      {/* 店舗情報と地図 */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading en="Information" title="所在地・連絡先" />
          <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
            <dl className="divide-y-2 divide-dashed divide-ink/20 rounded-3xl bg-butter px-6 py-2 text-[0.95rem] sm:px-8" data-reveal>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">名称</dt>
                <dd>{SITE.name}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">所在地</dt>
                <dd>
                  〒{SITE.postalCode}
                  <br />
                  {SITE.addressFull}
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">電話番号</dt>
                <dd>
                  <a href={telHref} className="link">
                    {SITE.tel}
                  </a>
                  <span className="text-sm">（{SITE.telNote}）</span>
                  <span className="mt-1 block text-sm text-ash">1階の齊藤商店につながります。「Nippori Share Base の件」とお伝えください。</span>
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">メール</dt>
                <dd className="break-all">
                  <a href={mailHref} className="link">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">ご利用枠</dt>
                <dd>
                  {SITE.slots.map((s) => (
                    <span key={s.name} className="block">
                      {s.name}　{s.time}
                    </span>
                  ))}
                  <span className="mt-1 block text-sm text-ash">予約できる日は、空き状況カレンダーでご確認ください。</span>
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">運営</dt>
                <dd>{SITE.operator}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="font-round font-bold">Instagram</dt>
                <dd>
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                    <InstagramIcon className="size-4" />
                    {SITE.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>
            <MapEmbed />
          </div>
        </Container>
      </section>

      {/* 場所の説明 */}
      <section className="bg-sun py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Nippori Textile Town" title="日暮里・東日暮里・日暮里繊維街との位置関係" />
          <div className="mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              日暮里繊維街は、日暮里駅の東側から東日暮里にかけて、生地・手芸材料・服飾資材の店が通り沿いに並ぶエリアです。Nippori Share Base がある齊藤商店は、駅から繊維街を少し歩いた奥のほう、「奥日暮里」とも呼ばれるあたりにあります。
            </p>
            <p>
              住所は荒川区東日暮里4丁目。繊維街で生地を見ながら歩いてくると、ちょうど買い物の終わりごろにたどり着く場所です。
            </p>
            <p>
              駅からの所要時間は、歩く速さや立ち寄るお店によって変わります。正確な経路と時間は、地図の「経路を調べる」からご確認ください。
            </p>
          </div>
          <p className="mt-8 text-center">
            <a href={SITE.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
              Google マップで経路を調べる
              <ArrowIcon />
            </a>
          </p>
        </Container>
      </section>

      {/* 入口から2階まで */}
      <section className="cv py-16 sm:py-24">
        <Container>
          <SectionHeading en="How to enter" title="入口から2階まで、3つの目印" />
          <ol className="mt-10 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-6">
            {WAY.map((w, i) => (
              <li key={w.title} data-reveal>
                <Photo img={w.img} ratio="aspect-[4/3] md:aspect-[4/5]" position={w.position} sizes="(max-width: 767px) 100vw, 360px" />
                <h3 className="mt-4 flex gap-3 text-lg">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-base font-medium text-white">
                    {i + 1}
                  </span>
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-7">{w.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 繊維街とあわせて */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Enjoy the town" title="繊維街の買い物と、あわせて使う" />
          <div className="mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              生地を買ったあとに裁断だけ済ませたい方には「裁断台利用」、歩き疲れてひと休みしたい方には「休憩利用」があります。どちらも当日受付なので、買い物の流れのなかで立ち寄れます。
            </p>
            <p>
              ミシンを使って縫うところまで進めたい方は、事前のご予約がおすすめです。
            </p>
          </div>
          <p className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/price#other" className="link inline-flex items-center gap-1.5">
              裁断台利用・休憩利用の料金
              <ArrowIcon />
            </Link>
            <Link href="/sewing-machine" className="link inline-flex items-center gap-1.5">
              日暮里で使えるミシン
              <ArrowIcon />
            </Link>
            <Link href="/column/why-nippori-is-called-textile-town" className="link inline-flex items-center gap-1.5">
              コラム：日暮里が「生地の街」と呼ばれる理由
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <section className="cv py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="アクセスのよくある質問" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
