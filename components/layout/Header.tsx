"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DISCVAULT } from "@/lib/constants";
import { Logo } from "./Logo";

/** Project-standard easing curve — matches Reveal component. */
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/catalog", label: "Catalog" },
  { href: "/#security", label: "Security" },
  { href: "/#contact", label: "Partner" },
] as const;

/**
 * Sticky top navigation — white, frosted-glass, Apple-style.
 *   - white background, 64px tall (60px <768, 56px <480)
 *   - desktop link row with animated accent underline on hover
 *   - "Browse Catalog" secondary + accent "Download App" primary CTA
 *   - hamburger → full-height mobile overlay on <768
 *   - adds a soft drop-shadow once scrollY > 40
 *   - Escape closes the mobile menu; body scroll is locked while open
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Primary"
        className={cn(
          "sticky top-0 z-[1000] flex items-center justify-between",
          "h-[64px] max-[768px]:h-[60px] max-[480px]:h-[56px]",
          "px-12 max-[768px]:px-5 max-[480px]:px-4",
          "transition-shadow duration-200",
          scrolled && "shadow-[0_2px_16px_rgba(0,0,0,0.06)]",
        )}
      >
        {/* Frosted-glass fill lives on an `absolute` child, not the
            `sticky` nav itself — Safari 26 samples the background-color
            of fixed/sticky elements near the viewport edge to tint its
            own status bar/toolbar (see #safari-chrome-tint in layout.tsx),
            and having a second translucent candidate here caused it to
            pick unpredictably between the two. `absolute` children are
            explicitly excluded from that algorithm, so this keeps the
            same visual look without competing with the dedicated swatch. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-paper/80 supports-[backdrop-filter]:bg-paper/70 backdrop-blur-md border-b border-border"
        />

        <a href="/" aria-label="DiscVault — home">
          <Logo size="md" />
        </a>

        {/* Desktop links */}
        <div className="flex items-center gap-8 max-[768px]:hidden">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA — App Store badge */}
        <div className="flex shrink-0 items-center gap-3 max-[768px]:hidden">
          <a
            href={DISCVAULT.appStoreUrl}
            className="inline-flex shrink-0 transition-transform duration-200 hover:-translate-y-px"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- official Apple badge asset, used unmodified per brand guidelines */}
            <img
              src="/badges/app-store-badge.svg"
              alt="Download on the App Store"
              width={114}
              height={38}
            />
          </a>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="hidden flex-col gap-[5px] p-1 max-[768px]:flex"
        >
          <motion.span
            className="block h-[2px] w-[22px] rounded-sm bg-ink origin-center"
            animate={menuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
          <motion.span
            className="block h-[2px] w-[22px] rounded-sm bg-ink"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.span
            className="block h-[2px] w-[22px] rounded-sm bg-ink origin-center"
            animate={menuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            className={cn(
              "fixed left-0 right-0 bottom-0 z-[999] flex flex-col overflow-y-auto bg-paper",
              "top-[64px] max-[768px]:top-[60px] max-[480px]:top-[56px]",
              "px-8 py-6 max-[480px]:px-5",
            )}
            initial={{ opacity: 0, y: "-3%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-3%" }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ willChange: "transform, opacity" }}
          >
            {LINKS.map((link) => (
              <MobileLink
                key={link.href}
                href={link.href}
                onNavigate={() => setMenuOpen(false)}
              >
                {link.label}
              </MobileLink>
            ))}
            <a
              href={DISCVAULT.appStoreUrl}
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex w-full justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- official Apple badge asset, used unmodified per brand guidelines */}
              <img
                src="/badges/app-store-badge.svg"
                alt="Download on the App Store"
                width={161}
                height={54}
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop nav link with animated underline ── */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative py-1 text-[13px] font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-[2px] left-0 h-[1.5px] w-0 bg-accent transition-[width] duration-[250ms] group-hover:w-full"
        style={{
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </a>
  );
}

/* ── Mobile link row ── */
function MobileLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="block border-b border-border py-4 text-[18px] font-medium text-ink-soft transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}
