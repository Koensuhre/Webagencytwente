# Mail loskoppelen van Lovable, scan blijft zoals hij is

## 1. Wat ik heb gevonden

### Wie roept de scan aan
- `src/routes/website-scan.tsx` → `src/components/site/scan/WebsiteScanExperience.tsx` (client)
- `src/lib/scan.functions.ts` → `runWebsiteScan` (server function) en `submitScanLead`
- `src/lib/scan.server.ts` → alle scanlogica: `fetchPageSpeed`, `fetchPageSnapshot`, `summariseWithAi`, `buildScanResult`

### Wie verstuurt e-mail
- `src/lib/email-templates/send-email.ts` → de enige verzendhelper (`sendTemplateEmail`)
- `src/lib/contact.functions.ts` → beheerdersmail + bevestigingsmail
- `src/lib/scan.functions.ts` → scan-notificatiemail
- `src/lib/email-templates/registry.ts` + de drie React-templates
- `src/routes/lovable/email/auth/webhook.ts` en de twee preview-routes → puur Lovable-auth/preview, doen op Vercel niets

### Welke Lovable Cloud-diensten worden echt gebruikt
- **Database (Supabase)**: opslag van aanvragen in `contact_requests` — gebruikt door contact én scan.
- **Lovable mail-API**: verzending van alle mails. Dit is het enige onderdeel dat op Vercel breekt.
- **De scan gebruikt géén Lovable Cloud-dienst.** De AI-analyse loopt al rechtstreeks via Google Gemini met je eigen sleutel, PageSpeed via Google, en de pagina-snapshot via een gewone `fetch`. De scan is dus al volledig Vercel-proof; alleen het opslaan van de scan-lead en de notificatiemail hangen aan Cloud/Lovable-mail.

### Environment variables die de code nu leest
| Variabele | Waarvoor | Nodig op Vercel |
| --- | --- | --- |
| `SUPABASE_URL` | opslaan aanvragen (server) | ja |
| `SUPABASE_PUBLISHABLE_KEY` | opslaan aanvragen (server) | ja |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PROJECT_ID` | client-build | ja |
| `GEMINI_API_KEY` | AI-analyse van de scan | ja |
| `PAGESPEED_API_KEY` | Lighthouse-scores (optioneel, zonder sleutel geldt een daglimiet) | aanbevolen |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY` | GA4 | ja |
| `LOVABLE_API_KEY` | mailverzending | **vervalt na dit plan** |

### Dataflow van een website-scan
```text
bezoeker vult URL in  ->  runWebsiteScan (server function)
   -> normalizeInput
   -> parallel: Google PageSpeed API  +  fetch van de homepage-HTML
   -> Google Gemini (function calling) -> 3 observaties
   -> ScanResult terug naar de browser -> kaarten + scores + ambitieslider
bezoeker vult leadformulier in -> submitScanLead
   -> INSERT in contact_requests (Supabase, anon-insert policy)
   -> notificatiemail naar info@webagencytwente.nl
```
Alleen de laatste regel is nu kapot op Vercel.

## 2. Voorstel

Houd je architectuur precies zoals hij is (Lovable = ontwikkeling + Cloud/database, GitHub = bron, Vercel = productie) en haal alleen de mailverzending uit Lovable. Dat geeft één verzendpad dat overal identiek werkt — lokaal, in Lovable-preview én op Vercel — zonder de Lovable API-sleutel buiten Lovable te hoeven zetten.

**Provider: Resend.** Gratis tier ruim voldoende voor formulierverkeer, eenvoudige HTTP-API (geen SDK-gedoe in de Worker/Vercel-runtime), en goede deliverability. Postmark is een prima alternatief als je liever betaalt voor topbezorging.

### Afzenderdomein — belangrijk
`notify.webagencytwente.nl` is via NS-records aan Lovable gedelegeerd; Resend kan daar niets verifiëren. We verifiëren daarom een **apart subdomein**, bijvoorbeeld `mail.webagencytwente.nl` of het hoofddomein `webagencytwente.nl`. De zichtbare afzender blijft `Web Agency Twente <info@webagencytwente.nl>`. De Lovable-delegatie blijft staan en botst niet.

### Wat ik ga bouwen

**A. Verzendlaag vervangen, templates ongemoeid**
`sendTemplateEmail` in `src/lib/email-templates/send-email.ts` blijft dezelfde functie met dezelfde signatuur en dezelfde return-vorm; alleen de laatste stap roept Resend aan in plaats van de Lovable-mail-API. De drie React-templates, de registry, de onderwerpen, de reply-to en de opmaak blijven ongewijzigd.

**B. Scan en e-mail loskoppelen**
`submitScanLead` en `submitContactRequest` slaan de aanvraag op en zetten de mailverzending daarna als losse stap. De opslag is leidend: mislukt de mail, dan is de aanvraag nog steeds in de database bewaard (jij verliest dus nooit een lead). De scanlogica in `scan.server.ts` raak ik niet aan.

**C. Nooit meer stil falen**
Nu wordt een mailfout alleen naar de console geschreven. Ik voeg toe:
- een duidelijke serverlog met de echte foutcode van de provider;
- de bezoeker krijgt bij een mislukte opslag een echte foutmelding in plaats van de bedankpagina;
- een kleine health-check-route (`/api/public/health/email`, beveiligd met een geheime sleutel) waarmee ik en jij in één request kunnen zien of de mailconfiguratie op productie klopt.

**D. Auth-mails**
Die lopen via de Lovable-auth-hook en zijn niet in gebruik op de publieke site (geen login). Die routes laat ik ongewijzigd staan; ze doen op Vercel niets en breken niets.

### Wat jij moet doen
1. Resend-account aanmaken (gratis) en een afzenderdomein toevoegen (`mail.webagencytwente.nl` of het hoofddomein), DNS-records plaatsen.
2. De Resend API-key aan mij aanleveren via het beveiligde invoerveld.
3. In Vercel (Production + Preview) zetten: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `GEMINI_API_KEY`, eventueel `PAGESPEED_API_KEY`, plus de bestaande `VITE_*`-variabelen.
4. Deployen vanuit GitHub.

### Verificatie achteraf
Na de deploy doe ik een echte testinzending op de live site — contactformulier én scan-lead — en controleer ik dat beide mails aankomen en dat beide rijen in de database staan.

## 3. Bestanden die ik wijzig

- `src/lib/email-templates/send-email.ts` — verzendlaag naar Resend, zelfde interface
- `src/lib/contact.functions.ts` — opslag leidend, foutafhandeling zichtbaar
- `src/lib/scan.functions.ts` — idem voor de scan-lead
- `src/routes/api/public/health/email.ts` — nieuw, kleine diagnose-endpoint

Ongewijzigd: alle templates, de registry, `scan.server.ts`, alle formulieren, pagina's en de `/bedankt`-pagina.