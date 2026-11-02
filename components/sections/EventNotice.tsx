import Link from "next/link";
import { Budou } from "@/lib/budou";
import { eventDaysShort, eventPath, getUpcomingEvents } from "@/lib/events";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * トップページのいちばん上に出す「イベントのお知らせ」。開催予定のイベントがあるときだけ出す。
 * 告知（Instagram）で「公式ホームページの『イベントのお知らせ』から申し込める」と案内しているので、
 * 最初の画面で見つかる位置に、同じ言葉で置く。終わったイベントは、次のビルドで自動的に消える。
 */
export function EventNotice() {
  const events = getUpcomingEvents();
  if (events.length === 0) return null;
  return (
    <section aria-label="イベントのお知らせ" className="bg-ink text-white">
      <ul className="mx-auto max-w-7xl divide-y divide-white/15 px-4 sm:px-6">
        {events.map((e) => (
          <li key={e.slug}>
            <Link href={eventPath(e)} className="group flex items-center gap-3 py-3 sm:gap-4">
              <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
                <span className="inline-block shrink-0 rounded-full bg-sun px-3 py-0.5 font-round text-[0.72rem] font-bold tracking-wider text-ink sm:text-xs">イベントのお知らせ</span>
                <span className="mt-1.5 block text-[0.82rem] leading-5 group-hover:underline group-hover:underline-offset-4 sm:mt-0 sm:text-sm">
                  <span className="mr-2 font-round font-bold">{eventDaysShort(e)}開催</span>
                  <Budou>{e.title}</Budou>
                </span>
              </span>
              <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
