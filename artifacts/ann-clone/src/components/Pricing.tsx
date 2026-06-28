import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { MobileSwipeContainer } from "./MobileSwipeContainer";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out the assistant",
    features: ["50 queries per day", "Basic task management", "Email summaries", "Standard response speed"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For professionals and power users",
    features: ["Unlimited queries", "Advanced scheduling", "Voice commands", "Priority response speed", "Custom workflows", "Calendar integration"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$79",
    period: "/mo",
    description: "For teams and organizations",
    features: ["Everything in Pro", "API Access", "Team collaboration", "Custom AI training", "Dedicated support", "SSO integration"],
    highlight: false,
  },
];

function PlanButton({ plan }: { plan: typeof PLANS[number] }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };
  return (
    <Button
      onClick={handleClick}
      className={`w-full py-6 rounded-xl font-bold text-base transition-all duration-300 mt-6 relative z-10 ${
        plan.highlight
          ? "bg-primary hover:bg-primary/85 text-white hover:shadow-[0_0_30px_rgba(102,0,255,0.5)] hover:scale-105"
          : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
      }`}
    >
      {clicked ? (
        <span className="flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Redirecting…
        </span>
      ) : (
        `Choose ${plan.name}`
      )}
    </Button>
  );
}

function PricingCard({ plan, inView, i }: { plan: typeof PLANS[number]; inView: boolean; i: number }) {
  const planColor = plan.name === "Free"
    ? "#5EC900"
    : plan.name === "Pro"
      ? "#6600FF"
      : "#EFA758";

  return (
    <div className="relative h-full flex flex-col pt-6">
      {plan.highlight && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider z-20 whitespace-nowrap shadow-[0_0_20px_rgba(102,0,255,0.4)]">
          Most Popular
        </div>
      )}
      <div
        className={`p-8 rounded-3xl border relative transition-shadow duration-500 h-full flex flex-col justify-between overflow-hidden group ${
          plan.highlight
            ? "bg-card border-primary shadow-[0_0_60px_rgba(102,0,255,0.2)] pt-10"
            : "bg-background border-white/10 hover:border-white/20"
        }`}
      >
        {plan.highlight && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-white/50 text-sm mb-6">{plan.description}</p>

        <div className="mb-8 flex items-baseline">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
            className="text-5xl font-heading font-extrabold"
          >
            {plan.price}
          </motion.span>
          {plan.period && <span className="text-white/50 ml-2 text-lg">{plan.period}</span>}
        </div>

        <ul className="space-y-4 mb-8 flex-1">
          {plan.features.map((feat, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.1 + j * 0.05, duration: 0.4 }}
              className="flex items-center text-sm text-white/75"
            >
              <Check className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? "text-primary" : "text-accent"}`} />
              {feat}
            </motion.li>
          ))}
        </ul>
      </div>

      <PlanButton plan={plan} />

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
          <line x1="0" y1="16" x2="400" y2="16" stroke={planColor} strokeWidth="0.5" opacity="0.08" strokeDasharray="3 3" />
          <line x1="0" y1="36" x2="400" y2="36" stroke={planColor} strokeWidth="0.5" opacity="0.08" strokeDasharray="3 3" />

          {/* Modern corner bracket designs */}
          {/* Left bottom bracket */}
          <path
            d="M 12 36 L 12 48 L 24 48"
            stroke={planColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-30 group-hover:opacity-90 transition-opacity duration-500"
          />
          {/* Right bottom bracket */}
          <path
            d="M 388 36 L 388 48 L 376 48"
            stroke={planColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-30 group-hover:opacity-90 transition-opacity duration-500"
          />

          {/* Center Tech Status Module */}
          {/* Horizontal main panel line */}
          <path
            d="M 40 48 L 140 48 L 150 38 L 250 38 L 260 48 L 360 48"
            stroke={planColor}
            strokeWidth="1"
            className="opacity-20 group-hover:opacity-50 transition-opacity duration-500"
          />

          {/* Glowing accent segments */}
          <path
            d="M 160 38 L 240 38"
            stroke={planColor}
            strokeWidth="2"
            className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
          />
          <path
            d="M 60 48 L 100 48"
            stroke={planColor}
            strokeWidth="1.2"
            className="opacity-25 group-hover:opacity-75 transition-opacity duration-500"
          />
          <path
            d="M 300 48 L 340 48"
            stroke={planColor}
            strokeWidth="1.2"
            className="opacity-25 group-hover:opacity-75 transition-opacity duration-500"
          />

          {/* Tiny decorative tech ticks/dots */}
          <circle cx="150" cy="38" r="1.5" fill={planColor} className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <circle cx="250" cy="38" r="1.5" fill={planColor} className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Plus sign crosshairs */}
          <path d="M 28 42 L 34 42 M 31 39 L 31 45" stroke={planColor} strokeWidth="1" className="opacity-25 group-hover:opacity-60 transition-opacity duration-500" />
          <path d="M 372 42 L 366 42 M 369 39 L 369 45" stroke={planColor} strokeWidth="1" className="opacity-25 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Mini status bars (equalizer/readout) in the middle */}
          <rect x="182" y="44" width="5" height="3" rx="0.5" fill={planColor} className="opacity-25 group-hover:opacity-70 transition-opacity duration-500" />
          <rect x="191" y="42" width="5" height="5" rx="0.5" fill={planColor} className="opacity-35 group-hover:opacity-85 transition-opacity duration-500" />
          <rect x="200" y="40" width="5" height="7" rx="0.5" fill={planColor} className="opacity-45 group-hover:opacity-100 transition-opacity duration-500" />
          <rect x="209" y="43" width="5" height="4" rx="0.5" fill={planColor} className="opacity-35 group-hover:opacity-85 transition-opacity duration-500" />
          <rect x="218" y="45" width="5" height="2" rx="0.5" fill={planColor} className="opacity-25 group-hover:opacity-70 transition-opacity duration-500" />
        </svg>
      </div>
    </div>
    </div>
  );
}

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-secondary" />
          <span className="text-secondary text-sm font-bold tracking-widest uppercase">Pricing</span>
          <span className="w-8 h-px bg-secondary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-white/55">No hidden fees. Cancel anytime.</p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60, scale: 0.93 }}
              animate={inView ? { opacity: 1, y: plan.highlight ? -8 : 0, scale: plan.highlight ? 1.04 : 1 } : {}}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: plan.highlight ? -16 : -8, transition: { duration: 0.3 } }}
              className="h-full flex flex-col"
            >
              <PricingCard plan={plan} inView={inView} i={i} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe */}
        <MobileSwipeContainer
          dotColor="#6600FF"
        >
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} inView={inView} i={i} />
          ))}
        </MobileSwipeContainer>
      </div>
    </section>
  );
}
