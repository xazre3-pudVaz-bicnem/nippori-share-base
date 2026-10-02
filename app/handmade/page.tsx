import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { planPriceText } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { PlanList } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";

/**
 * 担当する検索意図：日暮里 洋裁／日暮里 ハンドメイド（＋制作スペース、ソーイング、アトリエ、手芸）。
 * 「何を、どんなふうに作る場所か」を伝えるページ。ミシンの種類や機種は書かない（/sewing-machine・/equipment の担当）。
 */
export const metadata: Metadata = buildMetadata({
  title: "日暮里の洋裁・ハンドメイドスペース",
  description:
    "日暮里で洋裁やハンドメイドを楽しむ制作スペース。一人で集中するソーイングにも、仲間と集まる編み会や手芸の時間にも。広い作業台と裁断台がそろい、アトリエのように使えます。",
  path: "/handmade",
  og: "handmade",
  keywords: ["日暮里 洋裁", "日暮里 ハンドメイド", "日暮里 制作スペース", "日暮里 ソーイング", "日暮里 アトリエ", "日暮里 手芸"],
});

const CRAFTS = [
  {
    title: "洋裁・ソーイング",
    body: "裁断台で生地を裁ち、ミシンで縫い、アイロンで整える。洋服づくりの一連の流れを、ひとつの場所で進められます。",
    href: "/sewing-machine",
    link: "使えるミシン",
  },
  {
    title: "編み物・編み会",
    body: "大テーブルを囲んで、それぞれの編み地を進める時間。わからないところを聞き合ったり、糸の情報を交換したり。一人で編むのとは違う楽しさがあります。",
  },
  {
    title: "布小物・手芸",
    body: "ポーチ、バッグ、刺繍、パッチワーク。材料を広げる場所があるだけで、手芸はぐっと進めやすくなります。細かなパーツを並べたままにできる広さがあります。",
  },
  {
    title: "オリジナルグッズづくり",
    body: "レーザー加工機で木のパーツやタグを切り出したり、カッティングマシーンで文字や図案を切り抜いたり。縫うだけではない、ハンドメイドの幅が広がります。",
    href: "/equipment#digital",
    link: "レーザー加工機・カッティングマシーン",
  },
];

