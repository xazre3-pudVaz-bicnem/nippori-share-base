import type { Metadata } from "next";
import Link from "next/link";
import { CLUB, MACHINE_PLANS, MEMBER_DISCOUNT, priceText, withTax, yen } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Notes, Price } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "Chum's Sewing Club｜月額会員のご案内",
  description: `Nippori Share Base の月額会員「Chum's Sewing Club」。月額 ${priceText(CLUB.monthlyEx)} でミシン利用が会員価格に。齊藤商店での対象商品10％OFF、毎月の接着芯プレゼントなどの特典があります。`,
  path: "/chums-sewing-club",
  keywords: ["Chum's Sewing Club", "Nippori Share Base 会員"],
});

export default function ClubPage() {
  const general = MACHINE_PLANS.rows[0];
  const member = MACHINE_PLANS.rows[1];
  return (
    <>
      <section className="pinked bg-sun">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24">
          <Breadcrumbs crumbs={[{ name: "Chum's Sewing Club", path: "/chums-sewing-club" }]} />

          <div className="mt-12 text-center sm:mt-16">
            <p className="font-round text-sm font-bold tracking-wider sm:text-base">いろいろお得なサブスク会員</p>
            <h1 className="display mt-2 text-[2.6rem] tracking-normal sm:text-6xl lg:text-7xl">Chum&rsquo;s Sewing Club</h1>
            <p className="measure mx-auto mt-5 text-[0.95rem] sm:text-base">
              月に2回以上通うなら、会員がお得です。ミシン利用が会員価格になるほか、1階の生地店・齊藤商店でのお買い物にも特典があります。
            </p>
          </div>

          <div className="mt-9 grid gap-2 sm:grid-cols-[1fr_auto]">
            <p className="rounded-2xl bg-cream px-6 py-5 text-center">
              <span className="mr-3 font-round text-lg font-bold">月額</span>
              <Price ex={CLUB.monthlyEx} size="lg" />
            </p>
            <p className="grid place-items-center rounded-2xl bg-sun-deep px-8 py-4 text-center">
              <span>
                <span className="mr-2 font-round text-sm font-bold">年払い</span>
                <Price ex={CLUB.yearlyEx} size="sm" />
              </span>
            </p>
          </div>

          <h2 className="sr-only">会員特典</h2>
          <dl className="mt-4 overflow-hidden rounded-2xl">
            {CLUB.benefits.map((b, i) => (
              <div key={b.title} className={`grid sm:grid-cols-[0.85fr_1.15fr] ${i > 0 ? "border-t-2 border-sun" : ""}`}>
                <dt className="grid place-items-center bg-cream px-5 py-4 text-center font-round text-[1.05rem] font-bold sm:py-6 sm:text-lg">{b.title}</dt>
                <dd className="grid place-items-center bg-white px-5 py-4 text-center text-[0.95rem] sm:py-6">{b.body}</dd>
              </div>
            ))}
          </dl>

          <Notes items={CLUB.notes} className="mt-6 font-medium" />
          <p className="mt-3 text-[0.82rem] sm:text-sm">
            ＊リクルートIDについては
            <a href="https://point.recruit.co.jp/recruitid/doc/recruitid.html" target="_blank" rel="noopener noreferrer" className="link decoration-ink/40">
              リクルートIDの案内ページ
            </a>
            をご覧ください。
          </p>
        </div>
      </section>

      {/* 価格の比較 */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Member price" title="会員価格でどれくらい変わる？" lead="ミシン利用の料金を、一般価格と会員価格で比べました（1人あたり・税込）。" />
          <table className="mt-9 w-full table-fixed border-collapse text-center text-sm sm:text-base" data-reveal>
            <caption className="sr-only">一般価格と会員価格の比較（税込）</caption>
            <thead>
              <tr className="border-y-2 border-ink/70">
                <th scope="col" className="px-1 py-3 font-round font-bold">
                  予約枠
                </th>
                <th scope="col" className="px-1 py-3 font-round font-bold">
                  {general.label}
                </th>
                <th scope="col" className="px-1 py-3 font-round font-bold">
                  会員価格
                </th>
              </tr>
            </thead>
            <tbody>
              {MACHINE_PLANS.slots.map((s, i) => (
                <tr key={s.id} className="border-b-2 border-dashed border-ink/25">
                  <th scope="row" className="px-1 py-4 font-medium">
                    <span className="block font-round font-bold">{s.name}</span>
                    <span className="block text-xs">{s.time}</span>
                  </th>
                  <td className="px-1 py-4">
                    <Price ex={general.ex[i]} size="sm" stack />
                  </td>
                  <td className="bg-butter px-1 py-4">
                    <Price ex={member.ex[i]} size="sm" stack />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="measure mt-7 text-[0.95rem]">
            Team AM または Team PM を月に2回ご利用の場合、割引額は合計 {yen(MEMBER_DISCOUNT.half * 2)}円（税込）。月額 {yen(withTax(CLUB.monthlyEx))}円（税込）の会費を上回ります。接着芯のプレゼントや齊藤商店での割引も、あわせてお使いいただけます。
          </p>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/price" className="link inline-flex items-center gap-1.5">
              料金表を見る
              <ArrowIcon />
            </Link>
            <Link href="/access" className="link inline-flex items-center gap-1.5">
              お申し込みは店頭で：アクセス
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <ReserveCta variant="general" />
    </>
  );
}
