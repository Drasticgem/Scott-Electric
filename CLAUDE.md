# CLAUDE.md — Local Business Website Builder

You are helping build conversion-focused websites for local businesses and companies. Sites range from simple 3-page brochures to complex multi-page builds with service directories, team pages, blogs, location pages, and more — scope depends on the client's needs. The operator is a beginner developer who understands code logic but relies on you to write it. Prioritize speed to ship, clean code, and high conversion design. Always explain what you're doing and why.

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
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind v4 imports + shadcn theme variables
│   ├── actions/            # Server Actions (form submissions, email sending)
│   │   └── contact.ts
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx        # Services overview/listing
│   │   └── [slug]/         # Dynamic route for individual service pages
│   │       └── page.tsx
│   ├── team/               # Optional: team/staff directory
│   │   └── page.tsx
│   ├── gallery/            # Optional: portfolio/project showcase
│   │   └── page.tsx
│   ├── blog/               # Optional: blog/news
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── locations/          # Optional: multi-location businesses
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, Card, Input, etc.)
│   ├── sections/           # Reusable page sections (Hero, Services, Testimonials, CTA, etc.)
│   ├── forms/              # ContactForm, BookingEmbed, etc.
│   └── layout/             # Header, Footer, MobileNav, Sidebar
├── lib/
│   ├── utils.ts            # cn() helper and shared utilities
│   ├── constants.ts        # Business info: name, phone, address, hours, socials
│   └── data/               # Hardcoded content arrays (services list, team members, FAQs, blog posts)
│       ├── services.ts
│       ├── team.ts
│       └── faqs.ts
├── public/
│   ├── images/             # Optimized client images, logo, hero photos
│   └── favicon.ico
└── .env.local              # RESEND_API_KEY, business email, etc.
```

**Scaling rule:** Not every project uses every folder. Start with only what the client needs. A simple site might only have `app/page.tsx`, `app/contact/page.tsx`, and `app/layout.tsx`. Add pages and `lib/data/` files as scope grows. Never scaffold empty pages "just in case."

**Dynamic routes:** When a client has multiple services, team members, locations, or blog posts, use dynamic `[slug]` routes with a shared template. Define the content as typed arrays in `lib/data/` and generate pages from them using `generateStaticParams`. This means adding a new service is just adding an object to an array — no new files needed.

## Critical Rules

IMPORTANT: Follow these every time.

- **TypeScript always.** No `any` types. Use interfaces for all data shapes.
- **Server Components by default.** Only add `"use client"` when the component needs interactivity (forms, animations, mobile nav toggles).
- **All images use `next/image`** with explicit `width`, `height`, and `alt` text. Use `priority` on above-the-fold hero images.
- **Mobile-first responsive design.** Style for mobile first, then `md:` and `lg:` breakpoints. Test at 375px, 768px, and 1280px widths mentally.
- **Never hardcode business info inline.** Import from `lib/constants.ts` so updating client details is a single-file change.
- **Accessibility matters.** Semantic HTML (`<main>`, `<nav>`, `<section>`, `<footer>`), proper heading hierarchy (one `h1` per page), focus-visible styles on interactive elements, `aria-label` on icon-only buttons.


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

These are the building blocks. Mix and match based on what the client needs — a simple site uses 4-5 of these on one page, a complex site spreads them across dedicated pages.

### Homepage Flow (always follows this order for sections that appear)

1. **Header/Nav** — Logo left, nav links center/right, prominent CTA button (phone number or "Book Now"). Sticky on scroll. Mobile hamburger menu. Nav links adapt to however many pages the site has.
2. **Hero** — Large headline (benefit-driven, not feature-driven), subheadline, primary CTA button, secondary CTA (e.g., "Call Now"), hero image or background. MUST be above the fold.
3. **Social Proof Bar** — Logos, star ratings, review count, "Trusted by X+ customers" — immediately after hero to build trust.
4. **Services Overview** — Card grid linking to individual service pages (if multi-page) or detailed sections (if single-page). Each service gets an icon, title, short description.
5. **About/Why Choose Us** — Differentiators, years in business, credentials. Can be a homepage section or its own `/about` page.
6. **Testimonials** — Real quotes with names and photos. Carousel or grid. Star ratings if available.
7. **Process/How It Works** — Numbered steps (usually 3). Reduces friction by showing simplicity.
8. **Gallery/Portfolio** — Before/after photos, project showcases. Can be homepage section or dedicated `/gallery` page.
9. **FAQ** — Accordion pattern using shadcn Accordion. Targets long-tail SEO keywords. Can live on homepage, contact page, or individual service pages.
10. **Final CTA** — Strong closing section. Repeat the primary action. Phone number, booking embed, or contact form.
11. **Footer** — Business name, address, phone, email, hours, social links, Google Maps embed, copyright. Consistent across all pages via `layout.tsx`.

### Interior Page Patterns

- **Service detail pages** (`/services/[slug]`): Hero with service name → description → benefits → process → related gallery → CTA → FAQ specific to that service.
- **About page**: Company story → team grid (photo + name + role) → values/mission → credentials/certifications → CTA.
- **Contact page**: Contact form + phone/email/address + Google Maps embed + business hours. Keep it simple.
- **Blog/News pages**: Card grid listing → individual post pages with structured content, author, date, and related posts.
- **Location pages** (`/locations/[slug]`): For multi-location businesses. Each gets its own hero, address, hours, team, and embedded map.

## CTA & Conversion Rules

- EVERY screen height should have at least one visible call-to-action.
- Primary CTA color must contrast sharply with the page background. Use the brand's accent color.
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

## Booking Integration

Embed Cal.com or Calendly as an iframe or their React component. Wrap in a section with a heading like "Schedule Your Free Consultation." Keep the embed responsive. Add `loading="lazy"` to iframes.

## Chat Widget

Add Tawk.to or Crisp via a `<Script>` tag in `app/layout.tsx` using `next/script` with `strategy="lazyOnload"` so it doesn't block page load.

## Performance Requirements

These are non-negotiable for SEO and conversions:

- **Lighthouse score target: 90+ on all four categories** (Performance, Accessibility, Best Practices, SEO).
- Lazy-load everything below the fold (images, embeds, chat widget).
- Keep JavaScript bundle small: no unnecessary client components.
- Add `loading="lazy"` to iframes (maps, booking embeds).

## SEO & Metadata

Every page must have its own `metadata` export or `generateMetadata`:

- `title`: "[Page Topic] | [Business Name] — [City, State]"
- `description`: 150-160 chars, include primary keyword and city name. Unique per page — never duplicate descriptions.
- `openGraph`: title, description, image (1200x630), url, type: "website"
- `twitter`: card: "summary_large_image", same title/desc/image

For dynamic routes (`/services/[slug]`), use `generateMetadata` to create unique titles and descriptions per service/post/location.

Add to `app/layout.tsx`:
- Viewport meta is handled by Next.js `viewport` export.
- Add JSON-LD structured data for `LocalBusiness` schema (name, address, phone, hours, geo coordinates, aggregateRating if available).
- For multi-location businesses, each location page gets its own `LocalBusiness` JSON-LD.
- Service pages can include `Service` schema markup.
- Blog posts should use `Article` schema markup.

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

## Content Data Pattern (for dynamic pages)

```typescript
// lib/data/services.ts
export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // Lucide icon name
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "drain-cleaning",
    title: "Drain Cleaning",
    description: "Fast, professional drain clearing.",
    longDescription: "Full paragraph for the service detail page...",
    icon: "Wrench",
    image: "/images/services/drain-cleaning.webp",
    features: ["24/7 availability", "No hidden fees", "Licensed technicians"],
  },
  // Add more services as objects — each one auto-generates a page
];
```

Adding a new service page = adding a new object to this array. No new files, no new routes, no new components.

## Lessons Learned

<!-- Add mistakes Claude makes here so they don't repeat. Format: what went wrong → what to do instead. -->
