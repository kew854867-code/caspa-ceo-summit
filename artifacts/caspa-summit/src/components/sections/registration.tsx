import { motion } from "framer-motion";

const phases = [
  { period: "9/1 – 9/30", label: "Regular", sublabel: "Current Price", active: true },
  { period: "10/1 – 10/24", label: "Last Minute", sublabel: "", active: false },
];

export function RegistrationSection() {
  return (
    <section className="py-32 bg-card relative overflow-hidden" id="registration">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-block border border-primary/30 px-6 py-2 rounded-full mb-6 backdrop-blur-sm bg-primary/5">
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Limited Seats Available</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Secure Your <span className="text-primary italic">Seat</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg max-w-xl mx-auto">
            Register before October 1, 2026. Prices increase — don't wait.
          </p>
        </motion.div>

        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-primary text-primary-foreground px-8 py-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <p className="font-bold tracking-widest uppercase text-sm">Regular Pricing Available</p>
              <p className="text-primary-foreground/80 text-xs font-light">Register before October 1, 2026</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-sm tracking-wider uppercase">Prices Increase Oct 1</p>
            <p className="text-primary-foreground/80 text-xs">Secure the regular rate today</p>
          </div>
        </motion.div>

        {/* Phase Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-start justify-between mb-10 relative"
        >
          {/* connecting line */}
          <div className="absolute top-3 left-[16.66%] right-[16.66%] h-[1px] bg-white/10" />
          {phases.map((phase, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative z-10">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-3 ${phase.active ? "border-primary bg-primary" : "border-white/20 bg-background"}`}>
                {phase.active && <span className="text-primary-foreground text-xs">✓</span>}
              </div>
              <p className={`text-xs font-medium tracking-widest uppercase mb-1 ${phase.active ? "text-primary" : "text-muted-foreground/50"}`}>{phase.period}</p>
              <p className={`font-serif text-base ${phase.active ? "text-foreground" : "text-muted-foreground/50"}`}>{phase.label}</p>
              {phase.sublabel && <p className="text-primary text-xs font-semibold tracking-widest uppercase mt-0.5">{phase.sublabel}</p>}
            </div>
          ))}
        </motion.div>

        {/* Bottom warning bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border border-primary/30 bg-primary/5 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-2 mb-10"
        >
          <div className="flex items-center gap-2">
            <span className="text-primary text-sm">⚠</span>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Prices Increase October 1, 2026</p>
          </div>
          <p className="text-muted-foreground text-sm font-light">Don't miss your chance to save!</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center"
        >
          <a
            href="https://caspaceosummit.eventbrite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-14 py-4 font-bold tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 text-sm"
          >
            Register Now
          </a>
          <p className="text-muted-foreground text-xs font-light mt-4">
            All registrations subject to approval by the CASPA organizing committee.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
