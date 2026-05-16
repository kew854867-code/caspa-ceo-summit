import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl text-foreground mb-4">CASPA</h3>
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
              <li><a href="mailto:info@caspa.com" className="hover:text-primary transition-colors">info@caspa.com</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sponsorships</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press Inquiries</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-light">
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
