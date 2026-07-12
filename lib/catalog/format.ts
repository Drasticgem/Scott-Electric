export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function colorFromString(value: string) {
  const palette = [
    "#5b4bda",
    "#2f80ed",
    "#1f9d72",
    "#f2994a",
    "#eb5757",
    "#9b51e0",
    "#00a3a3",
    "#b7791f",
  ];
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}
