/**
 * Business info for Scott Electric Group.
 * Single source of truth — update here to update site-wide.
 */
export const BUSINESS = {
  name: "Scott Electric Group",
  shortName: "Scott Electric",
  founder: "Chubb Scott",
  founded: 1920,
  phone: "+13618846326",
  phoneDisplay: "361-884-6326",
  phoneHref: "tel:+13618846326",
  locations: [
    { name: "Corpus Christi", isHQ: true },
    { name: "San Antonio", isHQ: false },
    { name: "Alice", isHQ: false },
    { name: "Weslaco", isHQ: false },
  ],
  // TODO: email / street address / hours not present in source HTML
} as const;
