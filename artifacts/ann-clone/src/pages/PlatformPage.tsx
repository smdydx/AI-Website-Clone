import { motion } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import {
  Phone, Brain, Share2, MessageSquare, FileText, Sparkles,
  ArrowRight, CheckCircle2, Zap, BarChart3, Shield, Globe,
  Activity, Cpu, Lock, Clock
} from "lucide-react";

const PLATFORM_FEATURES = [
  {
    icon: Sparkles,
    color: "#6600FF",
    title: "Phone AI Campaigns",
    desc: "Launch intelligent outbound calling campaigns at massive scale. Our AI handles objections, follows scripts, and books appointments — all without human intervention.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    stats: ["10M+ calls/month", "94% answer rate", "3x conversion lift"],
  },
  {
    icon: Brain,
    color: "#5EC900",
    title: "AI-Native Dialer",
    desc: "The most robust and compliance-ready high-volume dialing infrastructure built for modern teams. Adaptive pacing, local caller ID, and real-time monitoring.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    stats: ["99.9% uptime SLA", "TCPA compliant", "CRM sync in real-time"],
  },
  {
    icon: BarChart3,
    color: "#EFA758",
    title: "Analytics & Experimentation",
    desc: "Analyze every conversation with AI-powered sentiment, intent, and outcome scoring. A/B test scripts, voices, and timing to continuously improve results.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    stats: ["Real-time dashboards", "50+ KPI metrics", "Custom report builder"],
  },
  {
    icon: Share2,
    color: "#00C8D4",
    title: "CRM Integrations",
    desc: "Sync data bidirectionally with Salesforce, HubSpot, Zoho, and 40+ other platforms. Every call outcome, recording, and note flows automatically into your CRM.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    stats: ["40+ integrations", "< 2s sync speed", "Custom field mapping"],
  },
];

const CHANNELS = [
  {
    icon: Phone,
    color: "#6600FF",
    title: "Voice Calling",
    desc: "Human-quality AI voice agents for outbound and inbound calls. Natural conversation with zero latency.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
  },
  {
    icon: FileText,
    color: "#5EC900",
    title: "SMS Campaigns",
    desc: "Automated two-way SMS flows with AI-driven personalization and smart follow-up sequences.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    icon: MessageSquare,
    color: "#EFA758",
    title: "WhatsApp Business",
    desc: "Engage prospects on WhatsApp with rich media, buttons, and conversational AI at scale.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },
];

const CAPABILITIES = [
  { icon: Zap, label: "Outbound Calling", color: "#6600FF" },
  { icon: Phone, label: "Inbound Calling", color: "#5EC900" },
  { icon: Activity, label: "Warm Transfers", color: "#EFA758" },
  { icon: Clock, label: "Meeting Scheduling", color: "#00C8D4" },
  { icon: Shield, label: "Lead Verification", color: "#FF4D9D" },
  { icon: Globe, label: "Multi-language AI", color: "#a855f7" },
  { icon: Cpu, label: "Receptionist AI", color: "#6600FF" },
  { icon: Lock, label: "HIPAA / SOC2", color: "#5EC900" },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_40%_50%,rgba(102,0,255,0.14),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_90%_20%,rgba(94,201,0,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-8 bg-primary/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                The AiSence Platform
              </span>
              <h1 className="font-heading font-extrabold text-[1.75rem] sm:text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
                Enterprise-Grade<br />
                <span className="text-primary">AI Voice</span><br />
                Infrastructure
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                The complete platform for businesses that want to automate customer conversations, scale outreach, and boost revenue — without growing headcount.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-full transition-all hover:shadow-[0_0_40px_rgba(102,0,255,0.5)] text-base flex items-center gap-2"
                >
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-white/20 hover:border-primary/60 text-white font-medium rounded-full transition-all hover:bg-primary/10 text-base"
                >
                  Watch Demo
                </motion.button>
              </div>

              <div className="mt-10 flex gap-8 flex-wrap">
                {[
                  { val: "10M+", label: "Calls per Month" },
                  { val: "99.9%", label: "Uptime SLA" },
                  { val: "150+", label: "Enterprise Clients" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                    <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80"
                  alt="Platform dashboard"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050913] via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-[#0a0020]/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-white">+347%</div>
                    <div className="text-xs text-white/40">Avg. Revenue Increase</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-[#0a0020]/90 backdrop-blur-xl border border-accent/20 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-bold text-white/70">Live Calls Active</span>
                </div>
                <div className="text-2xl font-extrabold text-white mt-1">2,841</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <SectionDoor direction="horizontal" color="#050913">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-sm font-bold tracking-widest uppercase">Core Platform</span>
                <span className="w-8 h-px bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">Everything You Need to Scale</h2>
              <p className="text-white/50 mt-4 max-w-xl mx-auto">From first call to closed deal, the AiSence platform handles every step of the revenue journey.</p>
            </motion.div>

            <div className="space-y-8">
              {PLATFORM_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8 group ${i % 2 === 0 ? "" : ""}`}
                >
                  <div className={`relative h-64 md:h-auto overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <img
                      src={feat.image}
                      alt={feat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#07091a]/40" />
                    <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 1 ? "l" : "r"} from-transparent to-[#07091a]`} />
                  </div>
                  <div className={`bg-[#07091a] p-10 md:p-14 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${feat.color}20`, border: `1px solid ${feat.color}30` }}
                    >
                      <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-4">{feat.title}</h3>
                    <p className="text-white/55 leading-relaxed mb-8">{feat.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {feat.stats.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-bold px-3 py-1.5 rounded-full"
                          style={{ backgroundColor: `${feat.color}15`, color: feat.color, border: `1px solid ${feat.color}25` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionDoor>

      {/* Channels */}
      <SectionDoor direction="vertical" color="#050913">
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-sm font-bold tracking-widest uppercase">Channels</span>
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">Reach Customers Everywhere</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CHANNELS.map((ch, i) => (
                <motion.div
                  key={ch.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl overflow-hidden border border-white/8 group cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ch.image}
                      alt={ch.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07091a] to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: `${ch.color}30`, border: `1px solid ${ch.color}40` }}>
                      <ch.icon className="w-5 h-5" style={{ color: ch.color }} />
                    </div>
                  </div>
                  <div className="bg-[#07091a] p-7">
                    <h3 className="text-lg font-bold text-white mb-2">{ch.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{ch.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionDoor>

      {/* Capabilities grid */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white">Full Capability Suite</h2>
            <p className="text-white/50 mt-3">Everything switched on. Nothing held back.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -2 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/8 bg-[#07091a] cursor-pointer hover:border-white/15 transition-colors text-center"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${c.color}18`, border: `1px solid ${c.color}25` }}>
                  <c.icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <span className="text-sm font-semibold text-white/80">{c.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDoor direction="iris" color="#050913"><CTA /></SectionDoor>
      <Footer />
    </div>
  );
}
