# Fase 2 — echte lokale SEO-pagina's (3 stuks)

We starten met drie volwaardige landingspagina's met unieke tekst. Geen dunne plaatsnaam-kopieën: elke pagina krijgt eigen inhoud, eigen FAQ en eigen metadata.

## De drie pagina's

```text
/webdesign-enschede            Webdesign & website laten maken in Enschede
/seo-twente                    SEO & online vindbaarheid in Twente
/webshop-laten-maken-almelo    Webshop laten maken in Almelo
```

## Opbouw per pagina

Zelfde look & feel als de rest van de site (Coral Blaze, Anton-koppen, bestaande PageShell, reveals).

1. Hero — één H1 met het zoekwoord natuurlijk erin, korte intro, CTA naar contact en naar de gratis website scan.
2. Wat we doen in deze plaats/dienst — 3 tot 4 blokken met concrete uitleg, geen algemene diensttekst.
3. Lokale context — een echte alinea over de plaats en het type ondernemers daar (waarom lokaal vindbaar zijn daar uitmaakt).
4. Werkwijze — de bestaande 4 stappen, kort samengevat in de context van deze pagina.
5. Prijsindicatie — eerlijke bandbreedte, dezelfde bedragen als in de FAQ op de site.
6. FAQ — 4 tot 5 vragen per pagina, uniek geschreven, gericht op de zoekintentie van die pagina.
7. Slot-CTA — bestaande CtaSection.

Geen cases of testimonials op deze pagina's, zoals afgesproken.

## Teksten

Ik schrijf per pagina unieke concepttekst in "wij"-vorm, Nederlands, in dezelfde toon als de rest van de site. Geen keyword stuffing: het zoekwoord komt in de H1, één subkop, de intro en de metadata voor — verder gewoon leesbare taal. Je kunt alles daarna bijschaven.

## SEO en techniek

- Eén databestand `src/lib/local-pages.ts` met per pagina: slug, titel, H1, intro, secties, prijsblok en FAQ. Een nieuwe pagina is later één data-entry plus één routebestand.
- Eén gedeeld sjabloon-component dat die data rendert, zodat de vormgeving overal identiek is.
- Per pagina eigen `head()`: unieke title, description, og:title, og:description, og:type, twitter:card en een canonical.
- Per pagina JSON-LD: `Service` met `areaServed` op de juiste plaats, plus `FAQPage` op basis van de FAQ van die pagina.
- Interne links: de drie pagina's opnemen in de footer onder een kopje "Regio", en vanuit de dienstenpagina linken naar de bijbehorende lokale pagina.
- `sitemap.xml` uitbreiden met de drie nieuwe URL's.

## Buiten scope

Geen wijzigingen aan formulieren, de website scan, e-mail of bestaande pagina-designs. Extra plaatsen en doelgroeppagina's (zzp, mkb) volgen pas als deze drie aanslaan.
