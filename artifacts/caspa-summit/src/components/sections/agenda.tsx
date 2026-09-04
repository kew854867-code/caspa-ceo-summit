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
import sunghyunParkImg from "@assets/C462E470-E1A6-4398-87A5-715533D6F533_1782395495008.png";
import barunKarImg from "@assets/D82EA37F-328D-4934-B5C2-D5F03A69BE5A_1786944069778.jpeg";
import krishnaRangasayeeImg from "@assets/147934E5-D9D9-425F-B01A-A3E1C83DAE03_1786154700547.png";
import meltonChangImg from "@assets/493_1784912725098.jpeg";
import sidShethImg from "@assets/IMG_6834_1787414044687.jpeg";
import xinGuoImg from "@assets/3DEF3128-BDD7-4370-A37C-159C25164D57_1783024768619.png";
import khurramIsmailImg from "@assets/DF087C9C-2FD8-4DA8-981C-6CACE372E69F_1783024768619.png";
import haoZhongImg from "@assets/636BA633-15E1-466C-9DF2-4DAB82F7F430_1785997200645.png";
import naveenRaoImg from "@assets/675C4E53-308C-478B-939B-5DCADE397C7F_1779175010186.png";
import farisSbahiImg from "@assets/13D263ED-E081-4D81-8948-2DE6A9C04C9D_1785518260658.png";
import rodrigoLiangImg from "@assets/D5D33C40-3802-45DF-83B8-37A68C8E529B_1779121957187.png";
import ajitManochaImg from "@assets/A460DB3B-9093-4E84-94AA-A6C8ADEC051A_1779085584552.png";
import maryEllenRandallImg from "@assets/IMG_6572_1787074080316.jpeg";
import jodiSheltonImg from "@assets/019610F7-BA06-4F10-B334-E098B5FFDA07_1786154700547.png";
import sassineGhaziImg from "@assets/92FE495A-00F9-44B1-AF46-A088FA81D57D_1780293398458.png";
import michaelHurlstonImg from "@assets/D4E3FEF0-CB1F-4CFC-92C8-FBE2423D3026_1778915933700.png";
import michaelXieImg from "@assets/278D7D17-9372-4E07-957C-EC5DCDA6FBA7_1780116650886.png";
import irvingTanImg from "@assets/F1A23EB4-C629-4C0D-9BA2-5B670A376C8B_1780563808959.png";
import raghibHussainImg from "@assets/raghib-hussain-portrait.jpeg";
import davidLamImg from "@assets/407E990F-0E32-4B6C-882F-AD61B64E22A5_1778915933700.png";
import annaGoldieImg from "@assets/36B0412A-4419-4BD1-BA4D-E732DAFB6F8A_1786950348557.png";
import gavinUbertiImg from "@assets/267ED105-AAEE-45C3-8EE0-3E068D0B3B48_1782695597644.png";
import ankurGuptaImg from "@assets/09BF73E0-26BD-4EE9-B5DE-932E07F44234_1785518260658.png";
import albertZhangImg from "@assets/6AA5EE25-3C6E-4D4D-8475-B14C351175A2_1784656063216.png";
import markWadeImg from "@assets/0886A067-9919-4756-BAB4-6F8A0421AF07_1783024768619.png";
import hongHouImg from "@assets/D68D902F-41E0-4CC1-BC62-B773BAA35122_1785860935821.png";
import andrewFeldmanImg from "@assets/F3EF3946-5B5D-400F-BCA9-E0F42CD64866_1783751307115.png";
import jimmyChengImg from "@assets/IMG_4704_1785518260658.png";
import lipBuTanImg from "@assets/2C524BF7-CBB4-419F-A97E-A9E39B687AA3_1779086898716.png";
import chenMingHuImg from "@assets/55464DD5-0037-4AC7-8E91-D403F5C100D3_1779121957187.png";
import garyWangImg from "@assets/IMG_6797_1787319026185.jpeg";
import nanZhouImg from "@assets/IMG_6801_1787329662285.jpeg";
import ianCutressImg from "@assets/IMG_6800_1787330526274.jpeg";
import danArmbrustImg from "@assets/IMG_6810_1787336307162.webp";
import danielNenniImg from "@assets/IMG_6812_1787336509855.jpeg";
import nitinDahadImg from "@assets/IMG_6813_1787336767215.webp";
import edwardSperlingImg from "@assets/IMG_6845_1787502635651.jpeg";
import billBrennanImg from "@assets/96F4B38E-48A3-44B1-886A-627494ED3818_1788494304576.png";

