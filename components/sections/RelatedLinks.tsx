import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";

export type RelatedLink = { href: string; title: string; body: string; en?: string };

/** 関連ページへの内部リンク。カードで見せる */
export function RelatedLinks({ items, headingLevel: H = "h3" }: { items: RelatedLink[]; headingLevel?: "h3" | "h4" }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${items.length >= 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((it) => (
        <li key={it.href} data-reveal>
          <Link
            href={it.href}
            className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_0_0_2px_var(--color-line)] transition-shadow duration-300 hover:shadow-[0_0_0_3px_var(--color-sun-deep)]"
          >
            {it.en ? <span className="eyebrow text-xs text-ash">{it.en}</span> : null}
            <H className="mt-1 text-lg">{it.title}</H>
            <p className="mt-2 flex-1 text-sm leading-7">{it.body}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
              くわしく見る
              <span className="grid size-7 place-items-center rounded-full bg-sun transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
