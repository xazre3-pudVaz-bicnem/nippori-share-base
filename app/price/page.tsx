import type { Metadata } from "next";
import Link from "next/link";
import { EQUIPMENT } from "@/data/equipment";
import { CANCEL_POLICY, CLUB, EVENT_CANCEL_POLICY, MACHINE_PLANS, MENTOR, OPTIONS, OTHER_PLAN_NOTES, PRICE_AS_OF, planPriceText, priceText } from "@/data/pricing";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { CancelTable, MachinePriceTable, Notes, PlanList, Price, PriceInc } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

const general = MACHINE_PLANS.rows[0].ex;
/** レーザー加工機・カッティングマシーンの料金（内容は data/equipment.ts から取る） */
const DIGITAL = EQUIPMENT.filter((e) => e.id === "laser" || e.id === "cutting-machine");

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
        lead={`お支払いいただく金額が分かるよう、税込で表示しています（税抜の金額を小さく添えています）。お支払いには、${SITE.payments.join("・")}をご利用いただけます。`}
      >
        <nav aria-label="料金の種類">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {[
              ["#machine", "ミシン利用"],
              ["#other", "ミシン利用以外"],
              ["#option", "オプション・サポート"],
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
      <section id="machine" className="py-20 sm:py-28">
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
      <section id="other" className="bg-butter py-20 sm:py-28">
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
      <section id="option" className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Options" title="オプション・サポート" lead="ミシン利用に追加できるサービスです。必要なものだけ、お選びください。" />
          <dl className="rows rows-top mt-9">
            <div id="mentor" className="scroll-mt-4 py-6" data-reveal>
              <dt className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <span className="font-round text-lg font-bold">{MENTOR.name}</span>
                <span className="flex items-start gap-2">
                  <span className="pt-[0.3em] text-sm font-bold">1時間</span>
                  <Price ex={MENTOR.exPerHour} size="sm" />
                </span>
              </dt>
              <dd className="mt-2 text-[0.95rem]">
                <p>{MENTOR.lead}</p>
                <Notes items={MENTOR.notes} className="mt-3" />
                <Link href="/first-time#mentor" className="link mt-2 inline-flex items-center gap-1.5 text-sm">
                  メンターサポートについて
                  <ArrowIcon />
                </Link>
              </dd>
            </div>
            {OPTIONS.map((o) => (
              <div key={o.name} className="py-6" data-reveal>
                <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-round text-lg font-bold">
                    {o.name}
                    {o.sub ? <span className="ml-2 text-xs font-medium">{o.sub}</span> : null}
                  </span>
                  <PriceInc inc={o.inc} prefix={o.prefix} />
                </dt>
                <dd className="mt-2 text-[0.95rem]">{o.body}</dd>
              </div>
            ))}
          </dl>

          <h3 id="digital" className="mt-16 scroll-mt-6 text-xl">レーザー加工・カッティングマシーン</h3>
          <dl className="rows mt-5">
            {DIGITAL.map((e) => (
              <div key={e.id} className="py-6 first:pt-0" data-reveal>
                <dt className="font-round text-lg font-bold">
                  {e.name}
                  {e.model ? <span className="ml-2 text-xs font-medium">{e.model}</span> : null}
                </dt>
                <dd className="mt-2 space-y-1 text-[0.95rem]">
                  {e.details?.map((d) => (
                    <p key={d.label}>
                      <span className="font-round font-bold">{d.label}：</span>
                      {d.body}
                    </p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            <Link href="/equipment#digital" className="link inline-flex items-center gap-1.5 text-sm">
              設備・道具のページでくわしく見る
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* キャンセル */}
      <section id="cancel" className="cv bg-butter py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Cancellation" title="キャンセルについて" lead="キャンセル・予約変更は、できるだけ早めにご連絡ください。ご利用の種類によって、キャンセル料が変わります。" />
          <h3 className="mt-10 text-lg">ミシン利用・ハンドメイド利用など（通常のご利用）</h3>
          <div className="mt-4">
            <CancelTable caption="通常利用のキャンセル料" rows={CANCEL_POLICY} />
          </div>
          <h3 className="mt-12 text-lg">貸切・イベント利用</h3>
          <div className="mt-4">
            <CancelTable caption="貸切・イベント利用のキャンセル料" rows={EVENT_CANCEL_POLICY} />
          </div>
          <Notes
            className="mt-6"
            items={[
              "災害・交通機関の大幅な遅延など、やむを得ない事情については、状況に応じて個別に対応いたします。",
              "運営側の都合により利用を中止する場合は、キャンセル料は発生いたしません。",
              "正式な条件は、利用規約・イベント利用規約をご確認ください。",
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
