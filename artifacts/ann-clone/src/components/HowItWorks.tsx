import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MobileSwipeContainer } from "./MobileSwipeContainer";

const STEPS = [
  {
    number: "01",
    title: "Tell ANN",
    description: "Simply type or speak your request using natural language. ANN understands context and intent effortlessly.",
    accent: "#6600FF",
  },
  {
    number: "02",
    title: "AI Processes",
    description: "Our advanced neural network analyzes your request, cross-references your preferences, and plans the best action.",
    accent: "#5EC900",
  },
  {
    number: "03",
    title: "Get Results",
    description: "Receive instant, accurate responses — from scheduling meetings to drafting emails to data insights.",
    accent: "#EFA758",
  },
  {
    number: "04",
    title: "Keep Learning",
    description: "ANN continuously learns from your interactions, becoming smarter and more personalized over time.",
    accent: "#00C8C8",
  },
];

function StepCard({ step, i, inView }: { step: typeof STEPS[number]; i: number; inView: boolean }) {
  return (
    <div className="relative text-center group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-24 h-24 mx-auto bg-background border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-xl cursor-pointer transition-colors duration-300"
        style={{ "--step-accent": step.accent } as React.CSSProperties}
      >
        <span
          className="text-3xl font-heading font-extrabold transition-colors duration-300 group-hover:opacity-100"
          style={{ color: "transparent", WebkitTextStroke: `1px rgba(255,255,255,0.3)` }}
        >
          {step.number}
        </span>
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, ${step.accent}40 0%, transparent 70%)` }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
          className="absolute inset-0 rounded-full border transition-colors duration-300 group-hover:border-opacity-100"
          style={{ borderColor: `${step.accent}40` }}
        />
      </motion.div>

      {/* Step indicator dot (desktop only) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 200 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20 ring-4 ring-background hidden md:block"
        style={{ backgroundColor: step.accent }}
      />

      <div className="relative">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors" style={{ textShadow: `0 0 0px transparent` }}>
          {step.title}
        </h3>
      </div>
      <p className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
        {step.description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(102,0,255,0.05),transparent)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm font-bold tracking-widest uppercase">Process</span>
          <span className="w-8 h-px bg-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold">How It Works</h2>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Animated connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px origin-left"
            style={{ background: "linear-gradient(90deg, transparent, rgba(102,0,255,0.5), rgba(94,201,0,0.5), rgba(239,167,88,0.5), transparent)" }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepCard step={step} i={i} inView={inView} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe */}
        <MobileSwipeContainer
          dotColors={STEPS.map((s) => s.accent)}
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} i={i} inView={inView} />
          ))}
        </MobileSwipeContainer>
      </div>
    </section>
  );
}
