import type { Metadata } from "next";
import Link from "next/link";
import { IMG } from "@/data/images";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { OtherPlanCards } from "@/components/sections/PriceTables";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "日暮里のハンドメイド・洋裁スペース｜アトリエにも",
  description:
    "日暮里でハンドメイドや洋裁を楽しむ制作スペース。一人で集中するソーイングにも、仲間と集まる編み会や手芸の時間にも。大きな作業台、ミシン、レーザー加工機がそろうアトリエです。",
  path: "/handmade",
  og: "handmade",
  keywords: ["日暮里 ハンドメイド", "日暮里 洋裁", "日暮里 ソーイング", "日暮里 手芸", "日暮里 制作スペース", "日暮里 アトリエ"],
});

const CRAFTS = [
  {
    title: "洋裁・ソーイング",
    body: "裁断台で生地を裁ち、ミシンで縫い、アイロンで整える。職業用ミシンやロックミシンを使えば、いつもの洋服づくりの仕上がりが一段変わります。",
    href: "/sewing-machine",
    link: "使えるミシンを見る",
  },
  {
    title: "編み物・編み会",
    body: "大テーブルを囲んで、それぞれの編み地を進める時間。わからないところを聞き合ったり、糸の情報を交換したり。一人で編むのとは違う楽しさがあります。",
    href: "/price#plan-handmade",
    link: "ハンドメイド利用の料金",
  },
  {
    title: "布小物・手芸",
    body: "ポーチ、バッグ、刺繍、パッチワーク。材料を広げる場所があるだけで、手芸はぐっと進めやすくなります。細かなパーツを並べたままにできる広さがあります。",
    href: "/equipment#work-table",
    link: "作業台・大テーブルについて",
  },
  {
    title: "オリジナルグッズづくり",
    body: "レーザー加工機で木のパーツやタグを切り出したり、カッティングマシーンで文字や図案を切り抜いたり。縫うだけではない、ハンドメイドの幅が広がります。",
    href: "/equipment#laser",
    link: "レーザー加工機・カッティングマシーン",
  },
];

