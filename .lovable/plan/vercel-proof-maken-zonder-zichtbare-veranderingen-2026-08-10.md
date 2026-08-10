# Vercel-proof maken zonder zichtbare veranderingen

Ja, dat kan. De formulieren, de pagina's, de beheerdersmail en de bevestigingsmail blijven exact hetzelfde. Alleen twee onzichtbare onderdelen wisselen: hoe de aanvraag in de database komt, en welke dienst de mail daadwerkelijk aflevert.

## Wat gelijk blijft

- Alle pagina's, formulieren, stappen, animaties en teksten: ongewijzigd.
- De beheerdersmail naar info@webagencytwente.nl: zelfde opmaak, zelfde velden, zelfde onderwerp, zelfde reply-to (het adres van de inzender).
- De bevestigingsmail aan de inzender: zelfde opmaak, zelfde samenvatting van ingevulde gegevens.
- Afzender blijft `Web Agency Twente <info@webagencytwente.nl>`.
- De `/bedankt`-pagina en de opgeslagen aanvragen blijven werken zoals nu.

## Wat er onder water verandert

1. **Opslaan van aanvragen zonder service-role sleutel**
   Nieuwe databaseregel: alleen "toevoegen" van een contactaanvraag is toegestaan voor bezoekers; lezen, wijzigen en verwijderen blijft dicht. De server schrijft dan met de publieke sleutel in plaats van de admin-sleutel.

2. **Mail via Resend in plaats van de Lovable-mail-API**
   De bestaande e-mailtemplates blijven ongewijzigd; alleen de verzendlaag roept Resend aan. Domein `webagencytwente.nl` moet daarvoor eenmalig in Resend geverifieerd worden (DNS-records). Let op: de bestaande NS-delegatie op `notify.webagencytwente.nl` blijft staan en botst niet, omdat Resend op het hoofddomein wordt geverifieerd.

3. **Build-target voor Vercel**
   De serverbuild staat nu op Cloudflare; die wordt op Vercel gezet zodat de server functions daar draaien.

## Wat jij moet doen

- Een Resend-account aanmaken (gratis tier is genoeg), domein `webagencytwente.nl` toevoegen en de DNS-records plaatsen.
- Een Resend API-key aanleveren.
- In Vercel Production deze variabelen zetten: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `RESEND_API_KEY`, plus `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`, `VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY`. De service-role sleutel en de Lovable API-key zijn dan niet meer nodig.

## Technische uitvoering

- Migratie: `INSERT`-policy `TO anon, authenticated` op `public.contact_requests` (met `GRANT INSERT`), geen `SELECT` voor anon.
- `contact.functions.ts` en `scan.functions.ts`: `supabaseAdmin` vervangen door een server-side publishable client (met de bestaande `apikey`-fetch-shim voor `sb_`-sleutels). `.select("id").single()` vervalt (anon mag niet lezen); het idempotency-id wordt uit een lokaal gegenereerde UUID afgeleid.
- `src/lib/email-templates/send-email.ts`: `sendLovableEmail` vervangen door een Resend `POST /emails`-aanroep met dezelfde `from`, `subject`, `html`, `text` en `reply_to`. Rendering via `@react-email/render` en de registry blijft identiek. Suppressie-afhandeling vervalt (Resend regelt bounces zelf).
- `src/routes/lovable/email/auth/webhook.ts` en de auth-mailroutes zijn Lovable-specifiek; die blijven staan maar doen op Vercel niets (er is daar geen Lovable-auth-hook).
- `vite.config.ts`: nitro-preset op `vercel` zetten.

## Kanttekening

Zolang je ook via Lovable blijft publiceren, draaien beide omgevingen dan op Resend — dat houdt het gedrag identiek op beide plekken.
