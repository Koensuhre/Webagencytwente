/**
 * Permanent (301) redirect map — old website paths → new paths.
 *
 * Add entries here as needed; the redirect middleware in src/start.ts
 * reads this map on every request and returns a 301 before the router runs.
 *
 * Keys are matched case-sensitively, with trailing slashes stripped.
 * Query strings are preserved on the redirect.
 */
export const PERMANENT_REDIRECTS: Record<string, string> = {
  // Case / naming changes
  "/Over": "/over-ons",
  "/Diensten": "/diensten",
  "/Contact": "/contact",

  // Merged service sub-pages → services overview
  "/Webdevelopment": "/diensten",
  "/Vindbaarheid": "/diensten",
  "/webflow-website-laten-maken": "/diensten",

  // City landing pages → services overview
  "/Website-laten-maken-enschede": "/diensten",
  "/Website-laten-maken-hengelo": "/diensten",
  "/Website-laten-maken-almelo": "/diensten",

  // FAQ removed → contact page
  "/Faq": "/contact",
};
