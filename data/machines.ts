/**
 * 使えるミシンの一覧（単一ソース）。
 *
 * 出典
 * - 機種名：店舗提供の機種ラベル付き写真（2026-10-02 受領）と、旧公式サイトのミシン一覧。
 *   JUKI の職業用は「シュプール30DX（TL-30DX）」が正しいと運営に確認済み（2026-10-06）
 * - 写真：旧公式サイトのミシン一覧ページに載っている、正面からの写真にそろえている
 * - 種類ごとの説明・機種ごとの説明：現在の公式サイトの文章をそのまま使用
 * - 「こんな作品に」「こんな方に」：ミシンの種類についての一般的な説明
 *
 * 台数は公開情報として確認できていないため、どこにも書かない。
 * 機種は入れ替わる可能性がある。変更があればこのファイルだけを直す。
 */
import type { StaticImageData } from "next/image";

import cantare from "@/public/images/machines/janome-cantare-tj-1sp.jpg";
import compal from "@/public/images/machines/brother-compal-700.jpg";
import sl3700 from "@/public/images/machines/juki-sl-3700-mina-perhonen.jpg";
import hauteCouture from "@/public/images/machines/janome-haute-couture-ecru-2000.jpg";
import spur30 from "@/public/images/machines/juki-spur-30dx-tl-30dx.jpg";
import imagineWave from "@/public/images/machines/babylock-imagine-wave-ble3atwj.jpg";
import sakura from "@/public/images/machines/babylock-sakura-bls-5.jpg";
import mo3000 from "@/public/images/machines/juki-mo-3000.jpg";
import kanade from "@/public/images/machines/babylock-kanade-blc-7j.jpg";
import tumugi from "@/public/images/machines/babylock-tumugi-blc-70tj.jpg";
import flatlock from "@/public/images/machines/babylock-flatlock-bl72s.jpg";
import vivace from "@/public/images/machines/singer-vivace-trx-9300.jpg";
import heavyDuty from "@/public/images/machines/singer-heavy-duty-hd4423.jpg";
import hh2500 from "@/public/images/machines/singer-hh-2500.jpg";

export type MachineCategoryId = "home" | "pro" | "lock" | "cover";

export type Machine = {
  id: string;
  maker: string;
  model: string;
  image: StaticImageData;
  /** 現在の公式サイトに掲載されている説明 */
  description?: string;
  /** 寄贈・貸与などの補足（写真のラベルに記載のあるもの） */
  note?: string;
};

export type MachineCategory = {
  id: MachineCategoryId;
  name: string;
  short: string;
  en: string;
  /** Tailwind の背景色クラス（機種ラベルの色に合わせている） */
  tone: string;
  /** カテゴリの色。リンクに乗せたときの色などに使う（globals.css の --color-cat-* と同じ値） */
  color: string;
  /** 現在の公式サイトの3つのポイント */
  points: string[];
  /** 現在の公式サイトの説明文 */
  lead: string;
  /** 向いている作品 */
  goodFor: string[];
  /** こんな方に */
  recommend: string;
  machines: Machine[];
};

