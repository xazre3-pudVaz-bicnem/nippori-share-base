/**
 * 設備・道具の一覧（単一ソース）。
 *
 * 掲載しているのは、旧公式サイト・利用規約・料金表・店舗提供の写真・運営からの回答のいずれかで
 * 存在を確認できたものだけ。台数・機種・利用条件が確認できないものは、その項目を書かずに
 * 「お問い合わせください」と案内する。新しい設備を足すときは出典を source に残すこと。
 */
import { CUTTING_MACHINE, LASER, yen } from "@/data/pricing";

export type Equipment = {
  id: string;
  name: string;
  en: string;
  /** どんな設備か（初心者向けの説明） */
  what: string;
  /** どんな制作に向いているか */
  goodFor: string[];
  /** 機種名 */
  model?: string;
  /** 利用の条件・料金など（確認できたものだけ） */
  details?: { label: string; body: string }[];
  /** 補足の案内 */
  ask?: string;
  /** 関連ページ */
  link?: { href: string; label: string };
  /** 出典メモ（画面には出さない） */
  source: string;
};

export const EQUIPMENT: Equipment[] = [
  {
    id: "home-machine",
    name: "家庭用ミシン",
    en: "Home sewing machine",
    what: "直線縫い・ジグザグ縫い・ボタンホールなど、1台でいろいろな縫い方ができるミシンです。操作がわかりやすく、ミシンが初めての方や久しぶりの方にも向いています。",
    goodFor: ["布小物・入園入学グッズ", "ボタンホールのある洋服", "飾り縫い・パッチワーク"],
    link: { href: "/sewing-machine#home", label: "家庭用ミシンの機種を見る" },
    source: "公式サイト ミシンリスト",
  },
  {
    id: "pro-machine",
    name: "職業用ミシン",
    en: "Straight stitch machine",
    what: "直線縫いだけに特化したミシンです。そのぶん力が強く、縫い目がまっすぐ整います。厚手の生地や、長い距離を縫う洋服づくりで違いを感じやすい道具です。",
    goodFor: ["シャツ・ワンピース・コート", "帆布・デニムのバッグ", "ステッチを見せたい作品"],
    link: { href: "/sewing-machine#pro", label: "職業用ミシンの機種を見る" },
    source: "公式サイト ミシンリスト",
  },
  {
    id: "lock-machine",
    name: "ロックミシン",
    en: "Overlock machine",
    what: "布の端を切りそろえながら、ほつれないようにかがっていくミシンです。伸びる縫い目になるので、Tシャツなどニット生地の服づくりに欠かせません。",
    goodFor: ["布端の始末（縁かがり）", "Tシャツ・カットソー", "ニット生地の縫い合わせ"],
    link: { href: "/sewing-machine#lock", label: "ロックミシンの機種を見る" },
    source: "公式サイト ミシンリスト",
  },
  {
    id: "cover-machine",
    name: "カバーステッチミシン",
    en: "Cover stitch machine",
    what: "Tシャツの裾や袖口に見られる、表は2本線・裏はループ状の縫い目をつくるミシンです。伸びる生地の裾上げが、既製品のように仕上がります。",
    goodFor: ["Tシャツ・スウェットの裾上げ", "袖口・襟ぐりの始末", "ニット服の仕上げ"],
    link: { href: "/sewing-machine#cover", label: "カバーステッチミシンの機種を見る" },
    source: "公式サイト ミシンリスト",
  },
  {
    id: "iron",
    name: "アイロン・アイロン台",
    en: "Iron",
    what: "縫い代を割る、折り目をつける、接着芯を貼る。洋裁の仕上がりは、アイロンをこまめにかけるかどうかで大きく変わります。ミシンのすぐそばで使えます。",
    goodFor: ["縫い代の始末・折り目つけ", "接着芯を貼る", "仕上げのプレス"],
    source: "公式サイト「できること」／利用規約 第10条／店内写真",
  },
  {
    id: "cutting-table",
    name: "裁断台・裁ち鋏",
    en: "Cutting table",
    what: "生地を広げて型紙を置き、まっすぐ裁つための台です。床やダイニングテーブルでは広げにくい長い生地も、立ったまま無理のない姿勢で裁断できます。裁断だけの利用もできます。",
    goodFor: ["洋服の裁断", "長い生地・幅広の生地のカット", "日暮里繊維街で買った生地の切り分け"],
    link: { href: "/price#other", label: "裁断台利用の料金を見る" },
    source: "料金表「裁断台利用」／利用規約 第10条",
  },
  {
    id: "work-table",
    name: "作業台・大テーブル",
    en: "Work table",
    what: "キャスター付きの作業台を、用途に合わせて動かして使います。1台ずつミシン台として、合わせれば大きなテーブルとして。ハンドメイド利用では大テーブルと椅子（最大6脚）、作業台と椅子（最大4脚）が使えます。",
    goodFor: ["編み会・手芸の集まり", "型紙づくり・パーツ並べ", "ワークショップの作業テーブル"],
    link: { href: "/handmade", label: "ハンドメイドでの使い方を見る" },
    source: "料金表「ハンドメイド利用」／店内写真",
  },
  {
    id: "whiteboard",
    name: "ホワイトボード",
    en: "Whiteboard",
    what: "講座の手順を書き出したり、型紙の寸法を共有したり。ワークショップや共同制作で、全員が同じ情報を見ながら進められます。",
    goodFor: ["ワークショップ・講座", "共同制作の段取り共有", "打ち合わせ"],
    link: { href: "/workshop", label: "ワークショップ開催について見る" },
    source: "料金表「ハンドメイド利用」／店内写真",
  },
  {
    id: "laser",
    name: "レーザー加工機",
    en: "Laser cutter",
    model: LASER.machine,
    what: "レーザーの熱で素材を切ったり、表面に模様や文字を彫ったりする機械です。データどおりに同じ形をいくつも作れるので、名入れやオリジナルグッズ、パーツづくりに向いています。ご自身で操作する体験ではなく、オーダーをいただいて当スペースで加工する形です。",
    goodFor: ["木のコースター・タグ・パーツ", "革への名入れ・カット", "オリジナルグッズ"],
    details: [
      { label: "ご利用の形", body: "オーダー注文のみ（体験利用は行っていません）" },
      { label: "加工できる素材", body: `${LASER.materials.join("・")}。そのほかの素材は機械の調整が必要なため、要相談のうえ試作の時間をいただきます。` },
      { label: "料金", body: `材料費 ＋ レーザー加工時間1分につき${yen(LASER.perMinute)}円 ＋ 加工手数料${yen(LASER.feePerData)}円（1データにつき）` },
    ],
    ask: "スペースにある材料も含めて、柔軟にご相談をお受けします。お気軽にお問い合わせください。",
    source: "運営の回答（2026-10-06）／公式サイト「できること」",
  },
  {
    id: "cutting-machine",
    name: "カッティングマシーン",
    en: "Cutting machine",
    model: CUTTING_MACHINE.machine,
    what: "データに沿って、刃でシートなどを自動でカットする機械です。手では切りにくい細かな文字や図案も、きれいに切り抜けます。",
    goodFor: ["アイロンシートの文字・図案", "シール・ステッカー", "紙の切り抜き"],
    details: [
      { label: "カットできるもの", body: `${CUTTING_MACHINE.cuts.join("・")}など` },
      { label: "使用料金", body: `1時間 ${yen(CUTTING_MACHINE.perHourInc)}円（税込）。別途、シートをご購入いただきます。` },
      { label: "持ち込み", body: "アイロンシート・シール台紙の持ち込みは、ご遠慮いただいています。" },
    ],
    source: "運営の回答（2026-10-06）／公式サイト「できること」",
  },
];
