import { motion } from "framer-motion";

const stats = [
  { value: "11", label: "Industry Leaders" },
  { value: "35", label: "Years of CASPA" },
  { value: "Oct 24", label: "2026" },
];

export function AboutSection() {
  return (
    <section className="py-28 bg-background relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Heading + body */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Where Vision <br />
              <span className="text-primary italic">Meets Execution</span>
            </h2>
            <div className="w-20 h-[1px] bg-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="space-y-5 text-muted-foreground text-lg font-light leading-relaxed"
          >
            <p>
              The CEO Summit at CASPA 35th Annual Conference and Dinner Banquet represents the pinnacle of semiconductor leadership — an exclusive gathering designed to foster dialogue among the industry's most influential figures.
            </p>
            <p>
              In an era defined by rapid advancements in AI, computing, and global supply chains, this event offers a rare opportunity to engage with peers, share visionary insights, and shape the trajectory of technology.
            </p>
            <p className="text-foreground font-medium uppercase tracking-widest text-sm pt-2">
              October 24, 2026 • Santa Clara Convention Center
            </p>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 bg-card/40">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center group hover:bg-primary/5 transition-colors duration-300"
            >
              <span className="font-serif text-4xl md:text-5xl text-primary mb-2">{stat.value}</span>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
