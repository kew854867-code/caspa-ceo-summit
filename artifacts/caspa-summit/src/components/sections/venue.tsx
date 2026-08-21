import { motion } from "framer-motion";
import eeTimesLogo from "@assets/ee-times-logo.png";

export function VenueSection() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">
                The <span className="text-primary italic">Venue</span>
              </h2>
              <div className="w-20 h-[1px] bg-primary mx-auto" />
            </div>

            <p className="text-muted-foreground font-light text-lg leading-relaxed">
              Join us at the Santa Clara Convention Center, curated for an evening of unparalleled luxury and sophisticated dialogue.
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className="text-left">
                <h4 className="text-foreground font-medium text-lg mb-1">Santa Clara Convention Center</h4>
                <p className="text-muted-foreground font-light">5001 Great America Pkwy, Santa Clara, CA 95054</p>
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-white/5">
              <p className="text-primary text-xs font-medium tracking-[0.25em] uppercase mb-5">
                Official Media Partner
              </p>
              <div className="mx-auto flex min-h-16 max-w-xs items-center justify-center border border-white/10 bg-white/[0.03] px-8 py-4">
                <img src={eeTimesLogo} alt="EE Times" className="w-full max-w-[220px] h-auto object-contain" />
              </div>
            </div>

          </motion.div>
      </div>
    </section>
  );
}
