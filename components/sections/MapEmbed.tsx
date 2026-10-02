import { SITE } from "@/lib/site";
import { ExternalIcon } from "@/components/ui/Icons";

/**
 * Google マップの埋め込み。loading="lazy" で、画面に近づくまで読み込まない。
 * 住所検索の埋め込みなので API キーは不要。Google ビジネスプロフィールを登録したら、
 * 「地図を埋め込む」で発行される URL に lib/site.ts の mapEmbedUrl を差し替えると店名付きのピンになる。
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-3xl bg-butter shadow-[0_0_0_2px_var(--color-line)]">
        <iframe
          src={SITE.mapEmbedUrl}
          title={`${SITE.name}（${SITE.addressFull}）の地図`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block aspect-[4/3] w-full border-0 sm:aspect-[16/9]"
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
