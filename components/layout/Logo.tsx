import { cn } from "@/lib/utils";

/**
 * Scott Electric Group bolt logo + wordmark.
 * Reused by Header (size="md"), desktop Footer (size="sm"),
 * and mobile Footer (size="lg").
 * The bolt SVG path is lifted verbatim from the legacy index.html.
 */
type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Logo({ size = "md", className }: LogoProps) {
  const boltSize = size === "lg" ? 44 : size === "md" ? 28 : 24;

  return (
    <span className={cn("flex shrink-0 items-center gap-[10px]", className)}>
      <svg
        width={boltSize}
        height={boltSize}
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <polygon
          points="26,4 36,16 32,16 42,30 28,30 34,44 14,24 24,24 18,12 28,12"
          fill="#D4A83A"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-display)] font-bold text-white",
            size === "lg"
              ? "text-[26px]"
              : size === "md"
                ? "text-[16px] max-[480px]:text-[14px]"
                : "text-[15px]",
          )}
          style={{ letterSpacing: "0.1em" }}
        >
          SCOTT
        </span>
        <span
          className={cn(
            "mt-[3px] font-[family-name:var(--font-body)] font-semibold text-gold",
            size === "lg" ? "text-[10px]" : "text-[8px]",
          )}
          style={{ letterSpacing: "0.25em" }}
        >
          ELECTRIC GROUP
        </span>
      </span>
    </span>
  );
}
