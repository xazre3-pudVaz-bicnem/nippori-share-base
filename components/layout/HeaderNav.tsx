"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_NAV, isCurrent, type NavGroup } from "@/lib/nav";

/**
 * ヘッダー（PC）のナビゲーション。
 *
 * - 下線は、乗せたとき（hover）と、いま開いているページ（現在地）の両方で出す。
 *   縦に長いページが多いので、スクロールしても「いまどのページにいるか」がヘッダーで分かるようにしている
 * - 中にページを持つ項目（ミシン・設備／楽しみ方／ご案内）も、ほかの項目と同じ下線を出す。
 *   中のページを開いているあいだは、親の項目に下線が付く
 */
const ITEM =
  "relative flex items-center gap-1 py-2 font-medium text-slate transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded after:bg-sun-deep after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 data-[current=true]:text-ink data-[current=true]:after:scale-x-100 data-[open=true]:text-ink data-[open=true]:after:scale-x-100";

export function HeaderNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
      <ul className="flex items-center gap-x-5 text-[0.95rem] xl:gap-x-8">
        {HEADER_NAV.map((entry) =>
          entry.type === "group" ? (
            <li key={entry.id}>
              <NavDropdown group={entry} pathname={pathname} />
            </li>
          ) : (
            <li key={entry.item.href}>
              <Link href={entry.item.href} data-current={isCurrent(pathname, entry.item.href)} aria-current={pathname === entry.item.href ? "page" : undefined} className={ITEM}>
                {entry.item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

/**
 * 開くと中のページが出るメニュー。
 * ボタンで開閉（キーボード可）、Escape・外側のクリック・リンクのクリックで閉じる。マウスは乗せるだけでも開く。
 * 閉じているときもリンクは HTML に入っている（hidden 属性で隠しているだけ）。
 */
function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = `nav-${group.id}`;
  const current = group.items.some((item) => isCurrent(pathname, item.href));

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
      <button type="button" aria-expanded={open} aria-controls={menuId} data-current={current} data-open={open} onClick={() => setOpen((v) => !v)} className={ITEM}>
        {group.label}
        <svg aria-hidden viewBox="0 0 12 12" className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
        </svg>
      </button>
      <div
        id={menuId}
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute left-1/2 top-full w-[19rem] -translate-x-1/2 pt-2"
      >
        <ul className="rounded-2xl border-2 border-ink bg-white px-5 py-2">
          {group.items.map((item, i) => {
            const here = isCurrent(pathname, item.href);
            return (
              <li key={item.href} className={i > 0 ? "border-t-2 border-dashed border-ink/20" : ""}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="group block py-3">
                  <span className={`font-round font-bold underline decoration-[3px] underline-offset-4 transition-colors group-hover:decoration-sun-deep ${here ? "decoration-sun-deep" : "decoration-transparent"}`}>{item.label}</span>
                  {item.description ? <span className="mt-0.5 block text-xs text-ash">{item.description}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
