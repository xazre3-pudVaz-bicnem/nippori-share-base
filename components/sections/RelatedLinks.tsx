import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";

export type RelatedLink = { href: string; title: string; body: string; en?: string };

/**
 * 関連ページへの内部リンク。カードにせず、破線で区切った行で見せる。
 * 置くのは「このページを読んだ人が次に知りたいこと」だけ（同じリンクを何度も並べない。多くて 3 本）。
 */
export function RelatedLinks({ items, headingLevel: H = "h3" }: { items: RelatedLink[]; headingLevel?: "h3" | "h4" }) {
  return (
    <ul className="rows">
      {items.map((it) => (
        <li key={it.href} data-reveal>
          <Link href={it.href} className="group grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[minmax(0,22rem)_1fr_auto] sm:items-center">
            <span>
              {it.en ? <span className="eyebrow block text-xs text-ash">{it.en}</span> : null}
              <H className="text-lg underline decoration-transparent decoration-[3px] underline-offset-4 transition-colors group-hover:decoration-sun-deep">
                {it.title}
              </H>
            </span>
            <span className="text-sm leading-7">{it.body}</span>
            <span aria-hidden className="hidden size-9 place-items-center rounded-full bg-sun transition-transform duration-300 group-hover:translate-x-1 sm:grid">
              <ArrowIcon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
