/**
 * BandGate aperture mark — six blades (one per agent) form a gate that
 * opens at the center. Uses `currentColor`, so set color via CSS where used.
 */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      role="img"
      aria-label="BandGate"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M57.94 33.81 L46.54 53.55 L33.87 40.8 L40.09 35.95 Z" />
      <path d="M43.4 55.37 L20.6 55.37 L25.31 38.02 L32.63 40.98 Z" />
      <path d="M17.46 53.55 L6.06 33.81 L23.44 29.22 L24.54 37.03 Z" />
      <path d="M6.06 30.19 L17.46 10.45 L30.13 23.2 L23.91 28.05 Z" />
      <path d="M20.6 8.63 L43.4 8.63 L38.69 25.98 L31.37 23.02 Z" />
      <path d="M46.54 10.45 L57.94 30.19 L40.56 34.78 L39.46 26.97 Z" />
    </svg>
  );
}
