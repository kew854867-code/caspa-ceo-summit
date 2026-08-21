import { motion } from "framer-motion";
import caspaLogo from "@assets/caspa-logo-white.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <img src={caspaLogo} alt="CASPA Logo" className="h-12 w-auto mb-4 opacity-80" />
            <p className="text-muted-foreground font-light max-w-sm">
              Chinese American Semiconductor Professionals Association. The premier organization for semiconductor professionals.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-medium tracking-widest uppercase text-sm mb-4">Event</h4>
            <ul className="space-y-2 text-muted-foreground font-light">
              <li><a href="#" className="hover:text-primary transition-colors">About Summit</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Speakers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Agenda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Venue</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-medium tracking-widest uppercase text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground font-light">
              <li><a href="mailto:office@caspa.com" className="hover:text-primary transition-colors">office@caspa.com</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sponsorships</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press Inquiries</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 mb-6 text-xs text-muted-foreground/60 font-light leading-relaxed">
          <p><span className="font-medium text-muted-foreground/80">Program Disclaimer:</span> All speakers, session topics, schedules, and event activities are subject to change. While every effort will be made to present the advertised program, unforeseen business or personal commitments may require speaker substitutions or schedule modifications. CASPA reserves the right to make changes without prior notice.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-light">
          <p>&copy; {new Date().getFullYear()} CASPA. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
