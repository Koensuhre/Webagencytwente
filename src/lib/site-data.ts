export const SITE_NAME = "Web Agency Twente";

export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "web-design",
    title: "Web Design",
    short: "Ontwerpen die blijven hangen.",
    body: "We ontwerpen websites met karakter. Geen template-gevoel, maar een eigen visuele taal die past bij jullie merk en publiek.",
    points: ["Art direction", "UX & wireframes", "Design system", "Prototypes"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Snel, schoon en schaalbaar gebouwd.",
    body: "We bouwen met moderne technologie. Razendsnelle laadtijden, vlekkeloze animaties en code waar je later op door kunt bouwen.",
    points: ["Maatwerk front-end", "Headless CMS", "Webshops", "Integraties"],
  },
  {
    slug: "branding",
    title: "Branding",
    short: "Een merk dat mensen onthouden.",
    body: "Van positionering tot toon. We maken scherp wat jullie anders maakt en vertalen dat naar een merk dat consistent voelt.",
    points: ["Merkstrategie", "Naamgeving", "Tone of voice", "Merkgids"],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    short: "Eén vorm die alles zegt.",
    body: "Een logo dat werkt op een gevel én op een favicon. Simpel, eigen en tijdbestendig.",
    points: ["Concepten", "Varianten", "Iconografie", "Bestandenpakket"],
  },
  {
    slug: "huisstijl",
    title: "Huisstijl",
    short: "Consistent op elk kanaal.",
    body: "Kleuren, typografie, beeld en templates. Alles op elkaar afgestemd zodat jullie merk overal hetzelfde voelt.",
    points: ["Kleur & type", "Drukwerk", "Social templates", "Presentaties"],
  },
  {
    slug: "seo",
    title: "SEO",
    short: "Gevonden worden op wat telt.",
    body: "Technische SEO, content en structuur. We bouwen sites die zoekmachines begrijpen en bezoekers waarderen.",
    points: ["Technische SEO", "Zoekwoorden", "Content", "Rapportage"],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    short: "Zichtbaar in heel Twente.",
    body: "Van Enschede tot Almelo: we zorgen dat jullie bovenaan staan als iemand in de buurt zoekt.",
    points: ["Google Bedrijfsprofiel", "Lokale landingspagina's", "Reviews", "Vermeldingen"],
  },
  {
    slug: "ai-search",
    title: "AI Search (AEO & GEO)",
    short: "Ook gevonden worden in AI-antwoorden.",
    body: "Zoeken verandert. We maken jullie content leesbaar en citeerbaar voor AI-assistenten zoals ChatGPT en Google AI.",
    points: ["Antwoordstructuur", "Gestructureerde data", "Bronautoriteit", "Monitoring"],
  },
  {
    slug: "onderhoud",
    title: "Website Onderhoud",
    short: "Altijd up-to-date en veilig.",
    body: "Updates, back-ups, snelheid en kleine aanpassingen. Jullie site blijft in topvorm zonder dat je erover na hoeft te denken.",
    points: ["Updates & back-ups", "Monitoring", "Snelheidschecks", "Doorontwikkeling"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  result: string;
  color: string;
};

export const projects: Project[] = [
  { slug: "noord-koffie", name: "Noord Koffie", tag: "Branding + Webshop", year: "2025", result: "+64% online omzet", color: "bg-primary" },
  { slug: "veldwerk", name: "Veldwerk Studio", tag: "Web Design + Development", year: "2025", result: "0,8s laadtijd", color: "bg-accent" },
  { slug: "hoeve-nova", name: "Hoeve Nova", tag: "Huisstijl + Local SEO", year: "2024", result: "#1 in Enschede", color: "bg-secondary" },
  { slug: "stroomlijn", name: "Stroomlijn Installatie", tag: "Website + AI Search", year: "2024", result: "3x meer aanvragen", color: "bg-ink" },
];

export const processSteps = [
  { number: "01", title: "Kennismaken", text: "Een gesprek van een half uur. We horen waar jullie heen willen en zeggen eerlijk wat we zouden doen." },
  { number: "02", title: "Concept", text: "Richting, structuur en een eerste ontwerp. Jullie zien snel hoe het eruit gaat zien." },
  { number: "03", title: "Bouwen", text: "We ontwerpen en bouwen in korte rondes. Elke week iets nieuws te zien, geen verrassingen achteraf." },
  { number: "04", title: "Live & groeien", text: "Live zetten, meten en verbeteren. We blijven aangehaakt zolang jullie dat willen." },
];

export const testimonials = [
  { quote: "Binnen vijf weken stond er een site waar we trots op zijn. En hij scoort ook nog.", name: "Sanne Bruggink", role: "Oprichter, Noord Koffie" },
  { quote: "Ze denken mee als een partner, niet als een leverancier. Scherpe vragen, snelle uitvoering.", name: "Joris Kamp", role: "Directeur, Stroomlijn Installatie" },
  { quote: "Het ontwerp is spannend zonder onrustig te zijn. Onze klanten noemen het spontaan.", name: "Lieke ter Horst", role: "Marketing, Veldwerk Studio" },
];

export const faqs = [
  { q: "Wat kost een website?", a: "Een complete site begint bij ongeveer 3.500 euro. Merk, webshop of maatwerk loopt hoger op. Na het kennismakingsgesprek krijgen jullie een vaste prijs, geen open eind." },
  { q: "Hoe lang duurt het?", a: "Een landingspagina in twee weken, een volledige website meestal in vier tot zes weken. Snel kan, mits we samen snel beslissen." },
  { q: "Werken jullie alleen in Twente?", a: "We zitten in Twente en werken daar het liefst, maar onze klanten zitten door heel Nederland. Alles kan ook op afstand." },
  { q: "Kunnen we zelf teksten en pagina's aanpassen?", a: "Ja. We leveren een eenvoudig CMS op en nemen jullie mee in hoe het werkt. Liever uit handen? Dan doen wij het onderhoud." },
  { q: "Doen jullie ook alleen een logo of huisstijl?", a: "Zeker. Merkwerk kan los van een website. Vaak groeit het daarna vanzelf door." },
];

export const stats = [
  { value: 120, suffix: "+", label: "projecten opgeleverd" },
  { value: 12, suffix: " jaar", label: "ervaring in digitaal" },
  { value: 98, suffix: "%", label: "klanten blijven" },
  { value: 5, suffix: " weken", label: "gemiddelde doorlooptijd" },
];

export const clients = ["NOORD KOFFIE", "VELDWERK", "HOEVE NOVA", "STROOMLIJN", "BUREAU BRINK", "TWENTS GOED", "KADE 9", "LOOM"];
