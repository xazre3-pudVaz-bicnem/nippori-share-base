import { EVENTS, type EventSession, type NsbEvent } from "@/data/events";

/**
 * イベント（data/events.ts）の読み出しと表記。
 * 状態（受付中・受付終了・開催終了）はビルドした時点で決まる（静的なページなので、次のビルドまで変わらない）。
 * そのため「受付開始前」は区別せず、受付期間をそのまま書いて見せる。
 */
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function eventPath(e: NsbEvent): string {
  return `/events/${e.slug}`;
}

export function getEvent(slug: string): NsbEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

/** YYYY-MM-DD → 「11月27日（金）」。year で「2026年」を付ける */
export function dayLabel(date: string, { year = false } = {}): string {
  const [y, m, d] = date.split("-").map(Number);
  const w = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${year ? `${y}年` : ""}${m}月${d}日（${w}）`;
}

/** 日本時間の ISO 8601 → 「11月2日（月）12:00」 */
export function dateTimeLabel(iso: string): string {
  return `${dayLabel(iso.slice(0, 10))}${iso.slice(11, 16)}`;
}

/** 開催日（重なりを除き、日付の順） */
export function eventDays(e: NsbEvent): string[] {
  return [...new Set(e.sessions.map((s) => s.date))].sort();
}

/** 開催日を 1 日ずつ。「2026年11月27日（金）」「28日（土）」。同じ年・月の 2 日目以降は、年と月を省く */
export function eventDayParts(e: NsbEvent, { year = false } = {}): string[] {
  return eventDays(e).map((date, i, all) => {
    if (i === 0) return dayLabel(date, { year });
    const sameMonth = all[i - 1].slice(0, 7) === date.slice(0, 7);
    return sameMonth ? dayLabel(date).replace(/^\d+月/, "") : dayLabel(date, { year: all[i - 1].slice(0, 4) !== date.slice(0, 4) });
  });
}

/** 「2026年11月27日（金）・28日（土）」 */
export function eventDaysLabel(e: NsbEvent, { year = false } = {}): string {
  return eventDayParts(e, { year }).join("・");
}

/** 「11/27・28」。タイトルやお知らせの帯など、短く書くところ用 */
export function eventDaysShort(e: NsbEvent): string {
  return eventDays(e)
    .map((date, i, all) => {
      const [, m, d] = date.split("-").map(Number);
      return i > 0 && all[i - 1].slice(0, 7) === date.slice(0, 7) ? `${d}` : `${m}/${d}`;
    })
    .join("・");
}

/** 部ごとの時間帯と作るもの（同じ名前の部は 1 つにまとめる）。例: [{ label: "第1部", time: "10:00〜12:00", item: "トレイシーTシャツ" }] */
export function sessionSlots(e: NsbEvent): { label: string; time: string; item: string }[] {
  const seen = new Map<string, { label: string; time: string; item: string }>();
  for (const s of e.sessions) if (!seen.has(s.label)) seen.set(s.label, { label: s.label, time: `${s.start}〜${s.end}`, item: s.item });
  return [...seen.values()];
}

/** 作るものが、どの部で作れるか。例: 「第1部 10:00〜12:00」 */
export function slotOf(e: NsbEvent, item: string): { label: string; time: string } | undefined {
  return sessionSlots(e).find((s) => s.item === item);
}

export function sessionStart(s: EventSession): string {
  return `${s.date}T${s.start}:00+09:00`;
}

export function sessionEnd(s: EventSession): string {
  return `${s.date}T${s.end}:00+09:00`;
}

/** 参加費のいちばん安いもの（税込） */
export function minPrice(e: NsbEvent): number {
  return Math.min(...e.items.map((i) => i.inc));
}

/** 日本時間の ISO 8601 の時刻を、ビルドした時点で過ぎているか */
export function isPast(iso: string, now = Date.now()): boolean {
  return now > Date.parse(iso);
}

export type EventStatus = "open" | "closed" | "ended";

/** open＝受付中（開始前を含む）、closed＝受付終了・開催前、ended＝開催終了 */
export function eventStatus(e: NsbEvent, now = Date.now()): EventStatus {
  const lastEnd = Math.max(...e.sessions.map((s) => Date.parse(sessionEnd(s))));
  if (now > lastEnd) return "ended";
  if (now > Date.parse(e.apply.closes)) return "closed";
  return "open";
}

const firstStart = (e: NsbEvent) => Math.min(...e.sessions.map((s) => Date.parse(sessionStart(s))));

/** 開催予定のイベント（近い順） */
export function getUpcomingEvents(): NsbEvent[] {
  return EVENTS.filter((e) => eventStatus(e) !== "ended").sort((a, b) => firstStart(a) - firstStart(b));
}

/** 終了したイベント（新しい順） */
export function getPastEvents(): NsbEvent[] {
  return EVENTS.filter((e) => eventStatus(e) === "ended").sort((a, b) => firstStart(b) - firstStart(a));
}
