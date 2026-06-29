import { motion } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import { Layers, Globe, Cpu, Brush, Film, Box, ArrowRight, Star } from "lucide-react";

const PAGE_TYPES = [
  {
    icon: Layers,
    title: "Landing Pages",
    count: 12,
    color: "#6600FF",
    desc: "High-converting hero sections with AI-generated visuals and smooth scroll animations.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    rating: 4.9,
  },
  {
    icon: Globe,
    title: "Portfolio Sites",
    count: 8,
    color: "#5EC900",
    desc: "Showcase your AI art collection and creative work to a global audience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    rating: 4.8,
  },
  {
    icon: Cpu,
    title: "Product Pages",
    count: 15,
    color: "#EFA758",
    desc: "Detail-rich pages for AI tools, SaaS platforms, and digital products.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    rating: 4.9,
  },
  {
    icon: Brush,
    title: "Artist Profiles",
    count: 10,
    color: "#00C8D4",
    desc: "Personal brand pages for digital artists, designers, and creators.",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
    rating: 4.7,
  },
  {
    icon: Film,
    title: "Campaign Pages",
    count: 6,
    color: "#FF4D9D",
    desc: "Limited-time launch and campaign landing pages with urgency-driven design.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    rating: 4.8,
  },
  {
    icon: Box,
    title: "3D Showcases",
    count: 4,
    color: "#a855f7",
    desc: "Immersive 3D product and art showcases with WebGL and interactive renders.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    rating: 5.0,
  },
];

const STATS = [
  { value: "55+", label: "Templates Available" },
  { value: "12K+", label: "Launches This Month" },
  { value: "4.9★", label: "Average Rating" },
  { value: "< 5min", label: "Setup Time" },
];

export default function PagesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,rgba(102,0,255,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_30%,rgba(0,200,212,0.05),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-8 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Page Templates
            </span>
            <h1 className="font-heading font-extrabold text-[1.75rem] sm:text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tighter text-white mb-6">
              All AiSence<br />
              <span className="relative inline-block">
                <span className="relative z-10 px-3">Templates</span>
                <span className="absolute inset-0 bg-primary -skew-x-3 z-0 rounded-sm" />
              </span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
              Professionally crafted page templates powered by AI. Pick a template, customize with your prompts, and go live in minutes.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 max-w-2xl"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Page Types Grid */}
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
                <span className="text-primary text-sm font-bold tracking-widest uppercase">Browse by Category</span>
                <span className="w-8 h-px bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">Choose Your Template Type</h2>
              <p className="text-white/50 mt-4 max-w-lg mx-auto">Every template is responsive, accessible, and ready to deploy. Customize colors, content, and layout in minutes.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PAGE_TYPES.map((pt, i) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
                  style={{ border: `1px solid ${pt.color}22` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pt.image}
                      alt={pt.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 20%, #07091a 100%)` }} />
                    <div className="absolute inset-0 bg-[#07091a]/20" />

                    {/* Icon overlay */}
                    <div
                      className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: `${pt.color}30`, border: `1px solid ${pt.color}40` }}
                    >
                      <pt.icon className="w-5 h-5" style={{ color: pt.color }} />
                    </div>

                    <span
                      className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${pt.color}25`, color: pt.color, border: `1px solid ${pt.color}40` }}
                    >
                      {pt.count} templates
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative bg-[#07091a] p-7 flex flex-col flex-1">
                    <div
                      className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(180deg, ${pt.color}12 0%, transparent 60%)` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{pt.title}</h3>
                        <div className="flex items-center gap-1 text-xs" style={{ color: pt.color }}>
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{pt.rating}</span>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">{pt.desc}</p>
                      <span
                        className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all"
                        style={{ color: pt.color }}
                      >
                        Browse templates <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-20 rounded-3xl overflow-hidden relative"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
                  alt="Background"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050913] via-[#050913]/90 to-[#050913]/70" />
              </div>
              <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-3xl font-extrabold text-white mb-3">Need a Custom Template?</h3>
                  <p className="text-white/55 max-w-md leading-relaxed">Our design team can build a bespoke template tailored exactly to your brand and requirements.</p>
                </div>
                <button className="px-8 py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-full transition-all hover:shadow-[0_0_30px_rgba(102,0,255,0.5)] whitespace-nowrap flex items-center gap-2 hover:scale-105">
                  Request Custom Design <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionDoor>

      <SectionDoor direction="vertical" color="#050913">
        <CTA />
      </SectionDoor>
      <Footer />
    </div>
  );
}
