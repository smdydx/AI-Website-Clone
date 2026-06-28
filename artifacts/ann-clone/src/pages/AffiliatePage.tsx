import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import { Link } from "wouter";
import {
  DollarSign,
  Users,
  TrendingUp,
  Share2,
  CheckCircle2,
  ChevronRight,
  Zap,
  BarChart3,
  Gift,
  ArrowRight,
  Star,
  Repeat2,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Users,
    color: "#6600FF",
    title: "Sign Up Free",
    desc: "Create your AiEye affiliate account in seconds. No cost, no minimum requirements. Just your email and you're in.",
  },
  {
    number: "02",
    icon: Share2,
    color: "#5EC900",
    title: "Get Your Link",
    desc: "Receive your unique referral link and marketing materials — banners, copy, email templates — ready to use.",
  },
  {
    number: "03",
    icon: TrendingUp,
    color: "#EFA758",
    title: "Promote AiEye",
    desc: "Share your link on social media, blogs, email lists, or anywhere your audience lives. We track every click.",
  },
  {
    number: "04",
    icon: DollarSign,
    color: "#00C8D4",
    title: "Earn Commission",
    desc: "Earn 50% on every sale you refer. Commissions are paid monthly with recurring revenue from returning customers.",
  },
];

const BENEFITS = [
  {
    icon: DollarSign,
    color: "#5EC900",
    title: "50% Commission",
    desc: "Industry-leading commission rate on every sale. Earn up to $291 per referred customer.",
  },
  {
    icon: Repeat2,
    color: "#6600FF",
    title: "Recurring Revenue",
    desc: "Keep earning as long as your referrals stay subscribed. Monthly payouts, forever.",
  },
  {
    icon: Zap,
    color: "#EFA758",
    title: "Real-Time Tracking",
    desc: "Live dashboard showing your clicks, conversions, and earnings updated in real time.",
  },
  {
    icon: BarChart3,
    color: "#00C8D4",
    title: "Marketing Assets",
    desc: "Professional banners, email templates, and copy crafted to convert. Ready to deploy instantly.",
  },
  {
    icon: ShieldCheck,
    color: "#FF4D9D",
    title: "90-Day Cookie",
    desc: "Extended 90-day attribution window so you get credit even if your referral takes time to decide.",
  },
  {
    icon: HeartHandshake,
    color: "#a855f7",
    title: "Dedicated Support",
    desc: "Your own affiliate manager to help you maximize earnings and answer any questions.",
  },
];

const FAQS = [
  {
    q: "How much can I earn?",
    a: "You earn 50% commission on every sale you refer. Our plans range from $49 to $299/month, so each customer is worth up to $149.50/month in recurring commission — for as long as they stay subscribed.",
  },
  {
    q: "When and how do I get paid?",
    a: "Commissions are paid monthly via PayPal or bank transfer. Minimum payout threshold is $50. Payments are processed on the 1st of each month for the previous month's earnings.",
  },
  {
    q: "How long does the tracking cookie last?",
    a: "Our affiliate cookie lasts 90 days. If someone clicks your link and signs up within 90 days, you get the commission — even if they don't sign up immediately.",
  },
  {
    q: "Is there a limit on how much I can earn?",
    a: "Absolutely not. There are no earnings caps. The more you refer, the more you earn — with no ceilings or restrictions.",
  },
  {
    q: "Can I promote AiEye if I'm not a customer?",
    a: "Yes! You don't need to be an AiEye customer to become an affiliate. We encourage you to try it first so you can speak authentically, but it's not required.",
  },
];

