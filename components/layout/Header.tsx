import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { HEADER_NAV } from "@/lib/nav";
import { CTA_LABEL, RESERVE_PATH, SITE } from "@/lib/site";
import { EnjoyMenu } from "@/components/layout/EnjoyMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * 白地のシンプルなヘッダー（旧サイトと同じく、ロゴは左・メニューは右）。
 * PC に並べるのは主要な導線だけ。使い方別のページは「楽しみ方」にまとめている（lib/nav.ts）。
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white">
      <div className="relative mx-auto flex h-15 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[4.5rem]">
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:gap-2.5" aria-label={`${SITE.name} ホーム`}>
          <Image src={IMG.logo.src} alt="" width={44} height={41} className="h-10 w-auto shrink-0 lg:h-11" sizes="48px" />
          {/* 幅 360px 未満ではロゴだけにする（予約ボタンと重ならないように） */}
          <span className="whitespace-nowrap font-round text-[0.86rem] font-bold tracking-wide text-ink max-[359px]:hidden sm:text-base sm:tracking-wider">{SITE.name}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 lg:gap-6">
          <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
            <ul className="flex items-center gap-x-6 text-[0.95rem] xl:gap-x-8">
              {HEADER_NAV.map((entry) =>
                entry.type === "enjoy" ? (
                  <li key="enjoy">
                    <EnjoyMenu />
                  </li>
                ) : (
                  <li key={entry.item.href}>
                    <Link
                      href={entry.item.href}
                      className="relative block py-2 font-medium text-slate transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded after:bg-sun-deep after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                    >
                      {entry.item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <Link href={RESERVE_PATH} className="btn btn-sun min-h-10 whitespace-nowrap px-4 py-1.5 text-[0.82rem] lg:min-h-11 lg:px-6 lg:text-[0.95rem]">
            {/* 幅の狭い画面では短く（ロゴの文字と重ならないように）。読み上げは常に同じ文言 */}
            <span className="min-[430px]:hidden" aria-hidden>
              予約
            </span>
            <span className="max-[429px]:sr-only">{CTA_LABEL.generalShort}</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
