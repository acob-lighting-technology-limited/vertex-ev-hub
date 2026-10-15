"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { easeBlade } from "@vertex/ui/motion/easing";
import { Magnetic } from "@vertex/ui/motion/magnetic";
import { MaskText } from "@vertex/ui/motion/mask-text";
import { ButtonLink } from "@vertex/ui/primitives/button";
import { Container } from "@vertex/ui/primitives/container";
import type { PageImage } from "@/lib/page-media";

/**
 * Home hero: the photo pushes in as the intro curtain lifts, the tagline rises
 * word by word, and a live "launching soon" status makes it clear the network
 * isn't open yet. Scrolling drifts the photo and fades the copy.
 */
export function HomeHero({ image }: { image: PageImage }) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Start as the intro curtain begins to lift (it runs on CSS time from first paint).
  useEffect(() => {
    const curtain = document.querySelector<HTMLElement>(".vx-intro");
    const running = curtain && getComputedStyle(curtain).visibility !== "hidden" && getComputedStyle(curtain).display !== "none";
    if (!running) {
      const t = setTimeout(() => setReady(true), 60);
      return () => clearTimeout(t);
    }
    const onStart = (e: AnimationEvent) => e.animationName === "vx-curtain" && setReady(true);
    curtain.addEventListener("animationstart", onStart);
    const fallback = setTimeout(() => setReady(true), 1650);
    return () => {
      curtain.removeEventListener("animationstart", onStart);
      clearTimeout(fallback);
    };
  }, []);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: "blur(6px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.9, ease: easeBlade, delay },
  });

  return (
    <section ref={ref} className="relative isolate -mt-16 flex min-h-svh items-end overflow-hidden bg-[#070606] pt-16 text-white md:items-center">
      <motion.div className="absolute inset-0 -z-10" style={{ y: mediaY, scale: mediaScale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18, opacity: 0.5 }}
          animate={ready ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.4, ease: easeBlade }}
        >
          <Image src={image.lg} alt={image.alt} fill preload sizes="100vw" className="object-cover object-[65%_50%]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-[#070606]/55 to-[#070606]/25 md:bg-gradient-to-r md:from-[#070606]/95 md:via-[#070606]/55 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </motion.div>

      <motion.div className="w-full" style={{ y: copyY, opacity: copyOpacity }}>
        <Container className="pt-24 pb-20 md:py-0">
          <div className="max-w-2xl">
            <motion.p {...rise(0)} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs text-white/80 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff6a3d] opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-[#ff6a3d]" />
              </span>
              Network launching soon · Nigeria
            </motion.p>
            <MaskText
              as="h1"
              text="Charge. Connect. Go."
              trigger="mount"
              play={ready}
              delay={0.15}
              className="mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl lg:text-8xl"
            />
            <motion.p {...rise(0.45)} className="mt-6 max-w-lg text-lg text-white/75">
              Vertex EV Hub is building electric-vehicle charging for Nigeria — at the places you already stop, for the fleets that keep
              cities moving, and backed by solar.
            </motion.p>
            <motion.div {...rise(0.6)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href="#updates" size="lg">
                  Get launch updates <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/host" size="lg" variant="ghost" className="border-white/25 bg-black/30 text-white backdrop-blur-sm hover:border-white" transitionTypes={["nav-forward"]}>
                Host a charger
              </ButtonLink>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
