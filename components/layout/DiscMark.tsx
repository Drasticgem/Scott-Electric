import { cn } from "@/lib/utils";

type DiscMarkProps = {
  size?: number;
  className?: string;
};

// Matches the cropped asset's aspect ratio (685x219).
const ASPECT_RATIO = 219 / 685;

/**
 * The flying-disc glyph cropped from the DiscVault logo. Rendered as a CSS
 * mask (not an <img>) so it picks up `currentColor` via bg-ink and recolors
 * automatically in dark mode, instead of baking in a fixed black fill.
 */
export function DiscMark({ size = 56, className }: DiscMarkProps) {
  return (
    <span
      role="img"
      aria-label="DiscVault"
      className={cn("inline-block bg-ink", className)}
      style={{
        width: size,
        height: size * ASPECT_RATIO,
        WebkitMaskImage: "url(/logos/discvault-mark-crop.png)",
        maskImage: "url(/logos/discvault-mark-crop.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
