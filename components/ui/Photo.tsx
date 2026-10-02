import Image from "next/image";
import type { Img } from "@/data/images";

type Props = {
  img: Img;
  /** 画像の表示幅のヒント。Tailwind の境界より 1px 小さい値で書く（例: "(max-width: 1023px) 100vw, 50vw"） */
  sizes: string;
  /** 縦横比のクラス。例: "aspect-[4/5]" */
  ratio?: string;
  /** 切り抜き位置。例: "50% 30%" */
  position?: string;
  /** ファーストビューの写真だけ true */
  priority?: boolean;
  /** 角丸・影など見た目のクラス。position 系（absolute など）は渡さないこと。全面配置は外側の div で包む */
  className?: string;
  /** alt を上書きしたいとき（同じ写真を別の文脈で使う場合） */
  alt?: string;
};

/**
 * 写真の共通ラッパー。枠の比率で切り抜き、角を丸める（現在の公式サイトの写真の見せ方に合わせている）。
 * 内部で position: relative を使うため、呼び出し側から absolute / fixed を渡すと高さが 0 になる。
 */
export function Photo({ img, sizes, ratio = "aspect-[4/5]", position, priority = false, className = "rounded-3xl", alt }: Props) {
  return (
    <div className={`relative overflow-hidden bg-butter ${ratio} ${className}`}>
      <Image
        src={img.src}
        alt={alt ?? img.alt}
        fill
        sizes={sizes}
        quality={65}
        // ファーストビューの写真は先読みし、取得の優先度も上げる（LCP 対策）
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        // ぼかしのプレースホルダーは最初に見える写真だけ（全部に付けると HTML が 1 割ほど重くなる）
        placeholder={priority ? "blur" : "empty"}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
