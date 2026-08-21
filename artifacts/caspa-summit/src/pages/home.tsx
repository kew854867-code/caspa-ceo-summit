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
import { Menu, X } from "lucide-react";
import { useState } from "react";
import caspaLogo from "@assets/caspa-logo-white.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="container mx-auto px-5 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <img src={caspaLogo} alt="CASPA Logo" className="h-9 md:h-10 w-auto opacity-90" />
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
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              {isMenuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl px-5 pb-5 pt-3 shadow-2xl"
          >
            <div className="container mx-auto flex flex-col">
              <Link
                href="/sponsorship"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-medium tracking-[0.2em] uppercase text-primary"
              >
                Sponsorship
                <span aria-hidden="true" className="text-lg font-light">→</span>
              </Link>
              <a
                href="https://caspaceosummit.eventbrite.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-4 text-sm font-medium tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
              >
                Registration
                <span aria-hidden="true" className="text-lg font-light">→</span>
              </a>
            </div>
          </div>
        )}
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
