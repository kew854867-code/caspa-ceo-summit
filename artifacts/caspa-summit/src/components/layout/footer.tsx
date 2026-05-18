import { motion } from "framer-motion";
import caspaLogo from "@assets/IMG_4516_1778917187971.png";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={caspaLogo} alt="CASPA Logo" className="h-12 mb-5 brightness-0 invert opacity-80" />
            <p className="text-muted-foreground font-light max-w-sm leading-relaxed text-sm">
              Chinese American Semiconductor Professionals Association — the premier network for semiconductor professionals for 35 years.
            </p>
            <p className="text-muted-foreground font-light text-sm mt-4">
              <span className="text-primary">October 24, 2026</span> · Santa Clara Convention Center
            </p>
          </div>

          {/* Event links */}
          <div>
            <h4 className="text-foreground font-medium tracking-widest uppercase text-xs mb-5">Event</h4>
            <ul className="space-y-3 text-muted-foreground font-light text-sm">
              <li>
                <button onClick={() => scrollTo("#about")} className="hover:text-primary transition-colors text-left">
                  About Summit
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#speakers")} className="hover:text-primary transition-colors text-left">
                  Speakers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#agenda")} className="hover:text-primary transition-colors text-left">
                  Agenda
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#venue")} className="hover:text-primary transition-colors text-left">
                  Venue
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#register")} className="hover:text-primary transition-colors text-left">
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-medium tracking-widest uppercase text-xs mb-5">Contact</h4>
            <ul className="space-y-3 text-muted-foreground font-light text-sm">
              <li>
                <a href="mailto:office@caspa.com" className="hover:text-primary transition-colors">
                  office@caspa.com
                </a>
              </li>
              <li>
                <button onClick={() => scrollTo("#sponsorship")} className="hover:text-primary transition-colors text-left">
                  Sponsorships
                </button>
              </li>
              <li>
                <a href="mailto:office@caspa.com" className="hover:text-primary transition-colors">
                  Press Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-light">
          <p>&copy; {new Date().getFullYear()} CASPA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:office@caspa.com" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="mailto:office@caspa.com" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
