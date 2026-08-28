# Nieuwe social preview-afbeelding (og:image) voor alle pagina's

## Doel
De huidige og:image (een oude storage-URL) vervangen door een nieuw, sterk herkenbaar branded beeld in de Coral Blaze-stijl, dat geldt voor de hele site.

## Stappen

1. **Afbeelding ontwerpen** — genereer een 1200×630 OG-afbeelding: off-white `#f5f3ee` achtergrond, grote zwarte Anton-headline "Web Agency Twente — Websites die je onthoudt", koraal/oranje/paarse vormen uit het bestaande palet. Opgeslagen als `public/og-image.png` (zodat hij via een stabiele, absolute URL bereikbaar is).

2. **Metadata aanpassen**
   - `src/routes/__root.tsx`: `og:image` en `twitter:image` vervangen door `https://webagencytwente.nl/og-image.png`, plus `og:image:width`/`og:image:height` (1200×630) en `og:image:alt`. Dit geldt als default voor álle pagina's (er zijn geen leaf-routes met een eigen og:image).
   - Verder niets aan titels, descriptions, canonical, JSON-LD, analytics of andere code wijzigen.

3. **Controleren** — preview HTML checken op de nieuwe absolute URL; bevestigen dat de afbeelding publiek bereikbaar is.

## Technisch
- Absolute URL vereist voor social crawlers: `https://webagencytwente.nl/og-image.png`.
- Bestaande `twitter:card: summary_large_image` blijft, dus de nieuwe afbeelding toont groot.

## Let op
Crawlers (Facebook/LinkedIn/WhatsApp) cachen de oude preview; na publicatie kan het even duren. Eventueel verversen via de Facebook Sharing Debugger / LinkedIn Post Inspector.
