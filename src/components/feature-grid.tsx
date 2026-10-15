import type { LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@vertex/ui/motion/reveal";
import { SpotlightCard } from "@vertex/ui/motion/spotlight-card";
import { cn } from "@vertex/ui/lib/cn";

export type Feature = { icon: LucideIcon; title: string; body: string };

/** Staggered card grid with the cursor spotlight, used for site types, benefits and so on. */
export function FeatureGrid({ items, className }: { items: Feature[]; className?: string }) {
  return (
    <Stagger className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)} stagger={0.08}>
      {items.map((f) => (
        <StaggerItem key={f.title}>
          <SpotlightCard tilt={2} className="h-full rounded-(--vx-radius-lg)">
            <div className="h-full rounded-(--vx-radius-lg) border border-line bg-surface p-7 transition-colors hover:border-line-strong">
              <span className="flex size-11 items-center justify-center rounded-full border border-line-strong">
                <f.icon className="size-5 text-accent-text" aria-hidden />
              </span>
              <h3 className="mt-6 font-display text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </div>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
