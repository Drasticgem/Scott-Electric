import { BUSINESS } from "@/lib/constants";
import { Logo } from "./Logo";

const SERVICES = [
  { href: "#services", label: "Scott Electric" },
  { href: "#services", label: "Scott A/C & Heating" },
  { href: "#services", label: "Scott Telecom" },
  { href: "#services", label: "Coastal Kitchens" },
];

const COMPANY = [
  { href: "#about", label: "About" },
  { href: "#", label: "Safety" },
  { href: "#community", label: "Community" },
  { href: "#careers", label: "Careers" },
];

/** Inline SVG data URI — bolt pattern tile (80×80) at 12 % opacity.
 *  Extracted from the brand pattern in public/images/patternnavy.svg
 *  but inlined to avoid an HTTP request (~200 bytes). */
const BOLT_PATTERN_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='40,6 48,18 45,18 53,30 44,30 47,42 33,28 38,28 34,17 42,17' fill='%23D4A83A' opacity='0.12'/%3E%3C/svg%3E")`;

export function Footer() {
  return (
    <footer
      id="careers"
      className="relative bg-navy-deep"
      aria-labelledby="footer-heading"
    >
      {/* Bolt pattern overlay — decorative brand texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: BOLT_PATTERN_URI,
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
        }}
      />

      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* ───── MOBILE FOOTER (< 768px) ─────
          Dramatic, centered, conversion-focused.
          "Let's talk" hero CTA → giant SCOTT wordmark → link columns. */}
      <div className="relative z-[1] md:hidden">
        <MobileFooter />
      </div>

      {/* ───── DESKTOP FOOTER (≥ 768px) ─────
          Dense 4-column informational layout. */}
      <div className="relative z-[1] hidden md:block">
        <DesktopFooter />
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE
   ═══════════════════════════════════════════════════════════ */
function MobileFooter() {
  return (
    <div className="container-1140 pt-32 pb-20">
      {/* Let's talk CTA */}
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-display)] text-[34px] font-bold leading-[1.05] text-white">
          Let&apos;s talk
        </h3>
        <p className="mx-auto mt-6 max-w-[300px] text-[14px] leading-[1.75] text-white/45">
          Power, comfort, connectivity, and craftsmanship for South Texas —
          for over a century.
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-deep transition-colors hover:bg-gold-light"
        >
          Get in touch
        </a>
      </div>

      {/* Brand mark — oversized SCOTT wordmark */}
      <div className="mt-32 flex flex-col items-center">
        <div
          className="font-[family-name:var(--font-display)] font-bold text-white"
          style={{
            fontSize: "clamp(51px, 21.4vw, 106px)",
            lineHeight: "0.85",
            letterSpacing: "-0.03em",
          }}
        >
          SCOTT
        </div>
        <div
          className="mt-5 text-[10px] font-semibold uppercase text-gold"
          style={{ letterSpacing: "0.3em" }}
        >
          Electric Group
        </div>
        <p className="mt-4 text-[11px] text-white/30">
          Family owned since {BUSINESS.founded}
        </p>
      </div>

      {/* Contact → Services → Company — vertically stacked for a longer natural scroll */}
      <div className="mt-32 space-y-20 text-center">
        {/* Contact */}
        <div>
          <p
            className="mb-5 text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.18em" }}
          >
            Contact
          </p>
          <div className="space-y-[6px]">
            <FooterLink href={BUSINESS.phoneHref}>
              {BUSINESS.phoneDisplay}
            </FooterLink>
            <FooterLink href="#">Corpus Christi HQ</FooterLink>
            <FooterLink href="#">San Antonio</FooterLink>
            <FooterLink href="#">Alice · Weslaco</FooterLink>
          </div>
        </div>

        {/* Services */}
        <div>
          <p
            className="mb-5 text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.18em" }}
          >
            Services
          </p>
          <div className="space-y-[6px]">
            {SERVICES.map((s) => (
              <FooterLink key={s.label} href={s.href}>
                {s.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <p
            className="mb-5 text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.18em" }}
          >
            Company
          </p>
          <div className="space-y-[6px]">
            {COMPANY.map((c) => (
              <FooterLink key={c.label} href={c.href}>
                {c.label}
              </FooterLink>
            ))}
          </div>
        </div>
      </div>

      {/* Divider + copyright */}
      <div className="mt-24 border-t border-white/5 pt-10 text-center">
        <p className="text-[11px] text-white/25">
          © {new Date().getFullYear()} Scott Electric Company. All rights
          reserved.
        </p>
        <p className="mt-2 text-[11px] text-white/25">
          <a href="#" className="text-white/40 hover:text-white/70">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="#" className="text-white/40 hover:text-white/70">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESKTOP — original 4-column layout, untouched.
   ═══════════════════════════════════════════════════════════ */
function DesktopFooter() {
  return (
    <div className="container-1140 pt-16">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12">
        {/* Brand column */}
        <div>
          <div className="mb-3 flex items-center gap-[10px]">
            <Logo size="sm" />
          </div>
          <p className="text-[12px] leading-[1.7] text-white/30">
            Electrical, A/C, Telecom &<br />
            Custom Woodworking for
            <br />
            South Texas since {BUSINESS.founded}.
          </p>
        </div>

        {/* Services column */}
        <div>
          <p
            className="mb-[14px] text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.18em" }}
          >
            Services
          </p>
          <div className="space-y-2">
            {SERVICES.map((s) => (
              <FooterLink key={s.label} href={s.href}>
                {s.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Company column */}
        <div>
          <p
            className="mb-[14px] text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.18em" }}
          >
            Company
          </p>
          <div className="space-y-2">
            {COMPANY.map((c) => (
              <FooterLink key={c.label} href={c.href}>
                {c.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Contact column */}
        <div>
          <p
            className="mb-[14px] text-[10px] font-semibold uppercase text-gold"
            style={{ letterSpacing: "0.18em" }}
          >
            Contact
          </p>
          <div className="space-y-2">
            <FooterLink href={BUSINESS.phoneHref}>
              {BUSINESS.phoneDisplay}
            </FooterLink>
            <FooterLink href="#">Corpus Christi HQ</FooterLink>
            <FooterLink href="#">San Antonio</FooterLink>
            <FooterLink href="#">Alice · Weslaco</FooterLink>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 px-0 py-6">
        <span className="text-[11px] text-white/20">
          © {new Date().getFullYear()} Scott Electric Company. All rights
          reserved.
        </span>
        <span className="text-[11px] text-white/20">
          <a href="#" className="text-white/30 hover:text-white/55">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="#" className="text-white/30 hover:text-white/55">
            Terms of Service
          </a>
        </span>
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block text-[13px] text-white/40 transition-colors hover:text-white/80"
    >
      {children}
    </a>
  );
}
