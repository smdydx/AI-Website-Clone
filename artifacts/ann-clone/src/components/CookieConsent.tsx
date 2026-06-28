import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";
import { Button } from "./ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage to see if user already made a choice
    const consent = localStorage.getItem("ann-cookie-consent");
    if (consent) return;

    // Show the banner with a 1.5-second delay for premium entrance feel
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ann-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ann-cookie-consent", "declined");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-0 left-0 right-0 z-50 w-full p-4 md:py-4 md:px-8 bg-[#07091a]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(102,0,255,0.08)] select-none"
        >
          {/* Subtle top color accent border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative pr-8 md:pr-0">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-1 -right-2 md:relative md:top-auto md:right-auto text-white/40 hover:text-white transition-colors cursor-pointer md:order-last"
              aria-label="Close cookie consent"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 w-full md:w-auto text-left">
              {/* Glowing Icon Shield */}
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(102,0,255,0.15)] hidden sm:flex">
                <ShieldAlert className="w-5 h-5 text-primary animate-pulse" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white mb-0.5 uppercase tracking-wider hidden md:block">
                  Cookie & Privacy Consent
                </h4>
                <p className="text-[11px] md:text-xs text-white/60 leading-relaxed max-w-4xl">
                  We use cookies to optimize our AI voice agents, analyze traffic, and personalize your experience. By clicking "Accept All", you consent to our cookie policy. Learn more in our{" "}
                  <a href="/pages" className="text-secondary hover:underline font-semibold">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={handleDecline}
                className="py-2 px-4 border border-white/10 hover:border-white/20 text-white/75 hover:text-white font-semibold text-xs rounded-lg hover:bg-white/5 active:scale-95 transition-all duration-300 h-auto cursor-pointer whitespace-nowrap"
              >
                Decline
              </button>
              <Button
                onClick={handleAccept}
                className="py-2.5 px-6 bg-primary hover:bg-primary/85 text-white font-bold text-xs rounded-lg shadow-[0_0_15px_rgba(102,0,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 h-auto cursor-pointer whitespace-nowrap"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
