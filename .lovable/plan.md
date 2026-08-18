# Contactgegevens corrigeren

Doel: overal exact `info@webagencytwente.nl` en `+31623816297`. Geen wijzigingen aan design, content, tracking of routing.

## Gevonden fouten (geverifieerd in de code)

- `src/components/site/SiteFooter.tsx`: mailto-link wijst naar `hallo@webagencytwente.nl` (de zichtbare tekst is al correct), en de tel-link is `tel:+31612345678` terwijl er `+31 6 23 81 62 97` staat.
- `src/routes/__root.tsx` (Organization/ProfessionalService JSON-LD): `email: "hallo@webagencytwente.nl"`, `telephone: "+31612345678"`.
- `src/components/site/LocalPageTemplate.tsx` (LocalBusiness JSON-LD op alle lokale SEO-pagina's): dezelfde twee foute waarden.

Al correct en niet aangeraakt: contactpagina (`src/routes/contact.tsx`), formulier-notificaties (`contact.functions.ts`, `scan.functions.ts`, `internal-notification.tsx`), e-maildomeinen in `send-email.ts`.

## Aanpassingen

1. Footer: `href="mailto:info@webagencytwente.nl"`, `href="tel:+31623816297"`.
2. Root JSON-LD: `email: "info@webagencytwente.nl"`, `telephone: "+31623816297"`.
3. LocalPageTemplate JSON-LD: idem.

## Controle na afloop

Codebase opnieuw doorzoeken op `hallo@`, `12345678`, `0612` en afwijkende `tel:`/`mailto:`-varianten, plus een typecheck. Daarna een korte samenvatting van vindplaatsen, wijzigingen en de eindcontrole.
