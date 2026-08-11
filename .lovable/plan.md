# Resend terugdraaien + advies over Vercel & Lovable Cloud mail

## Deel 1 — Terugdraaien naar de Lovable-mailflow

De Resend-wijziging zit in twee commits en raakt vier bestanden. Ik zet die terug naar de exacte situatie ervoor.

### 1. `src/lib/email-templates/send-email.ts` — volledig terug naar de originele versie
- `sendLovableEmail` en `EmailAPIError` uit `@lovable.dev/email-js` weer importeren.
- Sleutel weer `LOVABLE_API_KEY`; de Resend-sleutel verdwijnt uit de code.
- Payload weer in Lovable-vorm: `sender_domain: notify.webagencytwente.nl`, `purpose: 'transactional'`, `label`, `idempotency_key`, `reply_to`.
- `recipient_suppressed` weer via `EmailAPIError.code` in plaats van via een HTTP-403-tekstcheck.
- Signatuur, returnvorm (`{ sent: true }` / `{ sent: false, reason }`), templates, onderwerpen, afzender `Web Agency Twente <info@webagencytwente.nl>` en reply-to blijven identiek.

### 2. `src/lib/contact.functions.ts` en `src/lib/scan.functions.ts` — logregels terug naar origineel
Alleen de logging is destijds meegewijzigd (de `mailError.message`-vorm en de extra `if (!result.sent)`-regels). Die zet ik terug naar de oorspronkelijke `console.error("[contact] notification email failed", mailError)`-vorm. De volgorde eerst opslaan, daarna mailen in een `try` was al zo vóór Resend en blijft ongewijzigd.

### 3. `src/routes/api/public/health/email.ts` — verwijderen
Deze route is uitsluitend voor de Resend-migratie gemaakt en rapporteert Resend-specifieke config. Verdwijnt volledig.

### Wat ik expliciet niet aanraak
`src/lib/scan.server.ts` en de hele scan-flow, alle e-mailtemplates en de registry, de formulieren, de `/bedankt`-pagina, Supabase-opslag, redirects, routes en de auth-mailwebhook.

### Controle achteraf
- Zoeken op `resend` in de hele `src`-map: moet nul treffers geven.
- Controleren dat `LOVABLE_API_KEY` de enige sleutel is die de mailverzending gebruikt (`LOVABLE_SEND_URL` blijft een optionele endpoint-override, geen sleutel).
- Testinzending van contactformulier en scan-lead in de preview, plus controle in de e-maillogs dat beide mails vertrekken.

## Deel 2 — Antwoord op je architectuurvragen (nog geen code)

**Welk endpoint verstuurt de mail?**
Geen eigen server function en geen edge function. `sendTemplateEmail` rendert de React-template in je eigen servercode en doet daarna één HTTPS-POST naar de mail-API van Lovable (via de helper `sendLovableEmail` uit `@lovable.dev/email-js`). Lovable verzorgt daarna bezorging, retries, rate limits, suppressielijst en unsubscribe. Je app bevat dus geen wachtrij of mailtabel.

**Kan dat vanuit Vercel?**
Technisch ja. Het is een gewone HTTPS-aanroep naar een publiek endpoint; er zit niets in dat vereist dat de code op Lovable-infrastructuur draait. Enige voorwaarde: `LOVABLE_API_KEY` moet als server-side environment variable in je Vercel-deployment staan.

**Welke authenticatie?**
Alleen die ene sleutel, als bearer-token. Geen extra secret, geen OAuth. Daarnaast moet het afzenderdomein `notify.webagencytwente.nl` geverifieerd blijven (NS-delegatie); dat staat al goed en verandert niet door andere hosting.

**Is daar een bestaande Lovable-variabele voor bedoeld?**
`LOVABLE_API_KEY` wordt automatisch aangemaakt en geïnjecteerd in de Lovable-runtime, bedoeld voor de servercode van dit project. Er bestaat geen officiële export-flow om hem elders neer te zetten.

**Officieel ondersteund of workaround?**
Workaround. Het ondersteunde pad is publiceren via Lovable, waar de sleutel automatisch aanwezig is. Buiten Lovable werkt hij wel, maar:
- bij rotatie stopt de oude sleutel binnen een uur en breekt je Vercel-mail stil;
- de sleutel staat op een plek buiten Lovable's beheer;
- dezelfde sleutel geeft ook toegang tot de AI Gateway en connectors van dit project, dus lekken kost meer dan alleen mail.

**Blijft de website scan ongemoeid?**
Ja, volledig. De scan gebruikt geen Lovable Cloud-dienst: PageSpeed via Google, pagina-snapshot via een gewone `fetch`, AI-analyse via je eigen `GEMINI_API_KEY`. Alleen het opslaan van de scan-lead (database) en de notificatiemail hangen aan de gedeelde infrastructuur.

**Aanbevolen architectuur bij VS Code → GitHub → Vercel**

Optie A (jouw gewenste setup, werkend te krijgen): Vercel host de site, de database blijft zoals hij is, en mail blijft via de Lovable-mail-API met `LOVABLE_API_KEY` als env var in Vercel (Production én Preview). Zet daarbij ook `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `GEMINI_API_KEY`, eventueel `PAGESPEED_API_KEY` en de bestaande `VITE_*`. Risico: rotatie van de sleutel breekt mail stil, dus na elke rotatie bijwerken.

Optie B (meest wrijvingsloos): publiceren via Lovable en je eigen domein daaraan koppelen. Alles blijft binnen één omgeving, sleutels worden automatisch geïnjecteerd, GitHub blijft de bron en VS Code je editor. Je verliest alleen Vercel-specifieke features.

Mijn advies: wil je Vercel houden, ga voor optie A en accepteer bewust dat de mailsleutel een gekopieerd secret is dat je na elke rotatie moet bijwerken. Wil je die afhankelijkheid niet, dan is een eigen mailprovider juist robuuster — maar dat is precies wat je nu terugdraait, dus optie A.

## Volgorde
Eerst terugdraaien en testen. Daarna, als je optie A kiest, geef ik exact aan welke variabelen in Vercel moeten staan.