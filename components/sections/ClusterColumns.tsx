import Link from "next/link";
import { COLUMN_CATEGORIES, getColumnsByParent } from "@/lib/columns";
import { ArrowIcon } from "@/components/ui/Icons";

type Props = {
  /** この固定ページのパス。frontmatter の parent がこの値の記事を出す */
  parent: string;
  title?: string;
  /** 同じページの中ですでにリンクしている記事（重ねて出さない） */
  exclude?: readonly string[];
  limit?: number;
  /** 一覧へのリンク */
  more?: { href: string; label: string };
  headingLevel?: "h3" | "h4";
};

/**
 * 固定ページに出す「このテーマのコラム」。
 * コラムは 1 本ずつばらばらに置かず、親になる固定ページ（ミシン、洋裁・ハンドメイド、ワークショップ…）ごとにまとめる。
 * 固定ページ → コラム（ここ）と、コラム → 固定ページ（記事末のボタンと本文中のリンク）で、行き来できるようにしている。
 * 記事の frontmatter に parent を書くだけで、ここに自動で並ぶ。該当する記事が無いあいだは何も出さない。
 */
export function ClusterColumns({ parent, title = "このテーマのコラム", exclude = [], limit = 5, more, headingLevel: H = "h3" }: Props) {
  const list = getColumnsByParent(parent)
    .filter((c) => !exclude.includes(c.slug))
    .slice(0, limit);
  if (list.length === 0) return null;
  return (
    <div className="mt-14">
      <H className="text-lg">{title}</H>
      <ul className="rows mt-4">
        {list.map((c) => (
          <li key={c.slug} className="first:[&>a]:pt-0">
            <Link href={`/column/${c.slug}`} className="group flex items-baseline justify-between gap-5 py-3.5">
              <span className="text-[0.95rem] font-medium underline decoration-transparent decoration-[3px] underline-offset-4 transition-colors group-hover:decoration-sun-deep">{c.title}</span>
              <span className="hidden shrink-0 text-xs text-ash sm:inline">{COLUMN_CATEGORIES[c.category].label}</span>
            </Link>
          </li>
        ))}
      </ul>
      {more ? (
        <p className="mt-5">
          <Link href={more.href} className="link inline-flex items-center gap-1.5 text-sm">
            {more.label}
            <ArrowIcon />
          </Link>
        </p>
      ) : null}
    </div>
  );
}
