import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
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
          Strip any #hash from the URL before hydration so reloading on
          a deep-linked section (e.g. #services) doesn't trigger the
          browser's native anchor auto-scroll. We always want full page
          loads of "/" to land on the hero. In-page link clicks still
          work — this only runs once on initial document parse.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `try{if(window.location.hash){history.replaceState(null,"",window.location.pathname+window.location.search);}}catch(e){}`,
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
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
