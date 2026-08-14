export type LocalFaq = { q: string; a: string };

export type LocalBlock = { title: string; text: string };

export type LocalPage = {
  slug: string;
  serviceName: string;
  breadcrumbLabel: string;
  areaServed: string[];
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  eyebrow: string;
  h1Lines: string[];
  intro: string;
  blocksTitle: string;
  blocks: LocalBlock[];
  contextTitle: string;
  contextParagraphs: string[];
  priceTitle: string;
  priceIntro: string;
  priceRows: { label: string; price: string; note: string }[];
  faqs: LocalFaq[];
};

export const localPages: LocalPage[] = [
  {
    slug: "webdesign-enschede",
    serviceName: "Webdesign en website laten maken",
    breadcrumbLabel: "Webdesign Enschede",
    areaServed: ["Enschede", "Twente", "Overijssel"],
    metaTitle: "Webdesign Enschede — website laten maken | Web Agency Twente",
    metaDescription:
      "Webdesign in Enschede: wij ontwerpen en bouwen websites die snel laden, goed scoren en klanten opleveren. Vaste prijs vooraf, live in 4 tot 6 weken.",
    ogTitle: "Webdesign Enschede — website laten maken",
    ogDescription:
      "Een website laten maken in Enschede door een lokaal webdesignbureau. Eigen ontwerp, snelle techniek en SEO vanaf dag één.",
    eyebrow: "Enschede",
    h1Lines: ["Webdesign", "in Enschede"],
    intro:
      "Wij zijn een webdesignbureau uit Enschede. Als je hier een website wilt laten maken, krijg je bij ons geen template met een ander logo erop, maar een ontwerp dat past bij jouw bedrijf — en techniek die daar niet aan onderdoet.",
    blocksTitle: "Wat we voor Enschedese bedrijven doen",
    blocks: [
      {
        title: "Ontwerp met een eigen gezicht",
        text: "We beginnen bij jullie verhaal en klanten, niet bij een sjabloon. Je krijgt een ontwerp dat je ook op straat herkent: eigen typografie, eigen kleur, eigen ritme.",
      },
      {
        title: "Techniek die niet in de weg zit",
        text: "We bouwen zelf, met moderne code. Snelle laadtijden op mobiel, nette structuur voor Google en een CMS waarin je zonder hulp een tekst of foto kunt aanpassen.",
      },
      {
        title: "Vindbaar in Enschede",
        text: "Elke site die we opleveren heeft de SEO-basis op orde: koppenstructuur, laadsnelheid, gestructureerde data en een Google Bedrijfsprofiel dat klopt. Zo word je gevonden door mensen die hier in de buurt zoeken.",
      },
      {
        title: "Na de livegang blijven we bereikbaar",
        text: "Updates, back-ups en kleine aanpassingen kunnen we uit handen nemen. Je hoeft niet te bellen met een servicedesk in een ander land — je krijgt gewoon ons.",
      },
    ],
    contextTitle: "Waarom lokaal verschil maakt",
    contextParagraphs: [
      "Enschede is een stad van makers, studenten en zelfstandigen. Van een installatiebedrijf op de Josink Es tot een praktijk in de Roombeek: de meeste aanvragen komen van mensen die binnen een straal van tien kilometer zoeken. Wie in die zoekresultaten mist, mist dus letterlijk klanten uit de eigen wijk.",
      "Daarom bouwen we websites die niet alleen mooi zijn, maar ook duidelijk maken waar je zit, wat je doet en voor wie. Even langskomen voor een gesprek kan altijd — we zitten hier zelf.",
    ],
    priceTitle: "Wat kost het",
    priceIntro:
      "Je krijgt na het kennismakingsgesprek een vaste prijs. Geen nacalculatie, geen open eind.",
    priceRows: [
      { label: "Starterswebsite", price: "vanaf € 500", note: "Eén sterke pagina, snel live." },
      { label: "Zakelijke website", price: "€ 1.500 – € 3.500", note: "Meerdere pagina's, teksten en SEO-basis." },
      { label: "Maatwerk", price: "vanaf € 3.500", note: "Merk, koppelingen of een groter platform." },
    ],
    faqs: [
      {
        q: "Werken jullie ook echt vanuit Enschede?",
        a: "Ja. We zitten in Enschede en werken voor ondernemers in de hele regio. Afspreken kan bij jou op kantoor, bij ons of digitaal.",
      },
      {
        q: "Hoe lang duurt een website laten maken?",
        a: "Een landingspagina staat er meestal binnen twee weken. Een complete website duurt vier tot zes weken, afhankelijk van hoe snel we teksten en beeld hebben.",
      },
      {
        q: "Kan ik zelf mijn website aanpassen?",
        a: "Ja. Je krijgt een eenvoudig CMS en een korte uitleg. Wil je het liever uit handen geven, dan doen wij het onderhoud.",
      },
      {
        q: "Doen jullie ook de teksten en foto's?",
        a: "We schrijven graag mee en helpen met de opzet. Voor fotografie werken we samen met vaste fotografen uit de regio.",
      },
      {
        q: "Nemen jullie mijn bestaande website over?",
        a: "Vaak wel. We kijken eerst wat er staat en of doorbouwen slimmer is dan opnieuw beginnen. Doe anders eerst onze gratis website scan.",
      },
    ],
  },
  {
    slug: "seo-twente",
    serviceName: "SEO en online vindbaarheid",
    breadcrumbLabel: "SEO Twente",
    areaServed: ["Twente", "Enschede", "Hengelo", "Almelo", "Overijssel"],
    metaTitle: "SEO Twente — beter gevonden worden in Google | Web Agency Twente",
    metaDescription:
      "SEO in Twente: techniek, content en structuur die samen zorgen dat je hoger in Google komt — en zichtbaar bent in ChatGPT en AI Overviews.",
    ogTitle: "SEO Twente — beter gevonden worden in Google",
    ogDescription:
      "Zoekmachine optimalisatie voor bedrijven in Twente. Geen trucjes, wel techniek, content en meetbare groei.",
    eyebrow: "Twente",
    h1Lines: ["SEO", "in Twente"],
    intro:
      "Hoger in Google komen is geen truc, maar een optelsom: een site die technisch klopt, teksten die antwoord geven op wat mensen zoeken, en een structuur die zoekmachines begrijpen. Dat is precies waar wij aan werken voor bedrijven in Twente.",
    blocksTitle: "Hoe wij aan vindbaarheid werken",
    blocks: [
      {
        title: "Technische SEO",
        text: "Laadsnelheid, mobiele weergave, indexatie, interne links en gestructureerde data. Zonder dat fundament heeft de rest weinig zin.",
      },
      {
        title: "Zoekwoorden die iets opleveren",
        text: "We kijken niet naar zoekvolume alleen, maar naar intentie. Liever tien bezoekers die een offerte aanvragen dan duizend die wegklikken.",
      },
      {
        title: "Content die antwoord geeft",
        text: "Dienstpagina's, lokale pagina's en uitleg die echt informeert. Geschreven voor mensen, opgebouwd zodat zoekmachines het meteen snappen.",
      },
      {
        title: "AEO: zichtbaar in AI-antwoorden",
        text: "Steeds meer mensen zoeken via ChatGPT, Perplexity en Google AI Overviews. We maken jullie content citeerbaar, zodat je ook in die antwoorden voorkomt.",
      },
    ],
    contextTitle: "Twente is een eigen markt",
    contextParagraphs: [
      "In Twente concurreer je zelden met heel Nederland. Je concurreert met een handvol bedrijven uit Enschede, Hengelo, Almelo, Oldenzaal en Borne. Dat maakt het speelveld overzichtelijk: met de juiste opzet sta je hier sneller bovenaan dan in de Randstad.",
      "Tegelijk zijn de lokale zoekresultaten kwetsbaar. Een verouderd Google Bedrijfsprofiel, dubbele adresgegevens of een trage site kosten direct posities. Daar beginnen we, en daarna bouwen we uit.",
    ],
    priceTitle: "Wat kost SEO",
    priceIntro:
      "We werken liever met een duidelijk traject dan met een vaag maandbedrag. Je weet vooraf wat je krijgt.",
    priceRows: [
      { label: "SEO-scan en plan", price: "vanaf € 450", note: "Analyse, prioriteiten en een concreet stappenplan." },
      { label: "Eenmalige optimalisatie", price: "€ 950 – € 2.500", note: "Techniek, structuur en bestaande teksten." },
      { label: "Doorlopend", price: "vanaf € 450 p/m", note: "Content, monitoring en maandelijkse rapportage." },
    ],
    faqs: [
      {
        q: "Hoe snel zie ik resultaat van SEO?",
        a: "Technische verbeteringen tellen soms binnen weken mee. Voor stevige posities op commerciële zoekwoorden reken je realistisch op drie tot zes maanden.",
      },
      {
        q: "Kunnen jullie een eerste plek garanderen?",
        a: "Nee, en iedereen die dat wel belooft, moet je wantrouwen. Wat we wel doen: laten zien wat er verandert in posities, verkeer en aanvragen.",
      },
      {
        q: "Werkt SEO ook voor kleine bedrijven en zzp'ers?",
        a: "Juist wel. Lokaal is de concurrentie beperkt, dus met een nette site en een goed Google Bedrijfsprofiel kom je in Twente al ver.",
      },
      {
        q: "Wat is AEO precies?",
        a: "Answer engine optimalisatie: je content zo opbouwen dat AI-assistenten hem begrijpen en citeren. Denk aan heldere vraag-antwoordstructuren en gestructureerde data.",
      },
      {
        q: "Moet mijn website hiervoor opnieuw?",
        a: "Niet altijd. We kijken eerst wat de huidige site aankan. Soms is optimaliseren genoeg, soms is opnieuw bouwen goedkoper op termijn.",
      },
    ],
  },
  {
    slug: "webshop-laten-maken-almelo",
    serviceName: "Webshop laten maken",
    breadcrumbLabel: "Webshop laten maken Almelo",
    areaServed: ["Almelo", "Twente", "Overijssel"],
    metaTitle: "Webshop laten maken in Almelo | Web Agency Twente",
    metaDescription:
      "Een webshop laten maken in Almelo: Shopify, WooCommerce of maatwerk. Snel, overzichtelijk en gebouwd om te verkopen. Vaste prijs vooraf.",
    ogTitle: "Webshop laten maken in Almelo",
    ogDescription:
      "Wij bouwen webshops voor ondernemers in Almelo en omgeving. Shopify, WooCommerce of maatwerk — inclusief betalingen en koppelingen.",
    eyebrow: "Almelo",
    h1Lines: ["Webshop laten", "maken in Almelo"],
    intro:
      "Een webshop is meer dan een lijst producten. Hij moet snel zijn, vertrouwen wekken en je klant zonder gedoe naar de kassa brengen. Dat bouwen we voor ondernemers in Almelo en de rest van Twente.",
    blocksTitle: "Zo pakken we een webshop aan",
    blocks: [
      {
        title: "Het juiste platform",
        text: "Shopify als je snel wilt starten en weinig gedoe wilt. WooCommerce als je al met WordPress werkt. Maatwerk als je product of proces niet in een standaardpakket past. We kiezen op basis van jouw situatie, niet op basis van gewoonte.",
      },
      {
        title: "Productstructuur die klopt",
        text: "Categorieën, filters, varianten en zoekfunctie. Als klanten je product niet binnen drie klikken vinden, kopen ze het niet.",
      },
      {
        title: "Betalingen en koppelingen",
        text: "iDEAL, creditcard, Bancontact en achteraf betalen. Plus koppelingen met je voorraad, boekhouding of verzendpartner, zodat je niets dubbel invoert.",
      },
      {
        title: "Verkopen na de livegang",
        text: "We meten wat er gebeurt in de shop en verbeteren waar het lekt: productpagina's, checkout, verzendkosten. Kleine aanpassingen, direct zichtbaar in de omzet.",
      },
    ],
    contextTitle: "Ondernemen in Almelo",
    contextParagraphs: [
      "Almelo heeft veel bedrijven die van oudsher lokaal verkopen: winkels in het centrum, groothandels op het Bedrijvenpark Twente, specialisten met een vaste klantenkring. Online verkopen is voor die bedrijven vaak geen vervanging van de winkel, maar een tweede toonbank die 's avonds openblijft.",
      "Daar houden we rekening mee. We bouwen webshops die passen bij hoe je nu al werkt — inclusief afhalen in de winkel, offertes op aanvraag of zakelijke prijzen voor vaste klanten.",
    ],
    priceTitle: "Wat kost een webshop",
    priceIntro: "Een webshop is meer werk dan een website. Ook hier krijg je vooraf een vaste prijs.",
    priceRows: [
      { label: "Shopify-start", price: "vanaf € 2.500", note: "Eigen ontwerp op Shopify, klaar om te verkopen." },
      { label: "WooCommerce", price: "€ 3.500 – € 6.000", note: "Volledige controle, koppelingen met bestaande systemen." },
      { label: "Maatwerk e-commerce", price: "op aanvraag", note: "Complexe producten, B2B-prijzen of eigen logica." },
    ],
    faqs: [
      {
        q: "Shopify of WooCommerce — wat is beter?",
        a: "Shopify is sneller live en vraagt weinig onderhoud, maar kost maandelijks. WooCommerce geeft meer vrijheid en is goedkoper in gebruik, maar vraagt meer beheer. We adviseren op basis van je producten en team.",
      },
      {
        q: "Kunnen jullie mijn bestaande webshop overzetten?",
        a: "Ja. We migreren producten, klanten en bestellingen, en zetten redirects klaar zodat je bestaande posities in Google niet kwijtraakt.",
      },
      {
        q: "Hoe lang duurt het bouwen van een webshop?",
        a: "Reken op zes tot tien weken, afhankelijk van het aantal producten en de koppelingen die nodig zijn.",
      },
      {
        q: "Regelen jullie ook de koppeling met mijn boekhouding?",
        a: "Vaak wel. Denk aan Exact, Moneybird of e-Boekhouden, en verzendpartners zoals Sendcloud of MyParcel.",
      },
      {
        q: "Kan ik zelf producten toevoegen?",
        a: "Ja. Je beheert producten, prijzen en voorraad zelf. We nemen je mee in hoe het werkt en blijven bereikbaar voor vragen.",
      },
    ],
  },
  {
    slug: "webdesign-hengelo",
    serviceName: "Webdesign en website laten maken",
    breadcrumbLabel: "Webdesign Hengelo",
    areaServed: ["Hengelo", "Borne", "Twente", "Overijssel"],
    metaTitle: "Webdesign Hengelo — website laten maken | Web Agency Twente",
    metaDescription:
      "Webdesign in Hengelo: een website laten maken die snel laadt, goed scoort in Google en klanten oplevert. Vaste prijs vooraf, live in 4 tot 6 weken.",
    ogTitle: "Webdesign Hengelo — website laten maken",
    ogDescription:
      "Website laten maken in Hengelo door een webdesignbureau uit Twente. Eigen ontwerp, snelle techniek en SEO vanaf dag één.",
    eyebrow: "Hengelo",
    h1Lines: ["Webdesign", "in Hengelo"],
    intro:
      "Wij ontwerpen en bouwen websites voor bedrijven in Hengelo. Geen thema uit de winkel met jouw logo erop, maar een eigen ontwerp op techniek die snel is en blijft — en die je zelf kunt beheren.",
    blocksTitle: "Wat we voor Hengelose bedrijven doen",
    blocks: [
      {
        title: "Ontwerp dat bij je bedrijf past",
        text: "We beginnen bij wat je verkoopt en aan wie. Daaruit komt een ontwerp met eigen typografie, kleur en ritme — herkenbaar, ook naast je concurrent.",
      },
      {
        title: "Snel op mobiel",
        text: "De meeste bezoekers komen via hun telefoon, vaak onderweg. We bouwen licht, zodat je site binnen een paar tellen staat en niemand afhaakt.",
      },
      {
        title: "Gevonden worden in Hengelo",
        text: "Koppenstructuur, laadsnelheid, gestructureerde data en een kloppend Google Bedrijfsprofiel. Zo verschijn je bij zoekopdrachten uit Hengelo, Borne en Delden.",
      },
      {
        title: "Beheer zonder gedoe",
        text: "Een eenvoudig CMS voor teksten en foto's. Wil je het uit handen geven, dan verzorgen wij updates, back-ups en kleine aanpassingen.",
      },
    ],
    contextTitle: "Ondernemen in Hengelo",
    contextParagraphs: [
      "Hengelo is een stad van techniek en maakindustrie, met daarnaast veel installateurs, adviseurs en praktijken die vooral lokaal werken. Voor die bedrijven begint een opdracht bijna altijd met een zoekopdracht: een naam, een dienst, een plaatsnaam erachter.",
      "Wij zorgen dat je daar staat en dat de bezoeker daarna meteen ziet wat je doet, waar je zit en hoe hij contact opneemt. Even afspreken kan bij jou op kantoor — we zitten om de hoek in Enschede.",
    ],
    priceTitle: "Wat kost het",
    priceIntro:
      "Na het kennismakingsgesprek krijg je een vaste prijs. Geen nacalculatie, geen verrassingen achteraf.",
    priceRows: [
      { label: "Starterswebsite", price: "vanaf € 500", note: "Eén sterke pagina, snel live." },
      { label: "Zakelijke website", price: "€ 1.500 – € 3.500", note: "Meerdere pagina's, teksten en SEO-basis." },
      { label: "Maatwerk", price: "vanaf € 3.500", note: "Merk, koppelingen of een groter platform." },
    ],
    faqs: [
      {
        q: "Komen jullie langs in Hengelo?",
        a: "Ja. We zitten in Enschede, dus een afspraak in Hengelo is zo geregeld. Digitaal kan ook, wat jij prettig vindt.",
      },
      {
        q: "Hoe lang duurt het bouwen van mijn website?",
        a: "Een landingspagina staat er meestal binnen twee weken. Een complete website duurt vier tot zes weken, afhankelijk van teksten en beeld.",
      },
      {
        q: "Werken jullie met WordPress?",
        a: "Als dat past wel. Vaak bouwen we een snellere maatwerkoplossing met een eenvoudig CMS. We kiezen op basis van wat jij wilt beheren.",
      },
      {
        q: "Kan mijn huidige website mee?",
        a: "Soms. We kijken eerst wat er staat en of doorbouwen slimmer is dan opnieuw beginnen. Onze gratis website scan geeft daar snel antwoord op.",
      },
      {
        q: "Zit hosting en onderhoud erbij?",
        a: "Hosting regelen we mee. Onderhoud kan als abonnement, maar het hoeft niet — je zit nergens aan vast.",
      },
    ],
  },
  {
    slug: "website-laten-maken-twente",
    serviceName: "Website laten maken",
    breadcrumbLabel: "Website laten maken Twente",
    areaServed: ["Twente", "Enschede", "Hengelo", "Almelo", "Oldenzaal", "Overijssel"],
    metaTitle: "Website laten maken in Twente — vaste prijs | Web Agency Twente",
    metaDescription:
      "Website laten maken in Twente: eigen ontwerp, snelle techniek en SEO vanaf dag één. Vaste prijs vooraf en live in 4 tot 6 weken.",
    ogTitle: "Website laten maken in Twente",
    ogDescription:
      "Een nieuwe website voor je bedrijf in Twente. Eigen ontwerp, snelle techniek, vaste prijs vooraf.",
    eyebrow: "Twente",
    h1Lines: ["Website laten", "maken in Twente"],
    intro:
      "Een website laten maken is vooral een kwestie van keuzes: wat moet hij opleveren, voor wie is hij, en wat mag hij kosten. Wij maken die keuzes samen met je scherp en bouwen daarna een site die daarop is afgestemd.",
    blocksTitle: "Wat je van ons krijgt",
    blocks: [
      {
        title: "Een plan voordat we bouwen",
        text: "Doel, doelgroep, structuur en de belangrijkste zoekwoorden. Pas als dat staat, gaan we ontwerpen. Dat scheelt later dure omwegen.",
      },
      {
        title: "Eigen ontwerp, geen template",
        text: "Je krijgt een ontwerp dat bij jouw bedrijf hoort. Herkenbaar, rustig en gericht op de actie die je wilt: bellen, mailen of een offerte aanvragen.",
      },
      {
        title: "Techniek die scoort",
        text: "Snelle laadtijden, nette code, gestructureerde data en een opbouw waar Google en AI-assistenten uit de voeten kunnen.",
      },
      {
        title: "Vaste prijs en een strakke planning",
        text: "Je weet vooraf wat het kost en wanneer je live gaat. Wij houden het tempo erin, jij levert op tijd teksten en beeld aan.",
      },
    ],
    contextTitle: "Waarom een bureau uit Twente",
    contextParagraphs: [
      "Van Enschede tot Almelo, van Oldenzaal tot Borne: de meeste ondernemers hier halen hun klanten uit de eigen regio. Dat vraagt een andere website dan een landelijke webshop — duidelijk over waar je zit, wat je doet en hoe snel je kunt schakelen.",
      "Omdat we zelf in Twente zitten, kennen we die markt en zijn we bereikbaar zonder ticketsysteem. Je belt en je krijgt de mensen die je site hebben gebouwd.",
    ],
    priceTitle: "Wat kost een website",
    priceIntro: "Drie richtprijzen. Na het kennismakingsgesprek weet je precies waar jij in valt.",
    priceRows: [
      { label: "Landingspagina", price: "vanaf € 500", note: "Eén pagina, gericht op één actie." },
      { label: "Zakelijke website", price: "€ 1.500 – € 3.500", note: "Vijf tot tien pagina's, teksten en SEO-basis." },
      { label: "Maatwerk of platform", price: "vanaf € 3.500", note: "Koppelingen, portalen of een compleet merk." },
    ],
    faqs: [
      {
        q: "Wat kost een website laten maken gemiddeld?",
        a: "Voor een zakelijke website in Twente reken je meestal op € 1.500 tot € 3.500. Een landingspagina kan vanaf € 500, maatwerk begint rond € 3.500.",
      },
      {
        q: "Hoe lang duurt het traject?",
        a: "Vier tot zes weken voor een complete website. Snelheid hangt vooral af van hoe snel teksten en foto's er zijn.",
      },
      {
        q: "Schrijven jullie de teksten?",
        a: "We helpen met opzet en schrijven graag mee. Je kunt ook zelf aanleveren; wij zorgen dan dat het SEO-technisch klopt.",
      },
      {
        q: "Zit SEO erbij inbegrepen?",
        a: "De basis wel: structuur, snelheid, metadata en gestructureerde data. Doorlopende SEO is een apart traject.",
      },
      {
        q: "Voor welke plaatsen werken jullie?",
        a: "Heel Twente: Enschede, Hengelo, Almelo, Oldenzaal, Borne, Haaksbergen en omstreken. Daarbuiten werken we digitaal.",
      },
    ],
  },
  {
    slug: "seo-specialist-enschede",
    serviceName: "SEO specialist",
    breadcrumbLabel: "SEO specialist Enschede",
    areaServed: ["Enschede", "Twente", "Overijssel"],
    metaTitle: "SEO specialist Enschede — hoger in Google | Web Agency Twente",
    metaDescription:
      "SEO specialist in Enschede: techniek, content en lokale vindbaarheid. Je weet vooraf wat we doen en ziet maandelijks wat het oplevert.",
    ogTitle: "SEO specialist Enschede — hoger in Google",
    ogDescription:
      "Een SEO specialist uit Enschede die techniek, content en lokale vindbaarheid combineert. Meetbaar, zonder trucjes.",
    eyebrow: "Enschede",
    h1Lines: ["SEO specialist", "in Enschede"],
    intro:
      "Bovenaan staan in Enschede vraagt om drie dingen tegelijk: een site die technisch klopt, teksten die antwoord geven op echte zoekopdrachten, en een Google Bedrijfsprofiel dat klopt tot in de details. Daar werken wij aan.",
    blocksTitle: "Waar we aan werken",
    blocks: [
      {
        title: "Lokale vindbaarheid",
        text: "Google Bedrijfsprofiel, reviews, consistente bedrijfsgegevens en lokale landingspagina's. Dit levert in Enschede het snelst resultaat op.",
      },
      {
        title: "Technische SEO",
        text: "Laadsnelheid, mobiele weergave, indexatie, interne links en gestructureerde data. Het fundament waar de rest op rust.",
      },
      {
        title: "Content met intentie",
        text: "We schrijven voor zoekopdrachten waar een opdracht achter zit, niet voor zoekvolume. Liever tien aanvragen dan duizend bezoekers die wegklikken.",
      },
      {
        title: "Zichtbaar in AI-antwoorden",
        text: "Steeds meer mensen zoeken via ChatGPT en Google AI Overviews. We maken je content citeerbaar zodat je ook daar genoemd wordt.",
      },
    ],
    contextTitle: "Concurreren in Enschede",
    contextParagraphs: [
      "In Enschede concurreer je zelden met heel Nederland, maar met een handvol bedrijven uit dezelfde stad. Dat maakt het speelveld overzichtelijk: met een nette site en een goed onderhouden bedrijfsprofiel sta je hier sneller bovenaan dan in de Randstad.",
      "Tegelijk is die positie kwetsbaar. Een trage site, dubbele adresgegevens of een profiel dat een jaar stilstaat kosten direct posities. We beginnen daarom altijd met een analyse van wat er nu misgaat.",
    ],
    priceTitle: "Wat kost een SEO specialist",
    priceIntro: "Een duidelijk traject in plaats van een vaag maandbedrag. Je weet vooraf wat je krijgt.",
    priceRows: [
      { label: "SEO-scan en plan", price: "vanaf € 450", note: "Analyse, prioriteiten en een concreet stappenplan." },
      { label: "Eenmalige optimalisatie", price: "€ 950 – € 2.500", note: "Techniek, structuur en bestaande teksten." },
      { label: "Doorlopend", price: "vanaf € 450 p/m", note: "Content, monitoring en maandelijkse rapportage." },
    ],
    faqs: [
      {
        q: "Wat doet een SEO specialist precies?",
        a: "Uitzoeken waarop je gevonden wilt worden, je site daarop technisch en inhoudelijk inrichten, en meten wat het oplevert. Geen trucjes, wel volhouden.",
      },
      {
        q: "Hoe snel zie ik resultaat?",
        a: "Lokale verbeteringen tellen soms binnen weken mee. Voor stevige posities op commerciële zoekwoorden reken je op drie tot zes maanden.",
      },
      {
        q: "Werken jullie met contracten?",
        a: "Doorlopende SEO doen we maandelijks opzegbaar. Een scan of eenmalige optimalisatie is een losse opdracht.",
      },
      {
        q: "Rapporteren jullie wat er gebeurt?",
        a: "Ja. Elke maand een overzicht van posities, verkeer en aanvragen, met wat we gedaan hebben en wat er volgt.",
      },
      {
        q: "Kan ik eerst iets vrijblijvends proberen?",
        a: "Doe onze gratis website scan. Je krijgt binnen een paar minuten een beeld van snelheid, techniek en vindbaarheid.",
      },
    ],
  },
];

export function getLocalPage(slug: string): LocalPage {
  const page = localPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown local page: ${slug}`);
  return page;
}
