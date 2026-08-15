import { motion } from "framer-motion";

const phases = [
  { period: "7/31 – 8/31", label: "Early Bird", sublabel: "Best Price", active: true },
  { period: "9/1 – 9/30", label: "Regular", sublabel: "", active: false },
  { period: "10/1 – 10/24", label: "Last Minute", sublabel: "", active: false },
];

const tickets = [
  {
    icon: "◈",
    name: "Annual Conference",
    sub: "Conference only",
    earlyBird: "$199",
    earlyBirdSave: "SAVE $300",
    regular: "$399",
    regularNote: "Price increases $200",
    lastMinute: "$499",
    lastMinuteNote: "Price increases $300",
    bestValue: false,
  },
  {
    icon: "◉",
    name: "Dinner Banquet",
    sub: "Banquet only",
    earlyBird: "$1,199",
    earlyBirdSave: "SAVE $200",
    regular: "$1,299",
    regularNote: "Price increases $100",
    lastMinute: "$1,399",
    lastMinuteNote: "Price increases $200",
    bestValue: false,
  },
  {
    icon: "★",
    name: "Bundle",
    sub: "Conference + Banquet",
    earlyBird: "$1,299",
    earlyBirdSave: "SAVE $500",
    regular: "$1,599",
    regularNote: "Price increases $300",
    lastMinute: "$1,799",
    lastMinuteNote: "Price increases $500",
    bestValue: true,
  },
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
            Lock in the best price before September 1, 2026. Prices increase — don't wait.
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
              <p className="font-bold tracking-widest uppercase text-sm">Early Bird Ends Soon!</p>
              <p className="text-primary-foreground/80 text-xs font-light">Lock in your best price before September 1, 2026</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-sm tracking-wider uppercase">Prices Increase Sep 1</p>
            <p className="text-primary-foreground/80 text-xs">Secure the best rate today</p>
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

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border border-white/10 overflow-hidden mb-6"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-background/60">
            <div className="px-6 py-4 border-r border-white/10">
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Ticket Type</p>
            </div>
            <div className="px-6 py-4 border-r border-white/10 bg-primary/10 text-center">
              <p className="text-xs font-bold tracking-widest uppercase text-primary">Early Bird</p>
              <p className="text-[10px] text-primary/70 tracking-wider">7/31 – 8/31</p>
              <div className="inline-block bg-primary text-primary-foreground text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 mt-1">Best Price</div>
            </div>
            <div className="px-6 py-4 border-r border-white/10 text-center">
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Regular</p>
              <p className="text-[10px] text-muted-foreground/60 tracking-wider">9/1 – 9/30</p>
            </div>
            <div className="px-6 py-4 text-center">
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Last Minute</p>
              <p className="text-[10px] text-muted-foreground/60 tracking-wider">10/1 – 10/24</p>
            </div>
          </div>

          {/* Rows */}
          {tickets.map((ticket, i) => (
            <div key={i} className={`grid grid-cols-4 border-t border-white/10 ${ticket.bestValue ? "bg-primary/5" : ""}`}>
              {/* Ticket name */}
              <div className="px-6 py-5 border-r border-white/10 flex items-start gap-3">
                {ticket.bestValue && (
                  <div className="shrink-0 mt-0.5">
                    <div className="bg-primary text-primary-foreground text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 whitespace-nowrap">Best Value</div>
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground text-sm leading-tight">{ticket.name}</p>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">{ticket.sub}</p>
                </div>
              </div>
              {/* Early Bird */}
              <div className="px-6 py-5 border-r border-white/10 bg-primary/5 text-center">
                <p className="font-serif text-xl text-primary leading-tight">{ticket.earlyBird}</p>
                <p className="text-[10px] text-muted-foreground mb-2">+ fee</p>
                <div className="inline-block bg-red-600/80 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">{ticket.earlyBirdSave}</div>
              </div>
              {/* Regular */}
              <div className="px-6 py-5 border-r border-white/10 text-center">
                <p className="font-serif text-xl text-foreground/60 leading-tight">{ticket.regular}</p>
                <p className="text-[10px] text-muted-foreground mb-2">+ fee</p>
                <p className="text-[10px] text-primary/70">Price increases <span className="font-semibold">{ticket.regularNote.replace("Price increases ", "")}</span></p>
              </div>
              {/* Last Minute */}
              <div className="px-6 py-5 text-center">
                <p className="font-serif text-xl text-foreground/40 leading-tight">{ticket.lastMinute}</p>
                <p className="text-[10px] text-muted-foreground mb-2">+ fee</p>
                <p className="text-[10px] text-muted-foreground/50">Price increases <span className="font-semibold">{ticket.lastMinuteNote.replace("Price increases ", "")}</span></p>
              </div>
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
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Prices Increase September 1, 2026</p>
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
            Register Now — Early Bird Price
          </a>
          <p className="text-muted-foreground text-xs font-light mt-4">
            All registrations subject to approval by the CASPA organizing committee.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
