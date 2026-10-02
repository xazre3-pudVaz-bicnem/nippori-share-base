import Link from "next/link";
import { CTA_LABEL, PRIVATE_PATH, RESERVE_PATH } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";

type Props = {
  /**
   * どちらの目的の人に向けたページか。
   * - general … 自分でミシン・スペースを使いたい人（空き状況を見て予約）
   * - private … ワークショップ・展示会などで貸切したい人（まず相談）
   * - both …… 両方の人が読むページ（スペース、料金、FAQ など）
   */
  variant?: "general" | "private" | "both";
  title?: string;
  body?: string;
  /** ボタンの下に置く補助リンク（1〜2 本まで） */
  links?: { href: string; label: string }[];
};

const DEFAULTS = {
  general: {
    title: "「やってみたい」を、カタチにしに来ませんか。",
    body: "空いている日と時間帯は、カレンダーでご確認いただけます。ご予約はそのままフォームから。",
    links: [{ href: "/first-time", label: "初めての方へ" }],
  },
  private: {
    title: "ひらいてみたい会が、ありますか。",
    body: "ワークショップ、展示会、販売会、交流会。内容や時期が決まっていない段階のご相談で構いません。",
    links: [{ href: "/terms/event", label: "イベント利用規約" }],
  },
  both: {
    title: "使い方に合わせて、どうぞ。",
    body: "ご自身で使う方は空き状況を見てご予約を。貸切やイベントは、まず内容をお聞かせください。",
    links: [{ href: "/first-time", label: "初めての方へ" }],
  },
} as const;

/**
 * ページ下部の予約導線。旧サイトと同じ「黄色い帯＋クリーム色の大きなボタン」。
 * 目的が 2 つあるので、ページの内容に合わせて出し分ける（全ページに同じものを出さない）。
 */
export function ReserveCta({ variant = "general", title, body, links }: Props) {
  const d = DEFAULTS[variant];
  const general = (
    <Link href={RESERVE_PATH} className="btn btn-cream min-h-16 w-full max-w-sm px-6 text-lg sm:text-xl">
      {CTA_LABEL.general}
    </Link>
  );
  const priv = (
    <Link href={PRIVATE_PATH} className={`btn min-h-16 w-full max-w-sm px-6 text-lg sm:text-xl ${variant === "private" ? "btn-cream" : "btn-ink"}`}>
      {CTA_LABEL.private}
    </Link>
  );
  return (
    <section className="bg-sun" data-cta-zone>
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <p className="eyebrow text-sm text-ink/80">{variant === "private" ? "Private use" : "Reservation"}</p>
        <h2 className="mt-2 text-2xl sm:text-3xl">{title ?? d.title}</h2>
        <p className="measure mx-auto mt-5 text-[0.95rem]">{body ?? d.body}</p>

        {variant === "both" ? (
          <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-2 sm:gap-6">
            <div className="flex flex-col items-center gap-3">
              <p className="font-round text-sm font-bold">ミシン・スペースを自分で使う</p>
              {general}
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="font-round text-sm font-bold">ワークショップ・展示会などで貸切する</p>
              {priv}
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center">{variant === "private" ? priv : general}</div>
        )}

        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm">
          {(links ?? d.links).map((l) => (
            <Link key={l.href} href={l.href} className="link inline-flex items-center gap-1.5 decoration-ink/40">
              {l.label}
              <ArrowIcon />
            </Link>
          ))}
          {variant === "general" ? (
            <Link href={PRIVATE_PATH} className="link inline-flex items-center gap-1.5 decoration-ink/40">
              貸切・イベントのご相談はこちら
              <ArrowIcon />
            </Link>
          ) : null}
          {variant === "private" ? (
            <Link href={RESERVE_PATH} className="link inline-flex items-center gap-1.5 decoration-ink/40">
              ご自身で使う場合の予約はこちら
              <ArrowIcon />
            </Link>
          ) : null}
        </p>
      </div>
    </section>
  );
}
