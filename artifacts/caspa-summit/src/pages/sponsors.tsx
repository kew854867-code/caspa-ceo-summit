import { useRef } from "react";
import { useReveal } from "@/components/redesign/use-reveal";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { SponsorsSection } from "@/components/redesign/sponsors-section";
import { PartnersSection } from "@/components/redesign/partners-section";
import { openMail } from "@/components/redesign/mail-templates";

export default function SponsorsPage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, []);

  return (
    <div className="rsv3" ref={root}>
      <RedesignNav active="sponsors" />

      <header className="ahero">
        <div className="wrap">
          <span className="eyebrow">Oct 23–24, 2026 · Santa Clara Convention Center</span>
          <h1>Sponsors &amp; Partners</h1>
          <p>The companies and organizations making the 35th CASPA Annual Conference &amp; Dinner Banquet possible.</p>
        </div>
      </header>

      <main>
        <SponsorsSection onBecomeSponsor={() => openMail("sponsor")} />
        <PartnersSection onPress={() => openMail("press")} />
      </main>
      <RedesignFooter />
    </div>
  );
}
