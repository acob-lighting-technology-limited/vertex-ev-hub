import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@vertex/ui/motion/reveal";
import { Container } from "@vertex/ui/primitives/container";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";
import { faqGroups } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about the Vertex EV Hub charging network, pricing, fleet charging and hosting a charger.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  ),
};

export default function FaqPage() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container className="py-16 sm:py-24">
        <SectionHeading as="h1" eyebrow="Help" title="Questions, answered." description="Everything we can tell you today about charging with Vertex EV Hub." />
        <div className="mt-16">
          <FaqAccordion groups={faqGroups} />
        </div>
        <Reveal>
          <p className="mt-16 text-muted">
            Still have a question?{" "}
            <Link href="/contact" className="text-accent-text underline underline-offset-2">
              Get in touch
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </PageTransition>
  );
}
