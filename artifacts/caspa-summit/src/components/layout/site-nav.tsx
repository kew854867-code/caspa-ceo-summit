import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import caspaLogo from "@assets/caspa-world-logo.png";

type SiteNavProps = {
  active?: "program" | "sponsorship";
};

const linkClass = "text-sm font-medium tracking-widest uppercase transition-colors";

export function SiteNav({ active }: SiteNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-5 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} aria-label="CASPA CEO Summit home">
          <img src={caspaLogo} alt="CASPA World Logo" className="h-12 md:h-14 w-auto opacity-95 cursor-pointer" />
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/program"
              className={`${linkClass} ${active === "program" ? "text-primary" : "hover:text-primary"}`}
            >
              Program
            </Link>
            <a
              href="/#venue"
              className={`${linkClass} hover:text-primary`}
            >
              Venue
            </a>
            <Link
              href="/sponsorship"
              className={`${linkClass} ${active === "sponsorship" ? "text-primary" : "text-primary hover:text-primary/80"}`}
            >
              Sponsorship
            </Link>
            <a
              href="https://caspaceosummit.eventbrite.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} hover:text-primary`}
            >
              Registration
            </a>
          </div>

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
              href="/program"
              onClick={closeMenu}
              className={`${linkClass} flex items-center justify-between border-b border-white/10 py-4 ${active === "program" ? "text-primary" : "text-foreground hover:text-primary"}`}
            >
              Program
              <span aria-hidden="true" className="text-lg font-light">→</span>
            </Link>
            <a
              href="/#venue"
              onClick={closeMenu}
              className={`${linkClass} flex items-center justify-between border-b border-white/10 py-4 text-foreground hover:text-primary`}
            >
              Venue
              <span aria-hidden="true" className="text-lg font-light">→</span>
            </a>
            <Link
              href="/sponsorship"
              onClick={closeMenu}
              className={`${linkClass} flex items-center justify-between border-b border-white/10 py-4 ${active === "sponsorship" ? "text-primary" : "text-foreground hover:text-primary"}`}
            >
              Sponsorship
              <span aria-hidden="true" className="text-lg font-light">→</span>
            </Link>
            <a
              href="https://caspaceosummit.eventbrite.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className={`${linkClass} flex items-center justify-between py-4 text-foreground hover:text-primary`}
            >
              Registration
              <span aria-hidden="true" className="text-lg font-light">→</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}