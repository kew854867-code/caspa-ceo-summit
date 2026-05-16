import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Where Vision <br />
              <span className="text-primary italic">Meets Execution</span>
            </h2>
            <div className="w-20 h-[1px] bg-primary mb-8" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed"
          >
            <p>
              The CEO Summit at CASPA 35th Annual Conference and Dinner Banquet represents the pinnacle of semiconductor leadership. It is an exclusive gathering designed to foster dialogue among the industry's most influential figures.
            </p>
            <p>
              In an era defined by rapid advancements in AI, computing, and global supply chains, the decisions made by these leaders reverberate across the global economy. This event offers a rare opportunity to engage with peers, share visionary insights, and shape the trajectory of technology.
            </p>
            <p className="text-foreground font-medium uppercase tracking-widest text-sm pt-4">
              October 24, 2026 • Santa Clara Convention Center
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