export const MACHINE_CATEGORIES: MachineCategory[] = [
  {
    id: "home",
    name: "家庭用ミシン",
    short: "家庭用",
    en: "Home sewing machine",
    tone: "bg-cat-home",
    color: "var(--color-cat-home)",
    points: ["初めてでも使いやすい！", "1台でいろいろ作れる！", "おうちで気軽に楽しめる！"],
    lead: "直線縫いやジグザグ縫い、ボタンホールなど1台で何種類もの縫い方ができます。気軽にソーイングを楽しみたい方におすすめです。",
    goodFor: ["巾着・ポーチなどの布小物", "入園入学グッズ", "ボタンホールのある洋服", "飾り縫い・パッチワーク"],
    recommend: "ミシンに触れるのが久しぶりの方、まずは1台でいろいろ縫ってみたい方に。",
    machines: [
      {
        id: "janome-cantare-tj-1sp",
        maker: "JANOME",
        model: "CANTARE TJ-1SP",
        image: cantare,
        description:
          "家庭用ミシンの中ではかなりハイエンドな位置づけで、「家庭用の使いやすさ」と「職業用に近い縫い品質」を両立したモデルです。実用縫いから飾り縫いまで幅広い縫い模様を搭載。洋服作りはもちろん、小物やパッチワークにも対応できます。",
      },
      {
        id: "brother-compal-700",
        maker: "brother",
        model: "COMPAL 700（CPF20）",
        image: compal,
        description:
          "使いやすさと機能性のバランスが取れたコンピューターミシンです。自動糸調子や自動糸切りなど、便利な機能を搭載しており、初心者から経験者まで幅広く使えます。実用縫いから飾り縫いまで対応し、ソーイングを快適に楽しめる一台です。",
      },
    ],
  },
  {
    id: "pro",
    name: "職業用ミシン",
    short: "職業用",
    en: "Straight stitch machine",
    tone: "bg-cat-pro",
    color: "var(--color-cat-pro)",
    points: ["プロのような美しい縫い目！", "まっすぐ縫いに特化した高性能！", "厚手の生地もパワフルに！"],
    lead: "「まっすぐ縫う」ことに特化したパワフルなミシンです。縫い目がきれいでスピードも速く、厚手の生地や長い距離もスイスイ縫えます。洋服作りを本格的に楽しみたい方や、仕上がりにこだわりたい方に人気の一台です。",
    goodFor: ["シャツ・ワンピース・コートなどの洋服", "帆布やデニムのバッグ", "カーテンなど長い距離の直線縫い", "ステッチを見せたい作品"],
    recommend: "家庭用ミシンの直線縫いに物足りなさを感じている方、購入前に縫い心地を確かめたい方に。",
    machines: [
      {
        id: "juki-sl-3700",
        maker: "JUKI",
        model: "SL-3700 minä perhonen",
        image: sl3700,
        description:
          "工業用ミシンの技術を受け継いだ職業用ミシンです。美しく安定した縫い目で、薄手から厚手までしっかり縫い上げます。パワフルな送り性能で、洋服作りはもちろん、バッグや小物作りなど、本格的なソーイングを楽しめる一台です。",
      },
      {
        id: "janome-haute-couture-ecru-2000",
        maker: "JANOME",
        model: "haute couture ecru 2000",
        image: hauteCouture,
        description:
          "上質な縫い心地を備えた職業用ミシンです。静かでなめらかな縫製は、長時間の作業でも快適。美しい直線縫いで、洋服作りはもちろん、バッグや小物作りなど、こだわりの作品づくりを支えてくれる一台です。",
      },
      {
        id: "juki-spur-30dx",
        maker: "JUKI",
        model: "シュプール30DX（TL-30DX）",
        image: spur30,
        description:
          "扱いやすさを備えたミシンです。自動糸切り機能を搭載し、快適な作業をサポート。洋服作りはもちろん、キルトや小物作りなど、幅広い作品づくりを楽しめる一台です。",
        note: "寄贈いただいたミシンです。",
      },
    ],
  },
  {
    id: "lock",
    name: "ロックミシン",
    short: "ロック",
    en: "Overlock machine",
    tone: "bg-cat-lock",
    color: "var(--color-cat-lock)",
    points: ["布端の始末がこれ1台！", "ニット生地との相性抜群！", "既製品のような仕上がりに！"],
    lead: "布端をカットしながら、ほつれ止めまで一気に仕上げてくれるミシンです。ニット生地やTシャツ作りには欠かせない存在で、市販の服のようなきれいな仕上がりになります。",
    goodFor: ["Tシャツ・カットソーなどニットの服", "布端の始末（縁かがり）", "フリルや薄手の生地の端の始末", "裏地なしの服の縫い代始末"],
    recommend: "ジグザグ縫いでの端処理から一歩進みたい方、ニットソーイングを始めてみたい方に。",
    machines: [
      {
        id: "babylock-imagine-wave",
        maker: "baby lock",
        model: "Imagine wave BLE3ATWJ",
        image: imagineWave,
        description:
          "高い表現力と美しい仕上がりが魅力の高性能ロックミシンです。エアスルー糸通しや自動糸調子を搭載し、快適な操作を実現。通常のロック縫いに加え、ウェーブロックにも対応。作品の表現を広げる一台です。",
      },
      {
        id: "babylock-sakura",
        maker: "baby lock",
        model: "Sakura BLS-5",
        image: sakura,
        description:
          "快適な操作性と安定した仕上がりが魅力の高性能ロックミシンです。自動糸調子やエアスルー糸通しを搭載し、面倒な準備をサポート。ニット生地の縫製から美しい縁かがりまで、毎日の洋服作りを快適に楽しめる一台です。",
      },
      {
        id: "juki-mo-3000",
        maker: "JUKI",
        model: "MO-3000",
        image: mo3000,
        description:
          "高い縫製力と安定感が魅力の本格派ロックミシンです。パワフルな送り性能で、薄手から厚手まで美しく仕上げます。洋服作りはもちろん、ニット素材や本格的な作品づくりまで、幅広く活躍する一台です。",
      },
    ],
  },
  {
    id: "cover",
    name: "カバーステッチミシン",
    short: "カバステ",
    en: "Cover stitch machine",
    tone: "bg-cat-cover",
    color: "var(--color-cat-cover)",
    points: ["あと一歩を叶えるミシン！", "伸びる生地もきれいに縫える！", "作品がグッと本格的に！"],
    lead: "Tシャツの裾や袖口によくある、表は2本・裏はループ状の縫い目を作れるミシンです。伸縮性のあるきれいな仕上がりになるので、ニット素材の洋服作りに大活躍。既製品のような本格的な仕上がりを目指したい方におすすめです。",
    goodFor: ["Tシャツ・スウェットの裾上げ", "袖口・襟ぐりの始末", "レギンスやスポーツウェア", "ニット服の仕上げ"],
    recommend: "ロックミシンで縫った服の「裾の仕上げ」をきれいにしたい方、既製品のような見た目を目指す方に。",
    machines: [
      {
        id: "babylock-kanade",
        maker: "baby lock",
        model: "Kanade BLC-7J",
        image: kanade,
        description:
          "美しい仕上がりと快適な操作性を備えた高性能カバーステッチミシンです。カバーステッチやチェーンステッチに対応し、ニット素材の仕上げもきれいに整えられます。洋服作りの完成度を高める本格派の一台です。",
      },
      {
        id: "babylock-tumugi",
        maker: "baby lock",
        model: "Tumugi BLC-70TJ",
        image: tumugi,
        description:
          "使いやすさと機能性をバランスよく備えたカバーステッチミシンです。裾や袖口などの仕上げを美しく整えられるので、Tシャツやニット服などの洋服作りに大活躍。作品をワンランク上に仕上げる頼れる一台です。",
      },
      {
        id: "babylock-flatlock",
        maker: "baby lock",
        model: "ふらっとろっく BL72S",
        image: flatlock,
        description:
          "自由なソーイングを楽しめる定番カバーステッチミシンです。カバーステッチやチェーンステッチに対応し、ニット素材の縫製を美しく仕上げられます。シンプルな操作性で、こだわりの洋服作りを楽しめる一台です。",
        note: "寄贈いただいたミシンです。",
      },
    ],
  },
];

/**
 * 期間限定で設置しているミシン。
 * 写真のラベルに「HappyJapan 様よりお借りしております」と記載がある。
 * 設置期間は、予約申込フォームに「期間限定 2026年内」と書かれている（LIMITED_UNTIL）。
 */
export const LIMITED_UNTIL = "2026年内";

export const LIMITED_MACHINES: Machine[] = [
  { id: "singer-vivace-trx-9300", maker: "SINGER", model: "VIVACE TRX-9300", image: vivace },
  { id: "singer-heavy-duty-hd4423", maker: "SINGER", model: "Heavy Duty HD4423", image: heavyDuty },
  { id: "singer-hh-2500", maker: "SINGER", model: "HH-2500", image: hh2500 },
];

export const ALL_MACHINE_NAMES = [
  ...MACHINE_CATEGORIES.flatMap((c) => c.machines.map((m) => `${m.maker} ${m.model}（${c.name}）`)),
  ...LIMITED_MACHINES.map((m) => `${m.maker} ${m.model}（期間限定）`),
];
