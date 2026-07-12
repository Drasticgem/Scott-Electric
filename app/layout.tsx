import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// Chat widget disabled for now — not deleted, may come back later.
// import { ChatWidget } from "@/components/chat/ChatWidget";
import "./globals.css";

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DiscVault",
  applicationCategory: "SportsApplication",
  operatingSystem: "iOS",
  description:
    "DiscVault helps disc golfers catalog discs, build smarter bags, track rounds, and discover what to throw next.",
};

export const metadata: Metadata = {
  title: "DiscVault — Your Disc Collection, Finally Organized",
  description:
    "DiscVault is a disc golf app that helps you catalog your discs, build smarter bags, track rounds, and discover new molds. Browse the public disc catalog — no sign-in required.",
  openGraph: {
    title: "DiscVault — Your Disc Collection, Finally Organized",
    description:
      "Catalog discs, build smarter bags, track rounds, and discover what to throw next. Browse the public disc catalog — no sign-in required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiscVault — Your Disc Collection, Finally Organized",
    description:
      "Catalog discs, build smarter bags, track rounds, and discover what to throw next.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Still honored by Chrome/Android and pre-26 Safari, so kept — but
  // Safari 26 (current as of this build) ignores theme-color entirely
  // and derives its status bar / toolbar tint by sampling background
  // colors instead. See the comment on #safari-chrome-tint below for
  // how that's handled.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  // Required for Safari to extend its chrome-tinting/safe-area handling
  // under the status bar at all (see #safari-chrome-tint).
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Strip any #hash from the URL before hydration — but only for
          external/direct loads (bookmark, shared link, typed URL). A
          bookmarked "#security" link landing mid-page with no context read
          as broken, so those should land on the hero instead. Same-origin
          referrers are real in-app navigation (e.g. a header/footer link on
          /catalog pointing at "/#why") and must keep the hash so the browser
          actually scrolls to the section — that's the whole point of the
          link. This only runs once on initial document parse.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `try{if(window.location.hash){var r=document.referrer,sameOrigin=r&&new URL(r).origin===window.location.origin;if(!sameOrigin){history.replaceState(null,"",window.location.pathname+window.location.search);}}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd),
          }}
        />
      </head>
      <body>
        {/* Safari 26 dropped theme-color support and instead colors its
            status bar / toolbar by sampling the background-color of a
            fixed or sticky element pinned at the viewport edge — solid
            colors only; our actual header is intentionally translucent
            (frosted-glass blur), which Safari reported reads as an
            unpredictable/inconsistent tint. This element exists purely
            to give Safari something solid and correctly-themed to read;
            it's fully hidden behind the real header (lower z-index, same
            top offset) and never visible or interactive itself. */}
        <div
          id="safari-chrome-tint"
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-3 bg-paper"
        />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* <ChatWidget /> */}
        <Analytics />
      </body>
    </html>
  );
}
