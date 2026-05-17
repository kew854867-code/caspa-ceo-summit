import { motion } from "framer-motion";

const morningItems = null;
const afternoonItems = null;

const eveningItems = [
  { start: "5:00 PM", end: "6:00 PM", title: "Registration and VIP Reception", description: "" },
  { start: "6:20 PM", end: "6:30 PM", title: "Welcome Speech", description: "" },
  { start: "6:30 PM", end: "7:00 PM", title: "Banquet Dinner", description: "" },
  { start: "7:00 PM", end: "7:15 PM", title: "CASPA 2025–2026 President Gary Wang's Speech", description: "" },
  { start: "7:15 PM", end: "7:25 PM", title: "CASPA Leadership Transition Ceremony", description: "Overseen by Dr. Chenming Hu · Followed by a Special Address from Dr. Chenming Hu" },
  { start: "7:25 PM", end: "7:40 PM", title: "CASPA 2026–2027 President Jimmy Cheng's Speech", description: "" },
  { start: "7:40 PM", end: "8:40 PM", title: "Fireside Chat: Intel CEO Lip-Bu Tan", description: "Hosted by Jimmy Cheng" },
  { start: "8:40 PM", end: "8:55 PM", title: "CASPA/IEEE Scholarship", description: "Issued by IEEE President and Intel CEO" },
  { start: "8:55 PM", end: "9:10 PM", title: "Raffle", description: "" },
  { start: "9:10 PM", end: "9:40 PM", title: "Networking", description: "" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function TBABlock({ label }: { label: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="rounded border border-white/10 bg-background/40 px-8 py-10 text-center"
    >
      <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">{label}</p>
      <p className="font-serif text-2xl text-foreground/50 italic">To Be Announced</p>
    </motion.div>
  );
}

export function AgendaSection() {
  return (
    <section className="py-32 bg-card relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl mb-4"
          >
            Event <span className="text-primary italic">Agenda</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-primary mx-auto"
          />
        </div>

        <div className="space-y-16">
          {/* Morning */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-widest uppercase text-primary mb-6"
            >
              Morning
            </motion.h3>
            <TBABlock label="Morning Program" />
          </div>

          {/* Afternoon */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-widest uppercase text-primary mb-6"
            >
              Afternoon
            </motion.h3>
            <TBABlock label="Afternoon Program" />
          </div>

          {/* Evening */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-widest uppercase text-primary mb-6"
            >
              Evening — Dinner Banquet
            </motion.h3>

            <div className="space-y-0">
              {eveningItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.07 }}
                  className="flex flex-col md:flex-row gap-4 md:gap-12 items-start group py-6 border-b border-white/10 last:border-0"
                >
                  <div className="md:w-44 shrink-0 flex flex-col">
                    <span className="text-primary font-medium tracking-wider text-sm">
                      {item.start}
                    </span>
                    <span className="text-muted-foreground/50 text-xs tracking-wider">
                      until {item.end}
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-[-1.5rem] md:left-[-4rem] top-1.5 w-1.5 h-1.5 rounded-full border border-primary/40 group-hover:bg-primary transition-colors duration-300 hidden md:block" />
                    <h4 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-muted-foreground font-light mt-1 text-sm">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
