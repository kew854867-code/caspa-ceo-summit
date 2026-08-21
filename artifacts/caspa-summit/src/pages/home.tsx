import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SpeakersSection } from "@/components/sections/speakers";
import { AgendaSection } from "@/components/sections/agenda";
import { VenueSection } from "@/components/sections/venue";
import { RegistrationSection } from "@/components/sections/registration";
import { Footer } from "@/components/layout/footer";
import { SponsorshipSection } from "@/components/sections/sponsorship";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "wouter";
import caspaLogo from "@assets/caspa-logo-white.png";

export default function Home() {
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

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <img src={caspaLogo} alt="CASPA Logo" className="h-10 w-auto opacity-90" />
          <div className="flex items-center gap-6">
            <Link
              href="/sponsorship"
              className="hidden md:block text-sm font-medium tracking-widest uppercase text-primary hover:text-primary/80 transition-colors"
            >
              Sponsorship
            </Link>
            <a
              href="https://caspaceosummit.eventbrite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors"
            >
              Registration
            </a>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <AboutSection />
        <SpeakersSection />
        <AgendaSection />
        <VenueSection />
        <SponsorshipSection />
        <RegistrationSection />
      </main>

      <Footer />
    </div>
  );
}
