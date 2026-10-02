import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_GROUPS } from "@/data/faqs";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE, mailHref, telHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "よくある質問｜ミシン・予約・料金・ワークショップ",
  description:
    "Nippori Share Base のよくある質問。ミシン初心者の利用、予約方法、料金、キャンセル、材料の持ち込み、ワークショップや販売会の開催、アクセスについてお答えします。",
  path: "/faq",
  keywords: ["Nippori Share Base よくある質問", "日暮里 ミシン 初心者", "日暮里 レンタルスペース 予約", "日暮里 ワークショップ 開催"],
});

export default function FaqPage() {
  // このページに表示している Q&A だけを構造化データにする（サイト内で FAQPage はここだけ）
  const all = FAQ_GROUPS.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqSchema(all) }} />

      <PageHero
        crumbs={[{ name: "よくある質問", path: "/faq" }]}
        en="FAQ"
        title="よくある質問"
        lead="ご利用の前に気になることを、テーマごとにまとめました。ここにない質問は、メールやお電話でお気軽にお問い合わせください。"
      >
        <nav aria-label="質問のテーマ">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {FAQ_GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {FAQ_GROUPS.map((g, i) => (
        <section key={g.id} id={g.id} className={`scroll-mt-20 py-14 sm:py-20 ${i % 2 === 0 ? "bg-butter" : "bg-white"} ${i > 0 ? "cv" : ""}`}>
          <Container size="narrow">
            <p className="eyebrow text-sm text-ash">{g.en}</p>
            <h2 className="mt-1 text-2xl sm:text-3xl">{g.title}</h2>
            <div className="stitch mt-4 w-28" aria-hidden />
            <div className="mt-8">
              <FaqList items={g.items} />
            </div>
          </Container>
        </section>
      ))}

      <section className="cv py-16 sm:py-20">
        <Container size="narrow" className="text-center">
          <h2 className="text-2xl sm:text-3xl">解決しないときは</h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem]">
            設備の詳細や貸切のご相談など、ここに書かれていないことはお問い合わせください。確認のうえお答えします。
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a href={mailHref} className="btn btn-line w-full max-w-sm break-all text-sm">
              <MailIcon />
              {SITE.email}
            </a>
            <a href={telHref} className="btn btn-line w-full max-w-sm">
              <PhoneIcon />
              {SITE.tel}
              <span className="text-xs font-medium">（{SITE.telNote}）</span>
            </a>
          </div>
          <p className="mt-8 text-sm">
            <Link href="/first-time" className="link">
              初めての方へ
            </Link>

            <Link href="/terms" className="link">
              利用規約
            </Link>
          </p>
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
