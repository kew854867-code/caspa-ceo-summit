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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const countdown = useCountdown(EVENT_DATE);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-block border border-primary/30 px-6 py-3 rounded-full backdrop-blur-sm bg-primary/5">
            <span className="text-primary text-base md:text-lg font-medium tracking-[0.2em] uppercase">CASPA 35th Annual Conference & Dinner Banquet</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1] mb-6 max-w-5xl"
        >
          The <span className="text-primary italic">CEO Summit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light tracking-wide mb-10"
        >
          An elite gathering of semiconductor industry titans. The room where the future of chips, AI, and computing gets decided.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
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
