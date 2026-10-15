import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@vertex/ui/brand/logo";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Reveal } from "@vertex/ui/motion/reveal";
import { pageImages } from "@/lib/page-media";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const links = [
  { href: "/", label: "Home" },
  { href: "/network", label: "Charging network" },
  { href: "/host", label: "Host a charger" },
  { href: "/faq", label: "FAQ" },
];

export default function NotFound() {
  const img = pageImages.abujaSunset;
  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#070606] text-white">
      <Image src={img.lg} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070606] via-[#070606]/40 to-[#070606]/70" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-10">
        <Link href="/" aria-label="Vertex EV Hub home">
          <Logo ink="light" className="h-8 w-auto" />
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-24 sm:px-6 lg:px-10">
        <Reveal y={20}>
          <p className="font-mono text-xs tracking-[0.35em] text-[#ff8a65] uppercase">Error 404</p>
        </Reveal>
        <MaskText as="h1" trigger="mount" delay={0.15} text="This one's out of range." className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl" />
        <Reveal delay={0.4}>
          <p className="mt-6 max-w-md text-lg text-white/75">The page you&apos;re after has moved or never existed. Here&apos;s a route back.</p>
          <ul className="mt-10 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    i === 0
                      ? "inline-flex h-12 items-center rounded-(--vx-radius) bg-[#d23b13] px-6 font-medium text-white transition hover:bg-[#b8330c]"
                      : "inline-flex h-12 items-center rounded-(--vx-radius) border border-white/25 px-6 text-white transition hover:border-white"
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </main>
  );
}
