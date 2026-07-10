/**
 * Product info for DiscVault.
 * Single source of truth — update here to update site-wide.
 */
export const DISCVAULT = {
  name: "DiscVault",
  tagline: "Your collection matters.",
  // Must be a domain verified in Resend before contact-form emails can send.
  emailDomain: "discvault.app",
  email: "hello@discvault.app",
  emailHref: "mailto:hello@discvault.app",
  supportEmail: "support@discvault.app",
  supportEmailHref: "mailto:support@discvault.app",
  // TODO: replace with the live App Store link at launch
  appStoreUrl: "#download",
  socials: {
    instagram: "https://instagram.com/discvaultapp",
    twitter: "https://x.com/discvaultapp",
  },
} as const;
