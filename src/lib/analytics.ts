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
  gtag("config", measurementId, { send_page_view: false });
}

export function trackPageView(path: string, title?: string) {
  if (!measurementId) return;
  gtag("event", "page_view", {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: title ?? (typeof document !== "undefined" ? document.title : undefined),
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!measurementId) return;
  gtag("event", name, params);
}