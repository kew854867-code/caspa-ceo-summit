import { motion } from "framer-motion";

export function VenueSection() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">
                The <span className="text-primary italic">Venue</span>
              </h2>
              <div className="w-20 h-[1px] bg-primary" />
            </div>
            
            <p className="text-muted-foreground font-light text-lg leading-relaxed">
              Join us at the Santa Clara Convention Center, curated for an evening of unparalleled luxury and sophisticated dialogue.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-lg mb-1">Santa Clara Convention Center</h4>
                  <p className="text-muted-foreground font-light">5001 Great America Pkwy<br />Santa Clara, CA 95054</p>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-square lg:aspect-[4/3] bg-card border border-white/5 relative overflow-hidden group"
          >
            {/* Abstract visual representation of a high-end venue since we don't have a specific image */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
