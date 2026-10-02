import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";

export type Step = { title: string; body: string; link?: { href: string; label: string } };

/**
 * 手順の一覧。番号と破線だけで区切る（1 つずつ箱に入れない）。
 * 番号は旧サイトの「できること」と同じ、黒い丸に白い数字。
 */
export function Steps({ items, headingLevel: H = "h3" }: { items: Step[]; headingLevel?: "h3" | "h4" }) {
  return (
    <ol className="rows">
      {items.map((s, i) => (
        <li key={s.title} className="flex gap-4 py-6 sm:gap-6 sm:py-7" data-reveal>
          <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-lg font-medium text-white sm:size-11 sm:text-xl">
            {i + 1}
          </span>
          <div>
            <H className="text-lg">{s.title}</H>
            <p className="measure mt-1.5 text-[0.95rem]">{s.body}</p>
            {s.link ? (
              <Link href={s.link.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm">
                {s.link.label}
                <ArrowIcon />
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
