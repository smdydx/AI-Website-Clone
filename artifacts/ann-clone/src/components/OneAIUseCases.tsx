import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Calendar, Phone, PhoneCall, ChevronLeft, ChevronRight } from "lucide-react";
import { ModernBackground } from "./ModernBackground";

const USE_CASES = [
  {
    icon: Zap,
    title: "Instant Callbacks",
    description: "A lead form is submitted. AI calls in under 5 seconds, qualifies them, and live-transfers to your sales team before they check competitors.",
    stat: "< 5s Speed-to-lead",
    topColor: "#5EC900",
    gradientFrom: "rgba(94,201,0,0.18)",
    gradientTo: "rgba(94,201,0,0.03)",
    borderColor: "rgba(94,201,0,0.3)",
    iconBg: "rgba(94,201,0,0.12)",
    label: "Callback",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80",
  },
  {
    icon: Calendar,
    title: "Reconfirm Meetings",
    description: "Cut no-show rates by 40%. AI confirms appointments, updates CRM data, and retries automatically until they answer.",
    stat: "40% No-show cut",
    topColor: "#EFA758",
    gradientFrom: "rgba(239,167,88,0.18)",
    gradientTo: "rgba(239,167,88,0.03)",
    borderColor: "rgba(239,167,88,0.3)",
    iconBg: "rgba(239,167,88,0.12)",
    label: "Scheduling",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=700&q=80",
  },
  {
    icon: Phone,
    title: "24/7 Inbound Reception",
    description: "AI answers instantly. No voicemail, no hold queue. Qualifies leads and routes to the right rep, even after standard business hours.",
    stat: "100% Response rate",
    topColor: "#00C8D4",
    gradientFrom: "rgba(0,200,212,0.18)",
    gradientTo: "rgba(0,200,212,0.03)",
    borderColor: "rgba(0,200,212,0.3)",
    iconBg: "rgba(0,200,212,0.12)",
    label: "Inbound",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  },
  {
    icon: PhoneCall,
    title: "Outbound Dialing",
    description: "AI dials your backlog of database contacts using local caller ID. Qualifies and warm-transfers active prospects to a live rep.",
    stat: "10x Rep dialing power",
    topColor: "#6600FF",
    gradientFrom: "rgba(102,0,255,0.18)",
    gradientTo: "rgba(102,0,255,0.03)",
    borderColor: "rgba(102,0,255,0.3)",
    iconBg: "rgba(102,0,255,0.12)",
    label: "Outbound",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
  },
];

