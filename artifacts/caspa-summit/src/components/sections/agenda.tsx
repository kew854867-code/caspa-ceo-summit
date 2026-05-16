import { motion } from "framer-motion";

const agendaItems = [
  { time: "5:30 PM", title: "VIP Reception", description: "Exclusive networking with industry leaders, champagne and hors d'oeuvres." },
  { time: "6:30 PM", title: "Opening Remarks", description: "Welcome address by CASPA President." },
  { time: "6:45 PM", title: "Dinner Banquet", description: "A five-course culinary experience." },
  { time: "7:45 PM", title: "CEO Panel & Dialogue", description: "The future of chips, AI, and computing." },
  { time: "9:00 PM", title: "Awards & Closing", description: "Honoring outstanding contributions to the semiconductor industry." },
];

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
            Evening <span className="text-primary italic">Agenda</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-primary mx-auto"
          />
        </div>

        <div className="space-y-12">
          {agendaItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center group"
            >
              <div className="md:w-32 shrink-0">
                <span className="text-primary font-medium tracking-widest text-lg group-hover:text-primary/80 transition-colors">
                  {item.time}
                </span>
              </div>
              <div className="flex-1 pb-12 border-b border-white/10 group-last:border-0 relative">
                <h3 className="text-2xl font-serif text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-light text-lg">{item.description}</p>
                
                {/* Decorative node */}
                <div className="absolute left-[-2rem] md:left-[-4.5rem] top-2 w-2 h-2 rounded-full border border-primary/50 group-hover:bg-primary transition-colors duration-300 hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