type AgendaSpeaker = {
  name: string;
  title: string;
  company?: string;
  image?: string;
  moderator?: boolean;
};

type AgendaItem = {
  start: string;
  end: string;
  title: string;
  description?: string;
  speakers?: AgendaSpeaker[];
};

const oct23AfternoonPanels: AgendaItem[] = [
  {
    start: "1:30 PM",
    end: "1:40 PM",
    title: "CASPA Opening",
    speakers: [],
  },
  {
    start: "1:40 PM",
    end: "2:00 PM",
    title: "Credo Address",
    speakers: [
      { name: "Bill Brennan", title: "CEO", company: "Credo", image: billBrennanImg },
    ],
  },
  {
    start: "2:00 PM",
    end: "2:40 PM",
    title: "Semiconductor Industry Outlook Panel",
    speakers: [
      { name: "Austin Lyons", title: "Senior Analyst", company: "Creative Strategies", image: austinLyonsImg, moderator: true },
      { name: "Stacy Rasgon", title: "Managing Director", company: "Bernstein", image: stacyRasgonImg },
      { name: "Dylan Patel", title: "CEO", company: "SemiAnalysis", image: dylanPatelImg },
    ],
  },
  {
    start: "2:40 PM",
    end: "3:30 PM",
    title: "Silicon Capital: Investing in the Next Semiconductor Wave",
    speakers: [
      { name: "Brandon Wang", title: "VP", company: "Synopsys", image: brandonWangImg, moderator: true },
      { name: "Shahin Farshchi", title: "General Partner", company: "Lux Capital", image: shahinFarshchiImg },
      { name: "Albert Kim", title: "Head", company: "Samsung Ventures America", image: albertKimImg },
      { name: "Andrew Tan", title: "Managing Director", company: "Salience Capital", image: andrewTanImg },
      { name: "Umesh Padval", title: "Managing Partner", company: "Seligman Ventures", image: umeshPadvalImg },
    ],
  },
  {
    start: "3:30 PM",
    end: "4:20 PM",
    title: "AI Computing: Designing the Next Generation of Intelligence",
    speakers: [
      { name: "Daniel Nenni", title: "Founder", company: "SemiWiki", image: danielNenniImg, moderator: true },
      { name: "Faraj Aalaei", title: "CEO", company: "Cognichip", image: farajAalaeiImg },
      { name: "Sunghyun Park", title: "CEO", company: "Rebellions", image: sunghyunParkImg },
      { name: "Barun Kar", title: "CEO", company: "Upscale AI", image: barunKarImg },
    ],
  },
  {
    start: "4:20 PM",
    end: "5:10 PM",
    title: "Edge AI & Intelligent Infrastructure",
    speakers: [
      { name: "Dylan Patel", title: "CEO", company: "SemiAnalysis", image: dylanPatelImg, moderator: true },
      { name: "Krishna Rangasayee", title: "CEO", company: "Sima.ai", image: krishnaRangasayeeImg },
      { name: "Melton Chang", title: "President", company: "Schneider Electric Power Systems", image: meltonChangImg },
      { name: "Sid Sheth", title: "CEO", company: "D-Matrix", image: sidShethImg },
    ],
  },
];

const oct23ClosingItems: AgendaItem[] = [
  { start: "6:00 PM", end: "7:00 PM", title: "BOD Election" },
];

