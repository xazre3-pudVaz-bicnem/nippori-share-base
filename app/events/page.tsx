import type { Metadata } from "next";
import Link from "next/link";
import type { NsbEvent } from "@/data/events";
import { yen } from "@/data/pricing";
import { Budou } from "@/lib/budou";
import { dateTimeLabel, eventDaysLabel, eventPath, eventStatus, getPastEvents, getUpcomingEvents, minPrice } from "@/lib/events";
import { pageKeywords } from "@/lib/keywords";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";

/**
 * Nippori Share Base で開催する、参加者を募集するイベントの一覧。読むのは「参加したい人」。
 * 会をひらきたい主催者向けの案内は /workshop（役割を分けている）。
 * 告知（Instagram）では「公式ホームページの『イベントのお知らせ』から申し込める」と案内しているので、名前をそろえている。
 */
export const metadata: Metadata = buildMetadata({
  title: "イベントのお知らせ",
  description: "Nippori Share Base で開催するワークショップやイベントのお知らせです。日時・参加費・申込方法は、イベントごとのページでご案内します。",
  path: "/events",
  keywords: pageKeywords("/events"),
});

/**
 * 終わったものだけ印を付ける。「受付中」は出さない（ページはビルドした時点の内容なので、
 * 受付開始の前に作ったページに「受付中」と出てしまう）。受付中のものは、受付期間をそのまま書く。
 */
const STATUS_LABEL = { closed: "受付終了", ended: "終了" } as const;

function EventRow({ e }: { e: NsbEvent }) {
  const status = eventStatus(e);
  return (
    <li className="first:[&>a]:pt-0" data-reveal>
      <Link href={eventPath(e)} className="group flex items-center gap-4 py-6 sm:gap-6">
        {/* 告知画像は、文字が欠けないよう正方形のまま小さく */}
        {e.img ? (
          <span className="w-20 shrink-0 self-start sm:w-28">
            <Photo img={e.img} ratio="aspect-square" sizes="112px" className="rounded-xl" alt="" />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-round font-bold">{eventDaysLabel(e, { year: true })}</span>
            {status !== "open" ? <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-bold">{STATUS_LABEL[status]}</span> : null}
          </span>
          <span className="mt-2 block font-round text-lg font-bold leading-snug sm:text-xl">
            <Budou>{e.title}</Budou>
          </span>
          <span className="mt-1.5 block text-sm">
            {e.capacityShort}・
            <span className="whitespace-nowrap">
              税込 {yen(minPrice(e))}円{e.items.length > 1 ? "〜" : ""}
            </span>
          </span>
          {status === "open" ? (
            <span className="mt-1 block text-xs sm:text-[0.82rem]">
              申込：<span className="whitespace-nowrap">{dateTimeLabel(e.apply.online.opens)}〜</span>
              <wbr />
              <span className="whitespace-nowrap">{dateTimeLabel(e.apply.closes)}</span>
            </span>
          ) : null}
        </span>
        <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-sun transition-[transform,background-color,color] duration-300 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-white">
          <ArrowIcon />
        </span>
      </Link>
    </li>
  );
}

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  return (
    <>
      <PageHero crumbs={[{ name: "イベントのお知らせ", path: "/events" }]} en="Events" title="イベントのお知らせ" lead="Nippori Share Base で開催するワークショップやイベントのお知らせです。日時・参加費・申込方法は、イベントごとのページでご案内します。" />

      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Upcoming" title="開催予定のイベント" />
          {upcoming.length > 0 ? (
            <ul className="rows mt-9">
              {upcoming.map((e) => (
                <EventRow key={e.slug} e={e} />
              ))}
            </ul>
          ) : (
            <p className="mt-9 text-[0.95rem]">
              いま開催予定のイベントはありません。
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link ml-1 inline-flex items-center gap-1">
                Instagram
                <ExternalIcon />
              </a>
              も、あわせてご覧ください。
            </p>
          )}

          {past.length > 0 ? (
            <>
              <h2 className="mt-20 text-xl sm:text-2xl">終了したイベント</h2>
              <ul className="rows mt-6">
                {past.map((e) => (
                  <EventRow key={e.slug} e={e} />
                ))}
              </ul>
            </>
          ) : null}

          <p className="mt-14 text-sm">
            会場として、ワークショップや展示会をひらきたい方は
            <Link href="/workshop" className="link ml-1 inline-flex items-center gap-1.5">
              ワークショップ・イベント
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      <ReserveCta variant="both" />
    </>
  );
}
