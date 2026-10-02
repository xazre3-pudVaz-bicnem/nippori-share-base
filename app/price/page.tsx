import type { Metadata } from "next";
import Link from "next/link";
import { CANCEL_POLICY, CLUB, MACHINE_PLANS, OPTIONS, OTHER_PLAN_NOTES, PRICE_AS_OF, planPriceText, priceText } from "@/data/pricing";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { MachinePriceTable, Notes, PlanList } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

const general = MACHINE_PLANS.rows[0].ex;

export const metadata: Metadata = buildMetadata({
  title: "料金表（税込）｜ミシン利用・ハンドメイド利用・貸切",
  description: `Nippori Share Base の料金表。ミシン利用は Team AM・PM 各${priceText(general[0])}、All Day ${priceText(general[2])}。裁断台利用、ハンドメイド利用、貸切利用の料金と、キャンセル規定をまとめています。`,
  path: "/price",
  keywords: ["Nippori Share Base 料金", "日暮里 ミシン 料金", "日暮里 レンタルスペース 料金"],
});

export default function PricePage() {
  const faqs = pickFaqs(["payment", "cancel", "member", "cutting-only"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "料金", path: "/price" }]}
        en="Price"
        title="料金表"
        lead="お支払いいただく金額が分かるよう、税込で表示しています（税抜の金額を小さく添えています）。"
      >
        <nav aria-label="料金の種類">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {[
              ["#machine", "ミシン利用"],
              ["#other", "ミシン利用以外"],
              ["#option", "オプション"],
              ["#cancel", "キャンセル"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* ミシン利用 */}
      <section id="machine" className="scroll-mt-20 py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="With sewing machines" title="ミシンを利用するお客様向け" lead={`${MACHINE_PLANS.slots.map((s) => `${s.name}（${s.time}）`).join("、")}の予約枠を設けております。`} />
          <div className="mt-9" data-reveal>
            <MachinePriceTable />
          </div>
          <Notes items={MACHINE_PLANS.notes} className="mt-6" />
          <p className="mt-7">
            <Link href="/chums-sewing-club" className="link inline-flex items-center gap-1.5 text-sm">
              会員価格になる「{CLUB.name}」について
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* ミシン利用以外 */}
      <section id="other" className="scroll-mt-20 bg-butter py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Without sewing machines" title="ミシン利用以外のお客様向け" lead="Nippori Share Base では、ミシンを使用する洋裁以外のご利用も大歓迎です。" />
          <div className="mt-10">
            <PlanList />
          </div>
          <Notes items={OTHER_PLAN_NOTES} className="mt-7" />
          <p className="mt-7 text-[0.95rem]">
            ワークショップ・展示会・販売会の開催については、
            <Link href="/workshop#private" className="link">
              貸切利用のご案内
            </Link>
            をご覧ください。
          </p>
        </Container>
      </section>

      {/* オプション */}
      <section id="option" className="cv scroll-mt-20 py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Options" title="オプション・安心のしくみ" lead="利用規約に定めのあるサービスです。" />
          <dl className="rows mt-9">
            {OPTIONS.map((o) => (
              <div key={o.name} className="py-6" data-reveal>
                <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-round text-lg font-bold">{o.name}</span>
                  <span className="font-round font-bold">{o.price}</span>
                </dt>
                <dd className="measure mt-2 text-[0.95rem]">{o.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* キャンセル */}
      <section id="cancel" className="cv scroll-mt-20 bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Cancellation" title="キャンセルについて" lead="キャンセル・予約変更は、できるだけ早めにご連絡ください。通常のご利用のキャンセル料は以下のとおりです。" />
          <table className="mt-9 w-full border-collapse text-[0.95rem]" data-reveal>
            <caption className="sr-only">通常利用のキャンセル料</caption>
            <thead>
              <tr className="border-y-2 border-ink/70">
                <th scope="col" className="py-3 pr-4 text-left font-round font-bold">
                  ご連絡の時期
                </th>
                <th scope="col" className="py-3 text-left font-round font-bold">
                  キャンセル料
                </th>
              </tr>
            </thead>
            <tbody>
              {CANCEL_POLICY.map((c) => (
                <tr key={c.when} className="border-b-2 border-dashed border-ink/25">
                  <th scope="row" className="py-4 pr-4 text-left font-medium">
                    {c.when}
                  </th>
                  <td className="py-4">{c.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Notes
            className="mt-6"
            items={[
              "災害・交通機関の大幅な遅延など、やむを得ない事情については、状況に応じて個別に対応いたします。",
              "運営側の都合により利用を中止する場合は、キャンセル料は発生いたしません。",
              "貸切・イベント利用のキャンセルは、イベント利用規約の定めによります。",
            ]}
          />
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/terms" className="link inline-flex items-center gap-1.5">
              利用規約
              <ArrowIcon />
            </Link>
            <Link href="/terms/event" className="link inline-flex items-center gap-1.5">
              イベント利用規約
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="FAQ" title="料金のよくある質問" />
          <div className="mt-9">
            <FaqList items={faqs} />
          </div>
          <p className="mt-8 text-xs leading-6 text-ash">
            料金は {formatDateJa(PRICE_AS_OF)} 時点の内容です。税込の金額は、税抜の料金に消費税 10％ を加えて表示しています（裁断台利用は {planPriceText("cutting")} など）。
          </p>
        </Container>
      </section>

      <ReserveCta variant="both" />
    </>
  );
}