const oct24MorningItems: AgendaItem[] = [
  { start: "9:00 AM", end: "9:10 AM", title: "CASPA Welcome Remarks" },
  { start: "9:10 AM", end: "9:30 AM", title: "SEMI Industry Update", speakers: [{ name: "Ajit Manocha", title: "CEO", company: "SEMI", image: ajitManochaImg }] },
  { start: "9:30 AM", end: "9:50 AM", title: "IEEE address", speakers: [{ name: "Mary Ellen Randall", title: "President & CEO", company: "IEEE", image: maryEllenRandallImg }] },
  { start: "9:50 AM", end: "9:55 AM", title: "GSA Address (Video)", speakers: [{ name: "Jodi Shelton", title: "CEO", company: "Global Semiconductor Alliance", image: jodiSheltonImg }] },
  { start: "9:55 AM", end: "10:15 AM", title: "Re-Engineering the Future", speakers: [{ name: "Sassine Ghazi", title: "CEO", company: "Synopsys", image: sassineGhaziImg }] },
  { start: "10:15 AM", end: "10:30 AM", title: "Break" },
  {
    start: "10:30 AM",
    end: "11:10 AM",
    title: "Data Storage & Infrastructure in the AI Era",
    speakers: [
      { name: "Nan Zhou", title: "Director", company: "Temasek", image: nanZhouImg, moderator: true },
      { name: "Xin Guo", title: "CEO", company: "Solidigm", image: xinGuoImg },
      { name: "Khurram Ismail", title: "CPO", company: "SanDisk", image: khurramIsmailImg },
      { name: "Hao Zhong", title: "CEO", company: "Scaleflux", image: haoZhongImg },
    ],
  },
  {
    start: "11:10 AM",
    end: "11:50 AM",
    title: "AI Compute: Architectures Beyond the GPU",
    speakers: [
      { name: "Ian Cutress", title: "CEO", company: "More than Moore", image: ianCutressImg, moderator: true },
      { name: "Naveen Rao", title: "CEO", company: "Unconventional AI", image: naveenRaoImg },
      { name: "Faris Sbahi", title: "CEO", company: "Normal Computing", image: farisSbahiImg },
      { name: "Rodrigo Liang", title: "CEO", company: "SambaNova", image: rodrigoLiangImg },
    ],
  },
  { start: "11:50 AM", end: "1:00 PM", title: "Networking Lunch" },
];

const oct24AfternoonItems: AgendaItem[] = [
  { start: "1:00 PM", end: "1:20 PM", title: "the Race to connect AI", speakers: [{ name: "Michael Hurlston", title: "CEO", company: "Lumentum", image: michaelHurlstonImg }] },
  { start: "1:20 PM", end: "1:40 PM", title: "ASIC design and Cyber Security", speakers: [{ name: "Michael Xie", title: "President & Co-Founder", company: "Fortinet", image: michaelXieImg }] },
  { start: "1:40 PM", end: "2:00 PM", title: "WD Address", speakers: [{ name: "Irving Tan", title: "CEO", company: "WD", image: irvingTanImg }] },
  {
    start: "2:00 PM",
    end: "2:30 PM",
    title: "The Next Semiconductor Era: FPGAs, Advanced Manufacturing & Physical AI",
    speakers: [
      { name: "Nitin Dahad", title: "Executive Editor", company: "EE Times", image: nitinDahadImg, moderator: true },
      { name: "Raghib Hussain", title: "CEO", company: "Altera", image: raghibHussainImg },
      { name: "David Lam", title: "CEO, Multibeam", company: "Founder, Lam Research", image: davidLamImg },
    ],
  },
  { start: "2:30 PM", end: "2:40 PM", title: "Break" },
  {
    start: "2:40 PM",
    end: "3:20 PM",
    title: "From AI Algorithms to AI Silicon: Redefining the Future of Compute",
    speakers: [
      { name: "Edward Sperling", title: "Editor in Chief", company: "Semiconductor Engineering", image: edwardSperlingImg, moderator: true },
      { name: "Anna Goldie", title: "CEO", company: "Ricursive Intelligence", image: annaGoldieImg },
      { name: "Gavin Uberti", title: "CEO", company: "Etched", image: gavinUbertiImg },
      { name: "Ankur Gupta", title: "Head of EDA IC", company: "Siemens", image: ankurGuptaImg },
    ],
  },
  {
    start: "3:20 PM",
    end: "4:00 PM",
    title: "Optical Interconnects & High-Speed Connectivity: The Next Data Center",
    speakers: [
      { name: "Dan Armbrust", title: "Co-founder", company: "Silicon Catalyst", image: danArmbrustImg, moderator: true },
      { name: "Albert Zhang", title: "CEO", company: "Silith", image: albertZhangImg },
      { name: "Mark Wade", title: "CEO", company: "Ayar Labs", image: markWadeImg },
      { name: "Hong Hou", title: "CEO", company: "Semtech", image: hongHouImg },
    ],
  },
  {
    start: "4:00 PM",
    end: "4:30 PM",
    title: "Wafer-Scale AI: Breaking the Compute Bottleneck",
    description: "Cerebras CEO Andrew Feldman in conversation with CASPA President Jimmy Cheng",
    speakers: [
      { name: "Andrew Feldman", title: "CEO", company: "Cerebras", image: andrewFeldmanImg },
      { name: "Jimmy Cheng", title: "President", company: "CASPA '26–27", image: jimmyChengImg },
    ],
  },
  { start: "4:30 PM", end: "5:00 PM", title: "Dinner Banquet Registration" },
];

