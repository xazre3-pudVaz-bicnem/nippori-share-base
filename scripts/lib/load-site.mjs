/**
 * サイトのデータ（lib/site.ts・data/*.ts など）を、Node のスクリプトから読み込む。
 * 料金や機種を別のファイルへ書き写さず、サイトが使っているものと同じファイルを読むためのもの。
 *
 *   import { loadSite } from "./lib/load-site.mjs";
 *   const { SITE } = await loadSite("lib/site");
 */
import { register } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

let registered = false;

export async function loadSite(file) {
  if (!registered) {
    register("./ts-hooks.mjs", import.meta.url);
    registered = true;
  }
  return import(pathToFileURL(path.join(process.cwd(), `${file}.ts`)).href);
}
