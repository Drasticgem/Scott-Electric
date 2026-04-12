# CLAUDE.md — Local Business Website Builder

You are helping build conversion-focused websites for local businesses. The operator is a beginner developer who understands code logic but relies on you to write it. Prioritize speed to ship, clean code, and high conversion design. Always explain what you're doing and why.

## Tech Stack (DO NOT deviate)

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config, no tailwind.config.js)
- **Components**: shadcn/ui (new-york style, OKLCH colors, Tailwind v4 mode)
- **Animations**: Framer Motion for scroll reveals, hover effects, and page transitions
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation + Next.js Server Actions
- **Email**: Resend for transactional email delivery
- **Fonts**: Next.js `next/font/google` — always pick distinctive, conversion-appropriate fonts. NEVER use Inter, Roboto, or Arial.
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Package manager**: pnpm

## Project Structure

```
project-root/
├── CLAUDE.md
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, analytics, chat widget script
│   ├── page.tsx            # Homepage (usually single-page with sections)
│   ├── globals.css         # Tailwind v4 imports + shadcn theme variables
│   ├── actions/            # Server Actions (form submissions, email sending)
│   │   └── contact.ts
│   └── [additional-pages]/ # Only if multi-page (e.g., /about, /services)
│       └── page.tsx
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, Card, Input, etc.)
│   ├── sections/           # Page sections (Hero, Services, Testimonials, CTA, etc.)
│   ├── forms/              # ContactForm, BookingEmbed, etc.
│   └── layout/             # Header, Footer, MobileNav
├── lib/
│   ├── utils.ts            # cn() helper and shared utilities
│   └── constants.ts        # Business info: name, phone, address, hours, socials
├── public/
│   ├── images/             # Optimized client images, logo, hero photos
│   └── favicon.ico
└── .env.local              # RESEND_API_KEY, business email, etc.
```

## Critical Rules

IMPORTANT: Follow these every time.

- **TypeScript always.** No `any` types. Use interfaces for all data shapes.
- **Server Components by default.** Only add `"use client"` when the component needs interactivity (forms, animations, mobile nav toggles).
- **All images use `next/image`** with explicit `width`, `height`, and `alt` text. Use `priority` on above-the-fold hero images.
- **Mobile-first responsive design.** Style for mobile first, then `md:` and `lg:` breakpoints. Test at 375px, 768px, and 1280px widths mentally.
- **Never hardcode business info inline.** Import from `lib/constants.ts` so updating client details is a single-file change.
- **Accessibility matters.** Semantic HTML (`<main>`, `<nav>`, `<section>`, `<footer>`), proper heading hierarchy (one `h1` per page), focus-visible styles on interactive elements, `aria-label` on icon-only buttons.
- **No `console.log` in production code.** Remove all debug logs before committing.
- **Commit per feature/section**, not one giant commit. Messages should be descriptive: "Add hero section with CTA" not "update".

## Tailwind v4 Configuration

