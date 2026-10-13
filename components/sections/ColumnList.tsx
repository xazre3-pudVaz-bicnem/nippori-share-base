import Link from "next/link";
import type { ColumnMeta } from "@/lib/columns";
import { formatDateJa } from "@/lib/seo";
import { ColumnCard } from "@/components/sections/ColumnCard";

type Props = {
  columns: ColumnMeta[];
  /** 写真つきのカードで出す本数。これより古い記事は、タイトルだけの一覧になる */
  cards?: number;
  /** カードを並べるグリッドのクラス（ページごとの間隔をそのまま使うため） */
  gridClassName?: string;
  headingLevel?: "h2" | "h3";
};

/**
 * コラムの一覧。新しい記事は写真つきのカード、それより古い記事はタイトルと日付だけの行にする。
 * 記事が増えても、ページが写真だらけで重くならず、すべての記事へここからたどれる。
 * 本数が cards 以下のあいだは、これまでと同じカードだけの表示。
 */
export function ColumnList({ columns, cards = 9, gridClassName = "grid gap-x-9 gap-y-14 sm:grid-cols-2 lg:grid-cols-3", headingLevel = "h3" }: Props) {
  const head = columns.slice(0, cards);
  const rest = columns.slice(cards);
  return (
    <>
      <ul className={gridClassName}>
        {head.map((c) => (
          <li key={c.slug}>
            <ColumnCard column={c} headingLevel={headingLevel} />
          </li>
        ))}
      </ul>
      {rest.length > 0 ? (
        <div className="mt-16">
          <p className="font-round text-lg font-bold">これまでの記事</p>
          <ul className="rows mt-4">
            {rest.map((c) => (
              <li key={c.slug} className="first:[&>a]:pt-0">
                <Link href={`/column/${c.slug}`} className="group flex items-baseline justify-between gap-5 py-3">
                  <span className="text-[0.95rem] underline decoration-transparent decoration-[3px] underline-offset-4 transition-colors group-hover:decoration-sun-deep">{c.title}</span>
                  <time dateTime={c.date} className="shrink-0 text-xs text-ash">
                    {formatDateJa(c.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
