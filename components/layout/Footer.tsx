import { DISCVAULT } from "@/lib/constants";
import { Logo } from "./Logo";

const PRODUCT = [
  { href: "/#features", label: "Features" },
  { href: "/catalog", label: "Catalog" },
  { href: DISCVAULT.appStoreUrl, label: "Download" },
];

const COMPANY = [
  { href: "/#security", label: "Security & Privacy" },
  { href: "/support", label: "Support" },
  { href: "/#contact", label: "Partner" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative border-t border-border bg-paper"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* ───── MOBILE FOOTER (< 768px) ───── */}
      <div className="md:hidden">
        <MobileFooter />
      </div>

      {/* ───── DESKTOP FOOTER (≥ 768px) ───── */}
      <div className="hidden md:block">
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
    <div className="container-1140 pt-24 pb-16">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-display)] text-[32px] font-bold leading-[1.05] text-ink">
          Let&apos;s build your vault.
        </h3>
        <p className="mx-auto mt-5 max-w-[300px] text-[14px] leading-[1.75] text-ink-soft">
          {DISCVAULT.tagline}
        </p>
        <a
          href={DISCVAULT.appStoreUrl}
          className="mt-8 inline-flex transition-transform duration-200 hover:-translate-y-px"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- official Apple badge asset, used unmodified per brand guidelines */}
          <img
            src="/badges/app-store-badge.svg"
            alt="Download on the App Store"
            width={161}
            height={54}
          />
        </a>
      </div>

      <div className="mt-24 flex flex-col items-center">
        <Logo size="lg" />
        <p className="mt-4 text-[11px] text-ink-soft">
          Browse the catalog for free.
        </p>
      </div>

      <div className="mt-20 space-y-16 text-center">
        <FooterColumn heading="Product" links={PRODUCT} />
        <FooterColumn heading="Company" links={COMPANY} />
      </div>

      <div className="mt-20 border-t border-border pt-8 text-center">
        <p className="text-[11px] text-ink-soft">
          © {new Date().getFullYear()} DiscVault. All rights reserved.
        </p>
        <p className="mt-2 text-[11px] text-ink-soft">
          <a href="/privacy" className="text-accent transition-colors hover:text-accent-dark">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className="text-accent transition-colors hover:text-accent-dark">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESKTOP
   ═══════════════════════════════════════════════════════════ */
function DesktopFooter() {
  return (
    <div className="container-1140 pt-16">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12">
        <div>
          <Logo size="sm" className="mb-3 inline-block" />
          <p className="text-[12px] leading-[1.7] text-ink-soft">
            {DISCVAULT.tagline}
          </p>
        </div>

        <div>
          <ColumnHeading>Product</ColumnHeading>
          <div className="space-y-2">
            {PRODUCT.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div>
          <ColumnHeading>Company</ColumnHeading>
          <div className="space-y-2">
            {COMPANY.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div>
          <ColumnHeading>Contact</ColumnHeading>
          <div className="space-y-2">
            <FooterLink href={DISCVAULT.emailHref}>
              {DISCVAULT.email}
            </FooterLink>
            <FooterLink href={DISCVAULT.socials.instagram}>
              Instagram
            </FooterLink>
            <FooterLink href={DISCVAULT.socials.twitter}>Twitter</FooterLink>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border px-0 py-6">
        <span className="text-[11px] text-ink-soft">
          © {new Date().getFullYear()} DiscVault. All rights reserved.
        </span>
        <span className="text-[11px] text-ink-soft">
          <a href="/privacy" className="text-accent transition-colors hover:text-accent-dark">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className="text-accent transition-colors hover:text-accent-dark">
            Terms of Service
          </a>
        </span>
      </div>
    </div>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-[14px] text-[10px] font-semibold uppercase text-ink-soft"
      style={{ letterSpacing: "0.14em" }}
    >
      {children}
    </p>
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
      className="block text-[13px] text-ink transition-colors hover:text-accent"
    >
      {children}
    </a>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p
        className="mb-5 text-[10px] font-semibold uppercase text-ink-soft"
        style={{ letterSpacing: "0.14em" }}
      >
        {heading}
      </p>
      <div className="space-y-[6px]">
        {links.map((link) => (
          <FooterLink key={link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}