The `globals.css` file IS the Tailwind config. No `tailwind.config.js` file exists.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Map shadcn CSS variables to Tailwind theme */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... all shadcn color mappings */
}
```

IMPORTANT: When adding shadcn components, use `npx shadcn@latest add <component>`. This auto-handles Tailwind v4 compatibility.

## Conversion-Focused Section Patterns

Every page follows a conversion flow. Sections appear in this order unless the client's business demands otherwise:

1. **Header/Nav** — Logo left, nav links center/right, prominent CTA button (phone number or "Book Now"). Sticky on scroll. Mobile hamburger menu.
2. **Hero** — Large headline (benefit-driven, not feature-driven), subheadline, primary CTA button, secondary CTA (e.g., "Call Now"), hero image or background. MUST be above the fold.
3. **Social Proof Bar** — Logos, star ratings, review count, "Trusted by X+ customers" — immediately after hero to build trust.
4. **Services/What We Do** — Card grid or alternating image+text rows. Each service gets an icon, title, short description.
5. **About/Why Choose Us** — Differentiators, years in business, team photo, credentials.
6. **Testimonials** — Real quotes with names and photos. Carousel or grid. Star ratings if available.
7. **Process/How It Works** — Numbered steps (usually 3). Reduces friction by showing simplicity.
8. **Gallery/Portfolio** — Before/after photos, project showcases. Use `next/image` with blur placeholder.
9. **FAQ** — Accordion pattern using shadcn Accordion. Targets long-tail SEO keywords.
10. **Final CTA** — Strong closing section. Repeat the primary action. Phone number, booking embed, or contact form.
11. **Footer** — Business name, address, phone, email, hours, social links, Google Maps embed, copyright.

## CTA & Conversion Rules

- EVERY screen height should have at least one visible call-to-action.
- Primary CTA color must contrast sharply with the page background. Use the brand's accent color.
- Phone numbers are always `<a href="tel:+1XXXXXXXXXX">` links (clickable on mobile).
- Emails are always `<a href="mailto:...">` links.
- Addresses link to Google Maps: `<a href="https://maps.google.com/?q=..." target="_blank" rel="noopener noreferrer">`.
- "Book Now" buttons should scroll to the booking section or open a Cal.com/Calendly modal.
- Use `framer-motion` for subtle CTA animations (gentle pulse, slight scale on hover) to draw attention without being annoying.

## Contact Form Implementation

```
User fills form → Server Action validates with Zod → Resend sends email to client → User sees success toast
```

- Use React Hook Form with zodResolver for client-side validation.
- Server Action in `app/actions/contact.ts` handles submission.
- Required fields: Name, Phone, Email, Message. Optional: Service type dropdown.
- Show loading state on submit button (spinner + "Sending...").
- Success: Show a toast (use shadcn/ui Sonner) saying "We'll get back to you within 24 hours!"
- Error: Show toast with "Something went wrong. Please call us at [phone]."
- NEVER expose API keys client-side. Resend key stays in `.env.local` and is only used in Server Actions.

## Booking Integration

Embed Cal.com or Calendly as an iframe or their React component. Wrap in a section with a heading like "Schedule Your Free Consultation." Keep the embed responsive. Add `loading="lazy"` to iframes.

## Chat Widget

Add Tawk.to or Crisp via a `<Script>` tag in `app/layout.tsx` using `next/script` with `strategy="lazyOnload"` so it doesn't block page load.

## Performance Requirements

These are non-negotiable for SEO and conversions:

- **Lighthouse score target: 90+ on all four categories** (Performance, Accessibility, Best Practices, SEO).
- Use `next/image` for ALL images. Never use raw `<img>` tags.
- Lazy-load everything below the fold (images, embeds, chat widget).
- Keep JavaScript bundle small: no unnecessary client components.
- Add `loading="lazy"` to iframes (maps, booking embeds).
- Fonts: use `next/font/google` with `display: "swap"` and preload the primary font.

## SEO & Metadata

Every page must have in its `metadata` export or `generateMetadata`:

- `title`: "[Business Name] | [Service] in [City, State]"
- `description`: 150-160 chars, include primary keyword and city name.
- `openGraph`: title, description, image (1200x630), url, type: "website"
- `twitter`: card: "summary_large_image", same title/desc/image

Add to `app/layout.tsx`:
- Viewport meta is handled by Next.js `viewport` export.
- Add JSON-LD structured data for `LocalBusiness` schema (name, address, phone, hours, geo coordinates, aggregateRating if available).

## Design Approach

IMPORTANT: No two client sites should look the same. For each project:

1. Choose a distinctive font pairing from Google Fonts that matches the business personality. A plumber gets something different than a law firm.
2. Derive a color palette from the client's logo/brand. Define as CSS variables in globals.css.
3. Use generous whitespace. Sections should breathe.
4. Subtle Framer Motion animations: fade-in-up on scroll for sections (use `whileInView`), hover scale on cards and buttons. Keep durations 0.3-0.6s. Stagger children.
5. Add depth: subtle shadows, layered elements, background textures or gradients where appropriate.
6. NEVER produce generic-looking sites. Each should feel custom-designed for that specific business.

## Common Commands

```bash
# Create new project
pnpm create next-app@latest project-name --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Install core dependencies
pnpm add framer-motion react-hook-form @hookform/resolvers zod resend
pnpm add -D @types/node

# Add shadcn/ui (run from project root)
npx shadcn@latest init
npx shadcn@latest add button card input textarea accordion dialog sheet sonner

# Dev server
pnpm dev

# Production build (run before deploying to catch errors)
pnpm build

# Type check
npx tsc --noEmit
```

## Business Info Constants Pattern

```typescript
// lib/constants.ts
export const BUSINESS = {
  name: "Client Business Name",
  phone: "+15551234567",
  phoneDisplay: "(555) 123-4567",
  email: "info@clientbusiness.com",
  address: {
    street: "123 Main St",
    city: "Austin",
    state: "TX",
    zip: "78701",
    full: "123 Main St, Austin, TX 78701",
  },
  hours: {
    weekdays: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Closed",
  },
  socials: {
    facebook: "https://facebook.com/clientbusiness",
    instagram: "https://instagram.com/clientbusiness",
    google: "https://g.page/clientbusiness",
  },
  booking: "https://cal.com/clientbusiness",
} as const;
```

## Lessons Learned

<!-- Add mistakes Claude makes here so they don't repeat. Format: what went wrong → what to do instead. -->

## Quick Reference

| Task | Command |
|---|---|
| New shadcn component | `npx shadcn@latest add [name]` |
| Dev server | `pnpm dev` |
| Build check | `pnpm build` |
| Type check | `npx tsc --noEmit` |
| Deploy | Push to `main` branch → Vercel auto-deploys |
