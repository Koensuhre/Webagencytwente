import { Link, useRouterState } from "@tanstack/react-router";
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
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl" : ""
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
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-ink-foreground md:hidden"
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

      {open && (
        <div className="mx-4 mb-4 max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain rounded-2xl border border-ink/10 bg-background/95 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col" aria-label="Mobiel menu">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="display border-b border-ink/10 py-3.5 text-3xl last:border-0"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
