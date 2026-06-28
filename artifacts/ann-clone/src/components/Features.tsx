import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Zap, Calendar, MessageSquare } from "lucide-react";
import { ModernBackground } from "./ModernBackground";
import { MobileSwipeContainer } from "./MobileSwipeContainer";

const FEATURES = [
  {
    icon: Brain,
    title: "Intelligent Understanding",
    description: "Our AI deeply understands context, learns your preferences, and delivers personalized responses tailored to your needs.",
    topColor: "#6600FF",
    gradientFrom: "rgba(102,0,255,0.18)",
    gradientTo: "rgba(102,0,255,0.03)",
    borderColor: "rgba(102,0,255,0.4)",
    iconBg: "rgba(102,0,255,0.15)",
    label: "Smart",
  },
  {
    icon: Zap,
    title: "Lightning Fast Responses",
    description: "Get instant answers and task completions powered by our optimized AI engine with sub-second response times.",
    topColor: "#5EC900",
    gradientFrom: "rgba(94,201,0,0.18)",
    gradientTo: "rgba(94,201,0,0.03)",
    borderColor: "rgba(94,201,0,0.4)",
    iconBg: "rgba(94,201,0,0.15)",
    label: "Speed",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automatically manages your calendar, sets reminders, and optimizes your daily schedule for maximum productivity.",
    topColor: "#EFA758",
    gradientFrom: "rgba(239,167,88,0.18)",
    gradientTo: "rgba(239,167,88,0.03)",
    borderColor: "rgba(239,167,88,0.4)",
    iconBg: "rgba(239,167,88,0.15)",
    label: "Organize",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Chat naturally like you would with a human. Our AI understands nuance, humor, and complex multi-turn dialogues.",
    topColor: "#00C8D4",
    gradientFrom: "rgba(0,200,212,0.18)",
    gradientTo: "rgba(0,200,212,0.03)",
    borderColor: "rgba(0,200,212,0.4)",
    iconBg: "rgba(0,200,212,0.15)",
    label: "Chat",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function FeatureCard({ f }: { f: typeof FEATURES[number] }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
      style={{ border: `1px solid ${f.borderColor.replace("0.4", "0.15")}` }}
    >
      {/* Top color bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ backgroundColor: f.topColor }}
      />

      {/* Top-to-bottom gradient background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg, ${f.gradientFrom} 0%, ${f.gradientTo} 50%, transparent 100%)`,
        }}
      />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${f.borderColor}` }}
      />

      {/* Card bg */}
      <div className="absolute inset-0 bg-[#07091a]" style={{ zIndex: -1 }} />

      {/* Modern High-Tech Frame/Decor at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-[1] select-none">
        <svg
          viewBox="0 0 400 64"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle horizontal grid lines */}
          <line x1="0" y1="16" x2="400" y2="16" stroke={f.topColor} strokeWidth="0.5" opacity="0.08" strokeDasharray="3 3" />
          <line x1="0" y1="36" x2="400" y2="36" stroke={f.topColor} strokeWidth="0.5" opacity="0.08" strokeDasharray="3 3" />

          {/* Modern corner bracket designs */}
          {/* Left bottom bracket */}
          <path
            d="M 12 36 L 12 48 L 24 48"
            stroke={f.topColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-30 group-hover:opacity-90 transition-opacity duration-500"
          />
          {/* Right bottom bracket */}
          <path
            d="M 388 36 L 388 48 L 376 48"
            stroke={f.topColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-30 group-hover:opacity-90 transition-opacity duration-500"
          />

          {/* Center Tech Status Module */}
          {/* Horizontal main panel line */}
          <path
            d="M 40 48 L 140 48 L 150 38 L 250 38 L 260 48 L 360 48"
            stroke={f.topColor}
            strokeWidth="1"
            className="opacity-20 group-hover:opacity-50 transition-opacity duration-500"
          />

          {/* Glowing accent segments */}
          <path
            d="M 160 38 L 240 38"
            stroke={f.topColor}
            strokeWidth="2"
            className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
          />
          <path
            d="M 60 48 L 100 48"
            stroke={f.topColor}
            strokeWidth="1.2"
            className="opacity-25 group-hover:opacity-75 transition-opacity duration-500"
          />
          <path
            d="M 300 48 L 340 48"
            stroke={f.topColor}
            strokeWidth="1.2"
            className="opacity-25 group-hover:opacity-75 transition-opacity duration-500"
          />

          {/* Tiny decorative tech ticks/dots */}
          <circle cx="150" cy="38" r="1.5" fill={f.topColor} className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <circle cx="250" cy="38" r="1.5" fill={f.topColor} className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Plus sign crosshairs */}
          <path d="M 28 42 L 34 42 M 31 39 L 31 45" stroke={f.topColor} strokeWidth="1" className="opacity-25 group-hover:opacity-60 transition-opacity duration-500" />
          <path d="M 372 42 L 366 42 M 369 39 L 369 45" stroke={f.topColor} strokeWidth="1" className="opacity-25 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Mini status bars (equalizer/readout) in the middle */}
          <rect x="182" y="44" width="5" height="3" rx="0.5" fill={f.topColor} className="opacity-25 group-hover:opacity-70 transition-opacity duration-500" />
          <rect x="191" y="42" width="5" height="5" rx="0.5" fill={f.topColor} className="opacity-35 group-hover:opacity-85 transition-opacity duration-500" />
          <rect x="200" y="40" width="5" height="7" rx="0.5" fill={f.topColor} className="opacity-45 group-hover:opacity-100 transition-opacity duration-500" />
          <rect x="209" y="43" width="5" height="4" rx="0.5" fill={f.topColor} className="opacity-35 group-hover:opacity-85 transition-opacity duration-500" />
          <rect x="218" y="45" width="5" height="2" rx="0.5" fill={f.topColor} className="opacity-25 group-hover:opacity-70 transition-opacity duration-500" />
        </svg>
      </div>

      <div className="relative z-10 p-8 pt-7 flex flex-col flex-1">
        {/* Label pill */}
        <span
          className="inline-block self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-5"
          style={{ backgroundColor: f.iconBg, color: f.topColor }}
        >
          {f.label}
        </span>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 self-start"
          style={{ backgroundColor: f.iconBg }}
        >
          <f.icon className="w-7 h-7" style={{ color: f.topColor }} />
        </div>

        <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
        <p className="text-white/50 leading-relaxed text-sm flex-1 mb-4">{f.description}</p>

        <div className="mt-auto flex items-center gap-2 text-xs font-semibold" style={{ color: f.topColor }}>
          <span>Explore</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >→</motion.span>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <ModernBackground 
        blobColors={{
          top: "from-[#6600FF]/15 to-transparent",
          bottom: "from-[#00C8D4]/10 to-transparent",
          center: "from-[#5EC900]/5 to-transparent"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-bold tracking-widest uppercase">Capabilities</span>
          <span className="w-8 h-px bg-primary" />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            Your Intelligent{" "}
            <span className="text-primary">AI Assistant</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-lg text-white/55 leading-relaxed"
          >
            Everything you need to supercharge your productivity and simplify your life.
          </motion.p>
        </div>

        {/* Desktop Grid - hidden on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="h-full flex flex-col"
            >
              <FeatureCard f={f} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swipe - visible only on mobile */}
        <MobileSwipeContainer
          dotColors={FEATURES.map((f) => f.topColor)}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </MobileSwipeContainer>
      </div>
    </section>
  );
}
