import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ShieldCheck, HelpCircle } from "lucide-react";

export function OneAIPerformanceTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    "Complete setup and CRM integration",
    "Daily monitoring and reporting",
    "Proactive optimization to boost performance"
  ];

  return (
    <div ref={ref} className="py-24 relative overflow-hidden bg-background">
      {/* Background glow orb */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div 
          className="max-w-5xl mx-auto rounded-3xl border border-white/5 bg-[#07091a]/85 p-8 md:p-14 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage: "radial-gradient(circle at 100% 100%, rgba(102,0,255,0.06) 0%, transparent 60%)"
          }}
        >
          {/* Subtle grid decor lines */}
          <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-white/5 pointer-events-none rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-white/5 pointer-events-none rounded-bl-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CTA copy */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-4"
              >
                <ShieldCheck className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-accent text-xs font-bold tracking-widest uppercase">Expert Operations Support</span>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6"
              >
                Your Dedicated AI <span className="text-primary">Performance Team</span>
              </motion.h3>

              {/* Benefits checklist */}
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="space-y-4"
              >
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-white/70">{benefit}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* CTA button / interactive action */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="w-full text-center lg:text-right"
              >
                <button 
                  className="px-10 py-5 bg-primary hover:bg-primary/85 text-white font-extrabold text-lg rounded-full shadow-[0_0_35px_rgba(102,0,255,0.4)] hover:shadow-[0_0_50px_rgba(102,0,255,0.65)] hover:scale-105 transition-all duration-300 w-full md:w-auto"
                >
                  Book a Session
                </button>
                <p className="text-[11px] text-white/35 font-medium mt-3 uppercase tracking-wider select-none">
                  No credit card required • Setup in 24 hours
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
