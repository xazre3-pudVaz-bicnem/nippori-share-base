import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { MAIN_NAV } from "@/lib/nav";
import { RESERVE_PATH, SITE } from "@/lib/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

/** 白地のシンプルなヘッダー（現在の公式サイトと同じく、ロゴは左・メニューは右） */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white">
      <div className="relative mx-auto flex h-15 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[4.5rem]">
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:gap-2.5" aria-label={`${SITE.name} ホーム`}>
          <Image src={IMG.logo.src} alt="" width={44} height={41} className="h-10 w-auto shrink-0 lg:h-11" sizes="48px" />
          {/* 幅 360px 未満ではロゴだけにする（予約ボタンと重ならないように） */}
          <span className="whitespace-nowrap font-round text-[0.86rem] font-bold tracking-wide text-ink max-[359px]:hidden sm:text-base sm:tracking-wider">{SITE.name}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 lg:gap-5">
          <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
            <ul className="flex items-center gap-x-5 text-[0.95rem] xl:gap-x-7">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative block py-2 font-medium text-slate transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded after:bg-sun-deep after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={RESERVE_PATH} className="btn btn-sun min-h-10 whitespace-nowrap px-4 py-1.5 text-[0.82rem] lg:min-h-11 lg:px-7 lg:text-base">
            予約する
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
