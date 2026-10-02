import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { LEGAL_NAV, MAIN_NAV, SUB_NAV } from "@/lib/nav";
import { SITE, mailHref, telHref } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/Icons";

/**
 * フッター。現在の公式サイトと同じく、黄色地の中央に店舗情報（名称・住所・メール・電話）を置く。
 * その下にサイト内リンクをまとめる。
 */
export function Footer() {
  return (
    <footer className="bg-sun text-ink">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <div className="text-center">
          <Image src={IMG.logo.src} alt="" width={120} height={112} className="mx-auto h-auto w-24 sm:w-28" sizes="112px" />
          <p className="mt-4 font-round text-2xl font-bold tracking-wider">{SITE.name}</p>
          <p className="mt-1 text-sm">{SITE.tagline}</p>

          <address className="mt-8 not-italic">
            <dl className="mx-auto grid max-w-3xl gap-6 text-sm sm:grid-cols-3 sm:text-[0.95rem]">
              <div>
                <dt className="font-round text-base font-bold">所在地</dt>
                <dd className="mt-1">
                  〒{SITE.postalCode}
                  <br />
                  {SITE.addressFull}
                </dd>
              </div>
              <div>
                <dt className="font-round text-base font-bold">メールアドレス</dt>
                <dd className="mt-1 break-all">
                  <a href={mailHref} className="inline-block py-1 underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-round text-base font-bold">電話番号</dt>
                <dd className="mt-1">
                  <a href={telHref} className="inline-block py-1 underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                    {SITE.tel}
                  </a>
                  <span className="text-xs">（{SITE.telNote}）</span>
                </dd>
              </div>
            </dl>
          </address>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 font-round text-sm font-bold"
          >
            <InstagramIcon />
            Instagram {SITE.instagramHandle}
          </a>
        </div>

        <div className="stitch mt-12 text-ink/50" aria-hidden />

        <nav aria-label="フッターナビゲーション" className="mt-10 grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="eyebrow text-xs text-ash">Use</p>
            <ul className="mt-2 space-y-1">
              {MAIN_NAV.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1 hover:underline">
                    {item.label}
                    {item.description ? <span className="ml-2 text-xs text-ash">{item.description}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-xs text-ash">Guide</p>
            <ul className="mt-2 space-y-1">
              {[...MAIN_NAV.slice(4), { href: "/reserve", label: "予約する" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-xs text-ash">More</p>
            <ul className="mt-2 space-y-1">
              {[...SUB_NAV, ...LEGAL_NAV].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <p className="mt-12 text-center text-xs leading-6">
          運営：{SITE.operator}
          <br />
          <small className="text-xs">© {SITE.name}</small>
        </p>
      </div>
    </footer>
  );
}
