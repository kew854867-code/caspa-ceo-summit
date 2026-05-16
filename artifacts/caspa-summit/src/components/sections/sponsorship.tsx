import { motion } from "framer-motion";

const tiers = [
  {
    name: "Premier",
    price: "$50,000",
    description: "Maximum brand visibility across all event materials, dedicated premium placement, and top-tier recognition throughout the evening.",
    perks: ["Premium seat in dinner banquet", "1 reserved table (10 seats)", "VIP reception access", "Logo on all print & digital materials", "Dedicated sponsor mention"],
  },
  {
    name: "Partner",
    price: null,
    description: "High-profile recognition with prominent placement throughout the venue and event collateral.",
    perks: ["1 reserved table (10 seats)", "Logo on stage backdrop & website", "Program book full-page feature", "One VIP reception access"],
  },
  {
    name: "Associate",
    price: null,
    description: "Meaningful brand presence with recognition in key event touchpoints.",
    perks: ["5 reserved seats", "Logo on website & program", "Recognition in opening remarks", "Networking reception access"],
  },
];

export function SponsorshipSection() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with CTA */}
        <div className="text-center mb-20">
          <motion.a
            href="mailto:sponsorship@caspa.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-primary text-primary-foreground px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300 mb-12"
          >
            Sponsor This Event
          </motion.a>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl mb-4"
          >
            Event <span className="text-primary italic">Sponsorship</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-primary mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-muted-foreground font-light text-lg max-w-2xl mx-auto"
          >
            Align your brand with the most influential names in the semiconductor industry. Sponsorship packages offer unparalleled access and visibility among C-suite decision makers.
          </motion.p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="border border-white/10 bg-card/50 p-8 hover:border-primary/40 transition-colors duration-500 group flex flex-col"
            >
              <div className="mb-6">
                <span className="text-xs font-medium tracking-widest uppercase text-primary">{tier.name}</span>
                <div className="w-8 h-[1px] bg-primary/40 mt-2 group-hover:w-full transition-all duration-500" />
              </div>
              {tier.price && (
                <div className="text-2xl font-serif text-primary mb-4">{tier.price}</div>
              )}
              <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">{tier.description}</p>
              <ul className="space-y-3 mt-auto">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:sponsorship@caspa.com"
                className="mt-8 block text-center border border-primary/30 text-primary px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Inquire
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-muted-foreground text-sm font-light mt-12"
        >
          Custom packages available. Contact <a href="mailto:sponsorship@caspa.com" className="text-primary hover:underline">sponsorship@caspa.com</a> to discuss opportunities.
        </motion.p>
      </div>
    </section>
  );
}
