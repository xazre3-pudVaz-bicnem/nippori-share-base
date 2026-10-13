/**
 * Node のスクリプトから、サイトの TypeScript（lib/*.ts・data/*.ts）をそのまま読み込むためのフック。
 * scripts/lib/load-site.mjs が登録する。ビルドやサイトの表示には関係しない。
 *
 * - "@/..." の import を、プロジェクトのルートからのパスに読み替える
 * - 拡張子なしの import に .ts / .tsx を補う
 * - .ts / .tsx は typescript で JavaScript に変換する（型を消すだけ）
 * - 写真（.jpg など）の import は、パスだけを持つ値に置き換える（写真そのものは読まない）
 */
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = process.cwd();
const EXTENSIONS = [".ts", ".tsx", ".mjs", ".js", ".json"];
const ASSET = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

function findFile(base) {
  if (existsSync(base) && statSync(base).isFile()) return base;
  for (const ext of EXTENSIONS) if (existsSync(base + ext)) return base + ext;
  for (const ext of EXTENSIONS) {
    const index = path.join(base, `index${ext}`);
    if (existsSync(index)) return index;
  }
  return undefined;
}

export async function resolve(specifier, context, nextResolve) {
  let base;
  if (specifier.startsWith("@/")) base = path.join(ROOT, specifier.slice(2));
  else if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) base = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
  if (base) {
    const file = findFile(base);
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (ASSET.test(url)) {
    const file = fileURLToPath(url);
    const src = "/" + path.relative(path.join(ROOT, "public"), file).replace(/\\/g, "/");
    return { format: "module", shortCircuit: true, source: `export default ${JSON.stringify({ src, width: 0, height: 0 })};` };
  }
  if (/\.tsx?$/.test(url)) {
    const file = fileURLToPath(url);
    const source = await readFile(file, "utf8");
    const out = ts.transpileModule(source, {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    });
    return { format: "module", shortCircuit: true, source: out.outputText };
  }
  return nextLoad(url, context);
}
