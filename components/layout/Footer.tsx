import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/data/images";
import { FOOTER_NAV } from "@/lib/nav";
import { SITE, mailHref, telHref } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/Icons";

/**
 * フッター。旧サイトと同じ黄色地に、店舗情報（名称・住所・電話・メール）をはっきり置く。
 * 検索向けの説明文は置かない。表記は lib/site.ts から取る（NAP をサイト全体でそろえるため）。
 */
export function Footer() {
  return (
    <footer className="bg-sun text-ink" data-cta-zone>
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8 sm:pt-16">
        <div className="stitch mb-12 text-ink/45" aria-hidden />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* 店舗情報 */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src={IMG.logo.src} alt="" width={96} height={90} className="h-auto w-20" sizes="80px" />
              <span>
                <span className="block font-round text-xl font-bold tracking-wider">{SITE.name}</span>
                <span className="block text-sm">{SITE.tagline}</span>
              </span>
            </Link>

            <address className="mt-7 space-y-3 text-[0.95rem] not-italic">
              <p>
                〒{SITE.postalCode}
                <br />
                {SITE.addressFull}
              </p>
              <p>
                <span className="mr-2 font-round font-bold">電話</span>
                <a href={telHref} className="inline-block py-1 underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                  {SITE.tel}
                </a>
                <span className="text-sm">（{SITE.telNote}）</span>
              </p>
              <p className="break-all">
                <span className="mr-2 font-round font-bold">メール</span>
                <a href={mailHref} className="inline-block py-1 underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                  {SITE.email}
                </a>
              </p>
            </address>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-5 font-round text-sm font-bold transition-colors duration-200 hover:bg-ink hover:text-white"
            >
              <InstagramIcon />
              Instagram {SITE.instagramHandle}
            </a>
          </div>

          {/* サイト内リンク */}
          <nav aria-label="フッターナビゲーション" className="grid grid-cols-2 gap-x-6 gap-y-10 text-[0.92rem] sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <p className="font-round font-bold">{group.title}</p>
                <ul className="mt-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-block py-1.5 hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-14 text-xs leading-6">
          運営：{SITE.operator}
          <span className="mx-2" aria-hidden>
            ／
          </span>
          <small className="text-xs">© {SITE.name}</small>
        </p>
      </div>
    </footer>
  );
}
