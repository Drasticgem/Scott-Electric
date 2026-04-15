"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#careers", label: "Careers" },
] as const;

const EMPLOYEE_LINK = { href: "#employee", label: "Employee" } as const;

/**
 * Sticky top navigation.
 *
 * Mirrors the legacy nav:
 *   - navy background, 64px tall (60px <768, 56px <480)
 *   - desktop link row (About / Services / Projects / Careers · Employee)
 *     with animated gold underline on hover
 *   - gold "Get a Free Estimate" CTA
 *   - hamburger → full-height mobile overlay on <768
 *   - adds a soft drop-shadow once scrollY > 40 (matches main.js)
 *   - Escape closes the mobile menu; body scroll is locked while open
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll state — `scrolled` drives the drop-shadow (matches legacy >40
  // threshold), `hasScrolled` drives the frosted-glass effect and kicks in
  // as soon as any scroll has happened. Separate thresholds so the glass
  // fades in immediately (when there's actually hero content behind the
  // nav to blur) while preserving the original shadow timing.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHasScrolled(y > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + Escape key — matches initMobileMenu() in legacy main.js
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
          // Solid navy at rest — the <body> background is offwhite, so any
          // transparency at scroll 0 bleeds through as a pale blue-gray.
          // Once the hero scrolls behind the sticky nav, fade in the
          // frosted-glass look (navy/75 matches the credential cards in
          // WhyScottElectric).
          "bg-navy border-b border-white/10",
          "transition-[background-color,backdrop-filter,box-shadow] duration-200",
          hasScrolled &&
            "supports-[backdrop-filter]:bg-navy/75 backdrop-blur-md",
          scrolled && "shadow-[0_2px_16px_rgba(15,32,64,0.25)]",
        )}
      >
        <a href="#" aria-label="Scott Electric Group — home">
          <Logo size="md" />
        </a>

        {/* Desktop links */}
        <div className="flex items-center gap-8 max-[768px]:hidden">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <span
            aria-hidden="true"
            className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/15"
          />
          <NavLink href={EMPLOYEE_LINK.href} variant="employee">
            {EMPLOYEE_LINK.label}
          </NavLink>
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className={cn(
            "shrink-0 rounded-[6px] bg-gold px-6 py-[10px]",
            "text-[13px] font-bold text-navy",
            "transition-[background,transform] duration-200",
            "hover:-translate-y-px hover:bg-gold-light",
            "max-[768px]:hidden",
          )}
          style={{ letterSpacing: "0.04em" }}
        >
          Get a Free Estimate
        </a>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="hidden flex-col gap-[5px] p-1 max-[768px]:flex"
        >
          <span
            className={cn(
              "block h-[2px] w-[22px] rounded-sm bg-white",
              "origin-center transition-transform duration-300",
              menuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-[22px] rounded-sm bg-white",
              "transition-opacity duration-300",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-[22px] rounded-sm bg-white",
              "origin-center transition-transform duration-300",
              menuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed left-0 right-0 bottom-0 z-[999] flex-col overflow-y-auto bg-navy",
          "top-[64px] max-[768px]:top-[60px] max-[480px]:top-[56px]",
          "px-8 py-6 max-[480px]:px-5",
          menuOpen ? "flex" : "hidden",
        )}
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
        <MobileLink
          href={EMPLOYEE_LINK.href}
          variant="employee"
          onNavigate={() => setMenuOpen(false)}
        >
          Employee Portal
        </MobileLink>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-6 block w-full rounded-[6px] bg-gold px-6 py-4 text-center text-[15px] font-bold text-navy"
        >
          Get a Free Estimate
        </a>
      </div>
    </>
  );
}

/* ── Desktop nav link with animated underline ── */
function NavLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "employee";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative py-1 text-[13px] transition-colors duration-200",
        variant === "default" && "font-normal text-white hover:text-gold-light",
        variant === "employee" &&
          "font-medium text-gold hover:text-gold-light",
      )}
      style={{ letterSpacing: "0.03em" }}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-[2px] left-0 h-[1.5px] w-0 transition-[width] duration-[250ms]",
          "group-hover:w-full",
          variant === "default" && "bg-gold",
          variant === "employee" && "bg-gold-light",
        )}
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
  variant = "default",
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "employee";
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={cn(
        "block border-b border-white/[0.06] py-4 text-[18px] transition-colors",
        variant === "default" && "font-normal text-white hover:text-gold-light",
        variant === "employee" && "font-medium text-gold",
      )}
    >
      {children}
    </a>
  );
}