export default function HandmadePage() {
  const faqs = pickFaqs(["alone", "bring", "cutting-only", "group", "kids", "photo"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "ハンドメイド・洋裁", path: "/handmade" }]}
        en="Handmade & Sewing"
        title={
          <>
            日暮里で、ハンドメイドと
            <br />
            洋裁を楽しむ制作スペース
          </>
        }
        lead="ミシンだけじゃない。編み物も、手芸も、オリジナルグッズづくりも。一人で黙々と進めたい日にも、誰かと一緒に手を動かしたい日にも使える、ものづくりのアトリエです。"
        img={IMG.sceneKnitting}
        position="50% 45%"
      />

      {/* 一人で／みんなで */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            en="Alone or together"
            title="一人で集中する日も、みんなで集まる日も"
            lead="Nippori Share Base では、交流への参加は自由です。制作に集中したい方も、おしゃべりを楽しみたい方も、それぞれが心地よく過ごせることを大切にしています。"
          />
          <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-2">
            <article className="overflow-hidden rounded-[2rem] bg-butter" data-reveal>
              <Photo img={IMG.spaceTables} ratio="aspect-[4/3]" sizes="(max-width: 767px) 100vw, 540px" className="" position="50% 62%" />
              <div className="p-6 sm:p-8">
                <p className="eyebrow text-sm text-ash">Alone</p>
                <h3 className="mt-1 text-xl sm:text-2xl">一人で、集中して</h3>
                <p className="mt-3 text-[0.95rem]">
                  家では家事や用事が目に入って、なかなか手が進まない。そんなときは場所を変えるのがいちばんです。自分の作業台に生地と道具を広げたら、あとは目の前の制作に向かうだけ。締め切りのある作品づくりや、イベント出展前の追い込みにも。
                </p>
              </div>
            </article>
            <article id="together" className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-butter" data-reveal>
              <Photo img={IMG.sceneSewing} ratio="aspect-[4/3]" sizes="(max-width: 767px) 100vw, 540px" className="" position="50% 40%" />
              <div className="p-6 sm:p-8">
                <p className="eyebrow text-sm text-ash">Together</p>
                <h3 className="mt-1 text-xl sm:text-2xl">仲間と、同じ場所で</h3>
                <p className="mt-3 text-[0.95rem]">
                  普段おうちで一人でやっているミシンも、いつもと違う場所で、誰かとやったら新たなときめきや、思わぬ発見があるかも。洋裁仲間との情報交換や、編み会、手芸の集まりに。ハンドメイド利用はグループでお使いいただけます。
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* できる手仕事 */}
      <section className="bg-sun py-16 sm:py-24">
        <Container>
          <SectionHeading en="What to make" title="ここでできる、ものづくり" lead="利用規約でも、洋裁・服飾・手芸・クラフトなどの制作活動を、このスペースの主な使い方として掲げています。" />
          <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
            {CRAFTS.map((c) => (
              <li key={c.title} className="flex flex-col rounded-3xl bg-white p-6 sm:p-8" data-reveal>
                <h3 className="text-xl">{c.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem]">{c.body}</p>
                <Link href={c.href} className="link mt-4 inline-flex items-center gap-1.5 self-start text-sm">
                  {c.link}
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 大きな机 */}
      <section className="cv py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Photo img={IMG.spaceLargeTable} ratio="aspect-[4/5]" sizes="(max-width: 1023px) 100vw, 520px" position="50% 55%" />
          </div>
          <div data-reveal>
            <SectionHeading align="left" en="Big table" title="大きな机が、制作を変える" />
            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-base">
              <p>
                洋裁でいちばん場所を取るのは、じつは裁断です。ワンピース1着分の生地は、広げると2メートルを超えることも珍しくありません。床に広げて膝をつく姿勢は、腰にも生地にもやさしくない。
              </p>
              <p>
                立ったまま使える高さの台に生地を広げると、布目をまっすぐ整えやすく、裁断の精度が上がります。型紙の配置を見渡せるので、生地の無駄も減らせます。
              </p>
              <p>
                編み物や手芸でも同じこと。編み図、糸、道具、飲み物。全部を手の届くところに置ける広さがあると、作業は途切れません。
              </p>
            </div>
            <p className="mt-7">
              <Link href="/column/large-work-table-benefits" className="link inline-flex items-center gap-1.5 text-sm">
                コラム：大きな作業台で洋裁をするメリット
                <ArrowIcon />
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* プラン */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container>
          <SectionHeading
            en="Plans"
            title="ミシンを使わない日のプラン"
            lead="ミシンを使う洋裁はミシン利用（Team AM／Team PM／All Day）で、ミシンを使わない手仕事は下のプランでご利用いただけます。料金は税抜です。"
          />
          <div className="mt-10 sm:mt-14">
            <OtherPlanCards only={["handmade", "cutting", "break"]} />
          </div>
          <p className="mt-9 text-center">
            <Link href="/price" className="btn btn-line">
              すべての料金を見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* 大切にしたいこと */}
      <section className="cv py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Our manner" title="この場所で大切にしたいこと" lead="利用者同士がお互いを尊重しながら過ごせるよう、次のことへのご協力をお願いしています。" />
          <ul className="mt-9 space-y-3 text-[0.95rem]">
            {[
              "設備や道具を大切に扱うこと",
              "初心者・経験者を問わず、お互いを尊重すること",
              "交流への参加は自由であり、それぞれの過ごし方を尊重すること",
              "次に利用する方が気持ちよく使えるよう、片付けや清掃に協力すること",
              "困ったことがあれば、一人で抱え込まずスタッフへ相談すること",
            ].map((t) => (
              <li key={t} className="stitch-box rounded-2xl px-5 py-3.5 text-ink/50" data-reveal>
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-sm">
            <Link href="/terms" className="link inline-flex items-center gap-1.5">
              利用規約を読む
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="ハンドメイド利用のよくある質問" />
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
                { href: "/sewing-machine", en: "Sewing Machine", title: "日暮里で使えるミシン", body: "家庭用・職業用・ロック・カバーステッチ。洋裁に使えるミシンの一覧。" },
                { href: "/workshop", en: "Workshop", title: "楽しさをシェアする", body: "ハンドメイドが楽しくなってきたら、ワークショップやイベントの開催も。" },
                { href: "/column/handmade-space-outside-home", en: "Column", title: "自宅以外でハンドメイドできる場所", body: "家の外に「つくる場所」を持つという選択肢について。" },
              ]}
            />
          </div>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
