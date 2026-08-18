# GA4 pageviews echt laten binnenkomen (Lovable Analytics blijft intact)

## Wat er nu gebeurt

- Lovable Analytics draait volledig los van GA4 via `/~flock.js` met proxy `/~api/analytics`. Dat script wordt door het hosting-platform ingevoegd, niet door de app-code. Er wordt niets aan geraakt.
- Jouw GA4 ID (`G-KG3DCGHVL6`) komt als `VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY` in de build terecht en zit ook echt in de gepubliceerde bundel.
- `src/lib/analytics.ts` laadt `gtag/js` en `src/routes/__root.tsx` roept bij elke routewissel `trackPageView` aan. Op de live site is gemeten: `googletagmanager.com/gtag/js?id=G-KG3DCGHVL6` laadt wel, maar er gaat **geen enkel** `collect`-verzoek naar Google. Er komt dus wel een tag, maar geen data.

Oorzaak: de lokale `gtag`-helper doet `dataLayer.push(args)` met een echte array. Google's gtag.js verwerkt alleen pushes van het `arguments`-object; een array-push wordt genegeerd, waardoor `js`, `config` en alle `event`-aanroepen (inclusief `page_view`) nooit worden uitgevoerd.

## Wijziging (één bestand)

`src/lib/analytics.ts`:
- `gtag` herschrijven naar de officiële vorm: `function gtag(){ window.dataLayer.push(arguments) }` (niet-arrow, zodat `arguments` bestaat).
- Rest ongewijzigd laten: script-injectie, `config` met `send_page_view: false`, `trackPageView` en `trackEvent` blijven exact zoals ze zijn.

Dat is voldoende. Geen extra Google-tag in de HTML, geen tweede script, geen wijziging aan `__root.tsx`.

## Waarom dit aan je eisen voldoet

- Lovable Analytics (`/~flock.js`) wordt niet aangeraakt en blijft werken.
- Bestaand Measurement ID uit de projectinstellingen wordt gebruikt; geen nieuwe ID.
- Geen dubbele pageviews: `send_page_view: false` blijft staan, dus alleen de eigen router-gestuurde `page_view` vuurt — precies één per navigatie, ook in de SPA/SSR-app.
- Bestaande events (bijv. `generate_lead` bij de contactformulieren) blijven ongewijzigd en gaan nu pas echt de deur uit.

## Verificatie na publiceren

- In DevTools → Network filteren op `collect`: bij paginabezoek en bij klikken naar een andere pagina hoort telkens een `g/collect`-request met `en=page_view` te verschijnen.
- Ook automatisch te controleren met een scriptje tegen de live site (zoals nu gedaan), plus GA4 Realtime.
