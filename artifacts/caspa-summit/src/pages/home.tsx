import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SpeakersSection } from "@/components/sections/speakers";
import { AgendaSection } from "@/components/sections/agenda";
import { VenueSection } from "@/components/sections/venue";
import { RegistrationSection } from "@/components/sections/registration";
import { Footer } from "@/components/layout/footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Global dark mode class is applied to a wrapper or document, but we enforce the dark theme colors */}
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Navbar (minimal) */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold tracking-wider">
            CASPA <span className="text-primary italic font-normal">Summit</span>
          </div>
          <button className="hidden md:block text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors">
            Request Invitation
          </button>
        </div>
      </nav>

      <main>
        <HeroSection />
        <AboutSection />
        <SpeakersSection />
        <AgendaSection />
        <VenueSection />
        <RegistrationSection />
      </main>

      <Footer />
    </div>
  );
}
