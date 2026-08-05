import { useRef } from "react";

/**
 * Onzichtbare spamprotectie zonder externe dienst:
 * - honeypot-veld dat alleen bots invullen
 * - tijdstempel waarmee de server te snelle inzendingen weigert
 */
export function useSpamGuard() {
  const startedAtRef = useRef<number>(Date.now());
  const hpRef = useRef<HTMLInputElement | null>(null);

  const getGuardValues = () => ({
    hp: hpRef.current?.value ?? "",
    startedAt: startedAtRef.current,
  });

  const HoneypotField = () => (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company-website-url">Laat dit veld leeg</label>
      <input
        ref={hpRef}
        id="company-website-url"
        name="company-website-url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );

  return { getGuardValues, HoneypotField };
}