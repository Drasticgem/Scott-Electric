/**
 * Four divisions of Scott Electric Group.
 * Used by both the Divisions section (dark navy cards right below hero)
 * and the Services grid (light cards). Single source of truth.
 */
export type DivisionAccent = "gold" | "ac-blue" | "tele-green" | "ck-terra";

export interface Division {
  slug: string;
  name: string;
  /** Short tagline used inside hero/division cards. */
  tagline: string;
  /** Longer one-sentence description for the services grid. */
  description: string;
  /** Small pill label on the right side of the dark division card. */
  badge: string;
  /** Link label on the services grid card. */
  exploreLabel: string;
  /** Semantic accent token — matches a color in the theme. */
  accent: DivisionAccent;
}

export const DIVISIONS: Division[] = [
  {
    slug: "electric",
    name: "Scott Electric",
    tagline: "Industrial, commercial & residential",
    description:
      "Industrial, commercial, and residential electrical — from DCS and solar to knob-and-tube replacement. Licensed, bonded, insured.",
    badge: "Since 1920",
    exploreLabel: "Explore electrical",
    accent: "gold",
  },
  {
    slug: "ac-heating",
    name: "Scott A/C & Heating",
    tagline: "Installation, service & fabrication",
    description:
      "Full-service HVAC — installation, maintenance, repair, and custom fabrication for all major brands. Residential and commercial.",
    badge: "All brands",
    exploreLabel: "Explore HVAC",
    accent: "ac-blue",
  },
  {
    slug: "telecom",
    name: "Scott Telecom",
    tagline: "Fiber, phone & security systems",
    description:
      "Fiber optic, structured cabling, phone systems, security & surveillance. Wired and wireless solutions for any facility.",
    badge: "Wired & wireless",
    exploreLabel: "Explore telecom",
    accent: "tele-green",
  },
  {
    slug: "coastal-kitchens",
    name: "Coastal Kitchens",
    tagline: "Custom woodwork & cabinetry",
    description:
      "Highest quality custom woodwork for homes and businesses. Remodels, new construction, furniture, and full kitchen builds.",
    badge: "Custom builds",
    exploreLabel: "Explore kitchens",
    accent: "ck-terra",
  },
];
