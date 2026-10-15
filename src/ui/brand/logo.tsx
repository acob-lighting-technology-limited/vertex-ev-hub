/**
 * Vertex EV Hub logo — PLACEHOLDER lockup drawn from the business card
 * (V + plug inside an orange ring, "VERTEX" with an orange X, "EV HUB").
 * Replace the paths with the official vector logo when ACOB supplies it;
 * the component API (variant / ink / className) stays the same.
 */
type LogoProps = {
  /** wordmark: mark + "VERTEX EV HUB" · mark: the ring/V symbol alone */
  variant?: "wordmark" | "mark";
  ink?: "theme" | "light" | "dark";
  className?: string;
  title?: string;
};

const inkColor = { theme: "var(--vx-logo-ink)", light: "var(--vx-paper)", dark: "var(--vx-ink)" } as const;

function Mark({ ink }: { ink: string }) {
  return (
    <>
      {/* Open ring */}
      <path d="M96 30a46 46 0 1 1-62-6" fill="none" stroke="var(--vx-blue-500)" strokeWidth="7" strokeLinecap="round" />
      {/* V: left stroke in ink, right stroke in accent */}
      <path d="M26 34h16l20 46-8 18z" fill={ink} />
      <path d="M62 80 84 30h16L66 98z" fill="var(--vx-blue-500)" />
      {/* Plug prongs off the right arm */}
      <path d="M97 22l10-6M101 30l10-6" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    </>
  );
}

export function Logo({ variant = "wordmark", ink = "theme", className, title = "Vertex EV Hub" }: LogoProps) {
  const c = inkColor[ink];
  if (variant === "mark") {
    return (
      <svg viewBox="0 0 120 120" role="img" aria-label={title} className={className}>
        <Mark ink={c} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 470 120" role="img" aria-label={title} className={className}>
      <Mark ink={c} />
      <text
        x="132"
        y="74"
        fill={c}
        style={{ fontFamily: "var(--font-unbounded), system-ui, sans-serif", fontWeight: 700, fontSize: 56, letterSpacing: "0.04em" }}
      >
        VERTE<tspan fill="var(--vx-blue-500)">X</tspan>
      </text>
      <rect x="134" y="88" width="64" height="3" fill="var(--vx-blue-500)" />
      <text
        x="208"
        y="96"
        fill="var(--vx-blue-500)"
        style={{ fontFamily: "var(--font-unbounded), system-ui, sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: "0.32em" }}
      >
        EV HUB
      </text>
    </svg>
  );
}
