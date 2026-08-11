# Waarom de formuliermails niet aankomen

## Wat ik heb gecontroleerd

- Het e-maildomein `notify.webagencytwente.nl` is **geverifieerd en actief**. Daar ligt het niet aan.
- `info@webagencytwente.nl` staat **niet geblokkeerd** (geen suppressie).
- In het verzendlogboek staan de laatste succesvolle mails op **11 augustus 05:08 UTC** — dat waren testinzendingen vanuit de Lovable-omgeving. Van jouw latere inzendingen (contact + website scan) staat **geen enkel verzendevent** in het logboek.
- De live site `webagencytwente.nl` wordt geserveerd door **Vercel** (301 naar `www.`, header `server: Vercel`), niet door de Lovable-publicatie.

## De oorzaak

De sleutel die nodig is om via Lovable mail te versturen wordt alleen automatisch meegegeven in de Lovable-omgeving. Op Vercel ontbreekt die, dus de verzendstap mislukt daar meteen. Omdat de mailverzending in de code in een stille foutafhandeling zit, ziet de bezoeker gewoon de bedankpagina en merkt niemand dat er niets verstuurd is. Precies wat jij ziet: formulier lijkt te werken, geen mail.

## Voorstel

**Stap 1 — verzending op Vercel laten werken**
In Vercel (Production én Preview) de ontbrekende omgevingsvariabelen zetten:
- de Lovable API-sleutel voor mailverzending
- `SUPABASE_URL` en `SUPABASE_PUBLISHABLE_KEY` (nodig voor het opslaan van aanvragen)

Daarna één keer opnieuw deployen.

**Stap 2 — nooit meer stil falen**
De contact- en scanverzending aanpassen zodat een mislukte mail zichtbaar wordt in plaats van weggeslikt:
- server-side een duidelijke logregel met de echte foutcode
- de bezoeker krijgt alleen de bedankpagina als de aanvraag ook echt is verwerkt
- ontbreekt de mailsleutel, dan komt dat direct als fout naar boven in plaats van onzichtbaar te blijven

**Stap 3 — verificatie**
Na de deploy een echte testinzending op de live site (contactformulier én website scan), en het verzendlogboek terugleggen om te bevestigen dat zowel de beheerdersmail als de bevestigingsmail als verstuurd verschijnen.

## Alternatief

Wil je Vercel niet aanhouden, dan is de simpelste oplossing het domein terugzetten op de Lovable-publicatie: daar werkt mailverzending zonder extra instellingen of omgevingsvariabelen.

## Technische details

- Live host bevestigd via response-headers (`server: Vercel`); de Lovable-publicatie draait apart op `webagencytwente.lovable.app`.
- `src/lib/email-templates/send-email.ts` gooit `LOVABLE_API_KEY is not configured` wanneer de variabele ontbreekt.
- `src/lib/contact.functions.ts` en `src/lib/scan.functions.ts` vangen die fout in `try/catch` met alleen `console.error` — vandaar het stille falen.
- De codewijziging beperkt zich tot die twee bestanden plus de verzendhelper; templates, formulieren en pagina's blijven ongewijzigd.