/**
 * FAQ content. The network hasn't launched, so answers avoid commitments that
 * aren't confirmed yet (locations, prices, connector list, host terms).
 */
export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "network",
    title: "The network",
    items: [
      {
        q: "Is the Vertex EV Hub network open yet?",
        a: "Not yet. We're preparing our first charging locations now. Sign up for launch updates and we'll tell you as soon as chargers open near you.",
      },
      {
        q: "Where will the first chargers be?",
        a: "We'll announce the first locations before launch. Where people tell us they drive helps decide where we build first — so tell us your city when you sign up.",
      },
      {
        q: "Will my car be able to charge?",
        a: "We're planning for the connectors used by the EVs most common in Nigeria, including the Chinese GB/T standard and CCS2. We'll publish the exact connectors at each site before launch.",
      },
      {
        q: "What happens during a power cut?",
        a: "We're designing sites with our sister company ACOB Lighting to include solar and battery support, so charging can continue when the grid is down.",
      },
    ],
  },
  {
    id: "paying",
    title: "Paying & pricing",
    items: [
      {
        q: "How much will charging cost?",
        a: "Pricing will be published before launch. You'll see the price before you start a charge.",
      },
      {
        q: "How will I pay?",
        a: "We'll share payment options at launch. Our aim is to keep it simple: start a charge, pay, and go.",
      },
    ],
  },
  {
    id: "business",
    title: "Fleets & hosts",
    items: [
      {
        q: "Can you install charging at our depot or office?",
        a: "Yes, that's one of the things we do. Tell us about your fleet or site through the business form and we'll arrange a conversation and a site assessment.",
      },
      {
        q: "How does hosting a charger work?",
        a: "You provide the space; we work with you on installing and running the charger. Terms depend on the site, so we agree them with each host after a survey.",
      },
      {
        q: "What kind of sites make good hosts?",
        a: "Places where drivers already stop for a while: fuel stations, malls, hotels, restaurants, offices, estates and car parks.",
      },
    ],
  },
  {
    id: "home",
    title: "Home charging & EVs",
    items: [
      {
        q: "Do you sell home chargers or electric vehicles?",
        a: "Those are sold by our sister company, Vertex Electric Solutions. Vertex EV Hub focuses on charging services: public, fleet and hosted charging.",
      },
    ],
  },
];
