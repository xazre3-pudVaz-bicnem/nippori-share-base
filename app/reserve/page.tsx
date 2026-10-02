import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE, mailHref, telHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { Notes } from "@/components/sections/PriceTables";

export const metadata: Metadata = buildMetadata({
  title: "予約する｜空き状況カレンダーと予約申込フォーム",
  description:
    "Nippori Share Base のご予約ページ。Google カレンダーで空き状況を確認し、予約申込フォームからお申し込みください。ミシン利用は Team AM・Team PM・All Day の予約枠があります。",
  path: "/reserve",
  keywords: ["Nippori Share Base 予約", "日暮里 ミシン 予約", "日暮里 レンタルスペース 予約"],
});

export default function ReservePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "予約する", path: "/reserve" }]}
        en="Reservation"
        title="予約する"
        lead="空き状況をカレンダーでご確認のうえ、予約申込フォームからお申し込みください。当スペースは基本的に事前予約制です。空きがある場合は、当日のご利用も可能です。"
      >
        <ol className="mx-auto grid max-w-2xl gap-3 text-left text-[0.95rem] sm:grid-cols-3">
          {["カレンダーで空きを確認", "フォームから申し込む", "当日、受付でお支払い"].map((t, i) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
              <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-base font-medium text-white">
                {i + 1}
              </span>
              <span className="font-round font-bold leading-6">{t}</span>
            </li>
          ))}
        </ol>
      </PageHero>

      {/* カレンダー */}
      <section id="calendar" className="scroll-mt-20 bg-sun pb-16 sm:pb-20">
        <Container>
          <h2 className="text-center text-3xl font-medium tracking-[0.12em] sm:text-5xl">カレンダー</h2>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl bg-white">
            {/* 中に操作する場所があるので tabIndex は付けない。画面に近づくまで読み込まない */}
            <iframe
              src={SITE.calendarEmbedUrl}
              title="Nippori Share Base の空き状況カレンダー"
              loading="lazy"
              className="block h-[32rem] w-full border-0 sm:h-[44rem]"
            />
          </div>
          <Notes
            className="mx-auto mt-6 max-w-5xl"
            items={[
              "表示のない日、時間帯はご予約できません。",
              "予約状況の反映にラグがございます。予めご了承ください。",
              "表示のない日付で貸切利用をご希望のお客様は、ご相談に応じますので予約申込の際にその旨をご記載ください。",
            ]}
          />
          <p className="mt-4 text-center text-sm">
            <a href={SITE.calendarEmbedUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              カレンダーを別のタブで開く
              <ExternalIcon />
            </a>
          </p>
        </Container>
      </section>

      {/* フォーム */}
      <section id="form" className="scroll-mt-20 py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading en="Form" title="予約申込フォーム" lead="空き状況をご確認のうえ、お申し込みをお願いいたします。フォームを送信いただいても、空き状況やお申し込みの状況によりご予約をお受けできないことがございます。" />
          <div className="mt-8 text-center">
            <a href={SITE.reserveFormUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink min-h-16 w-full max-w-md text-lg sm:text-xl">
              予約申込フォームを開く
              <ExternalIcon className="size-5" />
            </a>
            <p className="mt-3 text-xs text-ash">Google フォームが別のタブで開きます。</p>
          </div>

          <div className="mt-10 rounded-3xl bg-butter p-6 sm:p-8" data-reveal>
            <h3 className="text-lg">お申し込みの前に</h3>
            <Notes
              className="mt-4"
              items={[
                "利用規約をお読みの上、お申し込みをお願いいたします。予約お申込みにより利用規約に同意したものとみなします。",
                "ご利用される方お一人につき、1件ずつご予約ください。複数名でのご利用も、それぞれが個別にお申し込みください。",
                "参加費・会費の徴収、商品の販売、その他の収益を伴う活動を目的としたご利用につきましては、原則として貸切利用をご利用ください。",
                "1時間利用は事前のご予約をお受けしておりません。当日空きがある場合にのみご案内いたします。",
                "小さなお子様をお連れの場合は、ご予約時にお知らせください。",
              ]}
            />
            <p className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <Link href="/terms" className="link inline-flex items-center gap-1.5">
                利用規約
                <ArrowIcon />
              </Link>
              <Link href="/terms/event" className="link inline-flex items-center gap-1.5">
                イベント利用規約
                <ArrowIcon />
              </Link>
              <Link href="/price" className="link inline-flex items-center gap-1.5">
                料金表
                <ArrowIcon />
              </Link>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl shadow-[0_0_0_2px_var(--color-line)]">
            <iframe
              src={`${SITE.reserveFormUrl}?embedded=true`}
              title="Nippori Share Base 予約申込フォーム"
              loading="lazy"
              className="block h-[60rem] w-full border-0"
            >
              読み込んでいます…
            </iframe>
          </div>
        </Container>
      </section>

      {/* 相談 */}
      <section className="cv bg-butter py-16 sm:py-20">
        <Container size="narrow" className="text-center">
          <SectionHeading en="Contact" title="予約の前に、相談したいとき" lead="貸切やワークショップのご相談、設備についてのご質問は、メールまたはお電話でどうぞ。" />
          <div className="mt-8 flex flex-col items-center gap-4" data-reveal>
            <a href={mailHref} className="btn btn-line w-full max-w-sm break-all text-sm">
              <MailIcon />
              {SITE.email}
            </a>
            <a href={telHref} className="btn btn-line w-full max-w-sm">
              <PhoneIcon />
              {SITE.tel}
              <span className="text-xs font-medium">（{SITE.telNote}）</span>
            </a>
          </div>
          <p className="mt-8 text-sm">
            <Link href="/first-time" className="link inline-flex items-center gap-1.5">
              初めての方へ：当日の流れと持ち物
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
