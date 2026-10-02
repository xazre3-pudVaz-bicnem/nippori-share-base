import Link from "next/link";
import type { Faq } from "@/data/faqs";
import { ArrowIcon } from "@/components/ui/Icons";

type Props = {
  items: Faq[];
  /** 質問の見出しレベル。セクション見出しが h2 なら h3 */
  headingLevel?: "h3" | "h4";
};

/**
 * Q&A の一覧。回答は折りたたまず、最初からすべて読める形で表示する
 * （検索で来た人がそのまま読めるように。構造化データは /faq でのみ出力）。
 */
export function FaqList({ items, headingLevel: H = "h3" }: Props) {
  return (
    <div className="space-y-5">
      {items.map((f) => (
        <div key={f.id} id={`faq-${f.id}`} className="scroll-mt-28 rounded-3xl bg-white p-5 shadow-[0_0_0_2px_var(--color-line)] sm:p-7" data-reveal>
          <H className="flex gap-3 text-[1.05rem] leading-[1.6] sm:text-lg">
            <span aria-hidden className="display mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sun text-lg">
              Q
            </span>
            <span>{f.q}</span>
          </H>
          <div className="mt-3 flex gap-3">
            <span aria-hidden className="display mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-ink text-lg text-white">
              A
            </span>
            <div className="text-[0.95rem]">
              <p>{f.a}</p>
              {f.link ? (
                <Link href={f.link.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm">
                  {f.link.label}
                  <ArrowIcon />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
