export type LocalFaq = { q: string; a: string };

export type LocalBlock = { title: string; text: string };

export type LocalPage = {
  slug: string;
  serviceName: string;
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
];

export function getLocalPage(slug: string): LocalPage {
  const page = localPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown local page: ${slug}`);
  return page;
}
