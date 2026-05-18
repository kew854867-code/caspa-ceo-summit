import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SpeakersSection } from "@/components/sections/speakers";
import { AgendaSection } from "@/components/sections/agenda";
import { VenueSection } from "@/components/sections/venue";
import { RegistrationSection } from "@/components/sections/registration";
import { Footer } from "@/components/layout/footer";
import { SponsorshipSection } from "@/components/sections/sponsorship";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import caspaLogo from "@assets/IMG_4516_1778917187971.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Venue", href: "#venue" },
  { label: "Sponsorship", href: "#sponsorship" },
];

function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/95 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-background/80 backdrop-blur-md"} border-b border-white/5`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img src={caspaLogo} alt="CASPA Logo" className="h-10 brightness-0 invert opacity-90 cursor-pointer" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#register"
              onClick={(e) => handleAnchor(e, "#register")}
              className="hidden md:inline-block bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
            >
              Register Now
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:hidden border-t border-white/5 bg-background/98"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { handleAnchor(e, item.href); setMenuOpen(false); }}
                className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={(e) => { handleAnchor(e, "#register"); setMenuOpen(false); }}
              className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-widest uppercase text-center mt-2"
            >
              Register Now
            </a>
          </div>
        </motion.div>
      </nav>

      <main>
        <HeroSection />
        <div id="about"><AboutSection /></div>
        <div id="speakers"><SpeakersSection /></div>
        <div id="agenda"><AgendaSection /></div>
        <div id="venue"><VenueSection /></div>
        <div id="sponsorship"><SponsorshipSection /></div>
        <div id="register"><RegistrationSection /></div>
      </main>

      <Footer />
    </div>
  );
}
