// Google Analytics 4 (gtag.js) — client-side only.
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const measurementId = import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY'] as
  | string
  | undefined;

let initialized = false;

// gtag.js only processes pushes of the `arguments` object — a plain array push
// is silently ignored. Keep this as a non-arrow function.
function gtag(..._args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function initAnalytics() {
  if (typeof window === "undefined" || initialized || !measurementId) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  // GA4 enhanced measurement sends the initial page_view and one per SPA
  // history change, so no manual page_view is needed (and adding one would
  // double-count).
  gtag("config", measurementId);
}

// Kept for call sites; gtag itself tracks page views, so this is a no-op.
export function trackPageView(_path: string, _title?: string) {}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!measurementId) return;
  gtag("event", name, params);
}