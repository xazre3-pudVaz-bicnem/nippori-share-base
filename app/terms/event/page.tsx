import type { Metadata } from "next";
import Link from "next/link";
import { EVENT_TERMS } from "@/data/terms";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { TermsDocument } from "@/components/sections/TermsDocument";

export const metadata: Metadata = buildMetadata({
  title: "イベント利用規約",
  description:
    "Nippori Share Base のイベント利用規約。ワークショップ・展示会・販売会・交流会などでスペースを利用する際の、利用時間と料金、仮予約と本予約、お支払い、キャンセル、禁止事項を定めています。",
  path: "/terms/event",
});

export default function EventTermsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "利用規約", path: "/terms" },
          { name: "イベント利用規約", path: "/terms/event" },
        ]}
        en="Event Terms"
        title="Nippori Share Base イベント利用規約"
        lead="イベント・展示会・ワークショップ・交流会などでスペースをご利用いただく方向けの規約です。お申し込みの前にご確認ください。"
      />
      <section className="py-14 sm:py-20">
        <Container size="narrow">
          <TermsDocument doc={EVENT_TERMS} idPrefix="article" />
          <nav aria-label="関連する規約・ページ" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 rounded-3xl bg-butter p-6 text-sm">
            <Link href="/terms" className="link inline-flex items-center gap-1.5">
              利用規約
              <ArrowIcon />
            </Link>
            <Link href="/workshop" className="link inline-flex items-center gap-1.5">
              ワークショップ・イベント利用のご案内
              <ArrowIcon />
            </Link>
            <Link href="/reserve" className="link inline-flex items-center gap-1.5">
              予約・ご相談
              <ArrowIcon />
            </Link>
          </nav>
        </Container>
      </section>
    </>
  );
}
