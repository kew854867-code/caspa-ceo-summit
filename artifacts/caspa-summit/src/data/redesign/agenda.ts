// AUTO-GENERATED from public/redesign/agenda.html — do not edit by hand.
export type AgendaItem = [
  time: string,
  type: string,
  title: string,
  people: string[],
  mod?: string | null,
  flags?: string,
];

export type AgendaDay = {
  id: string;
  chip: string;
  eyebrow: string;
  title: string;
  items: AgendaItem[];
};

export const DAYS: AgendaDay[] = [
 {
  "id": "d1",
  "chip": "Oct 23",
  "eyebrow": "Friday, October 23 · Afternoon",
  "title": "Annual Conference, Day 1",
  "items": [
   [
    "1:30 – 1:40 PM",
    "",
    "CASPA Opening",
    []
   ],
   [
    "1:40 – 2:00 PM",
    "KEYNOTE",
    "$100/Watt: The Evolving Economics of AI Infrastructure",
    [
     "Bill Brennan"
    ]
   ],
   [
    "2:00 – 2:40 PM",
    "PANEL",
    "Semiconductor Industry Outlook Panel",
    [
     "Stacy Rasgon",
     "Dylan Patel"
    ],
    "Austin Lyons|Creative Strategies"
   ],
   [
    "2:40 – 3:30 PM",
    "PANEL",
    "Silicon Capital: Investing in the Next Semiconductor Wave",
    [
     "Shahin Farshchi",
     "Albert Kim",
     "Andrew Tan",
     "Umesh Padval"
    ],
    "Brandon Wang|Synopsys"
   ],
   [
    "3:30 – 4:20 PM",
    "PANEL",
    "AI Computing: Designing the Next Generation of Intelligence",
    [
     "Faraj Aalaei",
     "Sunghyun Park",
     "Rajiv Khemani"
    ],
    "Daniel Nenni|SemiWiki"
   ],
   [
    "4:20 – 5:10 PM",
    "PANEL",
    "Edge AI & Intelligent Infrastructure",
    [
     "Krishna Rangasayee",
     "Melton Chang",
     "Sid Sheth"
    ],
    "Dylan Patel|SemiAnalysis"
   ],
   [
    "5:10 PM",
    "",
    "Conference Close",
    []
   ],
   [
    "6:00 – 7:00 PM",
    "",
    "BOD Election",
    []
   ]
  ]
 },
 {
  "id": "d2",
  "chip": "Oct 24 Morning",
  "eyebrow": "Saturday, October 24 · Morning",
  "title": "Annual Conference, Day 2",
  "items": [
   [
    "9:00 – 9:10 AM",
    "",
    "CASPA Welcome Remarks",
    []
   ],
   [
    "9:10 – 9:30 AM",
    "KEYNOTE",
    "SEMI Industry Update",
    [
     "Ajit Manocha"
    ]
   ],
   [
    "9:30 – 9:50 AM",
    "KEYNOTE",
    "IEEE Address",
    [
     "Mary Ellen Randall"
    ]
   ],
   [
    "9:50 – 9:55 AM",
    "KEYNOTE",
    "GSA Address (Video)",
    [
     "Jodi Shelton"
    ]
   ],
   [
    "9:55 – 10:15 AM",
    "KEYNOTE",
    "Re-Engineering the Future",
    [
     "Sassine Ghazi"
    ]
   ],
   [
    "10:15 – 10:30 AM",
    "",
    "Break",
    []
   ],
   [
    "10:30 – 11:10 AM",
    "PANEL",
    "Data Storage & Infrastructure in the AI Era",
    [
     "Avi Shetty",
     "Khurram Ismail",
     "Hao Zhong"
    ],
    "Nan Zhou|Temasek"
   ],
   [
    "11:10 – 11:50 AM",
    "PANEL",
    "AI Compute: Architectures Beyond the GPU",
    [
     "Naveen Rao",
     "Faris Sbahi",
     "Rodrigo Liang"
    ],
    "Max Cherney|Reuters"
   ],
   [
    "11:50 AM – 1:00 PM",
    "",
    "Networking Lunch",
    []
   ]
  ]
 },
 {
  "id": "d3",
  "chip": "Oct 24 Afternoon",
  "eyebrow": "Saturday, October 24 · Afternoon",
  "title": "Annual Conference, Day 2",
  "items": [
   [
    "1:00 – 1:20 PM",
    "KEYNOTE",
    "The Race to Connect AI",
    [
     "Michael Hurlston"
    ]
   ],
   [
    "1:20 – 1:40 PM",
    "KEYNOTE",
    "ASIC Design and Cyber Security",
    [
     "Michael Xie"
    ]
   ],
   [
    "1:40 – 2:00 PM",
    "KEYNOTE",
    "WD Address",
    [
     "Irving Tan"
    ]
   ],
   [
    "2:00 – 2:30 PM",
    "PANEL",
    "The Next Semiconductor Era: FPGAs, Advanced Manufacturing & Physical AI",
    [
     "Raghib Hussain",
     "David Lam"
    ],
    "Nitin Dahad|EE Times"
   ],
   [
    "2:30 – 2:40 PM",
    "",
    "Break",
    []
   ],
   [
    "2:40 – 3:20 PM",
    "PANEL",
    "From AI Algorithms to AI Silicon: Redefining the Future of Compute",
    [
     "Anna Goldie",
     "Gavin Uberti",
     "Ankur Gupta"
    ],
    "Edward Sperling|Semiconductor Engineering"
   ],
   [
    "3:20 – 4:00 PM",
    "PANEL",
    "Optical Interconnects & High-Speed Connectivity: The Next Data Center",
    [
     "Albert Zhang",
     "Mark Wade",
     "Hong Hou"
    ],
    "Dan Armbrust|Silicon Catalyst"
   ],
   [
    "4:00 – 4:30 PM",
    "FIRESIDE",
    "Wafer-Scale AI: Breaking the Compute Bottleneck",
    [
     "Andrew Feldman",
     "Jimmy Cheng"
    ]
   ],
   [
    "4:30 – 5:00 PM",
    "",
    "Dinner Banquet Registration",
    []
   ]
  ]
 },
 {
  "id": "d4",
  "chip": "Oct 24 Evening",
  "eyebrow": "Saturday, October 24 · Evening",
  "title": "35th Anniversary Dinner Banquet",
  "items": [
   [
    "5:00 – 6:00 PM",
    "",
    "VIP Reception",
    []
   ],
   [
    "6:20 – 6:30 PM",
    "",
    "Welcome Speech",
    []
   ],
   [
    "6:30 – 6:35 PM",
    "KEYNOTE",
    "Welcome Remarks by San Jose Mayor Matt Mahan",
    [
     "Matt Mahan"
    ]
   ],
   [
    "6:35 – 6:40 PM",
    "CEREMONY",
    "Bay Area Mayors on Stage",
    []
   ],
   [
    "6:40 – 7:00 PM",
    "",
    "Dinner",
    []
   ],
   [
    "7:00 – 7:15 PM",
    "KEYNOTE",
    "CASPA 2025–2026 President Gary Wang’s Speech",
    [
     "Gary Wang"
    ]
   ],
   [
    "7:15 – 7:25 PM",
    "CEREMONY",
    "CASPA Leadership Transition Ceremony",
    []
   ],
   [
    "7:25 – 7:40 PM",
    "KEYNOTE",
    "CASPA 2026–2027 President Jimmy Cheng’s Speech",
    [
     "Jimmy Cheng"
    ]
   ],
   [
    "7:40 – 7:45 PM",
    "KEYNOTE",
    "Special Address and Introduction of Lip-Bu Tan",
    [
     "Chenming Hu"
    ]
   ],
   [
    "7:45 – 8:45 PM",
    "FIRESIDE",
    "Fireside Chat: Intel CEO Lip-Bu Tan and CASPA President Jimmy Cheng",
    [
     "Lip-Bu Tan",
     "Jimmy Cheng"
    ],
    null,
    "hl"
   ],
   [
    "8:45 – 9:05 PM",
    "",
    "Introduction of Annual Conference Speakers on Stage",
    []
   ],
   [
    "9:05 – 9:20 PM",
    "CEREMONY",
    "CASPA/IEEE Scholarship, issued by the IEEE President and the Intel CEO",
    [
     "Mary Ellen Randall",
     "Lip-Bu Tan"
    ]
   ],
   [
    "9:20 – 9:35 PM",
    "",
    "Raffle",
    []
   ],
   [
    "9:35 – 10:05 PM",
    "",
    "Networking",
    []
   ]
  ]
 }
];

export const DAY_CHIPS: [string, string][] = [
  ["all", "All sessions"],
  ...DAYS.map((d) => [d.id, d.chip] as [string, string]),
];
