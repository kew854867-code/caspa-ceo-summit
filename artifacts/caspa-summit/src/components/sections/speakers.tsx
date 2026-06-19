import { motion } from "framer-motion";
import lipBuTanImg from "@assets/2C524BF7-CBB4-419F-A97E-A9E39B687AA3_1779086898716.png";
import chenMingHuImg from "@assets/55464DD5-0037-4AC7-8E91-D403F5C100D3_1779121957187.png";

import sassineGhaziImg from "@assets/92FE495A-00F9-44B1-AF46-A088FA81D57D_1780293398458.png";
import michaelXieImg from "@assets/278D7D17-9372-4E07-957C-EC5DCDA6FBA7_1780116650886.png";
import irvingTanImg from "@assets/F1A23EB4-C629-4C0D-9BA2-5B670A376C8B_1780563808959.png";
import dylanPatelImg from "@assets/B3D57552-05EE-404E-B8B5-D6A3F1C08E7D_1780946493570.jpeg";
import markWadeImg from "@assets/2A9C2A7C-3A47-47C6-BFD5-30AC8D32B697_1780946493570.png";
import johnMartinisImg from "@assets/6A7EF360-96B9-4CCB-944B-5D261E218AE9_1778915933700.png";
import ajitMonachoImg from "@assets/A460DB3B-9093-4E84-94AA-A6C8ADEC051A_1779085584552.png";
import michaelHurlstonImg from "@assets/D4E3FEF0-CB1F-4CFC-92C8-FBE2423D3026_1778915933700.png";
import paulChoImg from "@assets/EFCF1D2A-C8D2-4D24-9076-00D406059288_1778915933700.png";
import raghibHussainImg from "@assets/B17E97FA-FCA9-4F06-86B0-FF3AE511025A_1778915933700.png";
import davidLamImg from "@assets/407E990F-0E32-4B6C-882F-AD61B64E22A5_1778915933700.png";
import rodrigoLiangImg from "@assets/D5D33C40-3802-45DF-83B8-37A68C8E529B_1779121957187.png";
import sidShethImg from "@assets/AE1B747A-FB29-42E3-B787-F25E78086DCC_1778915933700.png";
import annaGoldieImg from "@assets/607DBF28-2718-42EE-BA73-59BE82AB69F9_1778915933700.png";
import naveenRaoImg from "@assets/675C4E53-308C-478B-939B-5DCADE397C7F_1779175010186.png";
import maryEllenRandallImg from "@assets/FE02514B-FACD-4065-94FD-F790F6502F85_1779297912788.png";

const banquetSpeakers = [
  { name: "Lip-Bu Tan", title: "CEO", company: "Intel", image: lipBuTanImg },
  { name: "Chenming Hu", title: "TSMC Distinguished Professor Emeritus, Father of 3D Transistor", company: "UC Berkeley", image: chenMingHuImg },
];

const conferenceSpeakers = [
  { name: "Ajit Manocha", title: "CEO", company: "SEMI", image: ajitMonachoImg },
  { name: "Anna Goldie", title: "CEO", company: "Ricursive Intelligence", image: annaGoldieImg },
  { name: "David Lam", title: "CEO, Multibeam", company: "Founder, Lam Research", image: davidLamImg },
  { name: "Dylan Patel", title: "CEO", company: "SemiAnalysis", image: dylanPatelImg },
  { name: "Irving Tan", title: "CEO", company: "Western Digital", image: irvingTanImg },
  { name: "John Martinis", title: "2025 Nobel Laureate in Physics", company: "President's Council of Advisors on Science and Technology", image: johnMartinisImg },
  { name: "Mark Wade", title: "CEO", company: "Ayar Labs", image: markWadeImg },
  { name: "Mary Ellen Randall", title: "President & CEO", company: "IEEE", image: maryEllenRandallImg },
  { name: "Michael Hurlston", title: "CEO", company: "Lumentum", image: michaelHurlstonImg },
  { name: "Michael Xie", title: "President & Co-Founder", company: "Fortinet", image: michaelXieImg },
  { name: "Naveen Rao", title: "CEO", company: "Unconventional AI", image: naveenRaoImg },
  { name: "Paul Cho", title: "President", company: "Samsung Semiconductor", image: paulChoImg },
  { name: "Raghib Hussain", title: "CEO", company: "Altera", image: sidShethImg },
  { name: "Rodrigo Liang", title: "CEO", company: "SambaNova", image: rodrigoLiangImg },
  { name: "Sassine Ghazi", title: "CEO", company: "Synopsys", image: sassineGhaziImg },
  { name: "Sid Sheth", title: "CEO", company: "D-Matrix", image: raghibHussainImg },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function SpeakerCard({ speaker }: { speaker: typeof banquetSpeakers[0] }) {
  return (
    <motion.div variants={itemVariants} className="group cursor-pointer">
      <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-card border border-white/5 group-hover:border-primary/50 transition-colors duration-500">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(212,175,55,0)] group-hover:shadow-[inset_0_0_50px_rgba(212,175,55,0.15)] transition-shadow duration-700 pointer-events-none" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-serif text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{speaker.name}</h3>
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">{speaker.title}</p>
        <p className="text-xs text-primary/70 mt-1 uppercase tracking-widest">{speaker.company}</p>
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex items-center gap-4 mb-14"
    >
      <div className="h-[1px] w-10 bg-primary/40" />
      <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary">{children}</span>
      <div className="h-[1px] flex-1 bg-white/5" />
    </motion.div>
  );
}

export function SpeakersSection() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl mb-4"
          >
            Distinguished <span className="text-primary italic">Speakers</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-primary mx-auto"
          />
        </div>

        {/* Dinner Banquet Speakers */}
        <div className="max-w-6xl mx-auto mb-20">
          <SectionLabel>Dinner Banquet Speakers</SectionLabel>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16"
          >
            {banquetSpeakers.map((speaker, index) => (
              <SpeakerCard key={index} speaker={speaker} />
            ))}
          </motion.div>
        </div>

        {/* Annual Conference Speakers */}
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Annual Conference Speakers</SectionLabel>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {conferenceSpeakers.map((speaker, index) => (
              <SpeakerCard key={index} speaker={speaker} />
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-primary/80 font-light italic text-lg mt-16 tracking-wide"
        >
          More Distinguished Speakers to Be Announced Soon
        </motion.p>
      </div>
    </section>
  );
}
