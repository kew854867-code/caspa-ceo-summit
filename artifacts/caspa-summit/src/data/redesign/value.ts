// "Why attend" content: who is in the room, role-based entry points, agenda themes.
// Sector / role / theme assignments are editorial and should be reviewed by the organizers.
// Every session title below must match src/data/redesign/agenda.ts exactly.
import { DAYS } from "@/data/redesign/agenda";

/* ---------- Eight modules of the industry (chip diagram) ---------- */

export type Module = { key: string; lines: [string, string]; blurb: string };

// Reading order on the chip: top row, middle row (hub sits in the centre), bottom row.
export const MODULES: Module[] = [
  { key: "design", lines: ["Chip Design", "& Security"], blurb: "The tools every chip starts with." },
  { key: "compute", lines: ["AI Compute", "& Silicon"], blurb: "The chips behind AI." },
  { key: "memory", lines: ["Memory", "& Storage"], blurb: "Where AI data lives." },
  { key: "fab", lines: ["Manufacturing", "& Power"], blurb: "Fabs, equipment and power." },
  { key: "network", lines: ["Networking", "& Optics"], blurb: "Linking chips into one system." },
  { key: "capital", lines: ["Capital", "& Research"], blurb: "Who funds what gets built." },
  { key: "bodies", lines: ["Industry Bodies &", "Public Sector"], blurb: "Standards, policy, ecosystem." },
  { key: "media", lines: ["Media", "& Analysts"], blurb: "Who explains it to the world." },
];

/* ---------- Role-based entry points ---------- */

export type Role = {
  key: string;
  label: string;
  headline: string;
  actions: string[];
  sessions: string[]; // exact agenda titles
};

export const ROLES: Role[] = [
  {
    key: "founder",
    label: "Startup founder",
    headline: "Meet the capital, and the founders a step ahead of you.",
    actions: [
      "Hear how investors see the next wave of semiconductors, and what they back.",
      "Meet venture investors from Lux Capital, Samsung Ventures America, Salience Capital and Seligman Ventures.",
      "Compare notes with the CEOs of AI compute companies such as Cerebras, SambaNova and Etched.",
    ],
    sessions: [
      "Silicon Capital: Investing in the Next Semiconductor Wave",
      "Edge AI & Intelligent Infrastructure",
      "AI Compute: Architectures Beyond the GPU",
    ],
  },
  {
    key: "supplier",
    label: "Supplier or vendor",
    headline: "Meet the people who design the platforms you sell into.",
    actions: [
      "Hear where AI infrastructure is heading across compute, memory, networking and optics.",
      "Meet leaders at Synopsys, Siemens, Fortinet and Intel, and the memory and interconnect companies around them.",
      "Host a table at the Dinner Banquet and bring your own customers and partners.",
    ],
    sessions: [
      "Data Storage & Infrastructure in the AI Era",
      "Optical Interconnects & High-Speed Connectivity: The Next Data Center",
      "ASIC Design and Cyber Security",
    ],
  },
  {
    key: "investor",
    label: "Investor or analyst",
    headline: "Pressure-test your view of the market.",
    actions: [
      "Hear the semiconductor outlook from the analysts at Bernstein and SemiAnalysis.",
      "Question operators working on wafer-scale compute, optics and memory.",
      "Meet founders and CEOs across AI compute, storage and interconnect in one place.",
    ],
    sessions: [
      "Semiconductor Industry Outlook Panel",
      "Silicon Capital: Investing in the Next Semiconductor Wave",
      "Wafer-Scale AI: Breaking the Compute Bottleneck",
    ],
  },
  {
    key: "strategy",
    label: "Strategy or procurement lead",
    headline: "Understand the supply chain before you commit to it.",
    actions: [
      "Learn what AI infrastructure costs to run, counted in watts.",
      "Hear the CEO of Intel in conversation with CASPA's president.",
      "Meet vendors across the stack: compute, storage, networking and design tools.",
    ],
    sessions: [
      "$100/Watt: The Evolving Economics of AI Infrastructure",
      "AI Compute: Architectures Beyond the GPU",
      "Fireside Chat: Intel CEO Lip-Bu Tan and CASPA President Jimmy Cheng",
    ],
  },
];

