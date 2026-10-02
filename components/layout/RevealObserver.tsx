"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 画面まわりの小さな補助を 2 つ行う（どちらも見た目だけで、本文の HTML には影響しない）。
 *
 * 1. [data-reveal] が付いた要素を、スクロールで画面に入ったときにふわっと表示する。
 *    本文は HTML の時点で見えている。JS が動いたあと「画面より下にある要素」だけを一度隠し、
 *    画面に入ったら表示する。JS が無効・失敗しても、クローラーが JS を実行しなくても本文は消えない。
 *    アニメーションを減らす設定（prefers-reduced-motion）のときは何もしない。
 *
 * 2. ページ内アンカー（#lock など）の着地位置を合わせる。
 *    長いページでは .cv（content-visibility: auto）で画面外の区画の描画を後回しにしている。
 *    そのままだと、目的地より上の区画が「仮の高さ」のままスクロール位置が決まり、着地がずれる。
 *    目的地より上にある .cv を先に描画させてから、あらためて位置を合わせる。
 */
function alignToHash() {
  const raw = window.location.hash.slice(1);
  if (!raw) return;
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    // 不正な % エンコードはそのまま使う
  }
  const target = document.getElementById(id);
  if (!target) return;
  document.querySelectorAll<HTMLElement>(".cv").forEach((el) => {
    // target が el より後ろにある（＝el は目的地より上）ときだけ描画を確定させる
    if (el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) el.style.contentVisibility = "visible";
  });
  requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // ページ遷移直後のスクロール（Next.js 側）が終わってから合わせる
    const timer = window.setTimeout(alignToHash, 60);
    window.addEventListener("hashchange", alignToHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", alignToHash);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-done])"));
    if (targets.length === 0) return;

    // 位置の判定は IntersectionObserver に任せる。ここで getBoundingClientRect を呼ぶと、
    // .cv（content-visibility: auto）で後回しにしている区画まで一度に描画させてしまい、最初の表示が重くなる。
    const io = new IntersectionObserver(
      (entries) => {
        const vh = window.innerHeight;
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (el.classList.contains("reveal-wait")) {
              el.classList.remove("reveal-wait");
              el.classList.add("reveal-in");
            }
            el.dataset.revealDone = "1";
            io.unobserve(el);
          } else if (!el.dataset.revealSeen) {
            // 最初の通知：画面より下にあるものだけ隠して待つ。画面内・画面より上のものは触らない。
            // まだ描画されていない区画（.cv）の中の要素は大きさ 0 で届くので、これも「待つ」扱いにする
            el.dataset.revealSeen = "1";
            const rect = entry.boundingClientRect;
            const notLaidOut = rect.width === 0 && rect.height === 0;
            if (notLaidOut || rect.top >= vh) {
              el.classList.add("reveal-wait");
            } else if (rect.bottom <= 0) {
              el.dataset.revealDone = "1";
              io.unobserve(el);
            }
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );
    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
