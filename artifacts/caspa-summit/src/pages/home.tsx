import { useState } from "react";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { HeroSection } from "@/components/redesign/hero";
import { SpeakersSection } from "@/components/redesign/speakers-section";
import { SponsorsSection } from "@/components/redesign/sponsors-section";
import { PartnersSection } from "@/components/redesign/partners-section";
import { RecapSection } from "@/components/redesign/recap-section";
import { TicketsSection } from "@/components/redesign/tickets-section";
import { VenueAbout, IntroSection } from "@/components/redesign/venue-about-intro";
import { RedesignDialogs, type DialogKind } from "@/components/redesign/dialogs";

export default function Home() {
  const [dialog, setDialog] = useState<DialogKind | null>(null);

  return (
    <div className="rsv3">
      <RedesignNav active="speakers" />
      <HeroSection />
      <main>
        <SpeakersSection />
        <VenueAbout />
        <SponsorsSection onBecomeSponsor={() => setDialog("sponsor")} />
        <PartnersSection />
        <RecapSection />
        <TicketsSection />
        <IntroSection />
      </main>
      <RedesignFooter />
      <RedesignDialogs kind={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}
