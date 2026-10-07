import type { ReactNode } from "react";
import { budou } from "@/lib/budou";

type Props = {
  /** 英字の小見出し（現在の公式サイトの「What about」に合わせた書体） */
  en?: string;
  /** 見出し。文字列は文節で折り返す。配列にすると 1 要素が 1 行になる */
  title: ReactNode | readonly string[];
  lead?: ReactNode;
  align?: "center" | "left";
  as?: "h2" | "h3";
  id?: string;
  className?: string;
};

/** セクション見出し。英字ラベル → 日本語の丸ゴシック見出し → 並縫いの線 */
export function SectionHeading({ en, title, lead, align = "center", as: Tag = "h2", id, className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {en ? <p className="eyebrow text-sm text-ash sm:text-base">{en}</p> : null}
      <Tag id={id} className="mt-1 text-[1.65rem] sm:text-4xl">
        {budou(title as ReactNode)}
      </Tag>
      <div className={`stitch mt-4 w-28 text-ink ${center ? "mx-auto" : ""}`} aria-hidden />
      {lead ? <p className={`mt-6 text-[0.95rem] sm:text-base ${center ? "mx-auto max-w-2xl" : "measure"}`}>{budou(lead)}</p> : null}
    </div>
  );
}
