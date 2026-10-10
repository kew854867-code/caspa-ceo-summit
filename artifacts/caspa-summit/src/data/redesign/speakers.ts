// AUTO-GENERATED from public/redesign/assets/data.js — do not edit by hand.
export const PHOTO_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/redesign/assets/spk/`;

export type Person = { name: string; title: string; company: string; photo: string };

export const FEATURED: Person[] = [
  { name: "Gary Wang", title: "President", company: "CASPA '25–'26", photo: "gary-wang.jpg" },
  { name: "Jimmy Cheng", title: "President", company: "CASPA '26–'27", photo: "jimmy-cheng.jpg" },
  { name: "Lip-Bu Tan", title: "CEO", company: "Intel", photo: "lip-bu-tan.jpg" },
  { name: "Chenming Hu", title: "Father of the 3D Transistor", company: "UC Berkeley", photo: "chenming-hu.jpg" },
  { name: "Andrew Feldman", title: "CEO", company: "Cerebras", photo: "andrew-feldman.jpg" },
  { name: "Sassine Ghazi", title: "CEO", company: "Synopsys", photo: "sassine-ghazi.jpg" },
  { name: "Dylan Patel", title: "CEO", company: "SemiAnalysis", photo: "dylan-patel.jpg" },
  { name: "Rodrigo Liang", title: "CEO", company: "SambaNova", photo: "rodrigo-liang.jpg" },
  { name: "Ajit Manocha", title: "CEO", company: "SEMI", photo: "ajit-manocha.jpg" },
];

export const MORE: Person[] = [
  { name: "Matt Mahan", title: "Mayor", company: "City of San Jose", photo: "matt-mahan.jpg" },
  { name: "Rajiv Khemani", title: "Executive Chairman, Upscale AI", company: "CEO, Velaura AI", photo: "rajiv-khemani.jpg" },
  { name: "Avi Shetty", title: "Vice President", company: "Solidigm", photo: "avi-shetty-3.jpg" },
  { name: "Albert Kim", title: "Head", company: "Samsung Ventures America", photo: "albert-kim.jpg" },
  { name: "Albert Zhang", title: "CEO", company: "Silith", photo: "albert-zhang.jpg" },
  { name: "Andrew Tan", title: "Managing Director", company: "Salience Capital", photo: "andrew-tan.jpg" },
  { name: "Ankur Gupta", title: "Head of EDA IC", company: "Siemens", photo: "ankur-gupta.jpg" },
  { name: "Anna Goldie", title: "CEO", company: "Ricursive Intelligence", photo: "anna-goldie.jpg" },
  { name: "Bill Brennan", title: "CEO", company: "Credo", photo: "bill-brennan.jpg" },
  { name: "David Lam", title: "CEO, Multibeam", company: "Founder, Lam Research", photo: "david-lam.jpg" },
  { name: "Faraj Aalaei", title: "CEO", company: "Cognichip", photo: "faraj-aalaei.jpg" },
  { name: "Faris Sbahi", title: "CEO", company: "Normal Computing", photo: "faris-sbahi.jpg" },
  { name: "Gavin Uberti", title: "CEO", company: "Etched", photo: "gavin-uberti.jpg" },
  { name: "Hao Zhong", title: "CEO", company: "ScaleFlux", photo: "hao-zhong.jpg" },
  { name: "Hong Hou", title: "CEO", company: "Semtech", photo: "hong-hou.jpg" },
  { name: "Irving Tan", title: "CEO", company: "WD", photo: "irving-tan.jpg" },
  { name: "Jodi Shelton", title: "CEO", company: "Global Semiconductor Alliance", photo: "jodi-shelton.jpg" },
  { name: "Khurram Ismail", title: "CPO", company: "Sandisk", photo: "khurram-ismail.jpg" },
  { name: "Krishna Rangasayee", title: "CEO", company: "Sima.ai", photo: "krishna-rangasayee.jpg" },
  { name: "Mark Wade", title: "CEO", company: "Ayar Labs", photo: "mark-wade.jpg" },
  { name: "Mary Ellen Randall", title: "President & CEO", company: "IEEE", photo: "mary-ellen-randall.jpg" },
  { name: "Melton Chang", title: "Executive Vice President", company: "Schneider Electric Power Systems", photo: "melton-chang-2.jpg" },
  { name: "Michael Hurlston", title: "CEO", company: "Lumentum", photo: "michael-hurlston.jpg" },
  { name: "Michael Xie", title: "President & Co-founder", company: "Fortinet", photo: "michael-xie.jpg" },
  { name: "Naveen Rao", title: "CEO", company: "Unconventional AI", photo: "naveen-rao.jpg" },
  { name: "Raghib Hussain", title: "CEO", company: "Altera", photo: "raghib-hussain.jpg" },
  { name: "Shahin Farshchi", title: "General Partner", company: "Lux Capital", photo: "shahin-farshchi.jpg" },
  { name: "Sid Sheth", title: "CEO", company: "D-Matrix", photo: "sid-sheth.jpg" },
  { name: "Stacy Rasgon", title: "Managing Director", company: "Bernstein", photo: "stacy-rasgon.jpg" },
  { name: "Sunghyun Park", title: "CEO", company: "Rebellions", photo: "sunghyun-park.jpg" },
  { name: "Umesh Padval", title: "Managing Partner", company: "Seligman Ventures", photo: "umesh-padval.jpg" },
  { name: "Austin Lyons", title: "Senior Analyst", company: "Creative Strategies", photo: "austin-lyons.jpg" },
  { name: "Brandon Wang", title: "VP", company: "Synopsys", photo: "brandon-wang-2.jpg" },
  { name: "Dan Armbrust", title: "Co-founder", company: "Silicon Catalyst", photo: "dan-armbrust-3.jpg" },
  { name: "Daniel Nenni", title: "Founder", company: "SemiWiki", photo: "daniel-nenni-2.jpg" },
  { name: "Edward Sperling", title: "Editor in Chief", company: "Semiconductor Engineering", photo: "edward-sperling-3.jpg" },
  { name: "Max Cherney", title: "Tech Correspondent", company: "Reuters", photo: "max-cherney-3.jpg" },
  { name: "Nan Zhou", title: "Director", company: "Temasek", photo: "nan-zhou.jpg" },
  { name: "Nitin Dahad", title: "Executive Editor", company: "EE Times", photo: "nitin-dahad-2.jpg" },
  { name: "Christie Wang", title: "CEO", company: "Vista Robotics Inc.", photo: "christie-wang.jpg" },
  { name: "Qingyun Cao", title: "Founder & Host", company: "Silicon Valley Vector", photo: "qingyun-cao.jpg" },
];

export const ALL: Person[] = [...FEATURED, ...MORE];

// Shown in the homepage speaker lists. Gary Wang stays in ALL so the agenda can still show him.
export const HIDDEN_FROM_LISTS = ["Gary Wang"];
export const LISTED: Person[] = ALL.filter((p) => !HIDDEN_FROM_LISTS.includes(p.name));

export const TOP_NAMES: string[] = ["Lip-Bu Tan","Chenming Hu","Sassine Ghazi","Andrew Feldman","Irving Tan","Jimmy Cheng","Michael Hurlston","Bill Brennan","Ajit Manocha","Michael Xie","Dylan Patel","David Lam","Rodrigo Liang","Raghib Hussain","Hong Hou","Krishna Rangasayee","Gavin Uberti","Naveen Rao"];

export const byName = (name: string): Person | undefined =>
  ALL.find((p) => p.name === name);

export const topSpeakers: Person[] = TOP_NAMES.map(byName).filter(
  (p): p is Person => Boolean(p),
);
