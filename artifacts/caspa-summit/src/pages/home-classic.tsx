import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SpeakersSection } from "@/components/sections/speakers";
import { VenueSection } from "@/components/sections/venue";
import { RegistrationSection } from "@/components/sections/registration";
import { Footer } from "@/components/layout/footer";
import { SponsorshipSection } from "@/components/sections/sponsorship";
import { motion, useScroll, useSpring } from "framer-motion";
import { SiteNav } from "@/components/layout/site-nav";

// Rollback version of the pre-redesign home page (kept for one-line restore in App.tsx).
export default function HomeClassic() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <SiteNav />

      <main>
        <HeroSection />
        <AboutSection />
        <SpeakersSection />
        <VenueSection />
        <SponsorshipSection />
        <RegistrationSection />
      </main>

      <Footer />
    </div>
  );
}
