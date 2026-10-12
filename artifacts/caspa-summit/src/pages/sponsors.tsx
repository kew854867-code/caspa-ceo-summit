import { useRef } from "react";
import { useReveal } from "@/components/redesign/use-reveal";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { SponsorsSection } from "@/components/redesign/sponsors-section";
import { PartnersSection } from "@/components/redesign/partners-section";
import { openMail } from "@/components/redesign/mail-templates";
import { WhySponsor } from "@/components/redesign/why-sponsor";
import { RouteMapSection } from "@/components/redesign/route-map";

export default function SponsorsPage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, []);

  return (
    <div className="rsv3" ref={root}>
      <RedesignNav active="sponsors" />

      <main className="spage">
        <SponsorsSection onBecomeSponsor={() => openMail("sponsor")} />
        <PartnersSection onPress={() => openMail("press")} showMedia={false} />
        <RouteMapSection />
        <WhySponsor onBecomeSponsor={() => openMail("sponsor")} />
      </main>
      <RedesignFooter />
    </div>
  );
}
