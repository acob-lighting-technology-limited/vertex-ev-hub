import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { LeadForm } from "@/components/lead-form";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";
import { formatPhone, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Vertex EV Hub about EV charging, fleet charging or hosting a charger.",
};

export default function ContactPage() {
  const wa = whatsappHref("Hi Vertex EV Hub, I have a question.");
  const channels = [
    wa && { icon: MessageCircle, label: "WhatsApp", value: formatPhone(site.whatsapp), href: wa },
    site.phone && { icon: Phone, label: "Phone", value: formatPhone(site.phone), href: `tel:${site.phone}` },
    site.email && { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office", value: site.address },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <PageTransition>
      <Container className="py-16 sm:py-24">
        <SectionHeading as="h1" eyebrow="Contact" title="Let's talk charging." description="Questions about the network, your fleet or your site? Send us a message." />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Stagger className="space-y-4" stagger={0.08}>
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-accent-text">
                    <c.icon className="size-5 text-accent-text" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-mono text-xs tracking-[0.2em] text-muted uppercase">{c.label}</span>
                    <span className="mt-1 block">{c.value}</span>
                  </span>
                </>
              );
              return (
                <StaggerItem key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-4 rounded-(--vx-radius-lg) border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-start gap-4 rounded-(--vx-radius-lg) border border-line bg-surface p-5">{inner}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal delay={0.15}>
            <div className="rounded-(--vx-radius-lg) border border-line bg-surface p-6 sm:p-8">
              <LeadForm type="contact" submitLabel="Send message" whatsappHref={wa} phone={site.phone} />
            </div>
          </Reveal>
        </div>
      </Container>
    </PageTransition>
  );
}
