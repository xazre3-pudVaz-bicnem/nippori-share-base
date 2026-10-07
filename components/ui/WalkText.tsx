import { SITE } from "@/lib/site";

/**
 * 「JR日暮里駅・JR鶯谷駅・JR三河島駅から徒歩約10分」の表示用。
 * 「徒歩約10分」が行をまたがないようにしている。文字列として使うときは lib/site.ts の walkText を使う。
 */
export function WalkText() {
  return (
    <>
      {SITE.walk.stations.join("・")}から<span className="whitespace-nowrap">徒歩約{SITE.walk.minutes}分</span>
    </>
  );
}

/** 「都08…／里22…／草41…で「東日暮里3丁目」下車、徒歩約3分」の表示用 */
export function BusText() {
  return (
    <>
      {SITE.bus.routes.join("／")}で「{SITE.bus.stop}」下車、<span className="whitespace-nowrap">徒歩約{SITE.bus.minutes}分</span>
    </>
  );
}
