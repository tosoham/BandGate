import type { CSSProperties, ReactElement } from "react";

export type IconName =
  | "home"
  | "queue"
  | "review"
  | "evidence"
  | "policy"
  | "shield"
  | "approve"
  | "risk"
  | "ledger"
  | "export"
  | "reset"
  | "alert"
  | "block"
  | "lock"
  | "check"
  | "flag"
  | "chevron"
  | "agents"
  | "band";

// One coherent line set: 24-box, stroke = currentColor, round caps/joins.
const PATHS: Record<IconName, ReactElement> = {
  home: (
    <>
      <path d="M4 11.5L12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
    </>
  ),
  queue: (
    <>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </>
  ),
  review: (
    <>
      <path d="M4 5h16v11H8l-4 3z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  evidence: (
    <>
      <path d="M7 4h7l4 4v12H7z" />
      <path d="M13 4v5h5M9.5 13h5M9.5 16h3" />
    </>
  ),
  policy: (
    <>
      <path d="M12 3v16M6 7h12" />
      <path d="M6 7l-2.5 5a2.5 2.5 0 0 0 5 0L6 7zM18 7l-2.5 5a2.5 2.5 0 0 0 5 0L18 7z" />
      <path d="M9 20h6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  approve: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.3 2.3 4.7-5" />
    </>
  ),
  risk: (
    <>
      <path d="M4 19a8 8 0 1 1 16 0" />
      <path d="M12 19l4.5-6" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  ledger: (
    <>
      <path d="M5 4h14v16H5z" />
      <path d="M5 9h14M10 4v16" />
    </>
  ),
  export: (
    <>
      <path d="M12 4v10M8 10l4 4 4-4" />
      <path d="M5 19h14" />
    </>
  ),
  reset: (
    <>
      <path d="M4.5 9a7.5 7.5 0 1 1-1 5" />
      <path d="M4 5v4h4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4l8.5 15h-17z" />
      <path d="M12 10v4M12 16.5v.01" />
    </>
  ),
  block: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6.2 6.2l11.6 11.6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  check: (
    <>
      <path d="M5 12.5l4 4 10-10.5" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4M6 4h11l-2.5 4 2.5 4H6" />
    </>
  ),
  chevron: (
    <>
      <path d="M9 6l6 6-6 6" />
    </>
  ),
  agents: (
    <>
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M3 20c0-2.8 2.2-5 5-5s5 2.2 5 5M13 20c0-2.8 2.2-5 5-5 .9 0 1.8.2 2.5.6" />
    </>
  ),
  band: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M8 6h4l4 5M8 18h4l4-5" />
    </>
  ),
};

export default function Icon({
  name,
  size = 18,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
