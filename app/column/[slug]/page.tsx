import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COLUMN_CATEGORIES, getAllColumns, getColumn, getRelatedColumns } from "@/lib/columns";
import { articleSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { ColumnBody } from "@/components/sections/ColumnBody";
import { ColumnCard, coverOf } from "@/components/sections/ColumnCard";
import { ReserveCta } from "@/components/sections/ReserveCta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllColumns().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) return {};
  // 記事タイトルが長いときは「｜Nippori Share Base」を付けない（検索結果で本題が切れないように）
  const width = [...column.title].reduce((a, ch) => a + (ch.charCodeAt(0) > 255 ? 1 : 0.5), 0);
  return buildMetadata({
    title: column.title,
    rawTitle: width > 24,
    description: column.description,
    path: `/column/${column.slug}`,
    type: "article",
    og: "column",
    publishedTime: column.date,
    modifiedTime: column.updated ?? column.date,
    section: COLUMN_CATEGORIES[column.category].label,
    tags: column.tags,
    keywords: column.tags,
  });
}

export default async function ColumnPage({ params }: Props) {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) notFound();

  const category = COLUMN_CATEGORIES[column.category];
  const cover = coverOf(column.cover);
  const related = getRelatedColumns(column, 3);
  const path = `/column/${column.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...articleSchema({
            title: column.title,
            description: column.description,
            path,
            image: cover.src.src,
            datePublished: column.date,
            dateModified: column.updated,
            section: category.label,
          }),
        }}
      />

      <article>
        <header className="bg-sun">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-5 sm:px-8 sm:pb-16">
            <Breadcrumbs
              crumbs={[
                { name: "コラム", path: "/column" },
                { name: category.label, path: `/column/category/${column.category}` },
                { name: column.title, path },
              ]}
            />
            <p className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <Link href={`/column/category/${column.category}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold">
                {category.label}
              </Link>
              <time dateTime={column.date}>{formatDateJa(column.date)}</time>
              {column.updated && column.updated !== column.date ? (
                <span>
                  （更新：<time dateTime={column.updated}>{formatDateJa(column.updated)}</time>）
                </span>
              ) : null}
              <span className="text-ink/75">読了目安 約{column.readingMinutes}分</span>
            </p>
            <h1 className="mt-3 text-[1.6rem] leading-[1.5] sm:text-4xl sm:leading-[1.45]">{column.title}</h1>
            <p className="mt-4 text-[0.95rem]">{column.description}</p>
          </div>
        </header>

        <Container size="narrow" className="py-12 sm:py-16">
          <Photo img={cover} ratio="aspect-[3/2]" priority sizes="(max-width: 831px) 100vw, 704px" />

          {column.headings.length >= 3 ? (
            <nav aria-label="目次" className="mt-10 rounded-3xl bg-butter p-6 sm:p-8">
              <p className="font-round text-lg font-bold">目次</p>
              <ol className="mt-3 space-y-2 text-[0.95rem]">
                {column.headings.map((h, i) => (
                  <li key={h.id} className="flex gap-2.5">
                    <span aria-hidden className="text-ash">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a href={`#${h.id}`} className="py-0.5 underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="mt-10">
            <ColumnBody markdown={column.body} />
          </div>

          {column.cta ? (
            <p className="mt-12 text-center">
              <Link href={column.cta.href} className="btn btn-sun">
                {column.cta.label}
                <ArrowIcon />
              </Link>
            </p>
          ) : null}

          {/* 書き手の情報（誰が書いているかを明示する） */}
          <aside className="mt-14 rounded-3xl p-6 shadow-[0_0_0_2px_var(--color-line)] sm:p-8">
            <p className="eyebrow text-xs text-ash">Written by</p>
            <p className="mt-1 font-round text-lg font-bold">{SITE.name}</p>
            <p className="mt-2 text-sm leading-7">
              日暮里繊維街の生地店・齊藤商店の2階にある、ものづくりのためのシェアスペース。家庭用・職業用・ロック・カバーステッチミシンをそろえ、洋裁やハンドメイド、ワークショップの場として運営しています。
            </p>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/space" className="link">
                スペースについて
              </Link>
              <Link href="/access" className="link">
                アクセス
              </Link>
            </p>
          </aside>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="cv bg-butter py-16 sm:py-20">
          <Container>
            <h2 className="text-center text-2xl sm:text-3xl">あわせて読みたい</h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <ColumnCard column={c} />
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center">
              <Link href="/column" className="btn btn-line">
                コラム一覧
                <ArrowIcon />
              </Link>
            </p>
          </Container>
        </section>
      ) : null}

      <ReserveCta />
    </>
  );
}
