/**
 * Site-wide facts and contact channels for Vertex EV Hub. Contact details come
 * from env so the site never shows an unconfirmed number or inbox; a channel
 * with no value is hidden.
 */
export const site = {
  name: "Vertex EV Hub",
  legalName: "Vertex EV Hub Limited",
  tagline: "Charge. Connect. Go.",
  parent: "ACOB Group",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vertexevhub.com",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** From the company business card. */
  address:
    "Plot 2, Block 14 Extension, Federal Ministry of Works and Housing Sites and Services Scheme, Setraco Gate, Gwarinpa, FCT, Nigeria",
  /** Sister company that sells EVs and home chargers. */
  vertexElectric: "https://www.vertexelectricsolutions.com",
};

/** "+2347058786478" -> "+234 705 878 6478" for display; links keep the raw number. */
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  return d.startsWith("234") && d.length === 13 ? `+234 ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}` : raw;
}

export function whatsappHref(message: string) {
  if (!site.whatsapp) return undefined;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/network", label: "Network" },
  { href: "/business", label: "For business" },
  { href: "/host", label: "Host a charger" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  { href: "/network", label: "Charging network" },
  { href: "/business", label: "Fleet & business charging" },
  { href: "/host", label: "Host a charger" },
  { href: "/about", label: "About EV Hub" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
