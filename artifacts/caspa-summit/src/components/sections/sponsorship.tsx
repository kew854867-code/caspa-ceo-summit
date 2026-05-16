import { motion } from "framer-motion";
import { Link } from "wouter";

export function SponsorshipSection() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-5xl mb-4"
        >
          Event <span className="text-primary italic">Sponsorship</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] bg-primary mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-muted-foreground font-light text-lg leading-relaxed mb-12"
        >
          Align your brand with the most influential names in the semiconductor industry. Packages range from $3,000 to $50,000 and offer unparalleled access among C-suite decision makers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/sponsorship">
            <a className="inline-block bg-primary text-primary-foreground px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300">
              View Sponsorship Packages
            </a>
          </Link>
          <a
            href="mailto:office@caspa.com"
            className="inline-block border border-primary/30 text-primary px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Sponsor This Event
          </a>
        </motion.div>
      </div>
    </section>
  );
}
