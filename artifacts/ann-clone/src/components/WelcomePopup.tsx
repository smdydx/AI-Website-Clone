import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("ann_welcome_seen");
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!seen) {
      t = setTimeout(() => setVisible(true), 800);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem("ann_welcome_seen", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(5,9,19,0.85)", backdropFilter: "blur(12px)" }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-lg w-full rounded-3xl overflow-hidden border border-primary/30 shadow-[0_0_80px_rgba(102,0,255,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[#07091a]" />
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(102,0,255,0.22), transparent)"
            }} />

            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-6 sm:p-10 pt-10 sm:pt-12 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.5 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[0_0_40px_rgba(102,0,255,0.35)]"
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tighter text-white mb-1 sm:mb-2">AiSence</h1>
                <p className="text-primary text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6">AI Personal Assistant</p>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 sm:mb-3 leading-tight">
                  Welcome to the Future of<br />
                  <span className="text-primary">Human-AI Collaboration</span>
                </h2>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
                  Supercharge your productivity, organize your schedule, and automate daily tasks with our advanced conversational assistant.
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-xs sm:text-sm"
              >
                {[
                  { label: "Intelligent", color: "#6600FF" },
                  { label: "Lightning Fast", color: "#5EC900" },
                  { label: "Productive", color: "#EFA758" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.color }} />
                    <span className="text-white/60 font-medium">{f.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <button
                  onClick={close}
                  className="flex-1 py-3 sm:py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(102,0,255,0.5)] flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Explore AiSence <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="flex-1 py-3 sm:py-4 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium rounded-full transition-all hover:bg-white/5 text-sm sm:text-base"
                >
                  View Gallery
                </button>
              </motion.div>

              {/* Bottom hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-white/25"
              >
                50K+ images generated · 99% satisfaction rate
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
