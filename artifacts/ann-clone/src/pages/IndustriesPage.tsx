import { motion } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import {
  TrendingUp, Heart, Shield, DollarSign, Ticket, Activity,
  Home as HomeIcon, ShoppingBag, ArrowRight, CheckCircle2
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: TrendingUp,
    color: "#6600FF",
    title: "Telesales",
    subtitle: "Close More Deals, Faster",
    desc: "AI agents that prospect, qualify leads, and book meetings automatically. Our telesales AI maintains compliance, adapts to objections, and never has a bad day.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    results: ["3x more meetings booked", "60% lower cost per acquisition", "24/7 outreach coverage"],
  },
  {
    icon: Heart,
    color: "#FF4D9D",
    title: "Personal Care",
    subtitle: "Compassionate AI at Scale",
    desc: "Appointment reminders, follow-ups, and customer engagement for wellness clinics, spas, and personal care brands — delivered with warmth and precision.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    results: ["45% fewer no-shows", "90% patient satisfaction", "HIPAA ready"],
  },
  {
    icon: Shield,
    color: "#00C8D4",
    title: "Insurance",
    subtitle: "Compliant. Accurate. Always On.",
    desc: "Quote generation, policy follow-ups, renewal campaigns, and claims intake — all automated with AI agents that stay within regulatory boundaries.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    results: ["80% quote-to-call ratio", "99.5% compliance score", "Instant claim triage"],
  },
  {
    icon: DollarSign,
    color: "#5EC900",
    title: "Finance",
    subtitle: "Accelerate Revenue Cycles",
    desc: "Collections, loan qualification, and financial advisory outreach with AI-driven conversations that maintain regulatory compliance at every step.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    results: ["2.5x collection rate", "Zero regulatory violations", "Real-time portfolio insights"],
  },
  {
    icon: Ticket,
    color: "#EFA758",
    title: "Trade Shows & Events",
    subtitle: "Maximize Every Lead",
    desc: "Post-event follow-ups and lead re-engagement campaigns that turn trade show contacts into pipeline. AI handles the volume so your team can focus on closing.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    results: ["5x lead conversion", "Follow-up within 1 hour", "Full CRM sync"],
  },
  {
    icon: Activity,
    color: "#FF4D9D",
    title: "Healthcare",
    subtitle: "Patient Care, Reimagined",
    desc: "From appointment scheduling and prescription refill reminders to chronic care follow-ups — HIPAA-compliant AI that patients actually enjoy interacting with.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    results: ["75% scheduling automation", "HIPAA / SOC2 certified", "EHR integrations"],
  },
  {
    icon: HomeIcon,
    color: "#00C8D4",
    title: "Real Estate",
    subtitle: "Never Miss a Hot Lead",
    desc: "Instant lead response, property inquiry handling, and open house follow-ups. AI agents that sound like your best agent, available every hour of every day.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    results: ["< 60 second lead response", "4x more showings booked", "MLS integration"],
  },
  {
    icon: ShoppingBag,
    color: "#a855f7",
    title: "E-commerce",
    subtitle: "Recover Revenue on Autopilot",
    desc: "Cart abandonment calls, order confirmations, review collection, and win-back campaigns — AI voice that drives repeat purchases and LTV growth.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    results: ["30% cart recovery rate", "40% higher LTV", "Shopify & WooCommerce native"],
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(102,0,255,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_80%,rgba(255,77,157,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-8 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Industry Solutions
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white mb-6">
              AI Built for<br />
              <span className="text-primary">Your Industry</span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
              Every industry has unique needs. AiEye delivers tailored AI voice solutions with industry-specific compliance, integrations, and best practices built in.
            </p>
          </motion.div>

          {/* Industry quick-jump */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {INDUSTRIES.map((ind) => (
              <a
                key={ind.title}
                href={`#${ind.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-all"
              >
                {ind.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries list */}
      <SectionDoor direction="horizontal" color="#050913">
        <section className="py-20">
          <div className="container mx-auto px-6 space-y-8">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.title}
                id={ind.title.toLowerCase().replace(/\s+/g, "-")}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8 group hover:border-white/15 transition-colors"
              >
                <div className={`relative h-64 md:h-auto overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 1 ? "l" : "r"} from-transparent to-[#07091a]`} />
                  <div className="absolute inset-0 bg-[#07091a]/30" />

                  {/* Icon badge */}
                  <div
                    className="absolute top-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                    style={{ backgroundColor: `${ind.color}30`, border: `1px solid ${ind.color}50` }}
                  >
                    <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                  </div>
                </div>

                <div className={`bg-[#07091a] p-10 md:p-14 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ind.color }}>{ind.subtitle}</span>
                  <h2 className="text-3xl font-extrabold text-white mb-4">{ind.title}</h2>
                  <p className="text-white/55 leading-relaxed mb-8">{ind.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {ind.results.map((r) => (
                      <li key={r} className="flex items-center gap-2.5 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ind.color }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-fit px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:scale-105"
                    style={{
                      backgroundColor: `${ind.color}18`,
                      color: ind.color,
                      border: `1px solid ${ind.color}40`,
                    }}
                  >
                    Explore {ind.title} Solutions <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </SectionDoor>

      <SectionDoor direction="iris" color="#050913"><CTA /></SectionDoor>
      <Footer />
    </div>
  );
}
