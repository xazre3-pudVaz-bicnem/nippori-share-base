import { SITE, mailHref, telHref } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/sections/MapEmbed";

/** 店舗情報（名称・住所・電話・メール）と地図。表記はすべて lib/site.ts から取る */
export function AccessBlock() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
      <div className="rounded-3xl bg-butter p-6 sm:p-8" data-reveal>
        <p className="font-round text-xl font-bold tracking-wider sm:text-2xl">{SITE.name}</p>
        <dl className="mt-5 space-y-5 text-[0.95rem]">
          <div className="flex gap-3">
            <dt className="shrink-0 pt-1">
              <PinIcon />
              <span className="sr-only">所在地</span>
            </dt>
            <dd>
              〒{SITE.postalCode}
              <br />
              {SITE.addressFull}
              <span className="mt-1 block text-sm text-ash">日暮里繊維街の生地店・齊藤商店の2階です。</span>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="shrink-0 pt-1">
              <PhoneIcon />
              <span className="sr-only">電話番号</span>
            </dt>
            <dd>
              <a href={telHref} className="link">
                {SITE.tel}
              </a>
              <span className="text-sm">（{SITE.telNote}）</span>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="shrink-0 pt-1">
              <MailIcon />
              <span className="sr-only">メールアドレス</span>
            </dt>
            <dd className="break-all">
              <a href={mailHref} className="link">
                {SITE.email}
              </a>
            </dd>
          </div>
        </dl>
        <p className="mt-6 rounded-2xl bg-white px-4 py-3 text-sm leading-7">
          ご利用枠は Team AM（10:00〜13:30）／Team PM（14:00〜17:30）／All Day（10:00〜17:30）。予約できる日は、空き状況カレンダーでご確認ください。
        </p>
      </div>
      <MapEmbed />
    </div>
  );
}
