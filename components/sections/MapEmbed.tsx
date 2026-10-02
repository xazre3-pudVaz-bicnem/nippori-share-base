import { SITE } from "@/lib/site";
import { ExternalIcon } from "@/components/ui/Icons";

/**
 * Google マップの埋め込み。loading="lazy" で、画面に近づくまで読み込まない（最初の表示を重くしないため）。
 * 住所検索の埋め込みなので API キーは不要。地図上のカードには住所が表示される（実機で確認済み）。
 * Google ビジネスプロフィールを登録したら、「共有 → 地図を埋め込む」で発行される URL に
 * lib/site.ts の mapEmbedUrl を差し替えると、店名付きのピンになる。
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-2xl border-2 border-ink/80 bg-butter">
        <iframe
          src={SITE.mapEmbedUrl}
          title={`${SITE.name}（${SITE.addressFull}）の地図`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10]"
          allowFullScreen
        />
      </div>
      <a href={SITE.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-flex items-center gap-1.5 text-sm">
        Google マップで開く・経路を調べる
        <ExternalIcon />
      </a>
    </div>
  );
}
