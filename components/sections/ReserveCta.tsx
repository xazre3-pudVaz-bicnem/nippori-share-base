import Link from "next/link";
import { RESERVE_PATH, SITE } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/Icons";

type Props = {
  title?: string;
  body?: string;
  /** 予約ボタンの隣に置く補助リンク */
  secondary?: { href: string; label: string };
};

/**
 * ページ下部の予約導線。現在の公式サイトと同じ「黄色い帯＋クリーム色の大きな『予約する』ボタン」。
 * 売り込みの文言は足さず、次に何が起きるか（空き状況を見て申し込む）だけを書く。
 */
export function ReserveCta({
  title = "「やってみたい」を、カタチにしに来ませんか。",
  body = "空き状況はカレンダーでご確認いただけます。ご予約はフォームから。迷ったら、まずはお気軽にご相談ください。",
  secondary = { href: "/first-time", label: "初めての方へ" },
}: Props) {
  return (
    <section className="bg-sun">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="eyebrow text-sm text-ink/80">Reservation</p>
        <h2 className="mt-2 text-2xl sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-[0.95rem]">{body}</p>
        <div className="mt-9 flex flex-col items-center gap-4">
          <Link href={RESERVE_PATH} className="btn btn-cream min-h-16 w-full max-w-sm text-2xl sm:min-h-[4.5rem] sm:text-3xl">
            予約する
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href={secondary.href} className="link decoration-ink/40">
              {secondary.label}
            </Link>
            <Link href="/price" className="link decoration-ink/40">
              料金を見る
            </Link>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              <InstagramIcon className="size-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
