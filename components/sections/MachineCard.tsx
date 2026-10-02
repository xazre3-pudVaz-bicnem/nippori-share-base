import Image from "next/image";
import type { Machine } from "@/data/machines";

type Props = {
  machine: Machine;
  categoryName: string;
  headingLevel?: "h3" | "h4";
  /** 機種名ラベル入りの正方形写真（期間限定ミシン）のとき true */
  square?: boolean;
};

/**
 * ミシン1機種のカード。現在の公式サイトのミシン一覧と同じ見せ方
 * （上に写真、下は濃い黄色の面にメーカー名のラベルと機種名の枠）。
 */
export function MachineCard({ machine, categoryName, headingLevel: H = "h3", square = false }: Props) {
  return (
    <article id={machine.id} className="flex scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-sun-deep" data-reveal>
      <div className={`relative bg-white ${square ? "aspect-square" : "aspect-[4/3]"}`}>
        <Image
          src={machine.image}
          alt={`${machine.maker} ${machine.model}（${categoryName}）`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px"
          quality={65}
          className="object-cover"
          style={square ? undefined : { objectPosition: "50% 62%" }}
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-7 pt-1 text-center">
        <p className="relative z-10 mx-auto -mb-2.5 inline-block rounded-full bg-cream px-6 py-0.5 text-sm font-bold">{machine.maker}</p>
        <H className="rounded-full border-[3px] border-cream px-4 pb-1.5 pt-3 text-lg leading-snug tracking-normal">{machine.model}</H>
        {machine.description ? <p className="mt-4 text-left text-[0.9rem] leading-7">{machine.description}</p> : null}
        {machine.note ? <p className="mt-3 rounded-2xl bg-cream/70 px-3 py-2 text-left text-xs leading-6">{machine.note}</p> : null}
      </div>
    </article>
  );
}
