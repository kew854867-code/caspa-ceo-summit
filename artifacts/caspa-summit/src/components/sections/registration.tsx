import { motion } from "framer-motion";

export function RegistrationSection() {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block border border-primary/30 px-6 py-2 rounded-full mb-8 backdrop-blur-sm bg-primary/5">
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Limited Availability</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            Secure Your <span className="text-primary italic">Presence</span>
          </h2>
          
          <p className="text-muted-foreground font-light text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Attendance is strictly limited to ensure an intimate atmosphere for meaningful dialogue among industry leaders.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left mb-16">
            <div className="border border-white/10 bg-background/50 p-8 hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-serif text-2xl mb-2 text-foreground">VIP Gala Access</h3>
              <p className="text-muted-foreground font-light mb-6">Full access to the reception, banquet, and CEO summit panels.</p>
              <div className="text-3xl text-primary font-serif mb-8">$10,000 <span className="text-sm font-sans text-muted-foreground font-light">/ seat</span></div>
              <button className="w-full bg-primary/10 text-primary border border-primary/30 px-6 py-3 font-medium tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Request Seat
              </button>
            </div>
            
            <div className="border border-primary/30 bg-primary/5 p-8 relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-widest">
                Recommended
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground">Corporate Table</h3>
              <p className="text-muted-foreground font-light mb-6">Premium seating for 10 guests with branding opportunities.</p>
              <div className="text-3xl text-primary font-serif mb-8">$85,000 <span className="text-sm font-sans text-muted-foreground font-light">/ table</span></div>
              <button className="w-full bg-primary text-primary-foreground px-6 py-3 font-medium tracking-widest uppercase hover:bg-primary/90 transition-all duration-300">
                Reserve Table
              </button>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm font-light">
            All requests are subject to approval by the CASPA organizing committee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
