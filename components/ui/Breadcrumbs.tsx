import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * パンくずリスト。画面の表示と BreadcrumbList の構造化データを同じ配列から出すので、内容がずれない。
 * crumbs には「ホーム」を含めない（自動で先頭に付く）。
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="パンくずリスト" className="text-xs sm:text-[0.8rem]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="inline-block py-1 underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              ホーム
            </Link>
          </li>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-x-2">
                <span aria-hidden>／</span>
                {last ? (
                  <span aria-current="page" className="font-semibold">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="inline-block py-1 underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbSchema(crumbs) }} />
    </>
  );
}
