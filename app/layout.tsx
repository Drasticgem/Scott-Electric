import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scott Electric Group",
  description: "Powering South Texas since 1920.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
