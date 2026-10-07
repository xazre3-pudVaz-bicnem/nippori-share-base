import Link from "next/link";
import type { Faq } from "@/data/faqs";
import { Budou } from "@/lib/budou";
import { ArrowIcon } from "@/components/ui/Icons";

type Props = {
  items: Faq[];
  /** 質問の見出しレベル。セクション見出しが h2 なら h3 */
  headingLevel?: "h3" | "h4";
};

/**
 * Q&A の一覧。回答は折りたたまず、最初からすべて読める形で表示する
 * （検索で来た人がそのまま読めるように。構造化データは /faq でのみ出力）。
 * 1 問ずつ枠で囲まず、破線で区切るだけにしている。見出しのすぐ下に置くので、1 問目の上には線を引かない。
 */
export function FaqList({ items, headingLevel: H = "h3" }: Props) {
  return (
    <div className="rows">
      {items.map((f) => (
        <div key={f.id} id={`faq-${f.id}`} className="scroll-mt-4 py-7 first:pt-0 sm:py-8" data-reveal>
          <H className="flex gap-3 text-[1.05rem] leading-[1.6] sm:text-lg">
            <span aria-hidden className="display shrink-0 text-2xl leading-none text-ink/70 sm:text-[1.7rem]">
              Q
            </span>
            <span>
              <Budou>{f.q}</Budou>
            </span>
          </H>
          {/* 回答は線の右端まで使う（.measure で止めない） */}
          <div className="mt-3 pl-[2.1rem] text-[0.95rem] sm:pl-[2.35rem]">
            <p>{f.a}</p>
            {f.link ? (
              <Link href={f.link.href} className="link mt-2 inline-flex items-center gap-1.5 text-sm">
                {f.link.label}
                <ArrowIcon />
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
