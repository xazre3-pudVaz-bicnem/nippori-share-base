/**
 * コラムの自動生成に渡す事実の一覧（data/site-facts.json）を作り直す。
 *   npm run facts:build
 *
 * もとになるのは lib/site.ts と data/*.ts。料金や機種を直したあとに実行すると、内容が更新される
 * （実行し忘れても、毎日の生成のたびに同じ処理が走るので、古い内容で記事が書かれることはない）。
 */
import fs from "node:fs";
import path from "node:path";
import { buildSiteFacts } from "./lib/site-facts.mjs";

const OUT = path.join(process.cwd(), "data", "site-facts.json");

const next = JSON.stringify(await buildSiteFacts(), null, 2) + "\n";
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
if (next === prev) {
  console.log("data/site-facts.json は最新です");
} else {
  fs.writeFileSync(OUT, next);
  console.log(`data/site-facts.json を更新しました（${(next.length / 1024).toFixed(1)}KB）`);
}
