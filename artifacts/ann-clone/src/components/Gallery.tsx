import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { MobileSwipeContainer } from "./MobileSwipeContainer";

import imgScheduling from "@assets/assistant-scheduling.png";
import imgTasks from "@assets/assistant-tasks.png";
import imgVoice from "@assets/assistant-voice.png";
import imgInsights from "@assets/assistant-insights.png";
import imgAutomation from "@assets/assistant-automation.png";
import imgInbox from "@assets/assistant-inbox.png";

const IMAGES = [
  { 
    src: imgInbox, 
    alt: "Email Management",
    desc: "AiEye automatically categorizes incoming emails, drafts context-aware responses, and flags high-priority items so you can achieve inbox zero effortlessly."
  },
  { 
    src: imgScheduling, 
    alt: "Meeting Scheduler",
    desc: "Coordinate calendars, analyze availability, and schedule meetings automatically. AiEye finds the optimal time slot and handles invitations for your team."
  },
  { 
    src: imgTasks, 
    alt: "Smart Reminders",
    desc: "Never miss a deadline. AiEye monitors your active projects, sets intelligent reminders, and sends proactive notifications based on real-time task progress."
  },
  { 
    src: imgInsights, 
    alt: "Data Analytics",
    desc: "Transform raw numbers into actionable growth strategies. Generate interactive charts, track performance trends, and identify new business opportunities instantly."
  },
  { 
    src: imgVoice, 
    alt: "Voice Assistant",
    desc: "Interact naturally with hands-free voice commands. Dictate notes, control devices, query documents, and execute workflows using advanced audio model reasoning."
  },
  { 
    src: imgAutomation, 
    alt: "Workflow Automation",
    desc: "Connect your tools and automate repetitive tasks. Design multi-step workflows that trigger actions across platforms with zero human intervention."
  },
];

// Total vertical scroll height for the gallery spacer.
// Each slide gets 100vh of scroll travel + 1 screen for the pinned view = 700vh total.
const SPACER_HEIGHT_VH = 100 * IMAGES.length + 100; // 700vh

