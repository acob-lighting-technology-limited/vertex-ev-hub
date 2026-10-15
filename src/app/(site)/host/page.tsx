import { Building2, Coffee, Fuel, Hotel, ParkingSquare, ShoppingBag, Sparkles, Users, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Reveal } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { FeatureGrid } from "@/components/feature-grid";
import { LeadForm } from "@/components/lead-form";
import { LeadPanel } from "@/components/lead-panel";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { pageImages, sitePhotos } from "@/lib/page-media";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Host a charger",
  description: "Own a fuel station, mall, hotel or car park? Partner with Vertex EV Hub to host EV chargers and bring electric-vehicle drivers to your site.",
};

const sites = [
  { icon: Fuel, title: "Fuel stations", body: "Add charging alongside fuel and serve the next generation of drivers." },
  { icon: ShoppingBag, title: "Malls & retail", body: "Drivers shop while they charge — and stay longer." },
  { icon: Hotel, title: "Hotels", body: "A reason for EV-driving guests to choose you." },
  { icon: Coffee, title: "Restaurants & cafés", body: "A meal is about the right length for a good top-up." },
  { icon: Building2, title: "Offices & estates", body: "A perk for tenants, staff and residents." },
  { icon: ParkingSquare, title: "Car parks", body: "Turn parking spaces into charging spaces." },
];

const benefits = [
  { icon: Users, title: "New visitors", body: "EV drivers plan stops around chargers. Be on their map." },
  { icon: Sparkles, title: "A modern image", body: "Show customers and tenants you're ready for what's next." },
  { icon: Wrench, title: "We handle the charging", body: "We work with you on installation and operation, so you can focus on your business." },
];

export default function HostPage() {
  return (
    <PageTransition>
      <PageHero
        image={pageImages.chargePost}
        objectPosition="50% 55%"
        eyebrow="Host a charger"
        title="Bring EV drivers to your door."
        description="Partner with Vertex EV Hub to put chargers at your site. You provide the space; we work with you on the rest."
      />

      <section className="py-24">
        <Container>
          <Eyebrow>Good host sites</Eyebrow>
          <MaskText text="Anywhere drivers stop for a while." className="mt-4 mb-12 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
          <FeatureGrid items={sites} />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid overflow-hidden rounded-(--vx-radius-lg) border border-line bg-surface lg:grid-cols-[1.1fr_1fr]">
            <div className="p-8 sm:p-12">
              <Eyebrow>Why host</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">More than a parking space.</h2>
              <div className="mt-8 space-y-6">
                {benefits.map((b, i) => (
                  <Reveal key={b.title} delay={i * 0.1}>
                    <div className="flex gap-4">
                      <b.icon className="mt-0.5 size-5 shrink-0 text-accent-text" aria-hidden />
                      <div>
                        <p className="font-medium">{b.title}</p>
                        <p className="mt-1 text-sm text-muted">{b.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="relative min-h-80">
              <Image src={sitePhotos.canopySide.src} alt={sitePhotos.canopySide.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm text-muted">Every site is different, so hosting terms are agreed with each partner after a site survey.</p>
          </Reveal>
        </Container>
      </section>

      <LeadPanel
        eyebrow="Register interest"
        title="Tell us about your site."
        body="Share a few details and we'll get in touch to talk through the opportunity and arrange a survey."
      >
        <LeadForm
          type="host"
          submitLabel="Register my site"
          whatsappHref={whatsappHref("Hi Vertex EV Hub, I'm interested in hosting a charger at my site.")}
          phone={site.phone}
        />
      </LeadPanel>
    </PageTransition>
  );
}
