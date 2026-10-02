import type { Metadata } from "next";
import Link from "next/link";
import { GENERAL_TERMS } from "@/data/terms";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { TermsDocument } from "@/components/sections/TermsDocument";

export const metadata: Metadata = buildMetadata({
  title: "利用規約",
  description:
    "Nippori Share Base の利用規約。予約方法、利用時間、料金とお支払い、キャンセル、設備・ミシンの取り扱い、材料の持ち込み、撮影や交流についてのルールを定めています。",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "利用規約", path: "/terms" }]}
        en="Terms of Use"
        title="Nippori Share Base 利用規約"
        lead="ご予約のお申し込みにより、本規約に同意いただいたものとみなします。ご利用の前にご確認ください。"
      />
      <section className="py-14 sm:py-20">
        <Container size="narrow">
          <TermsDocument doc={GENERAL_TERMS} idPrefix="article" />
          <nav aria-label="関連する規約・ページ" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 rounded-3xl bg-butter p-6 text-sm">
            <Link href="/terms/event" className="link inline-flex items-center gap-1.5">
              イベント利用規約
              <ArrowIcon />
            </Link>
            <Link href="/price" className="link inline-flex items-center gap-1.5">
              料金表
              <ArrowIcon />
            </Link>
            <Link href="/reserve" className="link inline-flex items-center gap-1.5">
              予約する
              <ArrowIcon />
            </Link>
          </nav>
        </Container>
      </section>
    </>
  );
}
