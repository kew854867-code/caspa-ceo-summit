import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const EVENT_DATE = new Date("2026-10-24T17:00:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  function getTimeLeft(date: Date) {
    const diff = Math.max(0, date.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-4xl md:text-5xl text-primary tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-muted-foreground tracking-widest uppercase mt-2">{label}</span>
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const countdown = useCountdown(EVENT_DATE);

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
          className="relative mb-12 px-4"
        >
          {/* Opening quote mark */}
          <span className="absolute -top-6 -left-2 md:left-0 font-serif text-7xl md:text-8xl text-primary/70 leading-none select-none">&ldquo;</span>

          <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 pt-6">
            Behind every technological revolution are the{" "}
            <span className="text-primary italic">leaders bold enough to shape it.</span>{" "}
            The CEO Summit was created to{" "}
            <span className="text-primary italic">unite those leaders</span>{" "}
            under{" "}
            <span className="text-primary italic">one stage.</span>
          </p>

          {/* Closing quote mark */}
          <span className="font-serif text-7xl md:text-8xl text-primary/70 leading-none select-none float-right -mt-4">&rdquo;</span>
        </motion.div>

        {/* Attribution + 35th badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="flex items-center justify-center gap-8 md:gap-12 mb-14 w-full max-w-xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-6"
        >
          {/* Attribution */}
          <div className="text-left">
            <p className="font-serif text-xl text-primary italic mb-1">— Jimmy Cheng</p>
            <p className="text-muted-foreground text-sm font-light leading-snug">
              Creator of the CEO Summit,<br />CASPA President 2026–2027
            </p>
          </div>

          {/* Vertical divider */}
          <div className="h-16 w-[1px] bg-primary/40 shrink-0" />

          {/* 35th anniversary badge */}
          <div className="text-center">
            <div className="flex items-start justify-center leading-none">
              <span className="font-serif text-5xl text-primary font-bold">35</span>
              <span className="font-serif text-lg text-primary font-bold mt-1">TH</span>
            </div>
            <p className="text-white text-xs font-medium tracking-[0.2em] uppercase mt-1">Anniversary</p>
            <p className="text-primary/70 text-xs tracking-widest mt-0.5">1991 – 2026</p>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="flex items-center gap-6 md:gap-10 mb-10 px-8 py-5 border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <CountdownUnit value={countdown.days} label="Days" />
          <span className="text-primary/40 text-3xl font-light mb-4">·</span>
          <CountdownUnit value={countdown.hours} label="Hours" />
          <span className="text-primary/40 text-3xl font-light mb-4">·</span>
          <CountdownUnit value={countdown.minutes} label="Minutes" />
          <span className="text-primary/40 text-3xl font-light mb-4">·</span>
          <CountdownUnit value={countdown.seconds} label="Seconds" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
        >
          <button className="bg-primary text-primary-foreground px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300">
            Register Now
          </button>
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
