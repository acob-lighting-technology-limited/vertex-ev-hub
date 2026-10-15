import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Unbounded } from "next/font/google";
import { ThemeScript } from "@vertex/ui/theme/theme-script";
import "./globals.css";

// Same type system as Vertex Electric: wide display face for the brand, Inter for reading.
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vertexevhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vertex EV Hub — EV charging for Nigeria",
    template: "%s · Vertex EV Hub",
  },
  description:
    "Vertex EV Hub is building electric-vehicle charging for Nigeria: public charging, fleet and business charging, and chargers hosted at the places you already stop.",
  applicationName: "Vertex EV Hub",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070606" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      data-theme="dark"
      suppressHydrationWarning
      className={`${unbounded.variable} ${inter.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
