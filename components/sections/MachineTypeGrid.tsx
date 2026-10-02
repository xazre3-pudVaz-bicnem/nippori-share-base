import Image from "next/image";
import Link from "next/link";
import { MACHINE_CATEGORIES } from "@/data/machines";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * 「使えるミシン」4種類。旧サイトと同じ、花形に切り抜いた写真＋3つのポイント。
 * リンクは /sewing-machine の各種類の位置へ移動する。
 * スマホでは写真を左、文字を右に置き、リンクは文字の下の小さなテキストリンクにする
 * （黄色い大きなボタンが 4 つ縦に並ぶと、画面がボタンだらけになるため）。PC では旧サイトと同じ黄色いボタン。
 */
export function MachineTypeGrid({ headingLevel: H = "h3" }: { headingLevel?: "h3" | "h4" }) {
  return (
    <ul className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
      {MACHINE_CATEGORIES.map((c) => {
        const m = c.machines[0];
        return (
          <li
            key={c.id}
            className="grid grid-cols-[6.25rem_1fr] items-center gap-x-3 min-[360px]:grid-cols-[8.25rem_1fr] min-[360px]:gap-x-4 sm:flex sm:flex-col sm:items-center sm:text-center"
            data-reveal
          >
            <div className="scallop relative aspect-square w-full bg-butter sm:max-w-[15rem]">
              <Image
                src={m.image}
                alt={`${c.name}の例：${m.maker} ${m.model}`}
                fill
                sizes="(max-width: 639px) 132px, 240px"
                quality={65}
                className="object-cover"
                style={{ objectPosition: "50% 62%" }}
              />
            </div>
            <div className="min-w-0 sm:contents">
              <H className="text-base tracking-normal min-[360px]:text-lg min-[360px]:tracking-[0.06em] sm:mt-3 sm:text-xl">{c.name}</H>
              <ul className="mt-1.5 space-y-0.5 text-[0.86rem] leading-6 sm:mt-2 sm:text-[0.95rem] sm:leading-7">
                {c.points.map((p) => (
                  <li key={p}>・{p}</li>
                ))}
              </ul>
              <Link
                href={`/sewing-machine#${c.id}`}
                className="mt-1.5 inline-flex items-center gap-1.5 py-1.5 text-[0.86rem] font-bold underline decoration-sun-deep decoration-[3px] underline-offset-4 sm:mt-4 sm:min-h-11 sm:w-full sm:max-w-[15rem] sm:justify-center sm:rounded-full sm:bg-sun-deep sm:px-3 sm:font-round sm:text-[0.92rem] sm:tracking-wider sm:no-underline"
              >
                {c.short === "カバステ" ? "カバーステッチ" : c.name}一覧
                <ArrowIcon className="size-4 sm:hidden" />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
