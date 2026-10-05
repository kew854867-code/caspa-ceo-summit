// AUTO-GENERATED from public/redesign/index.html — do not edit by hand.
export const LOGO_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/redesign/assets/logos/`;

export type SponsorTier = { name: string; c4: boolean; cols: string; logos: string[] };

export const SPONSOR_TIERS: SponsorTier[] = [
 {
  "name": "Event Sponsors",
  "c4": false,
  "cols": "c2",
  "logos": [
   "statschippac|Premier Sponsor",
   "solidigm|LED Sponsor"
  ]
 },
 {
  "name": "Table Sponsors",
  "c4": true,
  "cols": "c4",
  "logos": [
   "meta",
   "wd.svg",
   "siemens",
   "credo.svg",
   "rambus",
   "normalcomputing.svg",
   "silith-white",
   "tetramem",
   "multibeam",
   "architectlabs",
   "sufastech",
   "opennetwork",
   "wgtech",
   "fareast",
   "t3w",
   "futurus",
   "youandi"
  ]
 },
 {
  "name": "Display Tables",
  "c4": true,
  "cols": "c4",
  "logos": [
   "wd.svg",
   "tgvtech",
   "architectlabs",
   "puppygraph.svg",
   "phantafield",
   "wiskind",
   "kaiyan",
   "upmarket"
  ]
 }
];

export const MEDIA_PARTNERS: [string, string][] = [["Reuters","reuters.png"],["ABC7","abc7.png"],["EE Times","eetimes.png"],["SemiWiki","semiwiki.png"],["NYSE Wired","nysewired.png"]];

// Alliance partners: file is the logo file name, or null to render a text badge. Logos first, text badges after.
export const ALLIANCE_PARTNERS: [string, string | null][] = [
 ["IEEE","ieee.png"],
 ["GPT.DAO","gptdao.png"],
 ["VIP Club","vipclub.png"],
 ["CEO","stanfordceo.png"],
 ["SESE","sese.png"],
 ["PopPopTech","poppoptech.png"],
 ["GSA",null],
 ["CIE-SF",null],
 ["Monte Jade",null],
 ["SVTA",null],
 ["TAITA",null],
 ["SVCTBA",null],
 ["HYSTA",null],
 ["CALOBA",null]
];

export const PARTNER_LOGO_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/redesign/assets/media/`;

export const RECAP_VIDEOS: { id: string; title: string; meta: string }[] = [
 {
  "id": "aUwHrFS5kJ4",
  "title": "2025 Annual Conference &amp; Dinner Banquet",
  "meta": "Recap · 2:10"
 },
 {
  "id": "F2eis4isQiA",
  "title": "Fireside Chat With Jensen Huang",
  "meta": "2023 Dinner Banquet · 1:00:28"
 },
 {
  "id": "Ukoc7_vyLf0",
  "title": "2024 Annual Conference &amp; Dinner Banquet",
  "meta": "Summary · 2:14"
 }
];

export const TICKETS: { hl: boolean; name: string; price: string; perks: string[]; href: string; cta: string }[] = [
 {
  "hl": false,
  "name": "Annual Conference",
  "price": "$399",
  "perks": [
   "Oct 23–24 keynotes and panels"
  ],
  "href": "https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-the-ceo-summit-tickets-1994631439329?aff=oddtdtcreator",
  "cta": "Register →"
 },
 {
  "hl": true,
  "name": "Conference + Banquet",
  "price": "$1,599",
  "perks": [
   "Both days, plus the banquet",
   "Save $99 vs. buying separately"
  ],
  "href": "https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-the-ceo-summit-tickets-1994631439329?aff=oddtdtcreator",
  "cta": "Register →"
 },
 {
  "hl": false,
  "name": "Dinner Banquet",
  "price": "$1,299",
  "perks": [
   "Oct 24 evening with Lip-Bu Tan"
  ],
  "href": "https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-the-ceo-summit-tickets-1994631439329?aff=oddtdtcreator",
  "cta": "Register →"
 }
];
