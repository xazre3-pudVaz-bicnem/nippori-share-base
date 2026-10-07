import type { Metadata } from "next";
import Link from "next/link";
import { COLUMN_CATEGORIES, COLUMN_TYPES, COLUMN_TYPE_ORDER, getActiveCategories, getAllColumns } from "@/lib/columns";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/Icons";
import { ColumnCard } from "@/components/sections/ColumnCard";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "コラム・お知らせ｜ミシン・洋裁と日暮里繊維街",
  description:
    "Nippori Share Base のコラムとお知らせ。スペースでのできごと、日暮里繊維街で生地を買ったあとの楽しみ方、家庭用ミシンと職業用ミシンの違いやロックミシンの基本など、ものづくりに役立つ読みもの。",
  path: "/column",
  og: "column",
  keywords: ["Nippori Share Base お知らせ", "日暮里繊維街", "ミシン 選び方", "ロックミシン とは", "洋裁", "ハンドメイド"],
});

export default function ColumnIndexPage() {
  const columns = getAllColumns();
  const categories = getActiveCategories();
  return (
    <>
      <PageHero
        crumbs={[{ name: "コラム・お知らせ", path: "/column" }]}
        en="Column & News"
        title="コラム・お知らせ"
        lead="スペースで起きたできごとと、日暮里繊維街のこと、ミシンや洋裁の読みもの。少しずつ増やしていきます。"
      >
        {categories.length > 0 ? (
          <nav aria-label="コラムのカテゴリ">
            <ul className="flex flex-wrap justify-center gap-2.5">
              {categories.map((c) => (
                <li key={c}>
                  <Link href={`/column/category/${c}`} className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                    {COLUMN_CATEGORIES[c].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </PageHero>

      {columns.length === 0 ? (
        <section className="py-20">
          <Container>
            <p className="text-center">記事を準備しています。</p>
          </Container>
        </section>
      ) : (
        COLUMN_TYPE_ORDER.map((type, i) => {
          const list = columns.filter((c) => c.type === type);
          if (list.length === 0) return null;
          const t = COLUMN_TYPES[type];
          return (
            <section key={type} id={type} className={`py-20 sm:py-24 ${i % 2 === 1 ? "bg-butter" : ""}`}>
              <Container>
                <div className="flex items-center gap-4 sm:gap-8">
                  <h2 className="shrink-0 text-2xl sm:text-3xl">{t.label}</h2>
                  <span className="stitch flex-1 text-ink/35" aria-hidden />
                </div>
                <p className="measure mt-3 text-[0.95rem]">{t.lead}</p>
                <ul className="mt-10 grid gap-x-9 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <ColumnCard column={c} />
                    </li>
                  ))}
                </ul>
                {type === "report" ? (
                  <p className="mt-10 text-sm">
                    <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                      <InstagramIcon className="size-4" />
                      日々の様子は Instagram でも発信しています
                    </a>
                  </p>
                ) : null}
              </Container>
            </section>
          );
        })
      )}

      <ReserveCta variant="general" />
    </>
  );
}
