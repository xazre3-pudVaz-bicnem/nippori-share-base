import { MACHINE_PLANS, OTHER_PLANS } from "@/data/pricing";

/** ミシン利用の料金表（現在の公式サイトの料金表と同じ並び・同じ配色） */
export function MachinePriceTable() {
  return (
    <div className="overflow-hidden rounded-3xl shadow-[0_0_0_2px_var(--color-line)]">
      <table className="w-full table-fixed border-collapse bg-white text-center text-sm sm:text-base">
        <caption className="sr-only">ミシンを利用する方向けの料金表（税抜・1人あたり）</caption>
        <colgroup>
          <col className="w-[31%]" />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr className="bg-cream">
            <td className="bg-sun" />
            {MACHINE_PLANS.slots.map((s) => (
              <th key={s.id} scope="col" className="border-l border-line px-1 py-3 font-bold">
                <span className="block font-round text-[0.95rem] sm:text-lg">{s.name}</span>
                <span className="block text-[0.68rem] font-normal leading-4 sm:text-xs">{s.time}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MACHINE_PLANS.rows.map((row) => (
            <tr key={row.label} className="border-t border-line">
              <th scope="row" className="bg-cream px-2 py-4 text-[0.8rem] font-bold leading-5 sm:text-base">
                {row.label}
              </th>
              {row.prices.map((p, i) => (
                <td key={i} className="border-l border-line px-1 py-4 text-base font-medium sm:text-xl">
                  {p}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-line">
            <th scope="row" className="bg-cream px-2 py-4 text-[0.8rem] font-bold leading-5 sm:text-base">
              {MACHINE_PLANS.hourly.label}
            </th>
            <td colSpan={3} className="border-l border-line px-3 py-4">
              <span className="block text-base font-medium sm:text-xl">{MACHINE_PLANS.hourly.price}</span>
              <span className="mt-1 block text-xs leading-5 sm:text-[0.8rem]">＊{MACHINE_PLANS.hourly.note}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** ミシン利用以外のプラン。スマホで読みやすいようカードで並べる */
export function OtherPlanCards({ only }: { only?: readonly string[] }) {
  const plans = only ? OTHER_PLANS.filter((p) => only.includes(p.id)) : OTHER_PLANS;
  return (
    <ul className={`grid gap-5 ${plans.length > 1 ? "md:grid-cols-2" : ""}`}>
      {plans.map((p) => (
        <li key={p.id} id={`plan-${p.id}`} className="scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-[0_0_0_2px_var(--color-line)]" data-reveal>
          <div className="flex items-center justify-between gap-3 bg-sun px-5 py-3.5">
            <h3 className="text-lg">{p.name}</h3>
            <span className="shrink-0 rounded-full bg-white px-3 py-0.5 text-xs font-bold">{p.reception}</span>
          </div>
          <div className="px-5 py-5">
            <p className="font-round text-2xl font-bold tracking-wide">
              {p.price}
              {p.priceNote ? <span className="ml-2 inline-block text-xs font-medium tracking-normal">＊{p.priceNote}</span> : null}
            </p>
            <p className="mt-3 text-[0.95rem]">{p.use}</p>
            <p className="mt-2 rounded-2xl bg-butter px-4 py-2.5 text-sm leading-6">
              <span className="font-bold">ご利用いただけるもの：</span>
              {p.includes}
            </p>
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
