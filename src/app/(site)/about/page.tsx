import { ArrowUpRight, Leaf, ShieldCheck, Sun, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Reveal, Stagger, StaggerItem } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { FeatureGrid } from "@/components/feature-grid";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { pageImages, sitePhotos } from "@/lib/page-media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Vertex EV Hub Limited is the ACOB Group company building electric-vehicle charging for Nigeria.",
};

const values = [
  { icon: ShieldCheck, title: "Reliable", body: "Charging that works when you arrive — including when the grid doesn't." },
  { icon: Sun, title: "Clean", body: "Sites designed around solar, so more of every charge comes from the sun." },
  { icon: Users, title: "Local", body: "Built in Nigeria, for Nigerian roads, drivers and businesses." },
  { icon: Leaf, title: "Honest", body: "Clear prices and straight answers. We tell you what's live and what's coming." },
];

const family = [
  {
    name: "Vertex Electric Solutions",
    role: "Electric vehicles and home chargers",
    href: site.vertexElectric,
  },
  {
    name: "ACOB Lighting Technology",
    role: "Solar power and energy systems",
    href: "https://www.acoblighting.com",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        image={pageImages.abujaGate}
        objectPosition="50% 45%"
        eyebrow="About Vertex EV Hub"
        title="Making electric driving work in Nigeria."
        description={`${site.legalName} is the ${site.parent} company building charging for the country's move to electric vehicles.`}
      />

      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <MaskText text="An EV is only as good as where you can charge it." className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl" />
            <Reveal delay={0.2}>
              <div className="mt-6 space-y-4 text-lg text-muted">
                <p>
                  More electric vehicles are arriving on Nigerian roads every year. What&apos;s missing is somewhere dependable to charge
                  them — away from home, on long trips, and for fleets that can&apos;t afford downtime.
                </p>
                <p>
                  Vertex EV Hub exists to build that: charging at the places people already stop, designed around solar power so it keeps
                  working through outages.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-(--vx-radius-lg)">
            <Image src={sitePhotos.techDc.src} alt={sitePhotos.techDc.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Eyebrow>What we stand for</Eyebrow>
          <MaskText text="Four things we won't compromise on." className="mt-4 mb-12 font-display text-3xl font-semibold tracking-tight sm:text-5xl" />
          <FeatureGrid items={values} className="lg:grid-cols-4" />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Eyebrow>Part of {site.parent}</Eyebrow>
          <MaskText text="One group, the whole journey." className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl" />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Our sister companies cover the rest of the switch to electric — from the vehicle in your driveway to the solar power behind
              the charger.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.12}>
            {family.map((c) => (
              <StaggerItem key={c.name}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center justify-between gap-6 rounded-(--vx-radius-lg) border border-line bg-surface p-8 transition-colors hover:border-accent-text"
                >
                  <div>
                    <p className="font-display text-2xl font-medium">{c.name}</p>
                    <p className="mt-2 text-muted">{c.role}</p>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {[sitePhotos.minigridAerial, sitePhotos.imoDigitalCity].map((p, i) => (
              <Reveal key={p.src} delay={i * 0.12} className="relative aspect-video overflow-hidden rounded-(--vx-radius-lg)">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-4 text-sm text-muted">ACOB Group projects: a solar mini-grid, and the Imo Digital City campus in Owerri.</p>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
