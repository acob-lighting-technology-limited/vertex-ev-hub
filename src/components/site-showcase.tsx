"use client";

import { MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { easeBlade } from "@vertex/ui/motion/easing";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { Container } from "@vertex/ui/primitives/container";
import { cn } from "@vertex/ui/lib/cn";
import { Eyebrow } from "@/components/page-intro";
import { sitePhotos, type SitePhoto } from "@/lib/page-media";

const tiles: { photo: SitePhoto; className: string; label: string; speed: number }[] = [
  { photo: sitePhotos.carCharging, className: "md:col-span-2 md:row-span-2", label: "DC fast charging", speed: -40 },
  { photo: sitePhotos.canopy, className: "md:col-span-2", label: "Covered bays", speed: 30 },
  { photo: sitePhotos.batteryRoom, className: "md:row-span-2", label: "Battery storage", speed: -20 },
  { photo: sitePhotos.acCharger, className: "md:row-span-2", label: "AC charging", speed: 50 },
  { photo: sitePhotos.stationAerial, className: "md:col-span-2", label: "Solar canopy", speed: 20 },
];

function Tile({ photo, className, label, index, speed }: { photo: SitePhoto; className: string; label: string; index: number; speed: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.figure
      ref={ref}
      className={cn("group relative min-h-64 overflow-hidden rounded-(--vx-radius-lg) bg-surface", className)}
      initial={{ opacity: 0, y: 40, clipPath: "inset(10% 6% 10% 6% round 20px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 20px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: easeBlade, delay: (index % 3) * 0.1 }}
    >
      <motion.div className="absolute -inset-y-16 inset-x-0" style={{ y }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
        <span className="h-0.5 w-5 skew-x-[-35deg] bg-[#ff6a3d] transition-all duration-500 group-hover:w-9" />
        {label}
      </figcaption>
    </motion.figure>
  );
}

/** Bento gallery of the solar-powered charging site at Imo Digital City. */
export function SiteShowcase({ title = "Already on the ground." }: { title?: string }) {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Imo Digital City · Owerri</Eyebrow>
            <MaskText text={title} className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl" />
          </div>
          <motion.p
            className="max-w-sm text-muted"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeBlade, delay: 0.2 }}
          >
            A solar-powered EV charging station delivered by ACOB Group: AC and DC chargers under a solar canopy, backed by battery
            storage.
          </motion.p>
        </div>
        <div className="mt-12 grid auto-rows-[15rem] gap-4 md:grid-cols-4">
          {tiles.map((t, i) => (
            <Tile key={t.label} {...t} index={i} />
          ))}
        </div>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted">
          <MapPin className="size-4 text-accent-text" aria-hidden />
          Imo Digital City, Owerri, Imo State
        </p>
      </Container>
    </section>
  );
}
