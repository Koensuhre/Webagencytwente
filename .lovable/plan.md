# Web Agency Twente — premium agency site

Een Nederlandstalige, award-worthy one-brand website met bold typografie, warme "Coral Blaze" kleuren en veel beweging. Alle teksten in "wij"-vorm.

## Look & feel

- Palet: off-white `#f5f3ee` als basis, koraal `#ff5a3c` als primair accent, oranje `#ff9f1c` als secundair, diep paars `#4b1fd6` voor contrastblokken. Zwart voor typografie.
- Oversized, vette display-typografie (headlines over meerdere regels), strak body-lettertype.
- Asymmetrische composities, overlappende secties, kleurblokken, glaseffecten waar het past.

## Pagina's

- `/` Home — de volledige structuur hieronder
- `/diensten` — alle negen diensten uitgewerkt
- `/werk` — projecten (fictieve cases)
- `/over-ons` — verhaal, aanpak, "wij"-toon
- `/contact` — werkend formulier

Elke pagina krijgt eigen SEO-titels, meta-omschrijvingen en social preview-tags; lokale SEO-signalen voor Twente (Enschede, Hengelo, Almelo) via JSON-LD LocalBusiness.

## Homepage-structuur

1. Fullscreen hero: enorme headline ("WIJ BOUWEN WEBSITES DIE JE ONTHOUDT"), bewegende gradient-achtergrond, zwevende vormen, parallax op muisbeweging, magnetische CTA.
2. Trusted by — lopende logobalk (marquee).
3. Diensten — interactieve lijst/kaarten met hover-reveal, negen diensten.
4. Uitgelicht werk — grote projectkaarten met parallax-beeld en hover-zoom.
5. Waarom Web Agency Twente — kleurblok met tellende cijfers.
6. Proces in 4 stappen — horizontaal scrollende sectie.
7. Testimonials — slider met fictieve quotes.
8. FAQ — accordion.
9. Grote CTA-sectie met paars kleurblok.
10. Footer — minimaal, met contact en socials.

Alle secties krijgen scroll-reveals, text-reveals en subtiele motion; op mobiel en bij `prefers-reduced-motion` schakelen zware effecten terug zodat de site snel en toegankelijk blijft.

## Contactformulier

Lovable Cloud wordt aangezet. Aanvragen (naam, e-mail, bedrijf, dienst, bericht) worden opgeslagen in een `contact_requests`-tabel. Inzenden mag publiek; uitlezen alleen voor ingelogde beheerders. E-mailnotificatie kunnen we later toevoegen.

## Technisch

- De stack hier is React + TanStack Start + Tailwind CSS (geen Next.js) — functioneel gelijkwaardig, met server-side rendering en betere SEO out of the box.
- Animaties met Motion (Framer Motion) plus een lichte smooth-scroll; kleurtokens en fonts als design tokens in `src/styles.css`.
- Mobile-first, semantische HTML, één H1 per pagina, alt-teksten, toetsenbordnavigatie.
- Beelden voor hero en projecten worden gegenereerd in de stijl van het palet.

## Later toe te voegen

Echte projectbeelden, klantlogo's en teksten vervangen de placeholders; e-mailnotificatie bij contactaanvragen.
