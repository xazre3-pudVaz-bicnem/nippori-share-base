"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ENJOY_NAV } from "@/lib/nav";

/**
 * ヘッダー（PC）の「楽しみ方」メニュー。使い方別のページをまとめて、ヘッダーの項目数を抑える。
 * ボタンで開閉（キーボード可）、Escape・外側のクリック・リンクのクリックで閉じる。マウスは乗せるだけでも開く。
 * 閉じているときもリンクは HTML に入っている（hidden 属性で隠しているだけ）。
 */
export function EnjoyMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="enjoy-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 py-2 font-medium text-slate transition-colors hover:text-ink"
      >
        楽しみ方
        <svg aria-hidden viewBox="0 0 12 12" className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
        </svg>
      </button>
      <div
        id="enjoy-menu"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute left-1/2 top-full w-[19rem] -translate-x-1/2 pt-2"
      >
        <ul className="rounded-2xl border-2 border-ink bg-white px-5 py-2">
          {ENJOY_NAV.map((item, i) => (
            <li key={item.href} className={i > 0 ? "border-t-2 border-dashed border-ink/20" : ""}>
              <Link href={item.href} className="group block py-3">
                <span className="font-round font-bold underline decoration-transparent decoration-[3px] underline-offset-4 group-hover:decoration-sun-deep">{item.label}</span>
                {item.description ? <span className="mt-0.5 block text-xs text-ash">{item.description}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
