import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CTA_LABEL, SITE, mailHref, privateMailHref, telHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon, ExternalIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { Notes } from "@/components/sections/PriceTables";

export const metadata: Metadata = buildMetadata({
  title: "空き状況・予約｜カレンダーと予約申込フォーム",
  description:
    "Nippori Share Base のご予約ページ。Google カレンダーで空き状況を確認し、予約申込フォームからお申し込みください。ワークショップ・展示会などの貸切利用は、メールまたはお電話でご相談いただけます。",
  path: "/reserve",
  keywords: ["Nippori Share Base 予約", "日暮里 ミシン 予約", "日暮里 レンタルスペース 予約"],
});

export default function ReservePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "空き状況・予約", path: "/reserve" }]}
        en="Reservation"
        title="空き状況・予約"
        lead="ご自身でミシンやスペースを使う方は、カレンダーで空き状況を見てからフォームでお申し込みください。ワークショップや展示会などで貸切したい方は、まずご相談ください。"
      >
        <ul className="mx-auto grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          <li>
            <a href="#calendar" className="flex h-full items-center justify-between gap-3 rounded-2xl bg-ink px-5 py-4 text-white">
              <span>
                <span className="block text-xs">ミシン・スペースを自分で使う</span>
                <span className="font-round text-lg font-bold">{CTA_LABEL.general}</span>
              </span>
              <ArrowIcon className="size-5 shrink-0 rotate-90" />
            </a>
          </li>
          <li>
            <a href="#private" className="flex h-full items-center justify-between gap-3 rounded-2xl bg-cream px-5 py-4">
              <span>
                <span className="block text-xs">ワークショップ・展示会などで貸切する</span>
                <span className="font-round text-lg font-bold">{CTA_LABEL.private}</span>
              </span>
              <ArrowIcon className="size-5 shrink-0 rotate-90" />
            </a>
          </li>
        </ul>
      </PageHero>

      {/* カレンダー */}
      <section id="calendar" className="scroll-mt-20 py-20 sm:py-24">
        <Container>
          <SectionHeading align="left" en="Step 1" title="カレンダーで空き状況を見る" lead="基本的に事前予約制です。空きがある場合は、当日のご利用も可能です。" />
          <div className="mt-9 overflow-hidden rounded-2xl border-2 border-ink/80 bg-white">
            {/* 中に操作する場所があるので tabIndex は付けない。画面に近づくまで読み込まない */}
            <iframe src={SITE.calendarEmbedUrl} title="Nippori Share Base の空き状況カレンダー" loading="lazy" className="block h-[32rem] w-full border-0 sm:h-[44rem]" />
          </div>
          <Notes
            className="mt-6"
            items={[
              "表示のない日、時間帯はご予約できません。",
              "予約状況の反映にラグがございます。予めご了承ください。",
              "1時間利用は事前のご予約をお受けしておりません。当日空きがある場合にのみご案内いたします。",
            ]}
          />
          <p className="mt-4 text-sm">
            <a href={SITE.calendarEmbedUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
              カレンダーを別のタブで開く
              <ExternalIcon />
            </a>
          </p>
        </Container>
      </section>

      {/* フォーム */}
      <section id="form" className="scroll-mt-20 bg-butter py-20 sm:py-24">
        <Container size="narrow">
          <SectionHeading align="left" en="Step 2" title="予約申込フォームから申し込む" lead="フォームを送信いただいても、空き状況やお申し込みの状況によりご予約をお受けできないことがございます。" />
          <div className="mt-8">
            <a href={SITE.reserveFormUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink min-h-16 w-full max-w-md text-lg sm:text-xl">
              予約申込フォームを開く
              <ExternalIcon className="size-5" />
            </a>
            <p className="mt-3 text-xs text-ash">Google フォームが別のタブで開きます。このページの下にも同じフォームがあります。</p>
          </div>

          <h3 className="mt-12 text-lg">お申し込みの前に</h3>
          <Notes
            className="mt-4"
            items={[
              "利用規約をお読みの上、お申し込みをお願いいたします。予約お申込みにより利用規約に同意したものとみなします。",
              "ご利用される方お一人につき、1件ずつご予約ください。複数名でのご利用も、それぞれが個別にお申し込みください。",
              "お支払いは、当日の受付時にお願いいたします。",
              "小さなお子様をお連れの場合は、ご予約時にお知らせください。",
            ]}
          />
          <p className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/terms" className="link inline-flex items-center gap-1.5">
              利用規約
              <ArrowIcon />
            </Link>
            <Link href="/price" className="link inline-flex items-center gap-1.5">
              料金表
              <ArrowIcon />
            </Link>
            <Link href="/first-time" className="link inline-flex items-center gap-1.5">
              初めての方へ
              <ArrowIcon />
            </Link>
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border-2 border-ink/80 bg-white">
            <iframe src={`${SITE.reserveFormUrl}?embedded=true`} title="Nippori Share Base 予約申込フォーム" loading="lazy" className="block h-[60rem] w-full border-0">
              読み込んでいます…
            </iframe>
          </div>
        </Container>
      </section>

      {/* 貸切のご相談 */}
      <section id="private" className="pinked scroll-mt-20 bg-sun py-20 sm:py-24">
        <Container size="narrow">
          <SectionHeading align="left" en="Private use" title="貸切・イベント利用のご相談" lead="ワークショップ、講座、展示会、販売会、交流会など。参加費をいただく会や、販売を伴う会は、貸切でのご利用になります。内容や時期が固まっていない段階のご相談で構いません。" />

          <h3 className="mt-10 text-lg">お知らせいただきたいこと</h3>
          <ul className="rows mt-4 text-[0.95rem] [&>*]:border-ink/30">
            {["ご希望の日程（候補がいくつかあると助かります）", "開催したい内容と、おおよその人数", "参加費の徴収や、商品の販売があるかどうか", "使いたい設備（ミシン、作業台、ホワイトボードなど）"].map((t) => (
              <li key={t} className="py-3.5">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <a href={privateMailHref} className="btn btn-ink min-h-14 w-full">
              <MailIcon />
              メールで相談する
            </a>
            <a href={telHref} className="btn btn-cream min-h-14 w-full">
              <PhoneIcon />
              {SITE.tel}
              <span className="text-xs font-medium">（{SITE.telNote}）</span>
            </a>
          </div>
          <p className="mt-4 break-all text-sm">
            メール：
            <a href={mailHref} className="link decoration-ink/40">
              {SITE.email}
            </a>
          </p>
          <Notes
            className="mt-7"
            items={[
              "上の予約申込フォームからもお申し込みいただけます。カレンダーに表示のない日付で貸切をご希望の場合は、フォームにその旨をご記載ください。",
              "お電話は1階の齊藤商店につながります。「Nippori Share Base の貸切の件」とお伝えください。",
              "貸切のお申し込みは、イベント利用規約をご確認のうえお願いいたします。",
            ]}
          />
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/workshop" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              ワークショップ・イベント利用のご案内
              <ArrowIcon />
            </Link>
            <Link href="/terms/event" className="link inline-flex items-center gap-1.5 decoration-ink/40">
              イベント利用規約
              <ArrowIcon />
            </Link>
          </p>
        </Container>
      </section>

      {/* そのほかの問い合わせ */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <p className="measure text-[0.95rem]">
            設備についてのご質問など、予約の前に確かめたいことは、メール（
            <a href={mailHref} className="link break-all">
              {SITE.email}
            </a>
            ）でお問い合わせください。よくいただく質問は
            <Link href="/faq" className="link">
              よくある質問
            </Link>
            にまとめています。
          </p>
        </Container>
      </section>
    </>
  );
}
