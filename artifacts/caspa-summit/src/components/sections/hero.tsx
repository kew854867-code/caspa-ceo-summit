import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background layer */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-block border border-primary/30 px-6 py-2 rounded-full backdrop-blur-sm bg-primary/5">
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">CASPA Annual Conference & Dinner Banquet</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] mb-6 max-w-5xl"
        >
          The <span className="text-primary italic">CEO Summit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light tracking-wide mb-12"
        >
          An elite gathering of semiconductor industry titans. The room where the future of chips, AI, and computing gets decided.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          <button className="bg-primary text-primary-foreground px-10 py-4 font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300">
            Request Invitation
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
