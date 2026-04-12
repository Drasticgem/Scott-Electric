import { DIVISIONS, type Division } from "@/lib/data/divisions";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight } from "lucide-react";
import {
  BoltIcon,
  ServicesAcIcon,
  TelecomIcon,
  HouseIcon,
} from "@/components/icons/DivisionIcons";

/**
 * Light 2×2 services grid. Header uses the shared section pattern.
 * Matches legacy .services-grid — including the colored left accent
 * bar that grows to full height on hover (ported via a ::before-style
 * absolutely positioned span with group-hover).
 */
export function Services() {
  return (
    <section id="services" className="py-20 max-[768px]:py-12">
      <div className="container-1140">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-6 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
            <div>
              <p
                className="mb-2 text-[10px] font-semibold uppercase text-gold-dark"
                style={{ letterSpacing: "0.22em" }}
              >
                Our Services
              </p>
              <h2
                className="font-[family-name:var(--font-display)] font-black text-navy"
                style={{
                  fontSize: "clamp(26px, 2.8vw, 34px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                Four divisions.
                <br />
                One standard.
              </h2>
            </div>
            <a
              href="#"
              className="group inline-flex shrink-0 items-center gap-[6px] whitespace-nowrap text-[13px] font-semibold text-gold-dark transition-colors duration-200 hover:text-gold"
              style={{ letterSpacing: "0.03em" }}
            >
              View all services
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1 max-[480px]:gap-3"
        >
          {DIVISIONS.map((d) => (
            <ServiceCard key={d.slug} division={d} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ division }: { division: Division }) {
  const bar = accentBarHex(division.accent);
  const Icon = serviceIconFor(division.accent);
  const iconBg = accentIconBg(division.accent);
  const linkColor = serviceLinkColor(division.accent);

  return (
    <a
      href="#"
      className="group relative block overflow-hidden rounded-[14px] border border-warm-gray bg-white p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[2px] hover:border-transparent hover:shadow-md max-[480px]:p-5"
    >
      {/* Colored left accent bar — grows from 0 → 100% on hover */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-0 w-[3px] rounded-br-sm transition-[height] duration-300 group-hover:h-full"
        style={{
          background: bar,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      <span
        className="mb-[14px] flex h-11 w-11 items-center justify-center rounded-[10px]"
        style={{ background: iconBg }}
      >
        <Icon />
      </span>

      <div className="mb-[6px] text-[16px] font-semibold text-navy">
        {division.name}
      </div>

      <p className="text-[13px] leading-[1.65] text-muted">
        {division.description}
      </p>

      <span
        className="mt-[14px] inline-flex items-center gap-1 text-[12px] font-semibold transition-[gap] duration-200 group-hover:gap-2"
        style={{
          letterSpacing: "0.03em",
          color: linkColor,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {division.exploreLabel} →
      </span>
    </a>
  );
}

/* ── Accent → left hover bar color ── */
function accentBarHex(accent: Division["accent"]) {
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

/* ── Accent → services card icon background (pale version) ── */
function accentIconBg(accent: Division["accent"]) {
  switch (accent) {
    case "gold":
      return "rgba(212,168,58,0.12)";
    case "ac-blue":
      return "#E6F5FA";
    case "tele-green":
      return "#E6F5EE";
    case "ck-terra":
      return "#FAF0E8";
  }
}

/* ── Accent → services explore link text color ── */
function serviceLinkColor(accent: Division["accent"]) {
  switch (accent) {
    case "gold":
      return "#9a7a28"; // gold-dark
    case "ac-blue":
      return "#4AA8C8";
    case "tele-green":
      return "#4AAF78";
    case "ck-terra":
      return "#C87A4A";
  }
}

/* ── Services grid uses slightly different icon styling vs hero cards ── */
function serviceIconFor(accent: Division["accent"]) {
  switch (accent) {
    case "gold":
      return () => <BoltIcon size={20} fill="#D4A83A" />;
    case "ac-blue":
      return () => <ServicesAcIcon size={22} />;
    case "tele-green":
      return () => <TelecomIcon size={20} stroke="#4AAF78" />;
    case "ck-terra":
      return () => <HouseIcon size={20} stroke="#C87A4A" />;
  }
}