export function Gallery() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(spacerRef, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [pinnedPhase, setPinnedPhase] = useState<"before" | "during" | "after">("before");

  // Manual scroll tracking — immune to parent overflow settings.
  // Instead of position:sticky (broken by overflow-x-hidden ancestors),
  // we track scroll position manually and use position:fixed when in range.
  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const handleScroll = () => {
      const rect = spacer.getBoundingClientRect();
      const spacerHeight = spacer.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = spacerHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      // How far we've scrolled into the spacer
      // rect.top = 0 means spacer top is at viewport top (progress = 0)
      // rect.top = -(spacerHeight - viewportHeight) means spacer bottom is at viewport bottom (progress = 1)
      const scrolledInto = -rect.top;
      const rawProgress = scrolledInto / scrollableDistance;

      if (rawProgress < 0) {
        // Haven't reached the gallery yet
        setPinnedPhase("before");
        setIsPinned(false);
        setProgress(0);
        setActiveIndex(0);
      } else if (rawProgress > 1) {
        // Past the gallery
        setPinnedPhase("after");
        setIsPinned(false);
        setProgress(1);
        setActiveIndex(IMAGES.length - 1);
      } else {
        // In the gallery — pin the overlay
        setPinnedPhase("during");
        setIsPinned(true);
        setProgress(rawProgress);
        const index = Math.min(
          Math.floor(rawProgress * IMAGES.length),
          IMAGES.length - 1
        );
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate horizontal translation: 0% to -83.333% of track width
  const translateX = progress * (100 * (IMAGES.length - 1) / IMAGES.length);

  const scrollToSlide = useCallback((index: number) => {
    if (spacerRef.current) {
      const rect = spacerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const scrollableDistance = spacerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = scrollTop + (index / IMAGES.length) * scrollableDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  }, []);

  // Determine positioning for the fixed overlay
  // When "before": positioned at top of spacer (not visible yet, flows normally)
  // When "during": position:fixed, top:0
  // When "after": positioned at bottom of spacer (scrolled past)
  const getOverlayStyle = (): React.CSSProperties => {
    if (pinnedPhase === "during") {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        zIndex: 20,
      };
    }
    if (pinnedPhase === "after") {
      return {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100vh",
      };
    }
    // "before"
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "100vh",
    };
  };

  return (
    <>
      {/* Desktop View: Vertical-to-Horizontal Scroll Slider */}
      {/* The spacer div provides scroll height. The visual overlay is position:fixed when in range. */}
      <div
        ref={spacerRef}
        className="relative hidden md:block bg-[#050510]"
        style={{ height: `${SPACER_HEIGHT_VH}vh` }}
      >
        {/* The pinned visual overlay */}
        <div style={getOverlayStyle()} className="overflow-hidden flex flex-col justify-between">
          
          {/* Persistent Header Overlay */}
          <div className="absolute top-8 left-0 right-0 z-30 container mx-auto px-6 pointer-events-none">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase">Use Cases</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
                animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl font-extrabold text-white"
              >
                Powered by <span className="text-primary">AiEye</span>
              </motion.h2>
            </div>
          </div>

          {/* Persistent Floating Navigation Tabs */}
          <div className="absolute top-8 right-8 z-30 hidden lg:flex items-center gap-1 bg-[#050510]/50 backdrop-blur-md p-1 border border-white/5 rounded-full">
            {IMAGES.map((img, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {img.alt}
                </button>
              );
            })}
          </div>

          {/* Horizontal Track translated manually */}
          <div className="relative w-full h-full overflow-hidden flex-1">
            <div
              className="flex h-full"
              style={{
                width: `${IMAGES.length * 100}%`,
                transform: `translateX(-${translateX}%)`,
                willChange: "transform",
              }}
            >
              {IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="h-full relative flex items-center justify-start px-8 md:px-24"
                  style={{ width: `${100 / IMAGES.length}%` }}
                >
                  {/* Background image covering full screen */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                  {/* Cinematic gradient overlays to guarantee copy readability */}
                  <div className="absolute inset-0 bg-[#050510]/75 md:bg-gradient-to-r md:from-[#050510]/95 md:via-[#050510]/50 md:to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/80 via-transparent to-transparent z-10" />

                  {/* Text details container */}
                  <div className="relative z-20 max-w-xl text-left flex flex-col gap-4 mt-20 md:mt-0">
                    <span className="text-xs md:text-sm text-primary font-bold uppercase tracking-widest">
                      Use Case 0{i + 1}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                      {img.alt}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
                      {img.desc}
                    </p>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-8 right-[calc(100%-8vw)] md:right-8 bg-[#0c0d21]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-none z-20">
                    <span className="w-2 h-2 rounded-full bg-[#5EC900] animate-pulse" />
                    <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">ANN_ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Persistent Footer Controls Overlay */}
          <div className="absolute bottom-8 left-0 right-0 z-30 container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                USECASE:
              </span>
              <span className="text-sm font-bold text-white font-mono">
                0{activeIndex + 1}
              </span>
              <span className="text-xs text-white/30 font-mono">/</span>
              <span className="text-xs text-white/30 font-mono">
                0{IMAGES.length}
              </span>
            </div>

            <div className="flex items-center gap-6">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {IMAGES.map((img, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => scrollToSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? "w-6 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      title={img.alt}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider hidden sm:inline">Scroll down to explore</span>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${((activeIndex + 1) / IMAGES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile View: Swipe Carousel (Zero horizontal overflow) */}
      <div className="py-20 relative overflow-hidden md:hidden border-t border-b border-white/5 bg-[#050510]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_40%_at_50%_0%,rgba(102,0,255,0.03),transparent)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 w-full mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-sm font-bold tracking-widest uppercase">Use Cases</span>
              <span className="w-8 h-px bg-primary" />
            </div>

            <h2 className="text-3xl font-extrabold mb-2 text-white">
              Powered by <span className="text-primary">AiEye</span>
            </h2>
            <p className="text-sm text-white/55 leading-relaxed max-w-sm">
              Discover how our AI assistant transforms your daily workflow and boosts productivity.
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-full overflow-hidden">
          <MobileSwipeContainer dotColors={IMAGES.map(() => "#6600FF")}>
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center relative w-full"
              >
                {/* Edge-to-edge image covering mobile width */}
                <div className="relative aspect-[16/10] w-screen overflow-hidden border-y border-white/5 bg-[#07091a]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                  
                  {/* Status indicator top-right */}
                  <div className="absolute top-3 right-3 bg-[#0c0d21]/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1.5 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5EC900] animate-pulse" />
                    <span className="text-[8px] font-mono text-white/70 uppercase tracking-wider">ANN_ACTIVE</span>
                  </div>
                </div>

                {/* Details caption below the mockup container */}
                <div className="mt-6 text-center max-w-xs px-6 pointer-events-none">
                  <span className="text-xs text-primary font-bold uppercase tracking-widest mb-1.5 block">
                    Use Case 0{i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {img.alt}
                  </h3>
                  <p className="text-white/60 text-xs max-w-[280px] mx-auto leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </MobileSwipeContainer>
        </div>
      </div>
    </>
  );
}
