# AI-analyse van de scan ombouwen naar eigen Google Gemini API-key

## Doel
De AI-analyse in de website-scan draait nu via de Lovable AI-gateway (`LOVABLE_API_KEY`), die niet op Vercel gezet kan worden. We zetten deze om naar Google Gemini via Google AI Studio met een eigen API-key, zodat de analyse óók op Vercel werkt. Visueel en in de mail verandert niets.

## Wat gelijk blijft
- De scan-flow, kaarten, scores, progress-animatie, leadformulier en alle pagina's: ongewijzigd.
- De beheerdersmail en bevestigingsmail: ongewijzigd.
- Het fallback-gedrag: als er geen key is of de call faalt, krijgt de bezoeker gewoon de basisanalyse (de bestaande `FALLBACK_CARDS`) te zien.

## Wat er verandert

### 1. Nieuwe secret: `GEMINI_API_KEY`
- Jij maakt een gratis key aan in Google AI Studio (aistudio.google.com) en levert die via de veilige secret-form aan.
- Op Vercel zet je dezelfde `GEMINI_API_KEY` in je Production environment variables.

### 2. `summariseWithAi` in `src/lib/scan.server.ts` ombouwen
- Vervang de `fetch` naar `https://ai.gateway.lovable.dev/v1/chat/completions` met een directe aanroep van de Google Generative Language API:
  `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=GEMINI_API_KEY`
- Behoud dezelfde prompt, dezelfde Nederlandse system-instructie en dezelfde gestructureerde output (drie velden: design, vindbaarheid, conversie) via Gemini function calling (`tools` / `functionDeclarations` + `toolConfig.functionCallingConfig.mode = "ANY"`).
- Lees `process.env["GEMINI_API_KEY"]` (vervangt de `LOVABLE_API_KEY`-check).
- Fallback blijft: geen key of een fout → `null` retourneren → `buildScanResult` valt terug op `FALLBACK_CARDS`. De bezoeker krijgt dus altijd een resultaat.

### 3. Geen Lovable-gateway-afhankelijkheid meer in de scan
- Na de ombouw gebruikt de scan alleen nog `GEMINI_API_KEY` (en `PAGESPEED_API_KEY` indien aanwezig). `LOVABLE_API_KEY` is voor de scan niet meer nodig.

## Wat jij moet doen
1. Een key aanmaken in Google AI Studio (gratis) en via de secret-form aanleveren als `GEMINI_API_KEY`.
2. Op Vercel Production `GEMINI_API_KEY` (en zo gewenst `PAGESPEED_API_KEY`) toevoegen.
3. Publiceren zodat de wijziging live staat.

## Technische uitvoering (samengevat)
- `src/lib/scan.server.ts`: `summariseWithAi` herschrijven naar Google Generative Language API met function calling; fallback op `null`.
- Secret `GEMINI_API_KEY` toevoegen.
- Geen andere bestanden raken; geen visuele of mail-wijzigingen.
