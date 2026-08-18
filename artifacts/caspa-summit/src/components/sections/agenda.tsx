import { motion } from "framer-motion";
import stacyRasgonImg from "@assets/9091DD4F-D0EF-48BF-AC6E-1DF7283CAA62_1783637006894.png";
import dylanPatelImg from "@assets/B3D57552-05EE-404E-B8B5-D6A3F1C08E7D_1780946493570.jpeg";
import shahinFarshchiImg from "@assets/48D1A2B2-3D61-4F91-9FE7-400671EA43B3_1784036585053.png";
import albertKimImg from "@assets/1F1F5885-6A94-4D7F-B33E-395286947D01_1783637006894.png";
import andrewTanImg from "@assets/B143CC9B-2159-44F4-BD32-A57E80C2597F_1785812065542.png";
import brandonWangImg from "@assets/IMG_6406_1785812799347.png";
import umeshPadvalImg from "@assets/DB5817CF-7F94-4B5D-BFC5-9AE571647808_1786154700547.png";
import farajAalaeiImg from "@assets/51140AE6-E8C7-41C8-9BAB-DFA02317B765_1783637006894.png";
import austinLyonsImg from "@assets/952EB7F8-5B18-40E1-892A-0262AAB75DA2_1787030187788.png";

const oct23AfternoonPanels = [
  {
    start: "2:00 PM",
    end: "2:10 PM",
    title: "CASPA Opening",
    speakers: [],
  },
  {
    start: "2:10 PM",
    end: "2:50 PM",
    title: "Semiconductor Industry Outlook Panel",
    speakers: [
      { name: "Austin Lyons", title: "Senior Analyst, Creative Strategies", company: "SemiAnalysis", image: austinLyonsImg, moderator: true },
      { name: "Stacy Rasgon", title: "Managing Director", company: "Bernstein", image: stacyRasgonImg },
      { name: "Dylan Patel", title: "CEO", company: "SemiAnalysis", image: dylanPatelImg },
    ],
  },
  {
    start: "2:50 PM",
    end: "3:30 PM",
    title: "Venture Capital Investment Panel",
    speakers: [
      { name: "Brandon Wang", title: "VP of Corporate Technology Strategy", company: "Synopsys", image: brandonWangImg, moderator: true },
      { name: "Shahin Farshchi", title: "General Partner", company: "Lux Capital", image: shahinFarshchiImg },
      { name: "Albert Kim", title: "Head", company: "Samsung Ventures America", image: albertKimImg },
      { name: "Andrew Tan", title: "Managing Director", company: "Salience Capital", image: andrewTanImg },
      { name: "Umesh Padval", title: "Managing Partner", company: "Seligman Ventures", image: umeshPadvalImg },
    ],
  },
  {
    start: "3:30 PM",
    end: "4:10 PM",
    title: "Semiconductor Industry Outlook Panel",
    speakers: [],
  },
  {
    start: "4:10 PM",
    end: "4:50 PM",
    title: "Semiconductor Startup Panel",
    speakers: [],
  },
];

const eveningItems = [
  { start: "5:00 PM", end: "6:00 PM", title: "Registration and VIP Reception", description: "" },
  { start: "6:20 PM", end: "6:30 PM", title: "Welcome Speech", description: "" },
  { start: "6:30 PM", end: "7:00 PM", title: "Banquet Dinner", description: "" },
  { start: "7:00 PM", end: "7:15 PM", title: "CASPA 2025–2026 President Gary Wang's Speech", description: "" },
  { start: "7:15 PM", end: "7:25 PM", title: "CASPA Leadership Transition Ceremony", description: "" },
  { start: "7:25 PM", end: "7:40 PM", title: "CASPA 2026–2027 President Jimmy Cheng's Speech", description: "" },
  { start: "7:40 PM", end: "7:45 PM", title: "Special Address and Introduction of Lip-Bu Tan", description: "By Dr. Chenming Hu" },
  { start: "7:45 PM", end: "8:45 PM", title: "Fireside Chat: Intel CEO Lip-Bu Tan and CASPA President Jimmy Cheng", description: "" },
  { start: "8:45 PM", end: "9:05 PM", title: "Introduce Annual Conference Speakers on Stage", description: "" },
  { start: "9:05 PM", end: "9:20 PM", title: "CASPA/IEEE Scholarship", description: "Issued by IEEE President and Intel CEO" },
  { start: "9:20 PM", end: "9:35 PM", title: "Raffle", description: "" },
  { start: "9:35 PM", end: "10:05 PM", title: "Networking", description: "" },
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

          {/* Oct 23 heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-b border-primary/30 pb-3"
          >
            <p className="font-serif text-2xl text-primary">October 23, 2026</p>
          </motion.div>

          {/* Oct 23 Afternoon */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-widest uppercase text-primary mb-6"
            >
              Afternoon Annual Conference
            </motion.h3>
            <div className="space-y-0">
              {oct23AfternoonPanels.map((panel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row gap-4 md:gap-12 items-start group py-6 border-b border-white/10 last:border-0"
                >
                  <div className="md:w-44 shrink-0 flex flex-col">
                    <span className="text-primary font-medium tracking-wider text-sm">{panel.start}</span>
                    <span className="text-muted-foreground/50 text-xs tracking-wider">until {panel.end}</span>
                  </div>
                  <div className="flex-1">
                    <div className="absolute left-[-1.5rem] md:left-[-4rem] top-1.5 w-1.5 h-1.5 rounded-full border border-primary/40 group-hover:bg-primary transition-colors duration-300 hidden md:block" />
                    <h4 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                      {panel.title}
                    </h4>
                    {panel.speakers.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {panel.speakers.map((speaker, si) => (
                          <div key={si} className="flex items-center gap-3">
                            <div className="relative w-10 h-10 shrink-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-primary/30">
                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover object-top" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-foreground leading-tight">{speaker.name}</p>
                                {speaker.moderator && (
                                  <span className="text-[10px] font-semibold tracking-widest uppercase text-primary/80 border border-primary/30 px-1.5 py-0.5 leading-none">Moderator</span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground leading-tight">{speaker.title}, {speaker.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Speakers To Be Announced</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Oct 24 heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-b border-primary/30 pb-3"
          >
            <p className="font-serif text-2xl text-primary">October 24, 2026</p>
          </motion.div>

          {/* Morning */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-widest uppercase text-primary mb-6"
            >
              Morning Annual Conference
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
              Afternoon Annual Conference
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
