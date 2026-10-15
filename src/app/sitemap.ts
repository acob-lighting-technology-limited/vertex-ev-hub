import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const pages = ["", "/network", "/business", "/host", "/about", "/faq", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));
}
