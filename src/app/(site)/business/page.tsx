import { BarChart3, Building, Car, Home, Sun, Truck, Wrench } from "lucide-react";
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
import { pageImages } from "@/lib/page-media";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fleet & business charging",
  description: "EV charging for fleets, offices and estates in Nigeria — depot charging, workplace charging and solar-backed power from Vertex EV Hub.",
};

const who = [
  { icon: Car, title: "Ride-hailing & taxi fleets", body: "Keep drivers earning with reliable charging at your depot or hub." },
  { icon: Truck, title: "Logistics & delivery", body: "Overnight depot charging so vans and bikes start every day full." },
  { icon: Building, title: "Offices & workplaces", body: "Charging for staff and pool cars while they're at work." },
  { icon: Home, title: "Estates & residences", body: "Shared charging for residents in estates and apartment blocks." },
];

const steps = [
  { title: "Talk", body: "Tell us about your vehicles, routes and site." },
  { title: "Assess", body: "We survey the site: power supply, space and solar potential." },
  { title: "Plan", body: "A charging setup sized for your fleet, with costs set out clearly." },
  { title: "Run", body: "Installation, then support to keep chargers working." },
];

const why = [
  { icon: Sun, title: "Solar and battery backup", body: "Designed with ACOB Lighting so outages don't strand your fleet." },
  { icon: BarChart3, title: "Sized to your operation", body: "Chargers matched to how many vehicles you run and when they're parked." },
  { icon: Wrench, title: "One partner", body: "From survey to installation and ongoing support." },
];

export default function BusinessPage() {
  return (
    <PageTransition>
      <PageHero
        image={pageImages.lagosTraffic}
        objectPosition="50% 40%"
        eyebrow="For business"
        title="Charging for fleets that keep cities moving."
        description="Depot, workplace and estate charging for organisations moving to electric vehicles."
      />

      <section className="py-24">
        <Container>
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <MaskText text="Built around how you operate." className="mt-4 mb-12 font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
          <FeatureGrid items={who} className="lg:grid-cols-4" />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <Stagger as="ol" className="mt-10 grid gap-px overflow-hidden rounded-(--vx-radius-lg) border border-line bg-line md:grid-cols-4" stagger={0.1}>
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="bg-bg p-7">
                <span className="font-display text-5xl font-semibold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Eyebrow>Why Vertex EV Hub</Eyebrow>
          <MaskText text="Power that doesn't wait on the grid." className="mt-4 mb-12 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
          <FeatureGrid items={why} />
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-muted">
              Moving your fleet to electric? Vehicles are available from our sister company,{" "}
              <a href={site.vertexElectric} target="_blank" rel="noopener noreferrer" className="text-accent-text underline underline-offset-2">
                Vertex Electric Solutions
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <LeadPanel
        eyebrow="Get in touch"
        title="Let's plan your charging."
        body="Tell us a little about your organisation and fleet. We'll get back to you to arrange a conversation and a site assessment."
      >
        <LeadForm
          type="business"
          submitLabel="Request a consultation"
          whatsappHref={whatsappHref("Hi Vertex EV Hub, I'd like to talk about charging for our fleet/business.")}
          phone={site.phone}
        />
      </LeadPanel>
    </PageTransition>
  );
}
