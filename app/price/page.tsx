import type { Metadata } from "next";
import Link from "next/link";
import { CANCEL_POLICY, CLUB, MACHINE_PLANS, OPTIONS, OTHER_PLAN_NOTES, PRICE_AS_OF } from "@/data/pricing";
import { pickFaqs } from "@/data/faqs";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { MachinePriceTable, Notes, OtherPlanCards } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "料金表｜ミシン利用・ハンドメイド利用・貸切",
  description:
    "Nippori Share Base の料金表。ミシン利用は Team AM・PM 各2,000円、All Day 4,000円（税抜）。裁断台利用、ハンドメイド利用、貸切利用の料金と、キャンセル規定をまとめています。",
  path: "/price",
  keywords: ["日暮里 レンタルスペース 料金", "日暮里 ミシン 料金", "日暮里 ミシン レンタル", "Nippori Share Base 料金"],
});

export default function PricePage() {
  const faqs = pickFaqs(["price", "payment", "cancel", "member", "cutting-only"]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "料金", path: "/price" }]}
        en="Price"
        title="料金表"
        lead="ミシンを使う方、使わない方、貸切で使う方。使い方に合わせた料金をご用意しています。表示はすべて税抜価格です（利用規約に定めのあるオプションは税込）。"
      >
        <nav aria-label="料金の種類">
          <ul className="flex flex-wrap justify-center gap-2.5">
            <li>
              <a href="#machine" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                ミシン利用
              </a>
            </li>
            <li>
              <a href="#other" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                ミシン利用以外
              </a>
            </li>
            <li>
              <a href="#option" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                オプション
              </a>
            </li>
            <li>
              <a href="#cancel" className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                キャンセル
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      {/* ミシン利用 */}
      <section id="machine" className="scroll-mt-20 bg-sun pb-16 sm:pb-24">
        <Container size="narrow">
          <h2 className="text-center text-2xl font-medium sm:text-3xl">ミシンを利用するお客様向け</h2>
          <p className="mt-3 text-center text-[0.95rem]">
            {MACHINE_PLANS.slots.map((s) => `${s.name}（${s.time}）`).join("、")}の予約枠を設けております。
          </p>
          <div className="mt-8">
            <MachinePriceTable />
          </div>
          <Notes items={MACHINE_PLANS.notes} className="mt-6" />
          <p className="mt-6 text-right">
            <Link href="/chums-sewing-club" className="inline-flex items-center gap-2 font-round text-lg font-bold">
              {CLUB.name}
              <span className="grid size-8 place-items-center rounded-full bg-cream">
                <ArrowIcon />
              </span>
            </Link>
          </p>
        </Container>
      </section>

      {/* ミシン利用以外 */}
      <section id="other" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading title="ミシン利用以外のお客様向け" lead="Nippori Share Base では、ミシンを使用する洋裁以外のご利用も大歓迎です。" />
          <div className="mt-10 sm:mt-12">
            <OtherPlanCards />
          </div>
          <Notes items={OTHER_PLAN_NOTES} className="mx-auto mt-7 max-w-3xl" />
          <p className="mt-8 text-center text-[0.95rem]">
            ワークショップ・展示会・販売会の開催については、
            <Link href="/workshop#private" className="link">
              貸切利用のご案内
            </Link>
            をご覧ください。
          </p>
        </Container>
      </section>

      {/* オプション */}
      <section id="option" className="cv scroll-mt-20 bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Options" title="オプション・安心のしくみ" lead="利用規約に定めのあるサービスです。こちらは税込価格です。" />
          <ul className="mt-9 space-y-4">
            {OPTIONS.map((o) => (
              <li key={o.name} className="rounded-3xl bg-white p-6 shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
                <h3 className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-lg">
                  {o.name}
                  <span className="rounded-full bg-sun px-3 py-0.5 font-sans text-sm font-bold tracking-normal">{o.price}</span>
                </h3>
                <p className="mt-2 text-[0.95rem]">{o.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* キャンセル */}
      <section id="cancel" className="cv scroll-mt-20 py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Cancellation" title="キャンセルについて" lead="キャンセル・予約変更は、できるだけ早めにご連絡ください。通常のご利用のキャンセル料は以下のとおりです。" />
          <div className="mt-9 overflow-hidden rounded-3xl shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
            <table className="w-full border-collapse text-[0.95rem]">
              <caption className="sr-only">通常利用のキャンセル料</caption>
              <thead>
                <tr className="bg-cream">
                  <th scope="col" className="px-4 py-3 text-left font-bold">
                    ご連絡の時期
                  </th>
                  <th scope="col" className="border-l border-line px-4 py-3 text-left font-bold">
                    キャンセル料
                  </th>
                </tr>
              </thead>
              <tbody>
                {CANCEL_POLICY.map((c) => (
                  <tr key={c.when} className="border-t border-line">
                    <th scope="row" className="px-4 py-3.5 text-left font-medium">
                      {c.when}
                    </th>
                    <td className="border-l border-line px-4 py-3.5">{c.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      <section className="cv bg-butter py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="FAQ" title="料金のよくある質問" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
          <p className="mt-8 text-right text-xs text-ash">料金は {formatDateJa(PRICE_AS_OF)} 時点の内容です。</p>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
