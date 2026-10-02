import type { TermsBlock, TermsDoc } from "@/data/terms";

function Block({ block }: { block: TermsBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h":
      return <h4 className="pt-3 text-base">{block.text}</h4>;
    case "hr":
      return <div className="stitch my-2 w-16 text-ink/40" aria-hidden />;
    case "ul":
      return (
        <ul className="list-disc space-y-1 pl-6 marker:text-ash">
          {block.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-1.5 pl-6 marker:text-ash">
          {block.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      );
  }
}

/** 規約本文の表示。章 → h2、条 → h3、条の中の小見出し → h4 */
export function TermsDocument({ doc, idPrefix }: { doc: TermsDoc; idPrefix: string }) {
  // 章をまたいだ条の通し番号（アンカー用）。章ごとの開始位置を先に計算しておく
  const offsets = doc.chapters.map((_, ci) => doc.chapters.slice(0, ci).reduce((sum, c) => sum + c.articles.length, 0));
  return (
    <div className="text-[0.95rem] leading-[1.95]">
      <div className="space-y-3">
        {doc.intro.map((b, i) =>
          b.type === "h" ? (
            <h2 key={i} className="text-xl">
              {b.text}
            </h2>
          ) : (
            <Block key={i} block={b} />
          ),
        )}
      </div>

      {doc.chapters.map((ch, ci) => (
        <section key={ci} className="mt-12">
          {ch.title ? (
            <h2 className="rounded-2xl bg-sun px-5 py-3 text-xl">{ch.title}</h2>
          ) : (
            <h2 className="sr-only">条文</h2>
          )}
          {ch.articles.map((a, ai) => (
            <section key={a.title} id={`${idPrefix}-${offsets[ci] + ai + 1}`} className="mt-9 scroll-mt-28">
              <h3 className="border-l-[6px] border-sun-deep pl-3 text-lg">{a.title}</h3>
              <div className="mt-3 space-y-3">
                {a.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </div>
            </section>
          ))}
        </section>
      ))}

      {doc.closing ? (
        <p className="mt-12 text-right">
          {doc.closing.map((t) => (
            <span key={t} className="block">
              {t}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
