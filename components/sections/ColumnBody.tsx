import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IMG, type Img } from "@/data/images";
import { Photo } from "@/components/ui/Photo";

/**
 * コラム本文（Markdown）の表示。
 * - h2 には出現順に sec-1, sec-2… の id を付ける（lib/columns.ts の目次と同じ規則）
 * - サイト内リンク（/ で始まる）は next/link、外部リンクは別タブで開く
 * - 表はスマホで横スクロールできるよう包む
 * - 写真は `![説明文](/photo/名前)` と書く。名前は data/images.ts の IMG のキー（例: /photo/shelfLock）。
 *   説明文は写真の下に出る。alt（読み上げ用の説明）は data/images.ts のものを使う
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
          // 写真だけの段落は <p> で包まない（<p> の中に <figure> は置けないため）
          p: ({ node, children }) => {
            const only = node?.children.length === 1 ? node.children[0] : undefined;
            if (only && only.type === "element" && only.tagName === "img") return <>{children}</>;
            return <p>{children}</p>;
          },
          img: ({ src, alt }) => {
            const key = typeof src === "string" && src.startsWith("/photo/") ? src.slice("/photo/".length) : "";
            const img = (IMG as Record<string, Img>)[key];
            if (!img) return null;
            return (
              <figure className="my-9">
                <Photo img={img} ratio="aspect-[3/2]" sizes="(max-width: 831px) 100vw, 704px" position="50% 58%" />
                {alt ? <figcaption className="mt-2.5 text-[0.82rem] leading-6 text-ash">{alt}</figcaption> : null}
              </figure>
            );
          },
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
