import { motion, useScroll, useTransform } from "framer-motion";
import jimmyChengPhoto from "@assets/IMG_4704_1779822235845.png";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-24">
      {/* Background glow */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_55%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center max-w-4xl">

        {/* Conference badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-block border border-primary/30 px-6 py-3 rounded-full backdrop-blur-sm bg-primary/5">
            <span className="text-white text-base md:text-lg font-medium tracking-[0.2em] uppercase">
              CASPA 35th Annual Conference &amp; Dinner Banquet
            </span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-4"
        >
          The <span className="text-primary italic">CEO Summit</span>
        </motion.h1>

        {/* Anniversary subtitle with lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-[1px] w-16 bg-primary/60" />
          <span className="text-primary text-xs md:text-sm font-medium tracking-[0.25em] uppercase whitespace-nowrap">
            Celebrating CASPA's 35th Anniversary
          </span>
          <div className="h-[1px] w-16 bg-primary/60" />
        </motion.div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
          className="relative mb-6 px-4"
        >
          <span className="absolute -top-6 -left-2 md:left-0 font-serif text-7xl md:text-8xl text-primary/70 leading-none select-none">&ldquo;</span>
          <p className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90 pt-6">
            Behind every technological revolution are the{" "}
            <span className="text-primary italic">leaders bold enough to shape it.</span>{" "}
            The CEO Summit was created to{" "}
            <span className="text-primary italic">unite those leaders</span>{" "}
            under{" "}
            <span className="text-primary italic">one stage.</span>
          </p>
          <span className="font-serif text-7xl md:text-8xl text-primary/70 leading-none select-none float-right -mt-4">&rdquo;</span>
        </motion.div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="flex items-center gap-6 mb-10 w-full max-w-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
        >
          <div className="w-24 h-24 shrink-0 overflow-hidden">
            <img src={jimmyChengPhoto} alt="Jimmy Cheng" className="w-full h-full object-cover object-top" />
          </div>
          <div className="h-16 w-[1px] bg-primary/40 shrink-0" />
          <div className="text-left pr-6">
            <p className="font-serif text-xl text-primary italic mb-1">— Jimmy Cheng</p>
            <p className="text-muted-foreground text-sm font-light leading-snug">
              Creator of the CEO Summit,<br />CASPA President 2026–2027
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <a
            href="https://caspaceosummit.eventbrite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
          >
            Register Now
          </a>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Regular pricing ends <span className="text-primary font-medium">Sep 30</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
