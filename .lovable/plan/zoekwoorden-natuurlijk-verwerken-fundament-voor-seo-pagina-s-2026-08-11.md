# Zoekwoorden natuurlijk verwerken + fundament voor SEO-pagina's

Doel: de belangrijkste zoekwoorden op een natuurlijke manier in de bestaande teksten verwerken, en meteen de structuur neerzetten waarop we later losse SEO-pagina's kunnen bouwen.

## Advies vooraf (kort)

Je lijst bevat ruwweg 120 varianten. Die passen nooit natuurlijk op 5 pagina's — en dat hoeft ook niet. De verdeling die werkt:

- **Bestaande pagina's**: alleen de brede, commerciële kernwoorden (webdesign Twente, website laten maken, webdevelopment, SEO Twente, webshop laten maken, logo laten ontwerpen, AI SEO/AEO, marketingbureau Twente).
- **Later: dienst x plaats-pagina's**: alle `[dienst] [plaatsnaam]`-varianten. Elk zoekwoord met een plaatsnaam verdient een eigen pagina met eigen inhoud, niet een zin op de homepage.
- **Later: doelgroeppagina's**: zzp, mkb, starters, startups, kleine bedrijven, betaalbaar.

Woorden als "goedkope website laten maken" zou ik bewust laten liggen of vertalen naar "betaalbaar" — het trekt de verkeerde aanvragen en past niet bij je positionering.

## Fase 1 — dit doen we nu (teksten in bestaande pagina's)

Alle wijzigingen zijn tekstueel; het design en de layout blijven ongewijzigd.

**Home (`/`)**
- Hero-intro: "Design, development en merk" wordt een zin die "webdesign en website laten maken in Twente" natuurlijk bevat.
- Nieuwe korte alinea onder de dienstensectie waarin we in gewone taal benoemen dat we werken voor ondernemers in Enschede, Hengelo, Almelo en de rest van Overijssel.
- FAQ uitbreiden met 2 vragen die echte zoekintenties dekken: "Wat kost een website voor zzp of mkb?" en "Hoe zorgen jullie dat we hoger in Google komen (en zichtbaar zijn in ChatGPT)?" Deze rollen automatisch mee in de bestaande FAQ-schema.
- Title/description iets aanscherpen richting "webdesign & SEO in Twente".

**Diensten (`/diensten`)**
- Dienstteksten in `src/lib/site-data.ts` licht herschrijven zodat de natuurlijke termen erin staan: webdevelopment, webshop laten maken (WooCommerce/Shopify), logo laten ontwerpen, zoekmachine optimalisatie, online vindbaarheid, AEO / answer engine optimalisatie / vindbaar in ChatGPT.
- Eén dienst toevoegen: **Webshops / e-commerce** — die ontbreekt nu terwijl je er veel zoekwoorden voor hebt.
- Intro-tekst met "website of webshop laten maken in Twente".

**Werk, Over ons, Contact, Website scan**
- Intro's en meta-teksten aanscherpen met "webbouwer in Twente", "marketingbureau Twente", "beter gevonden worden in Google".

**Techniek**
- JSON-LD `LocalBusiness` uitbreiden met `areaServed` (Enschede, Hengelo, Almelo, Overijssel) en een `Service`-lijst.
- Unieke title + description per pagina blijven behouden, geen keyword stuffing.

## Fase 2 — voorbereiden, nog niet publiceren

Een herbruikbaar sjabloon voor lokale dienstpagina's, gevoed vanuit één databestand, zodat een nieuwe pagina straks één regel data is:

```text
/webdesign-enschede        /seo-enschede        /webshop-laten-maken-almelo
/webdesign-hengelo         /seo-hengelo         /website-laten-maken-zzp
/webdesign-almelo          /seo-almelo          /website-laten-maken-mkb
```

Belangrijk: elke pagina krijgt eigen, echte inhoud (lokale context, prijsindicatie, cases, FAQ). Dun gekopieerde plaatsnaam-pagina's worden door Google genegeerd of afgestraft. Daarom bouwen we die pas als je akkoord bent op tekst per pagina — voorstel: starten met 3 pagina's (webdesign Enschede, SEO Twente, webshop laten maken Almelo) en pas uitbreiden als die aanslaan.

Sitemap en interne links (footer + dienstenpagina) worden dan meteen bijgewerkt.

## Buiten scope nu

Geen nieuwe pagina's live in fase 1, geen wijziging aan formulieren, scan of e-mail.
