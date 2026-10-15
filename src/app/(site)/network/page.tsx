import { BatteryCharging, Clock, Gauge, MapPin, ShieldCheck, Sun } from "lucide-react";
import type { Metadata } from "next";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Reveal, Stagger, StaggerItem } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { FeatureGrid } from "@/components/feature-grid";
import { LeadForm } from "@/components/lead-form";
import { LeadPanel } from "@/components/lead-panel";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { SiteShowcase } from "@/components/site-showcase";
import { pageImages } from "@/lib/page-media";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Charging network",
  description: "Vertex EV Hub is building public EV charging across Nigeria. First locations to be announced — tell us where you need charging.",
};

const speeds = [
  {
    icon: Clock,
    name: "Destination charging",
    use: "Malls, hotels, offices",
    body: "AC charging where you'll stay a while — top up during a meeting, a meal or a shift.",
  },
  {
    icon: Gauge,
    name: "Rapid charging",
    use: "Highways and busy corridors",
    body: "DC fast charging for when you need range quickly and want to get back on the road.",
  },
];

const promises = [
  { icon: Sun, title: "Solar-backed", body: "Sites designed with ACOB Lighting to keep charging through grid outages." },
  { icon: MapPin, title: "Where you already stop", body: "Fuel stations, malls, hotels and car parks — not out of your way." },
  { icon: ShieldCheck, title: "Clear prices", body: "You'll see the price before you start a charge. No surprises." },
  { icon: BatteryCharging, title: "Built for local cars", body: "Planned for the connectors on EVs common in Nigeria, including GB/T and CCS2." },
];

const cities = ["Abuja", "Lagos", "Port Harcourt", "Kano", "Ibadan", "Enugu"];

export default function NetworkPage() {
  return (
    <PageTransition>
      <PageHero
        image={pageImages.abujaNight}
        objectPosition="50% 60%"
        eyebrow="Charging network"
        title="A charging network for Nigeria's roads."
        description="We're preparing our first public charging locations. Here's what to expect — and how you can shape where we build."
      >
        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs text-white/80 backdrop-blur">
          <span className="size-2 rounded-full bg-[#ff6a3d]" />
          First locations to be announced
        </p>
      </PageHero>

      {/* Where — honest placeholder map */}
      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Where we&apos;ll build</Eyebrow>
            <MaskText text="You help pick the map." className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-lg text-muted">
                We&apos;re assessing sites now. Demand from drivers and fleets is one of the biggest factors in where the first chargers go —
                so tell us where you drive.
              </p>
            </Reveal>
          </div>
          <Stagger className="flex flex-wrap gap-3" stagger={0.06}>
            {cities.map((c) => (
              <StaggerItem key={c}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 font-display text-lg">
                  <MapPin className="size-4 text-accent-text" aria-hidden />
                  {c}
                </span>
              </StaggerItem>
            ))}
            <StaggerItem>
              <span className="inline-flex items-center rounded-full border border-dashed border-line-strong px-5 py-3 text-muted">
                + your city
              </span>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      {/* Charging types */}
      <section className="py-12">
        <Container>
          <Eyebrow>Planned charging types</Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {speeds.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.12}>
                <div className="group relative h-full overflow-hidden rounded-(--vx-radius-lg) border border-line bg-surface p-8">
                  <s.icon className="size-8 text-accent-text" aria-hidden />
                  <p className="mt-8 font-mono text-xs tracking-[0.25em] text-muted uppercase">{s.use}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold">{s.name}</h3>
                  <p className="mt-3 max-w-md text-muted">{s.body}</p>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-(image:--vx-blade) transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-muted">Exact chargers and connectors will be listed for each site before it opens.</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Eyebrow>Our promise</Eyebrow>
          <MaskText text="Charging you can count on." className="mt-4 mb-12 font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
          <FeatureGrid items={promises} className="lg:grid-cols-4" />
        </Container>
      </section>

      <SiteShowcase title="What our sites look like." />

      <LeadPanel
        eyebrow="Tell us where"
        title="Where do you need charging?"
        body="Share your city and we'll keep you posted as sites open. Mention the exact area in the message if you like."
      >
        <LeadForm
          type="updates"
          submitLabel="Send"
          whatsappHref={whatsappHref("Hi Vertex EV Hub, I'd like charging near me in ...")}
          phone={site.phone}
        />
      </LeadPanel>
    </PageTransition>
  );
}
