import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * コラム本文（Markdown）の表示。
 * - h2 には出現順に sec-1, sec-2… の id を付ける（lib/columns.ts の目次と同じ規則）
 * - サイト内リンク（/ で始まる）は next/link、外部リンクは別タブで開く
 * - 表はスマホで横スクロールできるよう包む
 */
export function ColumnBody({ markdown }: { markdown: string }) {
  let h2Count = 0;
  return (
    <div className="prose-nsb">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 記事タイトルが h1。本文に h1 が紛れても h2 に落とす
          h1: ({ children }) => <h2>{children}</h2>,
          h2: ({ children }) => (
            <h2 id={`sec-${++h2Count}`} className="scroll-mt-28">
              {children}
            </h2>
          ),
          a: ({ href = "", children }) =>
            href.startsWith("/") ? (
              <Link href={href}>{children}</Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
