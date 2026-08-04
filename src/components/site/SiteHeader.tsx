import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { Magnetic } from "./motion-primitives";
import { StatementSlider } from "./StatementSlider";


const nav = [
  { to: "/diensten", label: "Diensten" },
  { to: "/werk", label: "Werk" },
  { to: "/website-scan", label: "Website scan" },
  { to: "/over-ons", label: "Over ons" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/75 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur-xl" : ""
      }`}
    >
      <StatementSlider />
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-3" : "py-4 sm:py-5"
        }`}
      >

        <Link to="/" className="group flex min-w-0 items-center gap-2" aria-label="Naar de homepage">
          <span className="block h-3 w-3 shrink-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-150" />
          <span className="display truncate text-base leading-none tracking-tight sm:text-xl">
            Web Agency
            <span className="text-primary"> Twente</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hoofdmenu">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm font-medium tracking-tight after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              Start een project
            </Link>
          </Magnetic>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-ink-foreground md:hidden ${
            open ? "invisible" : ""
          }`}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 3.4rem)", opacity: 0.6 }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 3.4rem)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 3.4rem)", opacity: 0.4 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-ink text-ink-foreground md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobiel menu"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
            />

            <div className="flex items-center justify-between px-5 pt-4">
              <span className="display text-base leading-none tracking-tight">
                Web Agency<span className="text-primary"> Twente</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menu sluiten"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-foreground/25 text-ink-foreground transition-colors hover:bg-primary hover:border-primary"
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav
              className="relative flex flex-1 flex-col justify-center gap-1 overflow-y-auto overscroll-contain px-5 pb-6"
              aria-label="Mobiele navigatie"
            >
              {[...nav, { to: "/contact", label: "Contact" } as const].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="display group flex items-baseline gap-3 border-b border-ink-foreground/10 py-4 text-[clamp(2.25rem,11vw,3.5rem)] leading-[0.95] tracking-tight transition-colors hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                  >
                    <span className="text-[0.6rem] font-semibold tracking-[0.3em] text-ink-foreground/40">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <Link
                to="/website-scan"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground"
              >
                Doe de gratis website scan
              </Link>
              <p className="mt-4 text-xs tracking-widest uppercase text-ink-foreground/50">
                Web Agency Twente — Enschede
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
