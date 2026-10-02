import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { MAIN_NAV } from "@/lib/nav";

export const metadata: Metadata = {
  title: "ページが見つかりません｜Nippori Share Base",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-sun">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="display text-7xl sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl sm:text-3xl">ページが見つかりません</h1>
        <p className="mx-auto mt-5 max-w-xl text-[0.95rem]">
          お探しのページは、移動または削除された可能性があります。糸がからまってしまったようです。下のリンクから、あらためてお探しください。
        </p>
        <Image src={IMG.logo.src} alt="" width={160} height={150} className="mx-auto mt-8 h-auto w-32" sizes="128px" />
        <p className="mt-8">
          <Link href="/" className="btn btn-ink">
            ホームへ戻る
          </Link>
        </p>
        <nav aria-label="主なページ" className="mt-9">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="btn btn-cream min-h-11 px-5 py-1 text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
