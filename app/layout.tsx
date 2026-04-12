import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scott Electric Group — Powering South Texas Since 1920",
  description:
    "Scott Electric Group — Electrical, A/C, Telecom & Custom Woodworking for South Texas since 1920. Industrial, commercial, and residential services from Corpus Christi to San Antonio.",
  openGraph: {
    title: "Scott Electric Group — Powering South Texas Since 1920",
    description:
      "Electrical, A/C, Telecom & Custom Woodworking. Four divisions, one standard. Serving South Texas for over a century.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scott Electric Group — Powering South Texas Since 1920",
    description:
      "Electrical, A/C, Telecom & Custom Woodworking. Four divisions, one standard.",
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
          Google Fonts loaded at runtime via <link> — the build environment
          cannot reach fonts.googleapis.com for next/font/google's build-time
          fetch, and the legacy static site already used this pattern.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
