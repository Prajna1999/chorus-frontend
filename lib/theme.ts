export const T = {
  // Neutral backgrounds (shadcn-style)
  bg: "#ffffff",
  surface: "#f9fafb",
  card: "#ffffff",
  border: "#e5e7eb",

  // Text (zinc palette)
  text: "#18181b",
  textMid: "#71717a",
  textDim: "#a1a1aa",

  // Primary accent (blue)
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  primaryLight: "#eff6ff",

  // Success (green)
  green: "#22c55e",
  greenLight: "#f0fdf4",

  // Warning (amber)
  amber: "#f59e0b",
  amberLight: "#fffbeb",

  // Danger (red)
  red: "#ef4444",
  redLight: "#fef2f2",

  // Muted
  muted: "#f4f4f5",
  mutedText: "#71717a",
};

export const DTC = {
  voice: { c: T.green, bg: T.greenLight },
  text: { c: T.primary, bg: T.primaryLight },
  documents: { c: T.amber, bg: T.amberLight },
  sensor: { c: T.primary, bg: T.primaryLight }
};

// System fonts (shadcn-style)
export const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
export const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

// Design system constants (shadcn-style)
export const RADIUS = {
  sm: '6px',
  md: '8px',
  lg: '12px',
};

export const SHADOW = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
};