function UseCaseCard({ uc, isActive }: { uc: typeof USE_CASES[number]; isActive: boolean }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden h-full flex flex-col border bg-[#07091a] transition-all duration-500 select-none group ${
        isActive
          ? "border-primary/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(102,0,255,0.15)]"
          : "border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] opacity-80"
      }`}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10 transition-opacity duration-500"
        style={{ backgroundColor: uc.topColor, opacity: isActive ? 1 : 0.6 }}
      />

      {/* Card image with gradient overlay */}
      <div className="relative h-40 overflow-hidden shrink-0">
        <img
          src={uc.image}
          alt={uc.title}
          className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "scale-105" : "scale-100"}`}
        />
        {/* Dark themed overlays */}
        <div className="absolute inset-0 bg-[#07091a]/55" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, transparent 0%, #07091a 100%)`,
          }}
        />
        {/* Colored tint overlay matching card theme */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${uc.topColor}22 0%, transparent 60%)`,
            opacity: isActive ? 1 : 0.5,
          }}
        />

        {/* Label pill on image */}
        <span
          className="absolute top-3 left-3 z-20 inline-block text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-sm"
          style={{
            backgroundColor: `${uc.iconBg}`,
            color: uc.topColor,
            borderColor: `${uc.topColor}40`,
          }}
        >
          {uc.label}
        </span>

        {/* Icon on image bottom-right */}
        <div
          className="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border"
          style={{ backgroundColor: `${uc.iconBg}`, borderColor: `${uc.topColor}40` }}
        >
          <uc.icon className="w-5 h-5" style={{ color: uc.topColor }} />
        </div>
      </div>

      {/* Card content below image */}
      <div className="relative z-10 flex flex-col flex-1 p-7 pt-5">
        {/* Radial glow effect */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${uc.gradientFrom} 0%, transparent 70%)`,
            opacity: isActive ? 0.35 : 0.15,
          }}
        />

        {/* Decorative corner */}
        <div className="absolute top-3 right-3 text-white/5 font-mono text-[9px] select-none pointer-events-none">
          0x{uc.label.toUpperCase()}_SYS
        </div>

        <h3 className="text-lg font-bold mb-2 text-white transition-colors duration-500 relative z-10">
          {uc.title}
        </h3>
        <p className="text-white/50 leading-relaxed text-sm flex-1 mb-5 transition-colors duration-500 relative z-10">
          {uc.description}
        </p>

        {/* Highlight Stat Box */}
        <div
          className="mt-auto p-4 rounded-xl border flex items-center justify-between transition-all duration-500 relative z-10"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
          }}
        >
          <span className="text-xs text-white/40 font-medium">Impact Metric:</span>
          <span className="text-sm font-extrabold transition-all duration-500" style={{ color: uc.topColor }}>
            {uc.stat}
          </span>
        </div>
      </div>

      {/* Bottom SVG frame decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-[1] select-none">
        <svg viewBox="0 0 400 48" preserveAspectRatio="none" className="w-full h-full" fill="none">
          <line x1="0" y1="12" x2="400" y2="12" stroke={uc.topColor} strokeWidth="0.5" opacity="0.08" strokeDasharray="3 3" />
          <path d="M 12 28 L 12 38 L 24 38" stroke={uc.topColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-opacity duration-500 ${isActive ? "opacity-90" : "opacity-30 group-hover:opacity-75"}`} />
          <path d="M 388 28 L 388 38 L 376 38" stroke={uc.topColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-opacity duration-500 ${isActive ? "opacity-90" : "opacity-30 group-hover:opacity-75"}`} />
          <path d="M 40 38 L 140 38 L 150 28 L 250 28 L 260 38 L 360 38" stroke={uc.topColor} strokeWidth="1"
            className={`transition-opacity duration-500 ${isActive ? "opacity-40" : "opacity-15 group-hover:opacity-35"}`} />
          <path d="M 160 28 L 240 28" stroke={uc.topColor} strokeWidth="2"
            className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-35 group-hover:opacity-75"}`} />
          <circle cx="150" cy="28" r="1.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-45"}`} />
          <circle cx="250" cy="28" r="1.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-45"}`} />
          <rect x="182" y="34" width="5" height="3" rx="0.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-70" : "opacity-20"}`} />
          <rect x="191" y="32" width="5" height="5" rx="0.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-85" : "opacity-30"}`} />
          <rect x="200" y="30" width="5" height="7" rx="0.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"}`} />
          <rect x="209" y="33" width="5" height="4" rx="0.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-85" : "opacity-30"}`} />
          <rect x="218" y="35" width="5" height="2" rx="0.5" fill={uc.topColor} className={`transition-opacity duration-500 ${isActive ? "opacity-70" : "opacity-20"}`} />
        </svg>
      </div>
    </div>
  );
}

export function OneAIUseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + USE_CASES.length) % USE_CASES.length);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % USE_CASES.length);

  const getDiff = (index: number) => {
    let diff = index - activeIndex;
    if (diff < -1) diff += USE_CASES.length;
    if (diff > 2) diff -= USE_CASES.length;
    return diff;
  };

  const isMobile = windowWidth < 768;
  const translationX = isMobile ? 150 : 310;

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-background">
      <ModernBackground
        blobColors={{
          top: "from-[#00C8D4]/10 to-transparent",
          bottom: "from-[#6600FF]/15 to-transparent",
          center: "from-[#EFA758]/5 to-transparent",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-secondary" />
          <span className="text-secondary text-sm font-bold tracking-widest uppercase">Target Applications</span>
          <span className="w-8 h-px bg-secondary" />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white"
          >
            Top AI Voice <span className="text-secondary">Use-Cases</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-lg text-white/55 leading-relaxed"
          >
            Automate phone, SMS, and WhatsApp calls with intelligent agents that qualify prospects and boost conversation rates.
          </motion.p>
        </div>

        {/* 3D Stack Slider */}
        <div
          className="relative w-full max-w-5xl mx-auto h-[520px] flex items-center justify-center overflow-hidden md:overflow-visible select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-40 p-3 rounded-full bg-[#07091a]/80 border border-white/10 text-white/70 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 shadow-xl backdrop-blur-md active:scale-90 cursor-pointer"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-40 p-3 rounded-full bg-[#07091a]/80 border border-white/10 text-white/70 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 shadow-xl backdrop-blur-md active:scale-90 cursor-pointer"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden md:overflow-visible">
            {USE_CASES.map((uc, i) => {
              const diff = getDiff(i);
              const isActive = diff === 0;
              const isSide = Math.abs(diff) === 1;

              return (
                <motion.div
                  key={uc.title}
                  style={{ zIndex: isActive ? 30 : isSide ? 20 : 10 }}
                  animate={{
                    x: diff === 0 ? 0 : diff === 1 ? translationX : diff === -1 ? -translationX : 0,
                    scale: diff === 0 ? 1.05 : isSide ? 0.82 : 0.7,
                    opacity: diff === 0 ? 1 : isSide ? 0.45 : 0,
                    rotateY: diff === 0 ? 0 : diff === 1 ? -12 : 12,
                    filter: diff === 0 ? "blur(0px)" : isSide ? "blur(1.5px)" : "blur(4px)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  onClick={() => { if (!isActive) setActiveIndex(i); }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -50) handleNext();
                    else if (info.offset.x > 50) handlePrev();
                  }}
                  className="absolute w-[86%] max-w-[400px] h-[480px] cursor-pointer origin-center"
                >
                  <div className={`h-full ${!isActive ? "pointer-events-none select-none" : "pointer-events-auto"}`}>
                    <UseCaseCard uc={uc} isActive={isActive} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8 relative z-10">
          {USE_CASES.map((uc, i) => {
            const isActive = i === activeIndex;
            return (
              <button key={i} onClick={() => setActiveIndex(i)} className="relative p-1.5 focus:outline-none" aria-label={`Go to card ${i + 1}`}>
                <motion.div
                  animate={{ width: isActive ? 24 : 8, backgroundColor: isActive ? uc.topColor : "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full cursor-pointer"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
