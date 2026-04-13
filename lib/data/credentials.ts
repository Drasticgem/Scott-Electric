/**
 * Trust / safety credentials.
 * Shared between the hero trust row and the About section badges.
 */
export interface Credential {
  value: string;
  /** Display the value slightly smaller (used for multi-line "OSHA Star"). */
  smallValue?: boolean;
  title: string;
  sub: string;
  /** Short label for the hero trust row pill. */
  shortLabel: string;
}

export const CREDENTIALS: Credential[] = [
  {
    value: ".46",
    title: "Experience Modification Rate",
    sub: "Industry-leading safety record",
    shortLabel: "EMR .46",
  },
  {
    value: "OSHA\nStar",
    smallValue: true,
    title: "VPP Certified Worksite",
    sub: "Valero Corpus Christi & Three Rivers",
    shortLabel: "OSHA VPP Star",
  },
  {
    value: "4",
    title: "Corpus Christi, SA, Alice, Weslaco",
    sub: "Serving all of South Texas",
    shortLabel: "4 Regional Offices",
  },
];
