import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COLUMN_CATEGORIES, getActiveCategories, getColumnsByCategory, isCategoryIndexable, type ColumnCategory } from "@/lib/columns";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { ColumnCard } from "@/components/sections/ColumnCard";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

type Props = { params: Promise<{ category: string }> };

// 記事が1本以上あるカテゴリだけページを作る（空の一覧ページを公開しない）
export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveCategories().map((category) => ({ category }));
}

function resolve(category: string): ColumnCategory | undefined {
  return getActiveCategories().find((c) => c === category);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const key = resolve(category);
  if (!key) return {};
  const c = COLUMN_CATEGORIES[key];
  return buildMetadata({
    title: key === "news" ? "お知らせ" : `${c.label}のコラム`,
    description: `${c.description} Nippori Share Base（日暮里繊維街・齊藤商店2F）がお届けする、${c.label}の読みもの一覧です。`,
    path: `/column/category/${key}`,
    og: "column",
    noindex: !isCategoryIndexable(key),
  });
}

export default async function ColumnCategoryPage({ params }: Props) {
  const { category } = await params;
  const key = resolve(category);
  if (!key) notFound();
  const c = COLUMN_CATEGORIES[key];
  const columns = getColumnsByCategory(key);
  const others = getActiveCategories().filter((k) => k !== key);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "コラム・お知らせ", path: "/column" },
          { name: c.label, path: `/column/category/${key}` },
        ]}
        en="Column"
        title={key === "news" ? "お知らせ" : `${c.label}のコラム`}
        lead={c.description}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="sr-only">{c.label}の記事一覧</h2>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((col) => (
              <li key={col.slug}>
                <ColumnCard column={col} />
              </li>
            ))}
          </ul>

          <nav aria-label="ほかのカテゴリ" className="mt-16 border-t-2 border-dashed border-ink/25 pt-8">
            <h2 className="text-lg">ほかのカテゴリ</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {others.map((k) => (
                <li key={k}>
                  <Link href={`/column/category/${k}`} className="btn btn-line min-h-11 px-5 py-1 text-sm">
                    {COLUMN_CATEGORIES[k].label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/column" className="btn btn-sun min-h-11 px-5 py-1 text-sm">
                  すべての記事
                  <ArrowIcon />
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </section>

      <ReserveCta variant={key === "workshop" || key === "event" ? "private" : "general"} />
    </>
  );
}
