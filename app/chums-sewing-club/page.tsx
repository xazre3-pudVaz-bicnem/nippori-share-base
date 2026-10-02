import type { Metadata } from "next";
import Link from "next/link";
import { CLUB, MACHINE_PLANS } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Notes } from "@/components/sections/PriceTables";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "Chum's Sewing Club｜月額会員のご案内",
  description:
    "Nippori Share Base の月額会員「Chum's Sewing Club」。月額700円（税別）でミシン利用が会員価格に。齊藤商店での対象商品10％OFF、毎月の接着芯プレゼントなどの特典があります。",
  path: "/chums-sewing-club",
  keywords: ["Chum's Sewing Club", "Nippori Share Base 会員", "日暮里 ミシン 会員"],
});

export default function ClubPage() {
  const general = MACHINE_PLANS.rows[0];
  const member = MACHINE_PLANS.rows[1];
  return (
    <>
      <section className="bg-sun">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24">
          <Breadcrumbs crumbs={[{ name: "Chum's Sewing Club", path: "/chums-sewing-club" }]} />

          <div className="mt-12 text-center sm:mt-16">
            <p className="font-round text-sm font-bold tracking-wider sm:text-base">いろいろお得なサブスク会員</p>
            <h1 className="display mt-2 text-[2.6rem] tracking-normal sm:text-6xl lg:text-7xl">Chum&rsquo;s Sewing Club</h1>
            <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] sm:text-base">
              月に2回以上通うなら、会員がお得です。ミシン利用が会員価格になるほか、1階の生地店・齊藤商店でのお買い物にも特典があります。
            </p>
          </div>

          <div className="mt-9 grid gap-2 sm:grid-cols-[1fr_auto]">
            <p className="rounded-2xl bg-cream px-6 py-5 text-center font-round text-2xl font-bold sm:text-3xl">{CLUB.monthly}</p>
            <p className="grid place-items-center rounded-2xl bg-sun-deep px-8 py-4 text-center font-round text-base font-bold">{CLUB.yearly}</p>
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
      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Member price" title="会員価格でどれくらい変わる？" lead="ミシン利用の料金を、一般価格と会員価格で比べました（税抜・1人あたり）。" />
          <div className="mt-9 overflow-hidden rounded-3xl shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
            <table className="w-full table-fixed border-collapse text-center text-sm sm:text-base">
              <caption className="sr-only">一般価格と会員価格の比較</caption>
              <thead>
                <tr className="bg-cream">
                  <th scope="col" className="px-2 py-3 font-bold">
                    予約枠
                  </th>
                  <th scope="col" className="border-l border-line px-2 py-3 font-bold">
                    {general.label}
                  </th>
                  <th scope="col" className="border-l border-line px-2 py-3 font-bold">
                    会員価格
                  </th>
                </tr>
              </thead>
              <tbody>
                {MACHINE_PLANS.slots.map((s, i) => (
                  <tr key={s.id} className="border-t border-line">
                    <th scope="row" className="px-2 py-4 font-medium">
                      <span className="block font-round font-bold">{s.name}</span>
                      <span className="block text-xs">{s.time}</span>
                    </th>
                    <td className="border-l border-line px-2 py-4">{general.prices[i]}</td>
                    <td className="border-l border-line bg-butter px-2 py-4 text-lg font-bold">{member.prices[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[0.95rem]">
            Team AM または Team PM を月に2回ご利用の場合、割引額は合計1,000円。月額700円の会費を上回ります。接着芯のプレゼントや齊藤商店での割引も、あわせてお使いいただけます。
          </p>
          <p className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
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

      <ReserveCta />
    </>
  );
}
