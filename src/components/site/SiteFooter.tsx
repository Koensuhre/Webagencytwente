import { Link } from "@tanstack/react-router";

import { Magnetic, Reveal } from "./motion-primitives";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="display display-hero">
            Laten we
            <span className="text-primary"> bouwen</span>
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid gap-7 sm:gap-10 border-t border-ink-foreground/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-ink-foreground/60">Praat met ons</p>
            <a
              href="mailto:hallo@webagencytwente.nl"
              className="mt-2 block text-lg font-semibold hover:text-primary"
            >
              info@webagencytwente.nl
            </a>
            <a href="tel:+31612345678" className="mt-1 block text-lg font-semibold hover:text-primary">
              +31 6 23 81 62 97
            </a>
          </div>
          <div>
            <p className="text-sm text-ink-foreground/60">Waar we zitten</p>
            <p className="mt-2 text-lg font-semibold">Enschede, Twente</p>
            <p className="text-sm text-ink-foreground/60">Werkzaam door heel Nederland</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-ink-foreground/60">Regio</p>
            <Link to="/webdesign-enschede" className="hover:text-primary">
              Webdesign Enschede
            </Link>
            <Link to="/webdesign-hengelo" className="hover:text-primary">
              Webdesign Hengelo
            </Link>
            <Link to="/website-laten-maken-twente" className="hover:text-primary">
              Website laten maken Twente
            </Link>
            <Link to="/seo-twente" className="hover:text-primary">
              SEO Twente
            </Link>
            <Link to="/seo-specialist-enschede" className="hover:text-primary">
              SEO specialist Enschede
            </Link>
            <Link to="/webshop-laten-maken-almelo" className="hover:text-primary">
              Webshop laten maken Almelo
            </Link>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-ink-foreground/60">Pagina&apos;s</p>
            <Link to="/diensten" className="hover:text-primary">
              Diensten
            </Link>
            <Link to="/werk" className="hover:text-primary">
              Werk
            </Link>
            <Link to="/over-ons" className="hover:text-primary">
              Over ons
            </Link>
            <Magnetic>
              <Link
                to="/contact"
                className="mt-2 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Start een project
              </Link>
            </Magnetic>
          </div>
        </div>

        <p className="mt-8 sm:mt-12 text-xs text-ink-foreground/50">
          &copy; {new Date().getFullYear()} Web Agency Twente &mdash; KvK 97451584
        </p>
      </div>
    </footer>
  );
}
