/**
 * サイトで使う写真の一覧。
 * 静的 import にしているので、幅・高さ・ぼかしプレースホルダーは自動で付く。
 * 写真を差し替えるときは scripts/prepare-images.mjs の対応表を直して再生成する。
 *
 * alt は「写真に実際に写っているもの」だけを書く（写っていない設備や人数を足さない。検索語も入れない）。
 *
 * IMG は、すべて実際の Nippori Share Base で撮影された写真。
 * 旧サイトにあった利用風景の 3 枚（ミシン・編み会・レーザーのワークショップ）は AI で生成された画像と
 * 分かったため、使っていない。実在しない場面を「利用風景」として見せないため。
 *
 * EVENT_IMG は、イベントの主催者からいただいた告知画像・見本の写真（掲載の許可あり）。告知ページ（/events）だけで使う。
 * 利用風景としては使わない。コラムの自動生成と OG 画像の生成は IMG だけを読むので、ここに混ぜないこと。
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
import maffonFlyer from "@/public/images/events/maffon-workshop-2026-11/flyer.jpg";
import maffonTracy from "@/public/images/events/maffon-workshop-2026-11/tracy-tshirt.jpg";
import maffonFlounder from "@/public/images/events/maffon-workshop-2026-11/flounder-skirt.jpg";
import maffonTshirtFabric1 from "@/public/images/events/maffon-workshop-2026-11/tshirt-fabric-1.jpg";
import maffonTshirtFabric2 from "@/public/images/events/maffon-workshop-2026-11/tshirt-fabric-2.jpg";
import maffonTshirtFabric3 from "@/public/images/events/maffon-workshop-2026-11/tshirt-fabric-3.jpg";
import maffonTshirtFabric4 from "@/public/images/events/maffon-workshop-2026-11/tshirt-fabric-4.jpg";
import maffonTshirtFabric5 from "@/public/images/events/maffon-workshop-2026-11/tshirt-fabric-5.jpg";
import maffonSkirtFabrics12 from "@/public/images/events/maffon-workshop-2026-11/skirt-fabrics-1-2.jpg";
import maffonSkirtFabrics34 from "@/public/images/events/maffon-workshop-2026-11/skirt-fabrics-3-4.jpg";

/** note … 写真について確認できている事実（alt とは別。写っているもの以外の情報。コラムの自動生成にも渡す） */
export type Img = { src: StaticImageData; alt: string; note?: string };

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
    note: "ロゴの板とアームピンクッションの木の台は、スペースのレーザー加工機で作ったもの（2026-10-09 に運営へ確認）",
  },
} satisfies Record<string, Img>;

/** イベントの告知画像・見本の写真（主催者から受領。scripts/prepare-event-images.mjs で作る） */
export const EVENT_IMG = {
  maffonFlyer: {
    src: maffonFlyer,
    alt: "告知画像。かたがみスタイル×maffon トレイシーTシャツ・フランダースカート ぬいぬいWORKSHOP。2026年11月27日（金）・28日（土）、10:00〜12:00 トレイシーTシャツ、14:00〜16:00 フランダースカート。27日はクロバーの実演も。両方でも片方でもOK",
  },
  maffonTracy: { src: maffonTracy, alt: "トレイシーTシャツの見本の着用写真。白いTシャツに、黒のワイドパンツを合わせている" },
  maffonFlounder: { src: maffonFlounder, alt: "フランダースカートの見本の着用写真。カーキ地に黒の花柄のロングスカートに、白いトップスと帽子を合わせている" },
  maffonTshirtFabric1: { src: maffonTshirtFabric1, alt: "レモン色と杢グレーの、リバーシブルのニット生地" },
  maffonTshirtFabric2: { src: maffonTshirtFabric2, alt: "オフミントとアイボリーの、リバーシブルのニット生地" },
  maffonTshirtFabric3: { src: maffonTshirtFabric3, alt: "ジェイブルーとアイボリーの、リバーシブルのニット生地" },
  maffonTshirtFabric4: { src: maffonTshirtFabric4, alt: "アイボリーと杢グレーの、リバーシブルのニット生地" },
  maffonTshirtFabric5: { src: maffonTshirtFabric5, alt: "杢グレーとネイビーの、リバーシブルのニット生地" },
  maffonSkirtFabrics12: {
    src: maffonSkirtFabrics12,
    alt: "フランダースカートの生地。上はパズル柄（黒／アイボリー）、下はプティアンブレム柄（ネイビー／アイボリー）。どちらも表と裏の両面",
  },
  maffonSkirtFabrics34: {
    src: maffonSkirtFabrics34,
    alt: "フランダースカートの生地。上はクッカペロット柄（ネイビー／アイボリー）、下はダリア柄（ネイビー／シナモン）。どちらも表と裏の両面",
  },
} satisfies Record<string, Img>;
