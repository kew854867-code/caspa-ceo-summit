import { useRef } from "react";
import { useReveal } from "@/components/redesign/use-reveal";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { HeroSection } from "@/components/redesign/hero";
import { SpeakersSection } from "@/components/redesign/speakers-section";
import { TicketsSection } from "@/components/redesign/tickets-section";
import { VenueAbout, IntroSection } from "@/components/redesign/venue-about-intro";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, []);

  return (
    <div className="rsv3" ref={root}>
      <RedesignNav active="speakers" />
      <HeroSection />
      <main>
        <SpeakersSection />
        <VenueAbout />
        <TicketsSection />
        <IntroSection />
      </main>
      <RedesignFooter />
    </div>
  );
}
