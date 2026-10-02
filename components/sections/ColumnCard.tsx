import Link from "next/link";
import { IMG, type Img } from "@/data/images";
import { COLUMN_CATEGORIES, type ColumnMeta } from "@/lib/columns";
import { formatDateJa } from "@/lib/seo";
import { Photo } from "@/components/ui/Photo";

export function coverOf(key: string): Img {
  return (IMG as Record<string, Img>)[key] ?? IMG.spaceMain;
}

/** コラム一覧のカード */
export function ColumnCard({ column, headingLevel: H = "h3" }: { column: ColumnMeta; headingLevel?: "h2" | "h3" }) {
  const cover = coverOf(column.cover);
  return (
    <article className="h-full" data-reveal>
      <Link href={`/column/${column.slug}`} className="group flex h-full flex-col">
        <Photo
          img={cover}
          alt=""
          ratio="aspect-[3/2]"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px"
          className="rounded-3xl transition-transform duration-500 group-hover:-translate-y-1"
        />
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="rounded-full bg-sun px-3 py-0.5 font-bold">{COLUMN_CATEGORIES[column.category].label}</span>
          <time dateTime={column.date} className="text-ash">
            {formatDateJa(column.date)}
          </time>
        </p>
        <H className="mt-2 text-[1.05rem] leading-[1.6] underline decoration-transparent decoration-[3px] underline-offset-4 transition-colors group-hover:decoration-sun-deep sm:text-lg">
          {column.title}
        </H>
        <p className="mt-2 line-clamp-3 text-sm leading-7 text-ash">{column.description}</p>
      </Link>
    </article>
  );
}
