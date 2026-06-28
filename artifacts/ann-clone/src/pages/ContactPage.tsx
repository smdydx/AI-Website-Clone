import { useState } from "react";
import { motion } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Mail, MessageSquare, Zap, Globe, Send, MapPin, Clock,
  Phone, Building2, Twitter, Linkedin, CheckCircle2
} from "lucide-react";

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Email Us",
    desc: "hello@ann.ai",
    sub: "Replies within 24 hours",
    color: "#6600FF",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&q=80",
  },
  {
    icon: MessageSquare,
    title: "Discord Community",
    desc: "discord.gg/ann-ai",
    sub: "50K+ members online",
    color: "#5EC900",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
  {
    icon: Zap,
    title: "Live Chat",
    desc: "Talk to AXON",
    sub: "AI assistant, always on",
    color: "#EFA758",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
  },
  {
    icon: Globe,
    title: "Help Center",
    desc: "docs.ann.ai",
    sub: "400+ articles & guides",
    color: "#00C8D4",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80",
  },
];

const OFFICES = [
  {
    city: "Mumbai",
    address: "AiEye Technologies Pvt. Ltd.\nBandra Kurla Complex, Mumbai - 400051",
    timezone: "IST (UTC+5:30)",
    phone: "+91 22 4012 3456",
  },
  {
    city: "San Francisco",
    address: "ANN Global HQ\n101 Mission Street, SF, CA 94105",
    timezone: "PST (UTC-8)",
    phone: "+1 (415) 820-9800",
  },
  {
    city: "London",
    address: "ANN EU Operations\n1 Canada Square, London E14 5AB",
    timezone: "GMT (UTC+0)",
    phone: "+44 20 7946 0800",
  },
];

const TOPICS = ["General Inquiry", "Sales / Pricing", "Technical Support", "Partnership", "Press & Media", "Careers"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[52vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(102,0,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_20%,rgba(0,200,212,0.05),transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <Building2 className="w-4 h-4 text-primary/60" />
              <span className="text-sm text-primary/60 font-semibold">AiEye Technologies Private Limited</span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-8 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Get in Touch
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white mb-6">
              Let's <span className="text-primary">Talk</span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl mx-auto">
              Have a question, feature request, or partnership idea? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <SectionDoor direction="horizontal" color="#050913">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {CONTACT_CARDS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ border: `1px solid ${c.color}22` }}
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#07091a]/60" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, #07091a)` }} />
                    <div
                      className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: `${c.color}30`, border: `1px solid ${c.color}50` }}
                    >
                      <c.icon className="w-6 h-6" style={{ color: c.color }} />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: c.color }} />
                  <div className="bg-[#07091a] p-6 text-center">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(180deg, ${c.color}10 0%, transparent 60%)` }} />
                    <h3 className="font-bold text-lg text-white mb-1 relative z-10">{c.title}</h3>
                    <p className="text-sm font-medium mb-1 relative z-10" style={{ color: c.color }}>{c.desc}</p>
                    <p className="text-xs text-white/40 relative z-10">{c.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main contact section: form + offices */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="rounded-3xl border border-white/8 bg-[#07091a] p-10">
                  <h2 className="text-3xl font-extrabold text-white mb-2">Send a Message</h2>
                  <p className="text-white/50 text-sm mb-8">Our team typically responds within a few hours.</p>

                  {sent ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-white/50">We'll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setSent(false)}
                        className="mt-6 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Send another message →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                          <input
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-primary transition-colors text-sm"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                          <input
                            required type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-primary transition-colors text-sm"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Topic</label>
                        <div className="flex flex-wrap gap-2">
                          {TOPICS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTopic(t)}
                              className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
                              style={{
                                backgroundColor: topic === t ? "rgba(102,0,255,0.2)" : "transparent",
                                borderColor: topic === t ? "#6600FF" : "rgba(255,255,255,0.1)",
                                color: topic === t ? "#6600FF" : "rgba(255,255,255,0.5)",
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Company (optional)</label>
                        <input
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-primary transition-colors text-sm"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                        <textarea
                          required rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                          placeholder="Tell us more about your needs..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-primary hover:bg-primary/85 text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(102,0,255,0.4)]"
                      >
                        <Send className="w-4 h-4" /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Offices + extra info */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Office image */}
                <div className="relative rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                    alt="AiEye Technologies office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#07091a]/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07091a] to-transparent" />
                  <div className="absolute bottom-5 left-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span className="text-white font-bold text-sm">AiEye Technologies Private Limited</span>
                    </div>
                    <span className="text-white/50 text-xs">Global offices across India, US & UK</span>
                  </div>
                </div>

                {/* Office locations */}
                <div className="space-y-4">
                  {OFFICES.map((office, i) => (
                    <motion.div
                      key={office.city}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="p-6 rounded-2xl border border-white/8 bg-[#07091a]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <h4 className="font-bold text-white">{office.city}</h4>
                        </div>
                        <span className="text-xs text-white/30 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{office.timezone}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 whitespace-pre-line leading-relaxed mb-2">{office.address}</p>
                      <p className="text-xs text-white/35 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />{office.phone}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Social links */}
                <div className="p-6 rounded-2xl border border-white/8 bg-[#07091a]">
                  <h4 className="font-bold text-white mb-4 text-sm">Connect with Us</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: Twitter, label: "@annai", color: "#1DA1F2" },
                      { icon: Linkedin, label: "AiEye Technologies", color: "#0A66C2" },
                      { icon: MessageSquare, label: "Discord", color: "#5865F2" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 hover:border-white/20 text-white/50 hover:text-white text-xs font-medium transition-all"
                      >
                        <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionDoor>

      <Footer />
    </div>
  );
}
