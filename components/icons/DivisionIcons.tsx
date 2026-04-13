/**
 * Division icons — lifted verbatim from the legacy index.html so the
 * visual design is pixel-identical. These are plain SVG components;
 * pass size + strokeColor / fillColor as needed.
 */

type IconProps = {
  size?: number;
  className?: string;
};

/** Lightning bolt — Scott Electric. Gold fill on navy, navy fill on gold. */
export function BoltIcon({
  size = 18,
  fill = "#0F2040",
  className,
}: IconProps & { fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <polygon
        points="26,4 36,16 32,16 42,30 28,30 34,44 14,24 24,24 18,12 28,12"
        fill={fill}
      />
    </svg>
  );
}

/** Hybrid snowflake-flame — Scott A/C & Heating.
    Strokes take a color arg so the services card can use blue strokes
    instead of the navy strokes shown inside the hero card. */
export function SnowflakeFlameIcon({
  size = 20,
  stroke = "#0F2040",
  flameColor = "#FF8C42",
  flameOpacity = 0.65,
  bulbFill,
  bulbOpacity = 0.8,
  className,
}: IconProps & {
  stroke?: string;
  flameColor?: string;
  flameOpacity?: number;
  bulbFill?: string;
  bulbOpacity?: number;
}) {
  const bulb = bulbFill ?? stroke;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Flame bulb (outer + inner) */}
      <path
        d="M12 3.5C12 3.5 8.5 7.5 8.5 10.8C8.5 13 10 14.8 12 15.2C14 14.8 15.5 13 15.5 10.8C15.5 7.5 12 3.5 12 3.5Z"
        fill={bulb}
        opacity={bulbOpacity}
      />
      <path
        d="M12 6.5C12 6.5 10.8 8.5 10.8 10C10.8 11 11.3 11.8 12 12C12.7 11.8 13.2 11 13.2 10C13.2 8.5 12 6.5 12 6.5Z"
        fill={flameColor}
        opacity={flameOpacity}
      />
      {/* Snowflake arms */}
      <line x1="12" y1="0.5" x2="12" y2="4.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.5" y1="1.8" x2="12" y2="3.2" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="13.5" y1="1.8" x2="12" y2="3.2" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="4.5" y1="8.5" x2="8" y2="10.2" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="5" y1="7" x2="6.5" y2="8.8" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="19.5" y1="8.5" x2="16" y2="10.2" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="19" y1="7" x2="17.5" y2="8.8" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="5.5" y1="18.5" x2="9" y2="15" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18.5" y1="18.5" x2="15" y2="15" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="12" y1="15.5" x2="12" y2="23" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.5" y1="21.5" x2="12" y2="20" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="13.5" y1="21.5" x2="12" y2="20" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

/** Phone receiver + console — Scott Telecom. */
export function TelecomIcon({
  size = 18,
  stroke = "#0F2040",
  className,
}: IconProps & { stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

/** House outline — Coastal Kitchens. */
export function HouseIcon({
  size = 18,
  stroke = "#0F2040",
  className,
}: IconProps & { stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/** Services-card variant of the A/C icon — uses blue strokes + slightly
    different opacities (matches the second SVG in the legacy services grid). */
export function ServicesAcIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5C12 3.5 9 7 9 10.2C9 12.2 10.3 13.8 12 14.2C13.7 13.8 15 12.2 15 10.2C15 7 12 3.5 12 3.5Z"
        fill="#4AA8C8"
        opacity="0.85"
      />
      <path
        d="M12 6C12 6 11 8 11 9.5C11 10.5 11.5 11.2 12 11.4C12.5 11.2 13 10.5 13 9.5C13 8 12 6 12 6Z"
        fill="#FF8C42"
        opacity="0.55"
      />
      <line x1="12" y1="1" x2="12" y2="5" stroke="#4AA8C8" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.8" y1="2.2" x2="12" y2="3.8" stroke="#4AA8C8" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="13.2" y1="2.2" x2="12" y2="3.8" stroke="#4AA8C8" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="5" y1="9" x2="8.5" y2="10.5" stroke="#4AA8C8" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="5.5" y1="7.5" x2="7" y2="9.2" stroke="#4AA8C8" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="19" y1="9" x2="15.5" y2="10.5" stroke="#4AA8C8" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18.5" y1="7.5" x2="17" y2="9.2" stroke="#4AA8C8" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="6" y1="18" x2="9" y2="14.5" stroke="#4AA8C8" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18" y1="18" x2="15" y2="14.5" stroke="#4AA8C8" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="12" y1="14.5" x2="12" y2="23" stroke="#4AA8C8" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.8" y1="21.5" x2="12" y2="20" stroke="#4AA8C8" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="13.2" y1="21.5" x2="12" y2="20" stroke="#4AA8C8" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/** Industrial skyline silhouette — hero background decoration. */
export function IndustrialSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="xMidYMax slice"
      fill="#D4A83A"
      aria-hidden="true"
      className={className}
    >
      <path d="M0,260 L0,200 L45,200 L45,160 L55,120 L65,160 L75,200 L120,200 L120,150 L135,110 L140,75 L145,110 L155,150 L200,150 L200,185 L250,185 L250,140 L265,95 L270,55 L275,95 L285,140 L330,140 L330,180 L380,180 L380,155 L395,120 L400,85 L405,120 L415,155 L460,155 L460,190 L510,190 L510,165 L530,125 L535,90 L540,125 L555,165 L600,165 L600,195 L650,195 L650,170 L665,135 L670,100 L675,135 L685,170 L730,170 L730,195 L780,195 L780,175 L800,140 L805,105 L810,140 L825,175 L870,175 L870,200 L920,200 L920,180 L935,145 L940,110 L945,145 L960,180 L1010,180 L1010,200 L1060,200 L1060,175 L1080,135 L1085,95 L1090,135 L1105,175 L1150,175 L1150,195 L1200,195 L1200,180 L1220,150 L1225,115 L1230,150 L1245,180 L1290,180 L1290,200 L1340,200 L1340,190 L1360,160 L1365,130 L1370,160 L1385,190 L1440,190 L1440,260Z" />
    </svg>
  );
}
