import type { ReactNode } from "react";
import type { Img } from "@/data/images";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";

type Props = {
  crumbs: Crumb[];
  /** 英字の小見出し */
  en: string;
  /** ページの h1（1ページに1つ） */
  title: ReactNode;
  lead?: ReactNode;
  img?: Img;
  /** 写真の切り抜き位置 */
  position?: string;
  children?: ReactNode;
};

/**
 * 下層ページの冒頭。黄色い帯に、パンくず・英字ラベル・h1・リード文・写真を置く
 * （現在の公式サイトの黄色い帯＋大きな写真の構成を引き継ぐ）。
 */
export function PageHero({ crumbs, en, title, lead, img, position, children }: Props) {
  return (
    <section className="bg-sun">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-5 sm:px-8 sm:pb-16 lg:pb-20">
        <Breadcrumbs crumbs={crumbs} />
        <div className={`mt-8 grid items-center gap-8 sm:mt-10 ${img ? "lg:grid-cols-[1.05fr_0.95fr] lg:gap-14" : ""}`}>
          <div className={img ? "" : "mx-auto max-w-3xl text-center"}>
            <p className="eyebrow text-base text-ink/80 sm:text-lg">{en}</p>
            <h1 className="mt-2 text-[1.55rem] leading-[1.5] min-[400px]:text-[1.7rem] sm:text-4xl sm:leading-[1.4] lg:text-[2.6rem]">{title}</h1>
            {lead ? <p className="mt-5 text-[0.95rem] sm:text-base">{lead}</p> : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>
          {img ? (
            <Photo
              img={img}
              priority
              ratio="aspect-[4/3] lg:aspect-[5/6]"
              position={position}
              sizes="(max-width: 1023px) 100vw, 520px"
              className="rounded-3xl"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
