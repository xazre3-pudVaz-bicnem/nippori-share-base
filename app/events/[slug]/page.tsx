import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENTS, type NsbEvent } from "@/data/events";
import { Budou } from "@/lib/budou";
import { type EventStatus, dateTimeLabel, dayLabel, eventDayParts, eventDays, eventDaysLabel, eventDaysShort, eventPath, eventStatus, getEvent, isPast, sessionSlots, slotOf } from "@/lib/events";
import { eventSchemas, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon, InstagramIcon, PhoneIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccessBlock } from "@/components/sections/AccessBlock";
import { PageHero } from "@/components/sections/PageHero";
import { Notes, PriceInc } from "@/components/sections/PriceTables";
import { Steps } from "@/components/sections/Steps";

/**
 * イベントの告知ページ。内容はすべて data/events.ts から取る（ここに日時や参加費を書かない）。
 * 読むのは「参加したい人」。申込は外部のショップと電話なので、スペースの予約導線（ReserveCta・スマホの予約ボタン）は出さない。
 * 受付の状態（受付終了・開催終了、電話受付の締切）は、ビルドした時点で決まる。
 */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  const title = `${e.title}（${eventDaysShort(e)}）`;
  return buildMetadata({
    title,
    // 長いタイトルには「｜Nippori Share Base」を付けない（コラムの記事と同じ決まり）
    rawTitle: [...title].reduce((a, ch) => a + (ch.charCodeAt(0) > 255 ? 1 : 0.5), 0) > 24,
    description: e.description,
    path: eventPath(e),
    keywords: [...e.keywords],
    // SNS で共有されたときの画像。横長（1200×630）に作ったものがあればそれ、無ければ告知画像
    image: e.ogImage
      ? { path: e.ogImage, width: 1200, height: 630, alt: e.title }
      : e.img
        ? { path: e.img.src.src, width: e.img.src.width, height: e.img.src.height, alt: e.img.alt }
        : undefined,
  });
}

const CLOSED_TEXT: Record<Exclude<EventStatus, "open">, string> = {
  closed: "お申し込みの受付は終了しました。",
  ended: "このイベントは終了しました。",
};

const telHrefOf = (tel: string) => `tel:${tel.replace(/-/g, "")}`;

/** 日時の範囲。日時の途中では折り返さない */
function Range({ from, to }: { from: string; to: string }) {
  return (
    <>
      <span className="whitespace-nowrap">{from}〜</span>
      <wbr />
      <span className="whitespace-nowrap">{to}</span>
    </>
  );
}

/** h1。kicker（主催の名前）を小さめの 1 行目、main を大きい 2 行目にする。それぞれの中は文節で折り返す */
function Heading({ e }: { e: NsbEvent }) {
  if (!e.heading) return <Budou>{e.title}</Budou>;
  return (
    <>
      <span className="block text-[0.7em] tracking-[0.04em]">
        <Budou>{e.heading.kicker}</Budou>
      </span>
      {/* 画面では 2 行に分かれるが、読み上げや検索エンジンには「◯◯ コラボワークショップ」と 1 続きで渡す */}{" "}
      <span className="mt-1 block">
        <Budou>{e.heading.main}</Budou>
      </span>
    </>
  );
}