const eveningItems: AgendaItem[] = [
  { start: "5:00 PM", end: "6:00 PM", title: "VIP Reception", description: "" },
  { start: "6:20 PM", end: "6:30 PM", title: "Welcome Speech", description: "" },
  { start: "6:30 PM", end: "7:00 PM", title: "Dinner", description: "" },
  {
    start: "7:00 PM",
    end: "7:15 PM",
    title: "CASPA 2025–2026 President Gary Wang's Speech",
    description: "",
    speakers: [{ name: "Gary Wang", title: "President", company: "CASPA '25–26", image: garyWangImg }],
  },
  { start: "7:15 PM", end: "7:25 PM", title: "CASPA Leadership Transition Ceremony", description: "" },
  {
    start: "7:25 PM",
    end: "7:40 PM",
    title: "CASPA 2026–2027 President Jimmy Cheng's Speech",
    description: "",
    speakers: [{ name: "Jimmy Cheng", title: "President", company: "CASPA '26–27", image: jimmyChengImg }],
  },
  {
    start: "7:40 PM",
    end: "7:45 PM",
    title: "Special Address and Introduction of Lip-Bu Tan",
    description: "By Dr. Chenming Hu",
    speakers: [{ name: "Chenming Hu", title: "TSMC Distinguished Professor Emeritus, Father of 3D Transistor", company: "UC Berkeley", image: chenMingHuImg }],
  },
  {
    start: "7:45 PM",
    end: "8:45 PM",
    title: "Fireside Chat: Intel CEO Lip-Bu Tan and CASPA President Jimmy Cheng",
    description: "",
    speakers: [
      { name: "Lip-Bu Tan", title: "CEO", company: "Intel", image: lipBuTanImg },
      { name: "Jimmy Cheng", title: "President", company: "CASPA '26–27", image: jimmyChengImg },
    ],
  },
  { start: "8:45 PM", end: "9:05 PM", title: "Introduce Annual Conference Speakers on Stage", description: "" },
  { start: "9:05 PM", end: "9:20 PM", title: "CASPA/IEEE Scholarship", description: "Issued by IEEE President and Intel CEO" },
  { start: "9:20 PM", end: "9:35 PM", title: "Raffle", description: "" },
  { start: "9:35 PM", end: "10:05 PM", title: "Networking", description: "" },
];

function ScheduleList({ items }: { items: AgendaItem[] }) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <motion.div
          key={`${item.start}-${item.title}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
          className="flex flex-col md:flex-row gap-4 md:gap-12 items-start group py-6 border-b border-white/10 last:border-0"
        >
          <div className="md:w-44 shrink-0 flex flex-col">
            <span className="text-primary font-medium tracking-wider text-sm">{item.start}</span>
            <span className="text-muted-foreground/50 text-xs tracking-wider">until {item.end}</span>
          </div>
          <div className="flex-1 relative">
            <div className="absolute left-[-1.5rem] md:left-[-4rem] top-1.5 w-1.5 h-1.5 rounded-full border border-primary/40 group-hover:bg-primary transition-colors duration-300 hidden md:block" />
            <h4 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-muted-foreground font-light mt-1 text-sm">{item.description}</p>
            )}
            {item.speakers && item.speakers.length > 0 && (
                <div className="flex flex-col gap-3 mt-4 md:flex-row md:flex-wrap md:gap-4">
                {item.speakers.map((speaker) => {
                  const initials = speaker.name.split(" ").map((name) => name[0]).join("").slice(0, 2);
                  return (
                    <div key={speaker.name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-primary/30 bg-primary/10 shrink-0 flex items-center justify-center">
                        {speaker.image ? (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover object-top"
                            style={speaker.name === "Chenming Hu" ? { objectPosition: "center 35%" } : undefined}
                          />
                        ) : (
                          <span className="font-serif text-sm text-primary/70">{initials}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground leading-tight">{speaker.name}</p>
                          {speaker.moderator && (
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-primary/80 border border-primary/30 px-1.5 py-0.5 leading-none">Moderator</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {speaker.company ? `${speaker.title}, ${speaker.company}` : speaker.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
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
            <ScheduleList items={oct23AfternoonPanels} />
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-widest uppercase text-primary mb-6"
            >
              Conference Close
            </motion.h3>
            <ScheduleList items={oct23ClosingItems} />
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
            <ScheduleList items={oct24MorningItems} />
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
            <ScheduleList items={oct24AfternoonItems} />
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

            <ScheduleList items={eveningItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