export default function HandmadePage() {
  const faqs = pickFaqs(["alone", "bring", "group", "kids", "photo"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "洋裁・ハンドメイド", path: "/handmade" }]}
        en="Handmade & Sewing"
        title={
          <>
            日暮里で、洋裁と
            <br />
            ハンドメイドを楽しむ制作スペース
          </>
        }
        lead="ミシンだけじゃない。編み物も、手芸も、オリジナルグッズづくりも。一人で黙々と進めたい日にも、誰かと一緒に手を動かしたい日にも使える、ものづくりのアトリエです。"
        img={IMG.sceneKnitting}
        position="50% 45%"
      />

      {/* 一人で／みんなで */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="left"
            en="Alone or together"
            title="一人で集中する日も、みんなで集まる日も"
            lead="Nippori Share Base では、交流への参加は自由です。制作に集中したい方も、おしゃべりを楽しみたい方も、それぞれが心地よく過ごせることを大切にしています。"
          />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div data-reveal>
              <p className="eyebrow text-sm text-ash">Alone</p>
              <h3 className="mt-1 text-xl sm:text-2xl">一人で、集中して</h3>
              <p className="measure mt-4 text-[0.95rem] sm:text-base">
                家では家事や用事が目に入って、なかなか手が進まない。そんなときは場所を変えるのがいちばんです。自分の作業台に生地と道具を広げたら、あとは目の前の制作に向かうだけ。締め切りのある作品づくりや、イベント出展前の追い込みにも。
              </p>
              <div className="stitch my-9 w-full text-ink/25" aria-hidden />
              <p id="together" className="eyebrow scroll-mt-28 text-sm text-ash">
                Together
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl">仲間と、同じ場所で</h3>
              <p className="measure mt-4 text-[0.95rem] sm:text-base">
                普段おうちで一人でやっているミシンも、いつもと違う場所で、誰かとやったら新たなときめきや、思わぬ発見があるかも。洋裁仲間との情報交換や、編み会、手芸の集まりに。ハンドメイド利用はグループでお使いいただけます。
              </p>
            </div>
            <div data-reveal>
              <Photo img={IMG.sceneSewing} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 520px" position="50% 40%" />
            </div>
          </div>
        </Container>
      </section>

      {/* できる手仕事 */}
      <section className="pinked bg-sun py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="What to make" title="ここでできる、ものづくり" lead="洋裁・服飾・手芸・クラフトなどの制作活動。利用規約でも、このスペースの主な使い方として掲げています。" />
          <dl className="rows mt-10 [&>*]:border-ink/30">
            {CRAFTS.map((c) => (
              <div key={c.title} className="grid gap-x-10 gap-y-2 py-7 md:grid-cols-[15rem_1fr]" data-reveal>
                <dt className="font-round text-xl font-bold">{c.title}</dt>
                <dd className="text-[0.95rem]">
                  <p className="measure">{c.body}</p>
                  {c.href ? (
                    <Link href={c.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm decoration-ink/40">
                      {c.link}
                      <ArrowIcon />
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 大きな机 */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div data-reveal>
            <Photo img={IMG.spaceLargeTable} swatch="sun" ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 500px" position="50% 55%" />
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Big table" title="大きな机が、制作を変える" />
            <div className="measure mt-7 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                洋裁でいちばん場所を取るのは、じつは裁断です。ワンピース1着分の生地は、広げると2メートルを超えることも珍しくありません。床に広げて膝をつく姿勢は、腰にも生地にもやさしくない。
              </p>
              <p>立ったまま使える高さの台に生地を広げると、布目をまっすぐ整えやすく、裁断の精度が上がります。型紙の配置を見渡せるので、生地の無駄も減らせます。</p>
              <p>編み物や手芸でも同じこと。編み図、糸、道具、飲み物。全部を手の届くところに置ける広さがあると、作業は途切れません。</p>
            </div>
            <p className="mt-8">
              <Link href="/column/large-work-table-benefits" className="link inline-flex items-center gap-1.5 text-sm">
                コラム：大きな作業台で洋裁をするメリット
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* プラン */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="left"
            en="Plans"
            title="ミシンを使わない日のプラン"
            lead={`編み物や手芸は「ハンドメイド利用」（${planPriceText("handmade")}）で。ミシンを使う洋裁は、ミシン利用（Team AM／Team PM／All Day）をお選びください。`}
          />
          <div className="mt-10">
            <PlanList only={["handmade", "cutting", "break"]} />
          </div>
          <p className="mt-9">
            <Link href="/price" className="link inline-flex items-center gap-1.5 text-sm">
              ミシン利用を含む料金表
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* 大切にしたいこと */}
      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Our manner" title="この場所で大切にしたいこと" lead="利用者同士がお互いを尊重しながら過ごせるよう、次のことへのご協力をお願いしています。" />
          <ul className="rows mt-9 text-[0.95rem]">
            {[
              "設備や道具を大切に扱うこと",
              "初心者・経験者を問わず、お互いを尊重すること",
              "交流への参加は自由であり、それぞれの過ごし方を尊重すること",
              "次に利用する方が気持ちよく使えるよう、片付けや清掃に協力すること",
              "困ったことがあれば、一人で抱え込まずスタッフへ相談すること",
            ].map((t) => (
              <li key={t} className="py-4" data-reveal>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/about" className="link inline-flex items-center gap-1.5">
              私たちが目指す場所
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="洋裁・ハンドメイド利用のよくある質問" />
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
                { href: "/sewing-machine", en: "Sewing Machine", title: "日暮里でミシンが使える場所", body: "家庭用・職業用・ロック・カバーステッチ。洋裁に使えるミシン。" },
                { href: "/workshop", en: "Workshop", title: "楽しさをシェアする", body: "ハンドメイドが楽しくなってきたら、ワークショップやイベントの開催も。" },
                { href: "/column/handmade-space-outside-home", en: "Column", title: "自宅以外でハンドメイドできる場所", body: "家の外に「つくる場所」を持つという選択肢について。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta variant="general" />
    </>
  );
}
