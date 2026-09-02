import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiteNav } from "@/components/layout/site-nav";

const tiers = [
  {
    name: "Premier",
    price: "$50,000",
    sold: true,
    description: "Maximum brand visibility across all event materials, dedicated premium placement, and top-tier recognition throughout the evening.",
    perks: ["1 Premium seat in Dinner Banquet", "1 reserved table (10 seats)", "1 VIP reception access", "Logo on all print & digital materials", "Dedicated sponsor mention"],
  },
  {
    name: "CEO Lounge",
    price: "$50,000",
    sold: true,
    description: "Premier sponsorship of the exclusive CEO Lounge — the most intimate networking space of the day.",
    perks: ["Exclusive CEO Lounge branding", "1 VIP reception access", "Logo on all print & digital materials", "Dedicated sponsor mention", "Priority seating placement"],
  },
  {
    name: "Lunch Sponsorship",
    price: "$50,000",
    description: "Exclusive sponsorship of the summit lunch with prominent brand presence and a dedicated speaking opportunity during the lunch session.",
    perks: ["Dedicated speaking opportunity at lunch", "Logo on all print & digital materials", "1 VIP reception access", "Recognition in opening remarks", "Dedicated sponsor mention"],
  },
  {
    name: "CEO Dinner Table",
    price: "$40,000",
    description: "Exclusive branding opportunity for the premier CEO dinner table at the Dinner Banquet — where the most influential conversations happen.",
    perks: ["Exclusive CEO dinner table branding", "1 reserved table (10 seats)", "1 VIP reception access", "Logo on all print & digital materials", "Dedicated sponsor mention"],
  },
  {
    name: "VIP Room",
    price: "$20,000",
    description: "Exclusive VIP room sponsorship with premium branding and private access for your guests during the event.",
    perks: ["Exclusive VIP room branding", "1 VIP reception access", "Logo on all print & digital materials", "Dedicated sponsor mention"],
  },
  {
    name: "Badge Sponsorship",
    price: "$25,000",
    description: "Exclusive branding on attendee badges throughout the event, keeping your brand visible at every interaction.",
    perks: ["Exclusive attendee badge branding", "Logo on website & program", "Recognition in opening remarks", "2 conference seats"],
  },
  {
    name: "Stage LCD Screen",
    price: "$20,000",
    sold: true,
    description: "Prime brand placement on the main stage LCD screen, visible to all attendees throughout the entire evening program.",
    perks: ["Exclusive stage screen branding", "Logo displayed during all presentations", "Logo on website & program", "2 dinner banquet seats"],
  },
  {
    name: "General Dinner Table",
    price: "$20,000",
    sold: true,
    description: "Brand visibility at a dinner table during the Dinner Banquet, connecting your company with all attendees throughout the evening.",
    perks: ["Branded dinner table signage", "1 reserved table (10 seats)", "Logo on website & program", "Recognition in opening remarks"],
  },
  {
    name: "Partner",
    price: "$12,000",
    description: "High-profile recognition with prominent placement throughout the venue and event collateral.",
    perks: ["1 reserved table (10 seats)", "Logo on stage website", "Program book full-page feature", "1 VIP reception access"],
  },
  {
    name: "Annual Conference Lanyard",
    price: "$20,000",
    description: "Exclusive branding on every attendee's lanyard during the Annual Conference — your logo visible to all conference participants throughout the day.",
    perks: ["Exclusive lanyard branding at conference", "Logo on website & program", "Recognition in opening remarks", "2 conference seats"],
  },
  {
    name: "Dinner Banquet Lanyard",
    price: "$25,000",
    description: "Exclusive branding on every attendee's lanyard during the Dinner Banquet — your logo visible to all guests throughout the evening.",
    perks: ["Exclusive lanyard branding at banquet", "Logo on website & program", "Recognition in opening remarks", "2 dinner banquet seats"],
  },
  {
    name: "Coffee Sponsorship",
    price: "$10,000",
    description: "Exclusive branding on all coffee and beverage stations during the Annual Conference — a high-visibility touchpoint for every attendee throughout the day.",
    perks: ["Exclusive coffee station branding", "Logo on website & program", "Recognition in opening remarks", "2 conference seats"],
  },
  {
    name: "Oct 23 Dinner Sponsorship",
    price: "$10,000",
    description: "Exclusive sponsorship of the October 23 dinner following the afternoon conference sessions — prime brand presence during an intimate networking dinner.",
    perks: ["Exclusive dinner branding", "Logo on website & program", "Recognition in opening remarks", "2 dinner seats"],
  },
  {
    name: "Associate",
    price: "$7,000",
    description: "Meaningful brand presence with recognition in key event touchpoints.",
    perks: ["5 reserved seats", "Logo on website & program", "Recognition in opening remarks", "1 VIP reception access"],
  },
  {
    name: "Display Table",
    price: "$5,000",
    description: "Dedicated display space to showcase your brand, products, or materials to all event attendees.",
    perks: ["1 display table at venue", "Logo on website & program"],
  },
];

export default function SponsorshipPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <SiteNav active="sponsorship" />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-background relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_60%)] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block border border-primary/30 px-6 py-2 rounded-full backdrop-blur-sm bg-primary/5 mb-8"
            >
              <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">CASPA 35th Annual Conference & Dinner Banquet</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl mb-6"
            >
              Event <span className="text-primary italic">Sponsorship</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-[1px] bg-primary mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-muted-foreground font-light text-lg leading-relaxed mb-10"
            >
              Align your brand with the most influential names in the semiconductor industry. Sponsorship packages offer unparalleled access and visibility among C-suite decision makers.
            </motion.p>

            <motion.a
              href="mailto:office@caspa.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="inline-block bg-primary text-primary-foreground px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
            >
              Sponsor This Event
            </motion.a>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-24 bg-card relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="border border-white/10 bg-background/50 p-8 hover:border-primary/40 transition-colors duration-500 group flex flex-col"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium tracking-widest uppercase text-primary">{tier.name}</span>
                      {tier.sold && (
                        <span className="text-xs font-semibold tracking-widest uppercase bg-red-600/90 text-white px-2 py-0.5">SOLD</span>
                      )}
                    </div>
                    <div className="w-8 h-[1px] bg-primary/40 mt-2 group-hover:w-full transition-all duration-500" />
                  </div>
                  <div className="text-2xl font-serif text-primary mb-4">{tier.price}</div>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">{tier.description}</p>
                  <ul className="space-y-3 mt-auto">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="text-primary mt-0.5 shrink-0">—</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  {tier.sold ? (
                    <div className="mt-8 block text-center border border-red-600/40 text-red-500/70 px-6 py-3 text-sm font-medium tracking-widest uppercase cursor-not-allowed">
                      Sold Out
                    </div>
                  ) : (
                    <a
                      href="mailto:office@caspa.com"
                      className="mt-8 block text-center border border-primary/30 text-primary px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      Inquire
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-muted-foreground text-sm font-light mt-12"
            >
              Custom packages available. Contact <a href="mailto:office@caspa.com" className="text-primary hover:underline">office@caspa.com</a> to discuss opportunities.
            </motion.p>
          </div>
        </section>
      </main>
    </div>
  );
}
