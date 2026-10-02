import Link from "next/link";
import { SITE, mailHref, telHref } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/sections/MapEmbed";

/** 店舗情報（名称・住所・電話・メール）と地図。表記はすべて lib/site.ts から取る */
export function AccessBlock() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
      <div data-reveal>
        <p className="font-round text-xl font-bold tracking-wider sm:text-2xl">{SITE.name}</p>
        <dl className="rows mt-5 text-[0.95rem]">
          <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr]">
            <dt className="font-round font-bold">所在地</dt>
            <dd>
              〒{SITE.postalCode}
              <br />
              {SITE.addressFull}
            </dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr]">
            <dt className="font-round font-bold">電話番号</dt>
            <dd>
              <a href={telHref} className="link">
                {SITE.tel}
              </a>
              <span className="text-sm">（{SITE.telNote}）</span>
            </dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr]">
            <dt className="font-round font-bold">メール</dt>
            <dd className="break-all">
              <a href={mailHref} className="link">
                {SITE.email}
              </a>
            </dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr]">
            <dt className="font-round font-bold">ご利用枠</dt>
            <dd>
              {SITE.slots.map((s) => (
                <span key={s.name} className="block">
                  {s.name}　{s.time}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <p className="mt-6">
          <Link href="/access" className="link inline-flex items-center gap-1.5 text-sm">
            入口と階段の写真つきの行き方
            <ArrowIcon />
          </Link>
        </p>
      </div>
      <MapEmbed />
    </div>
  );
}
