import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

import { Magnetic, RevealLines } from "./motion-primitives";

export function Hero() {
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const fade = useTransform(scrollY, [0, 400], [1, 0]);

  const blobA = useTransform(mx, (v) => v * 40);
  const blobB = useTransform(mx, (v) => v * -60);
  const blobAY = useTransform(my, (v) => v * 40);
  const blobBY = useTransform(my, (v) => v * -50);

  return (
    <section
      className="relative flex min-h-[88svh] items-end overflow-hidden pt-36 pb-14 sm:min-h-dvh sm:pt-28 sm:pb-12"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        mx.set(event.clientX / window.innerWidth - 0.5);
        my.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          style={{ x: blobA, y: blobAY }}
          className="grain-blob floaty absolute -top-24 -left-24 h-[55vw] w-[55vw] max-w-[720px] rounded-full bg-primary/70"
        />
        <motion.div
          style={{ x: blobB, y: blobBY }}
          className="grain-blob floaty absolute top-1/3 -right-32 h-[45vw] w-[45vw] max-w-[620px] rounded-full bg-secondary/70 [animation-delay:-4s]"
        />
        <motion.div
          style={{ x: blobA, y: blobBY }}
          className="grain-blob floaty absolute -bottom-40 left-1/4 h-[40vw] w-[40vw] max-w-[520px] rounded-full bg-accent/45 [animation-delay:-8s]"
        />
      </div>

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-background/50 px-4 py-2 text-xs font-semibold tracking-widest uppercase backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          Digital agency uit Twente
        </motion.p>

        <h1 className="display display-hero">
          <RevealLines lines={["Wij bouwen", "websites die"]} delay={0.1} />
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-primary"
            >
              je onthoudt
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-7 border-t border-ink/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Webdesign, development en merk vanuit Twente, door heel Nederland. Wij maken websites die
            voor je werken én jouw doelgroep bereiken.
          </p>
          <Magnetic strength={0.4} className="w-full sm:w-auto">
            <Link
              to="/website-scan"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-colors hover:bg-primary sm:w-auto"
            >
              Doe de gratis website scan
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
