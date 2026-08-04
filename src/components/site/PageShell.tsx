import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background">
      <SiteHeader />
      <main id="hoofdinhoud">{children}</main>
      <SiteFooter />
    </div>
  );
}
