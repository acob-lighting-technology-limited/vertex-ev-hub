import type { ReactNode } from "react";
import { Reveal } from "@vertex/ui/motion/reveal";

/** Eyebrow line used above section titles across the site. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal y={12}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent-text uppercase">
        <span aria-hidden className="h-0.5 w-8 skew-x-[-35deg] bg-(image:--vx-blade)" />
        {children}
      </p>
    </Reveal>
  );
}
