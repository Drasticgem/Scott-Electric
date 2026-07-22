/**
 * Product info for DiscVault.
 * Single source of truth — update here to update site-wide.
 */
export const DISCVAULT = {
  name: "DiscVault",
  tagline: "Your collection matters.",
  // The domain actually owned (see email comment below) — used as the
  // canonical origin for metadataBase, sitemap.xml, and robots.txt.
  siteUrl: "https://discvault.site",
  // The one real mailbox (Microsoft 365) used for both sending and
  // receiving — discvault.site is the domain actually owned; discvault.app
  // was never registered, so nothing on the site should reference it.
  email: "discvault.app@discvault.site",
  emailHref: "mailto:discvault.app@discvault.site",
  supportEmail: "discvault.app@discvault.site",
  supportEmailHref: "mailto:discvault.app@discvault.site",
  // Legal operator of record, for Privacy Policy / Terms of Service.
  legalOperator: "Timothy Barnes",
  // TODO: replace with the live App Store link at launch
  appStoreUrl: "#download",
  socials: {
    instagram: "https://instagram.com/discvaultapp",
    twitter: "https://x.com/discvaultapp",
  },
} as const;
