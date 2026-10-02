"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA_LABEL, PRIVATE_PATH, RESERVE_PATH } from "@/lib/site";

/** 貸切の相談を案内するページ（それ以外は一般の予約） */
const PRIVATE_PAGES = ["/workshop", "/terms/event"];
/** 出さないページ（すでに予約の画面、または読むことが目的のページ） */
const HIDDEN_PAGES = ["/reserve", "/terms"];

/**
 * スマホ用の小さな固定ボタン（画面右下）。
 * - 帯ではなく小さなピル型。本文を隠さないよう、最初の画面では出さず、少しスクロールしてから出す
 * - ページ下部の予約セクションやフッターが見えているあいだは隠す（同じボタンが 2 つ並ばないように）
 * - PC では出さない（ヘッダーに予約ボタンが常にある）
 */
export function MobileCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [nearCta, setNearCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    // 途中までスクロールした状態で開いた場合に備えて、最初の 1 回は次の描画のタイミングで確かめる
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const zones = Array.from(document.querySelectorAll("[data-cta-zone]"));
    if (zones.length === 0) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setNearCta(visible.size > 0);
    });
    zones.forEach((z) => io.observe(z));
    return () => {
      io.disconnect();
      setNearCta(false);
    };
  }, [pathname]);

  if (HIDDEN_PAGES.includes(pathname)) return null;
  const isPrivate = PRIVATE_PAGES.includes(pathname);
  const show = scrolled && !nearCta;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[opacity,transform,visibility] duration-300 lg:hidden ${
        show ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
      // 隠れているあいだは読み上げ・キーボード・タップの対象から外す（invisible と inert）
      inert={!show}
    >
      <Link
        href={isPrivate ? PRIVATE_PATH : RESERVE_PATH}
        className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink bg-sun-deep px-5 font-round text-sm font-bold tracking-wider text-ink"
      >
        <span aria-hidden className="size-2 rounded-full bg-ink" />
        {isPrivate ? CTA_LABEL.privateShort : CTA_LABEL.generalShort}
      </Link>
    </div>
  );
}
