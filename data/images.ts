/**
 * サイトで使う写真の一覧。
 * 静的 import にしているので、幅・高さ・ぼかしプレースホルダーは自動で付く。
 * 写真を差し替えるときは scripts/prepare-images.mjs の対応表を直して再生成する。
 *
 * alt は「写真に実際に写っているもの」だけを書く（写っていない設備や人数を足さない。検索語も入れない）。
 *
 * すべて、実際の Nippori Share Base で撮影された写真。
 * 旧サイトにあった利用風景の 3 枚（ミシン・編み会・レーザーのワークショップ）は AI で生成された画像と
 * 分かったため、使っていない。実在しない場面を「利用風景」として見せないため。
 */
import type { StaticImageData } from "next/image";

import spaceMain from "@/public/images/space/space-main.jpg";
import spaceTables from "@/public/images/space/space-tables.jpg";
import spaceLargeTable from "@/public/images/space/space-large-table.jpg";
import spaceYellowStool from "@/public/images/space/space-yellow-stool.jpg";
import shelfLock from "@/public/images/space/shelf-lock-machines.jpg";
import shelfHome from "@/public/images/space/shelf-home-machines.jpg";
import shelfSinger from "@/public/images/space/shelf-singer-machines.jpg";
import layoutFloor from "@/public/images/space/layout-floor-open.jpg";
import layoutSeminar from "@/public/images/space/layout-seminar.jpg";
import layoutSeminarBack from "@/public/images/space/layout-seminar-back.jpg";
import exterior from "@/public/images/access/saito-shoten-exterior.jpg";
import stairsSign from "@/public/images/access/stairs-sign.jpg";
import scenePattern from "@/public/images/scene/pattern-and-sewing.jpg";
import cuttingPattern from "@/public/images/scene/pattern-on-cutting-table.jpg";
import workScrunchies from "@/public/images/works/scrunchies.jpg";
import workScissorCases from "@/public/images/works/leather-scissor-cases.jpg";
import workPincushions from "@/public/images/works/pincushions-and-coaster.jpg";
import logo from "@/public/images/brand/logo.png";

export type Img = { src: StaticImageData; alt: string };

export const IMG = {
  logo: { src: logo, alt: "Nippori Share Base のロゴ。3つの手が黄色い布を広げているイラスト" },
  spaceMain: {
    src: spaceMain,
    alt: "Nippori Share Base の店内。キャスター付きの作業台に職業用ミシンやロックミシンが並び、壁の棚にもミシンが置かれている",
  },
  spaceTables: {
    src: spaceTables,
    alt: "作業台に置かれた職業用ミシンと、奥まで続く Nippori Share Base の作業スペース",
  },
  spaceLargeTable: {
    src: spaceLargeTable,
    alt: "作業台を2台合わせた大きなテーブルと黄色いスツール。奥にホワイトボードとトルソーが見える",
  },
  spaceYellowStool: {
    src: spaceYellowStool,
    alt: "職業用ミシンを置いた作業台と黄色いスツールが並ぶ店内",
  },
  shelfLock: {
    src: shelfLock,
    alt: "木の棚に並ぶロックミシンとカバーステッチミシン",
  },
  shelfHome: {
    src: shelfHome,
    alt: "棚に並ぶ家庭用コンピューターミシンと職業用ミシン",
  },
  shelfSinger: {
    src: shelfSinger,
    alt: "棚に並ぶ SINGER のミシンと職業用ミシン",
  },
  layoutFloor: {
    src: layoutFloor,
    alt: "作業台を壁側に寄せ、床に黄色いシートを広げたイベント時の配置",
  },
  layoutSeminar: {
    src: layoutSeminar,
    alt: "椅子を前向きに並べ、奥に作業台を置いた講座・説明会スタイルの配置",
  },
  layoutSeminarBack: {
    src: layoutSeminarBack,
    alt: "椅子を列に並べたイベント時の配置。奥に大テーブルと窓が見える",
  },
  exterior: {
    src: exterior,
    alt: "日暮里繊維街にある生地店・齊藤商店の外観。入口に「FABRICS 齊藤商店」の黒板看板が立っている",
  },
  stairsSign: {
    src: stairsSign,
    alt: "階段の壁に付けられた木製の案内サイン。1Fから2Fの Nippori Share Base への矢印",
  },
  // ── 2026-10-07 に受領した写真 ──
  scenePattern: {
    src: scenePattern,
    alt: "手前の裁断台に型紙と方眼の用紙を広げ、文鎮で押さえている。奥の作業台ではミシンに向かう人と、それを見ている人。トルソーにはワンピースが掛かっている",
  },
  cuttingPattern: {
    src: cuttingPattern,
    alt: "裁断台いっぱいに広げた方眼の用紙と型紙。丸い文鎮を3つ置いて押さえている",
  },
  workScrunchies: {
    src: workScrunchies,
    alt: "花柄の布をはぎ合わせて作ったシュシュ。奥に、同じ大きさに切りそろえた花柄の布が並んでいる",
  },
  workScissorCases: {
    src: workScissorCases,
    alt: "革を革ひもでかがって作った、裁ち鋏のケースが3つ。黒・茶・黄色",
  },
  workPincushions: {
    src: workPincushions,
    alt: "Nippori Share Base のロゴを彫った木の丸い板と、木の台にゴムバンドを付けたアームピンクッションが4つ。小さなミシンの置物も並んでいる",
  },
} satisfies Record<string, Img>;
