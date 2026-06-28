import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";
import { MobileSwipeContainer } from "./MobileSwipeContainer";
import cyber1 from "@assets/hero-cyber-1.png";
import cyber2 from "@assets/hero-cyber-2.png";
import cyber3 from "@assets/hero-cyber-3.png";
import cyber4 from "@assets/hero-cyber-4.png";
import cyber5 from "@assets/hero-cyber-5.png";
import cyber6 from "@assets/hero-cyber-6.png";

const WORDS = ["Future", "Revolution", "Evolution", "Companion"];

const STRIP_IMAGES = [
  { src: cyber1, label: "ANN Engine", sub: "Core System", color: "#5EC900" },
  { src: cyber2, label: "Neural Space", sub: "AI Network", color: "#EFA758" },
  { src: cyber3, label: "Virtual Realm", sub: "Analytics", color: "#6600FF" },
  { src: cyber4, label: "Cyber Security", sub: "Guard Core", color: "#00C8D4" },
  { src: cyber5, label: "Voice Model", sub: "Audio AI", color: "#EFA758" },
  { src: cyber6, label: "Personal Assistant", sub: "Smart AI", color: "#5EC900" },
];

function ImageStrip({ tilt, duration, delay, width, images }: {
  tilt: number; duration: number; delay: number; width: number; images: typeof STRIP_IMAGES;
}) {
  const loopImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <div
      style={{
        width,
        overflow: "hidden",
        height: "100%",
        transform: `rotate(${tilt}deg)`,
        transformOrigin: "center center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          animation: `slideUpInfinite ${duration}s linear ${delay}s infinite`,
          willChange: "transform",
        }}
      >
        {loopImages.map((img, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden border border-white/10 shrink-0"
            style={{
              width,
              height: 310,
              boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(102,0,255,0.15)`,
            }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
              style={{ display: "block" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
              <p className="text-[10px] font-bold mb-0.5" style={{ color: img.color }}>{img.sub}</p>
              <p className="text-xs text-white font-semibold">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [spotX, setSpotX] = useState(-9999);
  const [spotY, setSpotY] = useState(-9999);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX, y: e.clientY };
    setSpotX(e.clientX - rect.left);
    setSpotY(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    setSpotX(-9999);
    setSpotY(-9999);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden"
    >
      {/* Mouse spotlight overlay in hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: spotX > 0
            ? `radial-gradient(circle 350px at ${spotX}px ${spotY}px, rgba(102,0,255,0.3) 0%, rgba(102,0,255,0.08) 60%, transparent 100%)`
            : "transparent",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/6 w-[480px] h-[480px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-6 flex items-center gap-8 relative" style={{ zIndex: 2 }}>

        {/* ── LEFT: TEXT ── */}
        <div className="flex-1 min-w-0">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-8 bg-accent/5"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Powered by Advanced AI Technology
          </motion.span>

          <h1 className="font-heading font-extrabold text-[1.75rem] sm:text-4xl md:text-6xl lg:text-[5rem] leading-[0.9] tracking-tighter text-white">
            <motion.span className="block"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >AI Personal</motion.span>
            <motion.span className="block"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.44, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >Assistant is the</motion.span>
            <motion.span className="block mt-2"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.58, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 px-4 py-1 inline-block"
                  >{WORDS[wordIndex]}</motion.span>
                </AnimatePresence>
                <span className="absolute inset-0 bg-primary -skew-x-3 z-0 rounded-sm" />
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.6 }}
            className="mt-4 md:mt-8 text-sm md:text-lg text-white/55 max-w-lg leading-relaxed"
          >
            Your intelligent AI companion that manages tasks, schedules, and workflows
            so you can focus on what truly matters. Smart. Fast. Always learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.98, duration: 0.6 }}
            className="mt-6 md:mt-10 flex items-center gap-3 md:gap-5 flex-wrap"
          >
            <button className="px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(102,0,255,0.5)] text-sm md:text-base">
              Try It Free
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 border border-white/20 hover:border-white/50 text-white font-medium rounded-full transition-all duration-300 hover:bg-white/5 text-sm md:text-base">
              See How It Works
            </button>
          </motion.div>

          {/* OneAI Channels Badge Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-5 md:mt-8 flex items-center gap-3 flex-wrap"
          >
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Available on:</span>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-full flex items-center gap-1.5 hover:bg-primary/20 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Phone Calls
              </span>
              <span className="px-3.5 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold rounded-full flex items-center gap-1.5 hover:bg-accent/20 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                SMS
              </span>
              <span className="px-3.5 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold rounded-full flex items-center gap-1.5 hover:bg-secondary/20 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                WhatsApp
              </span>
            </div>
          </motion.div>

          {/* Scroll badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.25, duration: 0.6, type: "spring" }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          >
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ animation: "spin 12s linear infinite" }}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="cp" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                  <text fontSize="10.5" fontWeight="600" fill="rgba(255,255,255,0.55)" letterSpacing="2.5">
                    <textPath href="#cp" startOffset="0%">SCROLL DOWN • DISCOVER •</textPath>
                  </text>
                </svg>
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-[0_0_28px_rgba(94,201,0,0.55)] hover:scale-110 transition-transform cursor-pointer">
                <ArrowDownRight className="w-5 h-5 text-background" />
              </div>
            </div>
            <div className="flex gap-4 sm:gap-5 text-xs sm:text-sm text-white/40 justify-center sm:justify-start">
              <span><span className="text-white font-extrabold text-lg sm:text-xl">70%</span><br />Contact Rate</span>
              <span className="w-px bg-white/10" />
              <span><span className="text-white font-extrabold text-lg sm:text-xl">38%</span><br />Qualification Rate</span>
              <span className="w-px bg-white/10" />
              <span><span className="text-white font-extrabold text-lg sm:text-xl">45%</span><br />Handoff Rate</span>
            </div>
          </motion.div>

          {/* Mobile Hero Cards Swipe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-6"
          >
            <MobileSwipeContainer
              dotColors={STRIP_IMAGES.map((img) => img.color)}
            >
              {STRIP_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden border border-white/10"
                  style={{
                    height: 280,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(102,0,255,0.15)`,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <p className="text-[10px] font-bold mb-0.5" style={{ color: img.color }}>{img.sub}</p>
                    <p className="text-sm text-white font-semibold">{img.label}</p>
                  </div>
                </div>
              ))}
            </MobileSwipeContainer>
          </motion.div>
        </div>

        {/* ── RIGHT: INFINITE TILTED SLIDER ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-start gap-24 shrink-0"
          style={{
            height: "100vh",
            maxHeight: 680,
            width: 660,
            padding: "0 35px",
            position: "relative",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          {/* Strip 1 — tilted right, faster */}
          <ImageStrip tilt={-8} duration={18} delay={0} width={260} images={STRIP_IMAGES} />
          {/* Strip 2 — tilted left, slower, offset start */}
          <ImageStrip tilt={6} duration={24} delay={-10} width={260} images={[...STRIP_IMAGES].reverse()} />
        </motion.div>
      </div>
    </section>
  );
}
