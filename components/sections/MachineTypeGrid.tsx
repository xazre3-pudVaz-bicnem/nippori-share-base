import Image from "next/image";
import Link from "next/link";
import { MACHINE_CATEGORIES } from "@/data/machines";

/**
 * 「使えるミシン」4種類。現在の公式サイトと同じ、花形に切り抜いた写真＋3つのポイント＋黄色いボタン。
 * ボタンは /sewing-machine の各種類の位置へ移動する。
 * スマホでは写真を左、文字を右に置く（2列に詰めると箇条書きが折り返して読みにくいため）。
 */
export function MachineTypeGrid({ headingLevel: H = "h3" }: { headingLevel?: "h3" | "h4" }) {
  return (
    <ul className="grid gap-y-9 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
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
            </div>
            <Link href={`/sewing-machine#${c.id}`} className="btn btn-sun col-span-2 mt-4 min-h-11 w-full text-[0.95rem] sm:max-w-[15rem]">
              {c.name}一覧
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