const TIERS = [
  {
    name: "Starter",
    refs: "1–10 referrals",
    commission: "50%",
    color: "#6600FF",
    perks: ["Unique referral link", "Real-time dashboard", "Marketing kit"],
  },
  {
    name: "Pro",
    refs: "11–50 referrals",
    commission: "50% + Bonus",
    color: "#5EC900",
    perks: ["Everything in Starter", "Priority support", "Co-marketing opportunities"],
    highlighted: true,
  },
  {
    name: "Elite",
    refs: "50+ referrals",
    commission: "Custom Rate",
    color: "#EFA758",
    perks: ["Everything in Pro", "Dedicated account manager", "Custom deal structures"],
  },
];

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[75vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(102,0,255,0.13),transparent)]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-6 bg-accent/5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Earn up to 50% on every sale
              </span>

              <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
                Join AiEye<br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 px-3 text-white">Affiliate</span>
                  <span className="absolute inset-0 bg-primary -skew-x-3 z-0 rounded-sm" />
                </span>{" "}
                Program
              </h1>

              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                A simple and easy way to earn <strong className="text-white">50% of every sale</strong> you refer to AiEye. Earn up to{" "}
                <span className="text-accent font-bold">$291</span> per referred customer — and keep earning from recurring customers as well.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-full transition-all hover:shadow-[0_0_40px_rgba(102,0,255,0.5)] text-base flex items-center gap-2"
                >
                  Join the Program <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-white/20 hover:border-primary/60 text-white font-medium rounded-full transition-all hover:bg-primary/10 text-base"
                >
                  Become an Affiliate
                </motion.button>
              </div>

              {/* Quick stats */}
              <div className="mt-10 flex gap-8 flex-wrap">
                {[
                  { val: "50%", label: "Commission Rate" },
                  { val: "$291", label: "Max Per Customer" },
                  { val: "90d", label: "Cookie Window" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl font-extrabold text-white">{stat.val}</span>
                    <span className="text-xs text-white/45 mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right visual card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary/20 via-[#07091a] to-accent/10 p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(102,0,255,0.15),transparent_60%)]" />

                {/* Earnings simulation card */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Live Earnings</span>
                    <span className="flex items-center gap-1.5 text-xs text-accent font-bold bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Active
                    </span>
                  </div>

                  {[
                    { label: "This Month", amount: "$1,455.00", refs: "5 referrals", color: "#5EC900" },
                    { label: "Last Month", amount: "$873.50", refs: "3 referrals", color: "#6600FF" },
                    { label: "Total Earned", amount: "$4,120.00", refs: "All time", color: "#EFA758" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div>
                        <p className="text-xs text-white/45">{row.label}</p>
                        <p className="text-sm text-white/60 mt-0.5">{row.refs}</p>
                      </div>
                      <span className="text-xl font-extrabold font-mono" style={{ color: row.color }}>
                        {row.amount}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4 p-3.5 rounded-xl border border-primary/30 bg-primary/10 flex items-center gap-3">
                    <Star className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-xs text-white/70">
                      Referring just <strong className="text-white">1 customer per week</strong> earns you over <strong className="text-primary">$7,500/year</strong>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(94,201,0,0.04),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-sm font-bold tracking-widest uppercase">How It Works</span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Steps to Become an Affiliate</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative p-6 rounded-2xl border border-white/8 bg-[#07091a] hover:border-white/15 transition-colors group"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-white/4 select-none">
                  {step.number}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${step.color}18`, border: `1px solid ${step.color}30` }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>

                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(102,0,255,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-sm font-bold tracking-widest uppercase">Why Join</span>
              <span className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Why Affiliates Love AiEye</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              We built the most generous affiliate program in AI. Because when you win, we win.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="p-6 rounded-2xl border border-white/8 bg-[#07091a] hover:border-white/15 transition-colors group relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${b.color}10 0%, transparent 60%)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{ backgroundColor: `${b.color}15`, border: `1px solid ${b.color}25` }}
                >
                  <b.icon className="w-6 h-6" style={{ color: b.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 relative z-10">{b.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed relative z-10">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIERS ── */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(94,201,0,0.04),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-secondary" />
              <span className="text-secondary text-sm font-bold tracking-widest uppercase">Tiers</span>
              <span className="w-8 h-px bg-secondary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Affiliate Tiers</h2>
            <p className="text-white/50 mt-4">The more you refer, the more we unlock for you.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative p-6 rounded-2xl border transition-all ${
                  tier.highlighted
                    ? "border-primary/50 bg-primary/8 shadow-[0_0_40px_rgba(102,0,255,0.12)]"
                    : "border-white/8 bg-[#07091a]"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="h-1 w-full rounded-full mb-6" style={{ backgroundColor: tier.color }} />
                <h3 className="text-xl font-extrabold text-white">{tier.name}</h3>
                <p className="text-xs text-white/40 mt-1 mb-4">{tier.refs}</p>
                <p className="text-3xl font-black mb-6" style={{ color: tier.color }}>{tier.commission}</p>
                <ul className="space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: tier.color }} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-sm font-bold tracking-widest uppercase">FAQ</span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Common Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="p-6 rounded-2xl border border-white/8 bg-[#07091a]"
              >
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-white/55 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(102,0,255,0.1),transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Start Earning Today
            </h2>
            <p className="text-white/55 text-lg mb-8 leading-relaxed">
              Join hundreds of affiliates already earning with AiEye. Sign up in 60 seconds and get your first commission within days.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-full transition-all hover:shadow-[0_0_40px_rgba(102,0,255,0.5)] text-base flex items-center gap-2"
              >
                Join Now — It's Free <ArrowRight className="w-4 h-4" />
              </motion.button>
              <Link href="/contacts">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="px-10 py-4 border border-white/20 hover:border-white/50 text-white font-medium rounded-full transition-all hover:bg-white/5 text-base"
                >
                  Contact Sales
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
