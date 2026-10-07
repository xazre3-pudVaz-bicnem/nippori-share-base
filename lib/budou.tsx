import { Fragment } from "react";
import { loadDefaultJapaneseParser } from "budoux";

/**
 * 日本語の見出し・リード文を「文節」で折り返すための部品。
 *
 * ブラウザの既定では、日本語はどの文字のあいだでも折り返せるので、
 * 「日暮里の／レンタルスペース」「そろってい／ます。」のように、読みにくい位置で行が変わることがある。
 * ここでは BudouX（Google 製の分かち書きライブラリ）で文節の切れ目を求めて <wbr> を入れ、
 * CSS（globals.css の .phrase）で「切れ目以外では折り返さない」ようにしている。
 *
 * - サーバー側（ビルド時）だけで動く。ブラウザへ送る JavaScript は増えない
 * - <wbr> は「ここで折り返してよい」という印で、文字としては何も足さない（検索エンジンや読み上げには影響しない）
 * - クライアントコンポーネント（"use client"）から import しないこと（辞書がブラウザへ送られてしまう）
 */
const parser = loadDefaultJapaneseParser();

/** 途中で切りたくない言葉。BudouX が中で切ってしまった場合に、切れ目を取り消す */
const KEEP = ["Nippori Share Base", "Chum's Sewing Club", "ものづくり", "やってみたい", "カバーステッチ", "ハンドメイド", "ワークショップ", "レンタルスペース", "お問い合わせ", "日暮里繊維街", "齊藤商店"];

export function phrases(text: string): string[] {
  const parts = parser.parse(text);
  const cuts = new Set<number>();
  let pos = 0;
  for (const p of parts.slice(0, -1)) {
    pos += p.length;
    cuts.add(pos);
  }
  for (const word of KEEP) {
    let at = text.indexOf(word);
    while (at !== -1) {
      for (let k = at + 1; k < at + word.length; k++) cuts.delete(k);
      at = text.indexOf(word, at + word.length);
    }
  }
  // 「」でくくった短い言葉の中では切らない（例：「やってみたい人」）
  for (const m of text.matchAll(/「[^「」]{1,12}」/g)) {
    for (let k = m.index + 1; k < m.index + m[0].length; k++) cuts.delete(k);
  }
  const out: string[] = [];
  let start = 0;
  for (const c of [...cuts].sort((a, b) => a - b)) {
    out.push(text.slice(start, c));
    start = c;
  }
  out.push(text.slice(start));
  return out.filter(Boolean);
}

/** 文節で折り返す文字列。見出しやリード文の中で使う */
export function Budou({ children }: { children: string }) {
  const parts = phrases(children);
  return (
    <span className="phrase">
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 ? <wbr /> : null}
          {p}
        </Fragment>
      ))}
    </span>
  );
}

/**
 * 行を指定した見出し。1 行ずつ <span class="block"> にして、行の中は文節で折り返す
 * （画面が狭くて 1 行に収まらないときも、文節の途中では切れない）。
 */
export function BudouLines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line) => (
        <span key={line} className="block">
          <Budou>{line}</Budou>
        </span>
      ))}
    </>
  );
}

/** 文字列ならそのまま文節で折り返す形にし、配列なら行ごとに分ける。それ以外（JSX）は手を入れない */
export function budou(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") return <Budou>{node}</Budou>;
  if (Array.isArray(node) && node.every((n) => typeof n === "string")) return <BudouLines lines={node as string[]} />;
  return node;
}
