import { motion } from "framer-motion";

export function RegistrationSection() {
  return (
    <section className="py-28 bg-background relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_55%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block border border-primary/30 px-6 py-2 rounded-full mb-8 backdrop-blur-sm bg-primary/5"
          >
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Limited Availability</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            Secure Your <span className="text-primary italic">Presence</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-24 h-[1px] bg-primary mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-muted-foreground font-light text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Attendance is strictly limited to ensure an intimate atmosphere for meaningful dialogue among the most influential names in semiconductor.
          </motion.p>
        </div>

        {/* Options grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {/* Corporate Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border border-primary/40 bg-primary/5 p-8 relative group hover:border-primary transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Most Popular</span>
            <h3 className="font-serif text-2xl mb-2 text-foreground">Corporate Table</h3>
            <p className="text-muted-foreground font-light text-sm mb-6 leading-relaxed">Premium seating for 10 guests with full branding opportunities throughout the evening.</p>
            <div className="text-3xl text-primary font-serif mb-8">
              $10,000 <span className="text-sm font-sans text-muted-foreground font-light">/ table</span>
            </div>
            <a
              href="mailto:office@caspa.com"
              className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
            >
              Reserve Table
            </a>
          </motion.div>

          {/* Individual Seat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="border border-white/10 bg-card/40 p-8 relative group hover:border-primary/40 transition-colors duration-300"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4 block">Individual</span>
            <h3 className="font-serif text-2xl mb-2 text-foreground">Individual Seat</h3>
            <p className="text-muted-foreground font-light text-sm mb-6 leading-relaxed">Join the most exclusive gathering of semiconductor leaders at the dinner banquet.</p>
            <div className="text-3xl text-primary font-serif mb-8">
              Inquire <span className="text-sm font-sans text-muted-foreground font-light">/ seat</span>
            </div>
            <a
              href="mailto:office@caspa.com"
              className="block w-full text-center border border-primary/30 text-primary px-6 py-3 font-medium tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-muted-foreground text-sm font-light"
        >
          All requests subject to approval. Contact{" "}
          <a href="mailto:office@caspa.com" className="text-primary hover:underline">office@caspa.com</a>{" "}
          for details.
        </motion.p>
      </div>
    </section>
  );
}
