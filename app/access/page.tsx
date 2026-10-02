import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { planPriceText } from "@/data/pricing";
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

/**
 * 担当する検索意図：Nippori Share Base アクセス（指名検索）。
 * 日暮里・東日暮里・荒川区・日暮里繊維街・齊藤商店との位置関係を、事実だけで説明する。
 * 駅からの所要時間は確認できていないので書かない（Google マップの経路案内へ送る）。
 */
export const metadata: Metadata = buildMetadata({
  title: "アクセス・地図｜日暮里繊維街 齊藤商店2F",
  description:
    "Nippori Share Base へのアクセス。所在地は〒116-0014 東京都荒川区東日暮里4-33-3 齊藤商店2F。日暮里繊維街の奥、日暮里中央通りから少し入った生地店の2階です。地図、入口と階段の写真、お問い合わせ先。",
  path: "/access",
  keywords: ["Nippori Share Base アクセス", "日暮里繊維街 齊藤商店", "東日暮里 レンタルスペース", "荒川区 東日暮里"],
});

export default function AccessPage() {
  const faqs = pickFaqs(["where", "parking", "slots", "contact"]);
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
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Information" title="所在地・連絡先" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <dl className="rows text-[0.95rem]" data-reveal>
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
                  <span className="mt-1 block text-sm text-ash">
                    予約できる日は
                    <Link href="/reserve" className="link">
                      空き状況カレンダー
                    </Link>
                    でご確認ください。
                  </span>
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
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Nippori Textile Town" title="日暮里・東日暮里・日暮里繊維街との位置関係" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              日暮里繊維街は、日暮里駅の東側から東日暮里にかけて、日暮里中央通りを中心に生地・手芸材料・服飾資材の店が並ぶエリアです。Nippori Share Base がある齊藤商店は、駅から繊維街を進んだ奥のほう、「奥日暮里」とも呼ばれるあたり。日暮里中央通りから少し入ったところにあります。
            </p>
            <p>住所は荒川区東日暮里4丁目。繊維街で生地を見ながら歩いてくると、買い物の終わりごろにたどり着く場所です。</p>
            <p>駅からの所要時間は、歩く速さや立ち寄るお店によって変わります。正確な経路と時間は、Google マップの経路案内でご確認ください。</p>
          </div>
          <p className="mt-8">
            <a href={SITE.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
              Google マップで経路を調べる
              <ArrowIcon />
            </a>
          </p>
        </Container>
      </section>

      {/* 入口から2階まで */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="How to enter" title="入口から2階まで" />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <ol className="rows self-start">
              {[
                {
                  title: "「FABRICS 齊藤商店」の黒板看板が目印",
                  body: "白い建物の1階が、生地店の齊藤商店です。入口に黒板の立て看板、建物の角に縦長の「齊藤商店」の看板があります（このページのいちばん上の写真）。",
                },
                { title: "階段のサインに沿って、2階へ", body: "階段の壁に、木でつくった「1F → 2F Nippori Share Base」の案内サインがあります。そのまま階段を上がってください。" },
                { title: "2階が Nippori Share Base", body: "木の棚と作業台が並ぶ明るいスペースです。着いたら、スタッフにお声がけください。" },
              ].map((w, i) => (
                <li key={w.title} className="flex gap-4 py-6" data-reveal>
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-lg font-medium text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg">{w.title}</h3>
                    <p className="mt-1.5 text-[0.95rem]">{w.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="grid grid-cols-2 gap-4 sm:gap-6" data-reveal>
              <figure>
                <Photo img={IMG.stairsSign} ratio="aspect-[3/4]" sizes="(max-width: 1023px) 46vw, 300px" position="50% 55%" />
                <figcaption className="mt-2.5 text-[0.78rem] leading-6 sm:text-sm">階段の案内サイン</figcaption>
              </figure>
              <figure className="mt-10">
                <Photo img={IMG.spaceYellowStool} ratio="aspect-[3/4]" sizes="(max-width: 1023px) 46vw, 300px" position="50% 60%" />
                <figcaption className="mt-2.5 text-[0.78rem] leading-6 sm:text-sm">2階の Nippori Share Base</figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* 繊維街とあわせて */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Enjoy the town" title="繊維街の買い物と、あわせて使う" />
          <div className="measure mt-8 space-y-5 text-[0.95rem] sm:text-base" data-reveal>
            <p>
              生地を買ったあとに裁断だけ済ませたい方には「裁断台利用」（{planPriceText("cutting")}）、歩き疲れてひと休みしたい方には「休憩利用」（{planPriceText("break")}・ワンドリンク制）があります。どちらも当日受付なので、買い物の流れのなかで立ち寄れます。
            </p>
            <p>ミシンを使って縫うところまで進めたい方は、事前のご予約がおすすめです。</p>
          </div>
          <p className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/column/why-nippori-is-called-textile-town" className="link inline-flex items-center gap-1.5">
              コラム：日暮里が「生地の街」と呼ばれる理由
              <ArrowIcon />
            </Link>
            <Link href="/about" className="link inline-flex items-center gap-1.5">
              齊藤商店と Nippori Share Base
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="アクセスのよくある質問" />
          <div className="mt-9">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <ReserveCta variant="general" />
    </>
  );
}
