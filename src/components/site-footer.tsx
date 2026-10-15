import Link from "next/link";
import { Logo } from "@vertex/ui/brand/logo";
import { Reveal } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { footerNav, formatPhone, site, whatsappHref } from "@/lib/site";
import { CopyrightYear } from "./copyright-year";
import { FooterWordmark } from "./footer-wordmark";

export function SiteFooter() {
  const wa = whatsappHref("Hi Vertex EV Hub, I'd like to know more about EV charging.");
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line pt-16 text-sm">
      <Container>
        <Reveal className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <p className="max-w-xs font-display text-2xl leading-snug font-medium">Charge. Connect. Go.</p>
            <p className="max-w-xs text-muted">Electric-vehicle charging for Nigeria — for drivers, fleets and the places they stop.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Contact</p>
            <ul className="mt-4 space-y-2.5">
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone}`} className="link-underline">
                    {formatPhone(site.phone)}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline">
                    WhatsApp
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" className="link-underline">
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1.5 text-muted">
            <p className="font-mono text-xs tracking-[0.2em] uppercase">Company</p>
            <p className="pt-3 text-fg">{site.legalName}</p>
            <p>An {site.parent} company</p>
            <p className="pt-2 text-xs leading-relaxed">{site.address}</p>
          </div>
        </Reveal>
      </Container>

      <FooterWordmark>
        <Logo className="w-full" />
      </FooterWordmark>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © <CopyrightYear /> {site.legalName} ·{" "}
          <Link href="/privacy" className="link-underline">
            Privacy
          </Link>
        </p>
        <p>
          EVs and home chargers:{" "}
          <a href={site.vertexElectric} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">
            Vertex Electric Solutions ↗
          </a>
        </p>
      </Container>
    </footer>
  );
}
