import { ArrowUpRight, BatteryCharging, Building2, MapPin, PlugZap, Smartphone, Store, Sun, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@vertex/ui/motion/marquee";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Reveal, Stagger, StaggerItem } from "@vertex/ui/motion/reveal";
import { SpotlightCard } from "@vertex/ui/motion/spotlight-card";
import { Container } from "@vertex/ui/primitives/container";
import { ChargeMeter } from "@/components/charge-meter";
import { HomeHero } from "@/components/home-hero";
import { LeadForm } from "@/components/lead-form";
import { Eyebrow } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { SiteShowcase } from "@/components/site-showcase";
import { pageImages, sitePhotos } from "@/lib/page-media";
import { site, whatsappHref } from "@/lib/site";

const pillars = [
  {
    href: "/network",
    icon: MapPin,
    n: "01",
    title: "Public charging",
    body: "Chargers at the places you already stop — so topping up fits around your day, not the other way round.",
    cta: "About the network",
  },
  {
    href: "/business",
    icon: Building2,
    n: "02",
    title: "Fleet & business charging",
    body: "Depot, office and estate charging for ride-hailing, logistics and corporate fleets moving to electric.",
    cta: "For business",
  },
  {
    href: "/host",
    icon: Store,
    n: "03",
    title: "Host a charger",
    body: "Own a forecourt, mall, hotel or car park? Partner with us to bring EV drivers to your door.",
    cta: "Become a host",
  },
];

const steps = [
  { icon: MapPin, title: "Find", body: "See where chargers are and whether they're free." },
  { icon: PlugZap, title: "Plug in", body: "Connect your car and start charging in a few taps." },
  { icon: Smartphone, title: "Pay & go", body: "Simple payment, then back on the road." },
];

export default function HomePage() {
  const wa = whatsappHref("Hi Vertex EV Hub, please keep me updated on the charging network launch.");
  return (
    <PageTransition>
      <HomeHero image={pageImages.nightStation} />

      <section aria-label="What Vertex EV Hub does" className="border-y border-line py-6">
        <Marquee speed={36}>
          {["Public charging", "Fleet charging", "Host a charger", "Solar-backed", "Charge. Connect. Go."].map((w, i) => (
            <span key={w} className="flex items-center">
              <span
                className={
                  i % 2
                    ? "px-8 font-display text-4xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_var(--vx-muted)] sm:text-6xl"
                    : "px-8 font-display text-4xl font-semibold tracking-tight sm:text-6xl"
                }
              >
                {w}
              </span>
              <Zap aria-hidden className="size-6 text-accent-text sm:size-8" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* What we're building */}
      <section className="py-24 sm:py-32">
        <Container>
          <Eyebrow>What we&apos;re building</Eyebrow>
          <MaskText text="Charging, wherever Nigeria drives." className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {pillars.map((p) => (
              <StaggerItem key={p.href}>
                <SpotlightCard className="h-full rounded-(--vx-radius-lg)">
                  <Link
                    href={p.href}
                    transitionTypes={["nav-forward"]}
                    className="group relative flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-(--vx-radius-lg) border border-line bg-surface p-8 transition-colors hover:border-line-strong"
                  >
                    <span aria-hidden className="absolute -top-6 right-4 font-display text-[8rem] leading-none font-semibold text-fg/[0.04]">
                      {p.n}
                    </span>
                    <p.icon className="size-8 text-accent-text" aria-hidden />
                    <div className="relative">
                      <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                      <p className="mt-3 text-muted">{p.body}</p>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                        {p.cta}
                        <span className="flex size-8 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                          <ArrowUpRight className="size-4" aria-hidden />
                        </span>
                      </span>
                    </div>
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SiteShowcase />

      {/* How it will work */}
      <section className="py-12 sm:py-20">
        <Container>
          <Eyebrow>How it will work</Eyebrow>
          <MaskText text="Find. Plug in. Go." className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl" />
          <Stagger className="relative mt-14 grid gap-10 md:grid-cols-3" stagger={0.15}>
            <span aria-hidden className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-(image:--vx-blade) opacity-60 md:block" />
            {steps.map((s, i) => (
              <StaggerItem key={s.title} className="relative text-center">
                <span className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border border-line-strong bg-bg">
                  <s.icon className="size-5 text-accent-text" aria-hidden />
                </span>
                <p className="mt-5 font-mono text-xs text-muted">0{i + 1}</p>
                <p className="mt-1 font-display text-xl font-medium">{s.title}</p>
                <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-muted">App, payment and pricing details will be shared at launch.</p>
          </Reveal>
        </Container>
      </section>

      {/* Solar-backed */}
      <section className="py-20">
        <Container>
          <div className="grid overflow-hidden rounded-(--vx-radius-lg) border border-line bg-surface lg:grid-cols-2">
            <Reveal className="relative min-h-80">
              <Image src={sitePhotos.solarArray.src} alt={sitePhotos.solarArray.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </Reveal>
            <div className="p-8 sm:p-12">
              <Reveal>
                <Sun className="size-8 text-accent-text" aria-hidden />
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Built for the grid we have.</h2>
                <p className="mt-4 text-muted">
                  Power cuts shouldn&apos;t stop a charge. With our sister company ACOB Lighting — a decade of solar installations across
                  Nigeria — we&apos;re designing sites with solar and battery support so chargers keep working when the grid doesn&apos;t.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex items-center gap-6">
                  <ChargeMeter />
                  <BatteryCharging className="size-6 text-accent-text" aria-hidden />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Home charging lives with Vertex Electric */}
      <section className="py-12">
        <Container>
          <Reveal>
            <a
              href={site.vertexElectric}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start justify-between gap-6 rounded-(--vx-radius-lg) border border-dashed border-line-strong p-8 transition-colors hover:border-accent-text sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-mono text-xs tracking-[0.25em] text-muted uppercase">Charging at home?</p>
                <p className="mt-2 font-display text-2xl">Electric vehicles and home chargers are sold by our sister company, Vertex Electric Solutions.</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-text">
                vertexelectricsolutions.com <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Launch updates */}
      <section id="updates" className="scroll-mt-24 py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>Be first to know</Eyebrow>
            <MaskText text="Get launch updates." className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl" />
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-lg text-muted">
                Tell us where you drive. We&apos;ll let you know when chargers open near you — and your city helps us decide where to build
                first.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-(--vx-radius-lg) border border-line bg-surface p-6 sm:p-8">
              <LeadForm type="updates" submitLabel="Keep me updated" whatsappHref={wa} phone={site.phone} />
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
