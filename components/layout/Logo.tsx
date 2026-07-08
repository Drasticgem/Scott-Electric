import { cn } from "@/lib/utils";

/**
 * DiscVault wordmark.
 *
 * Spec: SF Pro (Apple system font), .title2 / 22pt, Heavy weight,
 * italic, -0.5pt tracking, Color.primary (black in light mode).
 * Reused by Header and Footer at different sizes.
 */
type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: "text-[17px]",
  md: "text-[22px]",
  lg: "text-[34px]",
} as const;

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-display)] font-black italic text-ink",
        SIZES[size],
        className,
      )}
      style={{ letterSpacing: "-0.5px", fontWeight: 900 }}
    >
      DiscVault
    </span>
  );
}
