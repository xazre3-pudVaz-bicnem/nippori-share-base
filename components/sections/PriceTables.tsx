import { MACHINE_PLANS, OTHER_PLANS, type OtherPlanId, withTax, yen } from "@/data/pricing";

/**
 * 金額の表示。支払う総額が分かるよう税込を大きく、税抜を小さく添える。
 * 金額は data/pricing.ts の税抜の値から計算する（ここに数字を直接書かない）。
 */
export function Price({ ex, from = false, size = "md", stack = false }: { ex: number; from?: boolean; size?: "sm" | "md" | "lg"; /** 幅の狭い表の中で、「税込」を金額の下の行に置く */ stack?: boolean }) {
  const main = size === "lg" ? "text-3xl sm:text-4xl" : size === "sm" ? "text-[0.95rem] sm:text-lg" : "text-xl sm:text-2xl";
  return (
    <span className="inline-block leading-tight">
      <span className={`font-round font-bold tracking-wide ${main}`}>
        {yen(withTax(ex))}
        <span className="text-[0.6em]">円{from ? "〜" : ""}</span>
      </span>
      {stack ? <span className="block text-[0.68rem] font-bold leading-4 sm:text-xs">税込</span> : <span className="ml-1 text-[0.7rem] font-medium sm:text-xs">（税込）</span>}
      <span className="block text-[0.68rem] text-ash sm:text-xs">
        税抜 {yen(ex)}円{from ? "〜" : ""}
      </span>
    </span>
  );
}

/** ミシン利用の料金表（旧サイトの料金表と同じ並び・同じ配色。金額は税込を主に表示） */
export function MachinePriceTable() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink/80 bg-white">
      <table className="w-full table-fixed border-collapse text-center text-sm sm:text-base">
        <caption className="sr-only">ミシンを利用する方向けの料金表（1人あたり・税込、税抜を併記）</caption>
        <colgroup>
          <col className="w-[28%]" />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr className="bg-cream">
            <td className="bg-sun" />
            {MACHINE_PLANS.slots.map((s) => (
              <th key={s.id} scope="col" className="border-l border-ink/15 px-1 py-3 font-bold">
                <span className="block font-round text-[0.9rem] sm:text-lg">{s.name}</span>
                <span className="block text-[0.66rem] font-normal leading-4 sm:text-xs">{s.time}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MACHINE_PLANS.rows.map((row) => (
            <tr key={row.id} className="border-t border-ink/15">
              <th scope="row" className="bg-cream px-1.5 py-4 text-[0.74rem] font-bold leading-5 sm:text-base">
                {row.label}
              </th>
              {row.ex.map((ex, i) => (
                <td key={i} className="border-l border-ink/15 px-0.5 py-3.5">
                  <Price ex={ex} size="sm" stack />
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-ink/15">
            <th scope="row" className="bg-cream px-1.5 py-4 text-[0.74rem] font-bold leading-5 sm:text-base">
              {MACHINE_PLANS.hourly.label}
            </th>
            <td colSpan={3} className="border-l border-ink/15 px-3 py-3.5">
              <Price ex={MACHINE_PLANS.hourly.ex} size="sm" />
              <span className="mt-1.5 block text-left text-xs leading-5 sm:text-center sm:text-[0.8rem]">＊{MACHINE_PLANS.hourly.note}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * ミシン利用以外のプラン。枠で囲んだカードにせず、破線で区切った一覧にする
 * （スマホでは名前 → 料金 → 用途の順に縦に並ぶ）。
 */
export function PlanList({ only, headingLevel: H = "h3" }: { only?: readonly OtherPlanId[]; headingLevel?: "h3" | "h4" }) {
  const plans = only ? OTHER_PLANS.filter((p) => only.includes(p.id)) : OTHER_PLANS;
  return (
    <ul className="border-t-2 border-dashed border-ink/25">
      {plans.map((p) => (
        <li
          key={p.id}
          id={`plan-${p.id}`}
          className="grid scroll-mt-28 gap-x-8 gap-y-3 border-b-2 border-dashed border-ink/25 py-7 md:grid-cols-[13rem_12rem_1fr] md:items-start md:py-8"
          data-reveal
        >
          <div>
            <H className="text-xl">{p.name}</H>
            <p className="mt-1.5 inline-block rounded-full bg-sun px-3 py-0.5 text-xs font-bold">{p.reception}</p>
          </div>
          <div>
            <Price ex={p.ex} from={p.from} />
            {p.unit ? <span className="ml-1 text-sm font-bold">／{p.unit}</span> : null}
            {p.priceNote ? <span className="mt-1 block text-xs leading-5">＊{p.priceNote}</span> : null}
          </div>
          <div className="text-[0.95rem]">
            <p>{p.use}</p>
            <p className="mt-1 text-sm text-ash">ご利用いただけるもの：{p.includes}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Notes({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 text-[0.82rem] leading-6 sm:text-sm ${className}`}>
      {items.map((n) => (
        <li key={n} className="flex gap-1.5">
          <span aria-hidden>＊</span>
          <span>{n}</span>
        </li>
      ))}
    </ul>
  );
}
