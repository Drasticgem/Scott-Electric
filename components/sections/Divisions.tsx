import { DIVISIONS, type Division } from "@/lib/data/divisions";
import { Reveal } from "@/components/animations/Reveal";
import {
  BoltIcon,
  SnowflakeFlameIcon,
  TelecomIcon,
  HouseIcon,
} from "@/components/icons/DivisionIcons";

/**
 * Dark 2×2 grid of division cards. These cards used to be stacked
 * in the hero's right column — moved here so the hero can breathe
 * and the cards get more room. Glass card visual language is
 * identical to the legacy .division-card.
 */
export function Divisions() {
  return (
    <section
      className="bg-navy py-16 max-[768px]:py-12"
      aria-label="Our divisions"
    >
      <div className="container-1140">
        <Reveal className="mb-6">
          {/* No H2 here — visually a continuation of the hero. The
              "Four divisions. One standard." heading lives in the
              Services section below, where it belongs to the
              detailed services grid. */}
          <p
            className="text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.22em" }}
          >
            Our Divisions
          </p>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-2 gap-[10px] max-[768px]:grid-cols-1"
        >
          {DIVISIONS.map((d) => (
            <DivisionCard key={d.slug} division={d} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Single dark glass card ── */
function DivisionCard({ division }: { division: Division }) {
  const iconBg = accentBgHex(division.accent);
  const Icon = iconFor(division.accent);

  return (
    <a
      href="#services"
      className="group flex items-center gap-[14px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 transition-all duration-200 hover:translate-x-1 hover:border-white/[0.16] hover:bg-white/[0.07]"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]"
        style={{ background: iconBg }}
      >
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold leading-[1.2] text-white">
          {division.name}
        </span>
        <span className="mt-[2px] block text-[12px] text-white/40">
          {division.tagline}
        </span>
      </span>
      <span
        className="shrink-0 whitespace-nowrap rounded-[5px] border border-gold/20 bg-gold/10 px-[10px] py-1 text-[10px] font-semibold text-gold"
        style={{ letterSpacing: "0.02em" }}
      >
        {division.badge}
      </span>
    </a>
  );
}

/* ── Accent → card icon background color (legacy inline styles) ── */
function accentBgHex(accent: Division["accent"]) {
  switch (accent) {
    case "gold":
      return "#D4A83A";
    case "ac-blue":
      return "#4AA8C8";
    case "tele-green":
      return "#4AAF78";
    case "ck-terra":
      return "#C87A4A";
  }
}

/* ── Accent → icon component ── */
function iconFor(accent: Division["accent"]) {
  switch (accent) {
    case "gold":
      return () => <BoltIcon size={18} fill="#0F2040" />;
    case "ac-blue":
      return () => <SnowflakeFlameIcon size={20} stroke="#0F2040" />;
    case "tele-green":
      return () => <TelecomIcon size={18} stroke="#0F2040" />;
    case "ck-terra":
      return () => <HouseIcon size={18} stroke="#0F2040" />;
  }
}
