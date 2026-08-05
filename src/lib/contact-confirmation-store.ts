export type ConfirmationSummary = {
  name: string;
  email: string;
  fields: Array<{ label: string; value: string }>;
  message: string;
};

const KEY = "wat:contact-confirmation";

export function saveConfirmationSummary(summary: ConfirmationSummary) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(summary));
  } catch {
    /* sessionStorage unavailable — page falls back to a generic thank you */
  }
}

export function readConfirmationSummary(): ConfirmationSummary | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ConfirmationSummary) : null;
  } catch {
    return null;
  }
}
