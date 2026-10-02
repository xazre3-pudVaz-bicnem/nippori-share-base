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
 * （旧サイトの「黄色い帯＋大きな写真」を引き継ぐ）。帯の下端はピンキングばさみで切った布の形。
 * 写真は帯から少し下へはみ出させて、次の白い区画へつなげる。
 */
export function PageHero({ crumbs, en, title, lead, img, position, children }: Props) {
  return (
    <section className={`pinked bg-sun ${img ? "lg:mb-16" : ""}`}>
      <div className={`mx-auto max-w-6xl px-5 pt-5 sm:px-8 ${img ? "pb-12 sm:pb-16 lg:pb-0" : "pb-14 sm:pb-20"}`}>
        <Breadcrumbs crumbs={crumbs} />
        <div className={`mt-8 grid gap-9 sm:mt-10 ${img ? "lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16" : ""}`}>
          <div className={img ? "lg:pb-20 lg:pt-10" : "mx-auto max-w-3xl text-center"}>
            <p className="eyebrow text-base text-ink/80 sm:text-lg">{en}</p>
            <h1 className="mt-2 text-[1.55rem] leading-[1.5] min-[400px]:text-[1.7rem] sm:text-4xl sm:leading-[1.4] lg:text-[2.5rem]">{title}</h1>
            {lead ? <p className={`measure mt-5 text-[0.95rem] sm:text-base ${img ? "" : "mx-auto"}`}>{lead}</p> : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>
          {img ? (
            <div className="lg:-mb-16">
              <Photo img={img} priority swatch="cream" ratio="aspect-[4/3] lg:aspect-[5/5.2]" position={position} sizes="(max-width: 1023px) 100vw, 560px" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