/** Look up an agenda session by exact title; returns its day label and time. */
export function findSession(title: string): { day: string; time: string } | null {
  for (const d of DAYS) {
    for (const it of d.items) {
      if (it[2] === title) return { day: d.chip.split(" ").slice(0, 2).join(" "), time: it[0] };
    }
  }
  return null;
}

/* ---------- Agenda themes + one-line takeaways ---------- */

export const THEMES = [
  "AI Compute",
  "Memory & Storage",
  "Networking & Optics",
  "Design & Security",
  "Capital & Markets",
  "Industry & Leadership",
] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_BY_TITLE: Record<string, Theme> = {
  "$100/Watt: The Evolving Economics of AI Infrastructure": "AI Compute",
  "Semiconductor Industry Outlook Panel": "Capital & Markets",
  "Silicon Capital: Investing in the Next Semiconductor Wave": "Capital & Markets",
  "AI Computing: Designing the Next Generation of Intelligence": "AI Compute",
  "Edge AI & Intelligent Infrastructure": "AI Compute",
  "SEMI Industry Update": "Industry & Leadership",
  "Advancing Humanity through Responsible Design": "Industry & Leadership",
  "Collaboration, Innovation, and Leadership in the AI Era": "Industry & Leadership",
  "Re-Engineering the Future": "Design & Security",
  "Data Storage & Infrastructure in the AI Era": "Memory & Storage",
  "AI Compute: Architectures Beyond the GPU": "AI Compute",
  "The Race to Connect AI": "Networking & Optics",
  "ASIC Design and Cyber Security": "Design & Security",
  "WD Address": "Memory & Storage",
  "The Next Semiconductor Era: FPGAs, Advanced Manufacturing & Physical AI": "Industry & Leadership",
  "From AI Algorithms to AI Silicon: Redefining the Future of Compute": "AI Compute",
  "Optical Interconnects & High-Speed Connectivity: The Next Data Center": "Networking & Optics",
  "Wafer-Scale AI: Breaking the Compute Bottleneck": "AI Compute",
  "Fireside Chat: Intel CEO Lip-Bu Tan and CASPA President Jimmy Cheng": "Industry & Leadership",
};

// Draft one-liners paraphrasing each session title. Speakers / organizers should confirm before launch.
export const TAKEAWAY_BY_TITLE: Record<string, string> = {
  "$100/Watt: The Evolving Economics of AI Infrastructure": "What AI infrastructure really costs, counted in watts.",
  "Semiconductor Industry Outlook Panel": "Where the analysts see demand and competition heading.",
  "Silicon Capital: Investing in the Next Semiconductor Wave": "What investors are backing in the next wave of semiconductors.",
  "AI Computing: Designing the Next Generation of Intelligence": "How the next generation of AI computing is being designed.",
  "Edge AI & Intelligent Infrastructure": "How AI moves out of the data center and to the edge.",
  "SEMI Industry Update": "The state of the industry, from the CEO of SEMI.",
  "Advancing Humanity through Responsible Design": "Why standards, trust and talent shape what technology becomes.",
  "Collaboration, Innovation, and Leadership in the AI Era": "How collaboration and leadership are changing in the AI era.",
  "Re-Engineering the Future": "The CEO of Synopsys on re-engineering the future of design.",
  "Data Storage & Infrastructure in the AI Era": "How AI is reshaping data storage and infrastructure.",
  "AI Compute: Architectures Beyond the GPU": "Which architectures are competing to go beyond the GPU.",
  "The Race to Connect AI": "How AI systems get connected as data centers scale.",
  "ASIC Design and Cyber Security": "Why custom silicon design and security now go together.",
  "WD Address": "The CEO of Western Digital on where data storage is going.",
  "The Next Semiconductor Era: FPGAs, Advanced Manufacturing & Physical AI": "What FPGAs, advanced manufacturing and physical AI mean for what comes next.",
  "From AI Algorithms to AI Silicon: Redefining the Future of Compute": "How algorithms are being turned into silicon.",
  "Optical Interconnects & High-Speed Connectivity: The Next Data Center": "What optical interconnects mean for the next data center.",
  "Wafer-Scale AI: Breaking the Compute Bottleneck": "A conversation on wafer-scale AI and the compute bottleneck.",
  "Fireside Chat: Intel CEO Lip-Bu Tan and CASPA President Jimmy Cheng": "A conversation with the CEO of Intel.",
};
