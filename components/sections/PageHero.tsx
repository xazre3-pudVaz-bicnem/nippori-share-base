import type { ReactNode } from "react";
import type { Img } from "@/data/images";
import type { Crumb } from "@/lib/schema";
import { budou } from "@/lib/budou";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";

type Props = {
  crumbs: Crumb[];
  /** 英字の小見出し */
  en: string;
  /**
   * ページの h1（1ページに1つ）。
   * 文字列は文節で折り返す。配列にすると 1 要素が 1 行になる（行の中は文節で折り返す）。
   */
  title: ReactNode | readonly string[];
  /** h1 の下に小さく添える言葉（h1 の一部として読まれる） */
  sub?: string;
  lead?: ReactNode;
  img?: Img;
  /** 写真の切り抜き位置 */
  position?: string;
  children?: ReactNode;
};

/**
 * 下層ページの冒頭。黄色い帯に、パンくず・英字ラベル・h1・リード文・写真を置く
 * （旧サイトの「黄色い帯＋大きな写真」を引き継ぐ）。帯の下端はピンキングばさみで切った布の形。
 * 写真は帯の中に収める（帯の下へはみ出させない）。PC では文章と写真の上下の中心をそろえる。
 */
export function PageHero({ crumbs, en, title, sub, lead, img, position, children }: Props) {
  return (
    <section className="pinked bg-sun">
      <div className={`mx-auto max-w-6xl px-5 pt-5 sm:px-8 ${img ? "pb-12 sm:pb-16 lg:pb-[4.5rem]" : "pb-14 sm:pb-20"}`}>
        <Breadcrumbs crumbs={crumbs} />
        <div className={`mt-8 grid gap-9 sm:mt-10 ${img ? "lg:grid-cols-[1.06fr_1fr] lg:items-center lg:gap-14" : ""}`}>
          <div className={img ? "" : "mx-auto max-w-3xl text-center"}>
            <p className="eyebrow text-base text-ink/80 sm:text-lg">{en}</p>
            <h1 className="mt-2 text-[1.55rem] leading-[1.5] min-[400px]:text-[1.7rem] sm:text-4xl sm:leading-[1.4] lg:text-[clamp(2rem,3.1vw,2.375rem)]">
              {budou(title as ReactNode)}
              {sub ? <span className="mt-2 block text-[0.62em] tracking-[0.08em]">{sub}</span> : null}
            </h1>
            {/* リード文は文節で折り返し、行の長さをそろえる（最後の行に 2〜3 文字だけ残るのを防ぐ） */}
            {lead ? <p className={`measure mt-5 text-balance text-[0.95rem] sm:text-base ${img ? "" : "mx-auto"}`}>{budou(lead)}</p> : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>
          {img ? <Photo img={img} priority swatch="cream" ratio="aspect-[4/3] lg:aspect-[5/4]" position={position} sizes="(max-width: 1023px) 100vw, 520px" /> : null}
        </div>
      </div>
    </section>
  );
}
