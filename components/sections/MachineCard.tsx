import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Machine } from "@/data/machines";

type Props = {
  machine: Machine;
  categoryName: string;
  headingLevel?: "h3" | "h4";
  /** 機種名ラベル入りの正方形写真（期間限定ミシン）のとき true */
  square?: boolean;
};

/**
 * ミシン1機種のカード（設備ページ用）。旧サイトのミシン一覧と同じ見せ方
 * （上に写真、下は濃い黄色の面にメーカー名のラベルと機種名の枠）。
 * 横に並んだカードは、説明文の長さが違っても高さがそろう（h-full）。機種名の枠も 2 行ぶんの高さで固定している。
 */
export function MachineCard({ machine, categoryName, headingLevel: H = "h3", square = false }: Props) {
  return (
    <article id={machine.id} className="flex h-full scroll-mt-6 flex-col overflow-hidden rounded-2xl bg-sun-deep" data-reveal>
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
        <H className="grid min-h-[4.6rem] place-items-center rounded-[2.3rem] border-[3px] border-cream px-4 pb-1.5 pt-3 text-lg leading-snug tracking-normal">{machine.model}</H>
        {machine.description ? <p className="mt-4 text-left text-[0.9rem] leading-7">{machine.description}</p> : null}
        {/* 補足は、説明文の長さに関係なくカードの下端にそろえる */}
        {machine.note ? (
          <div className="mt-auto pt-3">
            <p className="rounded-xl bg-cream/70 px-3 py-2 text-left text-xs leading-6">{machine.note}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * 機種名の小さな一覧（ミシンのページ用）。写真は小さく、説明は設備ページに任せる。
 * 行ごとに設備ページの該当機種へリンクする。
 * 乗せたときの下線と写真の縁は、そのミシンの種類の色（color）にする。
 */
export function MachineNameList({ machines, categoryName, color = "var(--color-sun-deep)", topLine = false }: { machines: Machine[]; categoryName: string; /** 種類の色（data/machines.ts の color） */ color?: string; /** 見出しとのあいだにリード文があるときだけ true */ topLine?: boolean }) {
  return (
    <ul className={`rows ${topLine ? "rows-top" : ""}`} style={{ "--cat": color } as CSSProperties}>
      {machines.map((m) => (
        <li key={m.id}>
          <Link href={`/equipment#${m.id}`} className="group flex items-center gap-4 py-3">
            <span className="relative block aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg bg-white outline-[3px] outline-offset-0 outline-transparent transition-[outline-color] duration-200 group-hover:outline-solid group-hover:outline-(--cat) sm:w-24">
              <Image src={m.image} alt="" fill sizes="96px" quality={65} className="object-cover" style={{ objectPosition: "50% 62%" }} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-ash">{m.maker}</span>
              <span className="block font-round font-bold leading-snug underline decoration-transparent decoration-4 underline-offset-4 transition-colors group-hover:decoration-(--cat)">
                {m.model}
                <span className="sr-only">（{categoryName}）の説明を見る</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