/** 申込のボタン（ネットショップ・電話）。ネットショップは別のタブで開く。電話は締切を過ぎたら出さない */
function ApplyButtons({ e, status }: { e: NsbEvent; status: EventStatus }) {
  if (status !== "open") return <p className="font-round text-lg font-bold">{CLOSED_TEXT[status]}</p>;
  const { online, phone } = e.apply;
  const phoneOpen = phone && !isPast(phone.closes);
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {online.url ? (
          <a href={online.url} target="_blank" rel="noopener noreferrer" className="btn btn-ink min-h-14 px-6 text-base sm:text-lg">
            ネットショップで申し込む
            <ExternalIcon />
          </a>
        ) : null}
        {phoneOpen ? (
          <a href={telHrefOf(phone.tel)} className="btn btn-line min-h-14 px-6 text-base sm:text-lg">
            <PhoneIcon className="size-5" />
            電話で申し込む
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-[0.82rem] leading-6 sm:text-sm">
        <span className="block">
          受付開始：<span className="whitespace-nowrap">{dateTimeLabel(online.opens)}</span>
        </span>
        <span className="block">
          ネットショップは<Budou>{online.note}</Budou>
          <span className="whitespace-nowrap">「{online.name}」</span>
        </span>
        {phoneOpen ? (
          <span className="block">
            お電話は{phone.note}（<span className="whitespace-nowrap">{phone.tel}</span>）
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  const status = eventStatus(e);
  const path = eventPath(e);
  const { online, phone } = e.apply;
  const phoneClosed = phone ? isPast(phone.closes) : false;

  const outline: { label: string; value: ReactNode }[] = [
    {
      label: "日程",
      // 1 日ずつ折り返さないようにして、「（土）」だけが次の行に落ちるのを防ぐ
      value: eventDayParts(e, { year: true }).map((d, i, all) => (
        <span key={d}>
          {i > 0 ? <wbr /> : null}
          <span className="whitespace-nowrap">
            {d}
            {i < all.length - 1 ? "・" : ""}
          </span>
        </span>
      )),
    },
    {
      label: "時間",
      value: sessionSlots(e).map((s) => (
        <span key={s.label} className="block">
          <span className="font-round font-bold">{s.label}</span>
          <span className="ml-3 whitespace-nowrap">{s.time}</span>
          <span className="ml-3 whitespace-nowrap">{s.item}</span>
        </span>
      )),
    },
    {
      label: "参加費",
      value: (
        <>
          <ul className="space-y-1">
            {e.items.map((item) => (
              <li key={item.name} className="flex flex-wrap items-baseline gap-x-4">
                <span>{item.name}</span>
                <PriceInc inc={item.inc} />
              </li>
            ))}
          </ul>
          <span className="mt-1 block text-xs sm:text-[0.82rem]">{e.includes}</span>
        </>
      ),
    },
    { label: "定員", value: e.capacityShort },
    { label: "持ち物", value: e.bring },
    { label: "対象", value: e.audience },
    {
      label: "会場",
      value: (
        <>
          {SITE.name}
          <span className="block text-xs sm:text-[0.82rem]">{SITE.addressFull}</span>
        </>
      ),
    },
    {
      label: "申込",
      value: (
        <>
          <span className="block">
            ネットショップ：<Range from={dateTimeLabel(online.opens)} to={dateTimeLabel(online.closes)} />
          </span>
          {phone ? (
            <span className="block">
              お電話：<Range from={dateTimeLabel(phone.opens)} to={dateTimeLabel(phone.closes)} />
            </span>
          ) : null}
          <Link href="#entry" className="link mt-1 inline-flex items-center gap-1.5 text-sm">
            お申し込み方法
            <ArrowIcon />
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={graph(...eventSchemas(e))} />

      <PageHero
        crumbs={[{ name: "イベントのお知らせ", path: "/events" }, { name: e.title, path }]}
        en="Event"
        title={<Heading e={e} />}
        lead={`${e.catch}。${e.lead}`}
        img={e.img}
        ratio="aspect-square"
      >
        <ApplyButtons e={e} status={status} />
      </PageHero>

      {/* ───────── 開催概要 ───────── */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Outline" title="開催概要" />
          <dl className="rows mt-9">
            {outline.map((o) => (
              <div key={o.label} className="grid gap-x-6 gap-y-1 py-4 first:pt-0 sm:grid-cols-[7rem_1fr]">
                <dt className="font-round font-bold">{o.label}</dt>
                <dd className="min-w-0 text-[0.95rem]">{o.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ───────── 作るもの ───────── */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="What to make" title={e.items.length > 1 ? `作るものは、${e.items.length}つ` : "作るもの"} lead={e.itemsLead} />
          <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-14">
            {e.items.map((item) => {
              const slot = slotOf(e, item.name);
              return (
                <article key={item.name} data-reveal>
                  {item.img ? <Photo img={item.img} ratio="aspect-[4/5]" position="50% 35%" sizes="(max-width: 767px) 92vw, 480px" /> : null}
                  {slot ? (
                    <p className="mt-6 font-round text-sm font-bold sm:text-base">
                      {slot.label}　{slot.time}
                    </p>
                  ) : null}
                  <h3 className="mt-1 text-2xl sm:text-[1.75rem]">{item.name}</h3>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-3">
                    <PriceInc inc={item.inc} />
                    <span className="text-xs sm:text-sm">{e.includes}</span>
                  </p>
                  {item.note ? <p className="mt-3 text-[0.9rem]">{item.note}</p> : null}
                  {item.fabrics ? (
                    <div className="mt-8">
                      <h4 className="font-round font-bold">選べる生地</h4>
                      {item.fabrics.lead ? <p className="mt-1 text-sm">{item.fabrics.lead}</p> : null}
                      {item.fabrics.list.some((f) => f.img) ? (
                        <ul className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5">
                          {item.fabrics.list.map((f) => (
                            <li key={f.name}>
                              {f.img ? <Photo img={f.img} ratio="aspect-square" sizes="(max-width: 639px) 30vw, 110px" className="rounded-lg" /> : null}
                              <p className="mt-1.5 text-[0.72rem] leading-4 sm:text-xs">{f.name}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="mt-3 space-y-1 text-[0.92rem]">
                          {item.fabrics.list.map((f) => (
                            <li key={f.name}>{f.name}</li>
                          ))}
                        </ul>
                      )}
                      {item.fabrics.imgs ? (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {item.fabrics.imgs.map((img) => (
                            <Photo key={img.alt} img={img} ratio="aspect-square" sizes="(max-width: 767px) 45vw, 230px" className="rounded-lg" />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────── 日程と定員 ───────── */}
      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="Schedule" title={`${eventDaysLabel(e)}、全${e.sessions.length}回`} lead={e.capacityNote} />
          <dl className="rows rows-top mt-10">
            {eventDays(e).map((day) => (
              <div key={day} className="grid gap-x-6 gap-y-2 py-5 sm:grid-cols-[10rem_1fr]" data-reveal>
                <dt className="font-round text-lg font-bold">{dayLabel(day)}</dt>
                <dd>
                  <ul className="space-y-2">
                    {e.sessions
                      .filter((s) => s.date === day)
                      .map((s) => (
                        <li key={s.label} className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <span>
                            <span className="font-round font-bold">{s.label}</span>
                            <span className="ml-3 whitespace-nowrap">
                              {s.start}〜{s.end}
                            </span>
                            <span className="ml-3 whitespace-nowrap">{s.item}</span>
                          </span>
                          <span className="text-sm">定員{s.capacity}名</span>
                        </li>
                      ))}
                  </ul>
                  {e.dayNotes?.[day] ? <p className="mt-2 text-sm">＊{e.dayNotes[day]}</p> : null}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ───────── 特典 ───────── */}
      {e.perks ? (
        <section className="cv bg-butter py-20 sm:py-28">
          <Container size="narrow">
            <SectionHeading align="left" en="Gifts" title={e.perks.title} />
            <dl className="rows mt-9">
              {e.perks.rows.map((r) => (
                <div key={r.who} className="grid gap-x-6 gap-y-2 py-5 first:pt-0 sm:grid-cols-[13rem_1fr]" data-reveal>
                  <dt className="font-round text-lg font-bold">{r.who}</dt>
                  <dd>
                    <ul className="space-y-1 text-[0.95rem]">
                      {r.gifts.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {/* ───────── 当日のこと ───────── */}
      <section className="cv py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeading align="left" en="On the day" title="当日のこと" />
          <dl className="rows mt-9">
            {e.onTheDay.map((d) => (
              <div key={d.title} className="py-6 first:pt-0" data-reveal>
                <dt className="font-round text-lg font-bold">{d.title}</dt>
                <dd className="mt-1.5 text-[0.95rem]">{d.body}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-14 text-xl sm:text-2xl">お持ち帰りできるもの</h3>
          <ul className="rows mt-5">
            {e.takeHome.map((t) => (
              <li key={t} className="py-4 text-[0.95rem] first:pt-0" data-reveal>
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── 会場 ───────── */}
      <section className="cv bg-butter py-20 sm:py-28">
        <Container>
          <SectionHeading align="left" en="Access" title="会場" lead="日暮里繊維街の生地店・齊藤商店の2階にある、Nippori Share Base です。" />
          <div className="mt-10 sm:mt-12">
            <AccessBlock />
          </div>
        </Container>
      </section>

      {/* ───────── お申し込み方法（最後の区画。.cv を付けない） ───────── */}
      <section id="entry" className="bg-sun py-20 sm:py-28" data-cta-zone>
        <Container size="narrow">
          <SectionHeading align="left" en="Entry" title="お申し込み方法" lead={status === "open" ? (phone ? "ネットショップか、お電話で受け付けます。" : "ネットショップで受け付けます。") : CLOSED_TEXT[status]} />

          <h3 className="mt-12 text-xl sm:text-2xl">
            {phone ? "① " : ""}ネットショップ<span className="whitespace-nowrap">「{online.name}」</span>
          </h3>
          <p className="mt-2 text-[0.95rem]">
            <Budou>{`${online.note}です。受付は`}</Budou>
            <Range from={dateTimeLabel(online.opens)} to={dateTimeLabel(online.closes)} />
            <Budou>まで。</Budou>
          </p>
          <div className="mt-6">
            <Steps items={[...online.steps]} headingLevel="h4" top />
          </div>
          {status === "open" && online.url ? (
            <p className="mt-8">
              <a href={online.url} target="_blank" rel="noopener noreferrer" className="btn btn-ink min-h-14 w-full max-w-sm px-6 text-lg">
                ネットショップで申し込む
                <ExternalIcon />
              </a>
            </p>
          ) : null}

          {phone ? (
            <>
              <h3 className="mt-16 text-xl sm:text-2xl">② お電話</h3>
              <p className="mt-2 text-[0.95rem]">{phone.note}で受け付けます。</p>
              {phoneClosed ? (
                <p className="mt-4 font-round font-bold">お電話での受付は終了しました。</p>
              ) : (
                <p className="mt-4">
                  <a href={telHrefOf(phone.tel)} className="inline-flex items-center gap-2 font-round text-2xl font-bold tracking-wider underline decoration-sun-deep decoration-[3px] underline-offset-[6px] hover:decoration-ink sm:text-3xl">
                    <PhoneIcon className="size-6" />
                    {phone.tel}
                  </a>
                </p>
              )}
              <h4 className="mt-8 font-round font-bold">受付日時</h4>
              <dl className="rows mt-3">
                {phone.hours.map((h) => (
                  <div key={h.date} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3 first:pt-0">
                    <dt className="font-round font-bold">{dayLabel(h.date)}</dt>
                    <dd className="text-[0.95rem]">
                      {h.time ?? ""}
                      {h.note ? <span className={h.time ? "ml-2 text-sm" : ""}>{h.time ? `（${h.note}）` : h.note}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
              <Notes items={phone.notes} className="mt-5" />
            </>
          ) : null}

          <h3 className="mt-16 font-round text-lg font-bold">ご注意ください</h3>
          <Notes items={e.notes} className="mt-3" />

          <h3 className="mt-12 font-round text-lg font-bold">お問い合わせ</h3>
          <p className="mt-2 text-[0.95rem]">このワークショップについては、{e.contact.name}へお問い合わせください。</p>
          <p className="mt-3 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {e.contact.instagram ? (
              <a href={e.contact.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 decoration-ink/40">
                <InstagramIcon className="size-4" />
                Instagram {e.contact.instagramHandle}
              </a>
            ) : null}
            {e.contact.tel ? (
              <a href={telHrefOf(e.contact.tel)} className="link inline-flex items-center gap-1.5 decoration-ink/40">
                <PhoneIcon className="size-4" />
                {e.contact.tel}（{SITE.telUntil}まで）
              </a>
            ) : null}
          </p>

          <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {e.instagram ? (
              <a href={e.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 decoration-ink/40">
                <InstagramIcon className="size-4" />
                Instagram の告知を見る
              </a>
            ) : null}
            <Link href="/events" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              イベントのお知らせ一覧
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
