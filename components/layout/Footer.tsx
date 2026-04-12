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

export function Footer() {
  return (
    <footer
      id="careers"
      className="bg-navy-deep pt-16"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-1140">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 max-[768px]:grid-cols-2 max-[768px]:gap-6 max-[480px]:grid-cols-1">
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
            {SERVICES.map((s) => (
              <FooterLink key={s.label} href={s.href}>
                {s.label}
              </FooterLink>
            ))}
          </div>

          {/* Company column */}
          <div>
            <p
              className="mb-[14px] text-[10px] font-semibold uppercase text-gold"
              style={{ letterSpacing: "0.18em" }}
            >
              Company
            </p>
            {COMPANY.map((c) => (
              <FooterLink key={c.label} href={c.href}>
                {c.label}
              </FooterLink>
            ))}
            <FooterLink href="#employee" accent>
              Employee Portal
            </FooterLink>
          </div>

          {/* Contact column */}
          <div>
            <p
              className="mb-[14px] text-[10px] font-semibold uppercase text-gold"
              style={{ letterSpacing: "0.18em" }}
            >
              Contact
            </p>
            <FooterLink href={BUSINESS.phoneHref}>
              {BUSINESS.phoneDisplay}
            </FooterLink>
            <FooterLink href="#">Corpus Christi HQ</FooterLink>
            <FooterLink href="#">San Antonio</FooterLink>
            <FooterLink href="#">Alice · Weslaco</FooterLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 px-0 py-6 max-[768px]:flex-col max-[768px]:text-center">
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
    </footer>
  );
}

function FooterLink({
  href,
  children,
  accent = false,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      className={
        accent
          ? "mb-2 block text-[13px] font-medium text-gold transition-colors hover:text-gold-light"
          : "mb-2 block text-[13px] text-white/40 transition-colors hover:text-white/80"
      }
    >
      {children}
    </a>
  );
}
