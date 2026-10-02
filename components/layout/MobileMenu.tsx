"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV, SUB_NAV } from "@/lib/nav";
import { CTA_LABEL, PRIVATE_PATH, RESERVE_PATH, SITE, telHref } from "@/lib/site";

/**
 * スマホ・タブレット用のメニュー。
 * パネルは header 基準の absolute（top-full）で開く。header の中で fixed を使うと、
 * 親の指定によっては高さが 0 に潰れて操作できなくなるため。
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-11 place-items-center rounded-full text-slate"
      >
        <span className="sr-only">メニュー</span>
        <span aria-hidden className="relative block h-4 w-6">
          <span className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${open ? "top-[7px] rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-[7px] h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`} />
        </span>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        // リンクを押したら閉じる（同じページへのリンクでも閉じるよう、クリックで判定する）
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain bg-sun"
      >
        <nav aria-label="メインメニュー" className="mx-auto max-w-xl px-5 pb-16 pt-5">
          <ul className="rows">
            <li>
              <Link href="/" className="flex items-baseline justify-between py-3.5">
                <span className="font-round text-lg font-bold">ホーム</span>
                <span className="eyebrow text-xs text-ink/70">Home</span>
              </Link>
            </li>
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span>
                    <span className="font-round text-lg font-bold">{item.label}</span>
                    {item.description ? <span className="mt-0.5 block text-xs text-ink/75">{item.description}</span> : null}
                  </span>
                  <span className="eyebrow shrink-0 text-xs text-ink/70">{item.en}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid grid-cols-2 gap-x-4">
            {SUB_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2.5 font-round text-[0.95rem] font-bold underline decoration-ink/30 decoration-2 underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-3">
            <Link href={RESERVE_PATH} className="btn btn-ink w-full text-lg">
              {CTA_LABEL.general}
            </Link>
            <Link href={PRIVATE_PATH} className="btn btn-cream w-full">
              {CTA_LABEL.private}
            </Link>
          </div>
          <p className="mt-6 text-center text-sm leading-7">
            〒{SITE.postalCode} {SITE.addressFull}
            <br />
            <a href={telHref} className="link">
              {SITE.tel}
            </a>
            <span className="text-xs">（{SITE.telNote}）</span>
          </p>
        </nav>
      </div>
    </div>
  );
}
