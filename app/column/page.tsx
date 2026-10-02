import type { Metadata } from "next";
import Link from "next/link";
import { COLUMN_CATEGORIES, getActiveCategories, getAllColumns } from "@/lib/columns";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ColumnCard } from "@/components/sections/ColumnCard";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

export const metadata: Metadata = buildMetadata({
  title: "コラム｜ミシン・洋裁・ハンドメイド・日暮里繊維街",
  description:
    "Nippori Share Base のコラム。家庭用ミシンと職業用ミシンの違い、ロックミシンの基本、日暮里繊維街で生地を買ったあとの楽しみ方、ワークショップ会場の選び方など、ものづくりに役立つ読みもの。",
  path: "/column",
  og: "column",
  keywords: ["ミシン 選び方", "ロックミシン とは", "日暮里繊維街", "洋裁", "ハンドメイド", "ワークショップ 会場"],
});

export default function ColumnIndexPage() {
  const columns = getAllColumns();
  const categories = getActiveCategories();
  return (
    <>
      <PageHero
        crumbs={[{ name: "コラム", path: "/column" }]}
        en="Column"
        title="ものづくりのコラム"
        lead="ミシンの種類と選び方、洋裁やハンドメイドのコツ、日暮里繊維街の楽しみ方。つくる時間がもっと楽しくなる読みものを、少しずつ増やしていきます。"
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

      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="sr-only">記事一覧</h2>
          {columns.length === 0 ? (
            <p className="text-center">記事を準備しています。</p>
          ) : (
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((c) => (
                <li key={c.slug}>
                  <ColumnCard column={c} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <ReserveCta />
    </>
  );
}
