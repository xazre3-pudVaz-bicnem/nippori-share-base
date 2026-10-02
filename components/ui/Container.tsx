import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** 文章中心のページは narrow（読みやすい行長）にする */
  size?: "wide" | "default" | "narrow";
};

const WIDTH = {
  wide: "max-w-7xl",
  default: "max-w-6xl",
  narrow: "max-w-3xl",
} as const;

export function Container({ children, className = "", size = "default" }: Props) {
  return <div className={`mx-auto w-full ${WIDTH[size]} px-5 sm:px-8 ${className}`}>{children}</div>;
}
