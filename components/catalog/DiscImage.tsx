import { cn } from "@/lib/utils";

interface DiscImageProps {
  src?: string | null;
  color: string;
  alt: string;
  className?: string;
}

export function DiscImage({ src, color, alt, className }: DiscImageProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- catalog images are remote Supabase/public URLs with unknown domains.
      <img src={src} alt={alt} className={cn("rounded-full object-contain", className)} loading="lazy" />
    );
  }

  return (
    <span
      role="img"
      aria-label={`${alt} color swatch`}
      className={cn(
        "relative block rounded-full border border-white/60 shadow-[inset_0_0_24px_rgba(255,255,255,0.35),0_10px_30px_rgba(0,0,0,0.16)]",
        className,
      )}
      style={{
        background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.62), transparent 0 18%, ${color} 19% 62%, rgba(0,0,0,0.18) 100%)`,
      }}
    >
      <span className="absolute inset-[18%] rounded-full border border-white/25" aria-hidden="true" />
    </span>
  );
}
