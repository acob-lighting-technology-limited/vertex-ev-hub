import type { ReactNode } from "react";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Reveal } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { Eyebrow } from "@/components/page-intro";

/** Two-column "pitch + form" block that closes most pages. */
export function LeadPanel({
  id,
  eyebrow,
  title,
  body,
  aside,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <MaskText text={title} className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-lg text-muted">{body}</p>
            {aside}
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-(--vx-radius-lg) border border-line bg-surface p-6 sm:p-8">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}
