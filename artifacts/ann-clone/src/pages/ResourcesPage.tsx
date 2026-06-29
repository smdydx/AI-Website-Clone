import { useEffect } from "react";
import { motion } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import {
  BookOpen, FolderOpen, Cpu, Info, Users, Briefcase,
  ArrowRight, MapPin, Globe, Award, Rocket, Heart, CheckCircle2
} from "lucide-react";
import { Link } from "wouter";

const LEARN_RESOURCES = [
  {
    icon: BookOpen,
    color: "#6600FF",
    title: "Learn Center",
    desc: "Comprehensive guides, tutorials, and documentation to get you up and running fast.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&q=80",
    cta: "Browse Guides",
  },
  {
    icon: FolderOpen,
    color: "#EFA758",
    title: "Phone AI Directory",
    desc: "A curated directory of 500+ tested voice prompts, scripts, and call flows for every use case.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
    cta: "Explore Directory",
  },
  {
    icon: Cpu,
    color: "#a855f7",
    title: "Research & Technology",
    desc: "Our technical papers, model benchmarks, and R&D updates from the AiSence AI team.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80",
    cta: "Read Research",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Dr. Anika Sharma",
    role: "Chief Executive Officer",
    bio: "Former AI research lead at DeepMind. PhD in Machine Learning from MIT. Building the future of voice AI.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "#6600FF",
  },
  {
    name: "Marcus Chen",
    role: "Chief Technology Officer",
    bio: "Ex-Google Brain engineer. Architect of the AiSence neural voice engine and real-time inference platform.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    color: "#5EC900",
  },
  {
    name: "Sofia Rodriguez",
    role: "Chief Product Officer",
    bio: "15 years in enterprise SaaS product. Previously led voice products at Twilio and Salesforce.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    color: "#EFA758",
  },
  {
    name: "James Park",
    role: "VP of Engineering",
    bio: "Scaled distributed systems at Netflix and AWS. Expert in low-latency, high-availability voice infrastructure.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "#00C8D4",
  },
  {
    name: "Priya Nair",
    role: "Head of AI Research",
    bio: "Published researcher in NLP and speech synthesis. Leads the team developing next-gen voice models.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    color: "#FF4D9D",
  },
  {
    name: "David Kim",
    role: "Chief Revenue Officer",
    bio: "Built $200M+ ARR at multiple B2B startups. Expert in enterprise sales motion and partner ecosystems.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    color: "#a855f7",
  },
];

const OPEN_ROLES = [
  { title: "Senior ML Engineer", dept: "AI Research", location: "Remote", type: "Full-time", color: "#6600FF" },
  { title: "Full Stack Engineer", dept: "Platform", location: "Remote / NYC", type: "Full-time", color: "#5EC900" },
  { title: "Enterprise Account Executive", dept: "Sales", location: "Remote / SF", type: "Full-time", color: "#EFA758" },
  { title: "Product Designer", dept: "Product", location: "Remote", type: "Full-time", color: "#00C8D4" },
  { title: "DevOps / SRE Engineer", dept: "Infrastructure", location: "Remote", type: "Full-time", color: "#FF4D9D" },
];

const COMPANY_VALUES = [
  { icon: Rocket, color: "#6600FF", title: "Move Fast", desc: "We ship weekly, iterate constantly, and trust our team to make bold decisions." },
  { icon: Heart, color: "#FF4D9D", title: "Customer Obsessed", desc: "Every product decision starts with our customers' outcomes, not our assumptions." },
  { icon: Globe, color: "#5EC900", title: "Global by Default", desc: "Fully remote, async-first, and built for every timezone from day one." },
  { icon: Award, color: "#EFA758", title: "Excellence Only", desc: "We set a high bar and raise it constantly. Mediocrity has no home here." },
];

export default function ResourcesPage() {
  useEffect(() => {
    document.title = "Resources | AiSence - Guides, Docs & Team";
    const m = document.querySelector("meta[name=description]");
    if (m) m.setAttribute("content", "Access learning resources, documentation, research, and meet the AiSence team.");
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_40%_50%,rgba(102,0,255,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_85%_25%,rgba(239,167,88,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-8 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Resources & Company
            </span>
            <h1 className="font-heading font-extrabold text-[1.75rem] sm:text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tighter text-white mb-6">
              Learn. Explore.<br />
              <span className="text-primary">Build Together.</span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
              Everything you need to master AiSence — from beginner guides to deep technical research, and a look inside the team building the future of voice AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Resources */}
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
                <span className="text-primary text-sm font-bold tracking-widest uppercase">Explore</span>
                <span className="w-8 h-px bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">Learning Resources</h2>
              <p className="text-white/50 mt-4 max-w-lg mx-auto">From first prompt to production deployment, we have resources for every skill level.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEARN_RESOURCES.map((res, i) => (
                <motion.div
                  key={res.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl overflow-hidden border border-white/8 group cursor-pointer hover:border-white/15 transition-colors"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07091a] via-[#07091a]/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: `${res.color}30`, border: `1px solid ${res.color}40` }}>
                      <res.icon className="w-5 h-5" style={{ color: res.color }} />
                    </div>
                  </div>
                  <div className="bg-[#07091a] p-7">
                    <h3 className="text-xl font-bold text-white mb-3">{res.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">{res.desc}</p>
                    <span className="text-sm font-bold flex items-center gap-1.5 group-hover:gap-3 transition-all" style={{ color: res.color }}>
                      {res.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionDoor>

      {/* About Us */}
      <section id="about" className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(102,0,255,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-sm font-bold tracking-widest uppercase">About Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                We're Building the Voice of AI Commerce
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                AiSence — a product of <strong className="text-white">AiSence Technologies Private Limited</strong> — was founded in 2023 with a single mission: make enterprise-grade AI voice technology accessible to every business, regardless of size.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Today, we process over 10 million calls per month for businesses across 40+ countries. Our AI agents speak 28 languages, maintain perfect compliance records, and have generated over $2 billion in measurable revenue for our clients.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "2023", label: "Founded" },
                  { val: "40+", label: "Countries" },
                  { val: "150+", label: "Team Members" },
                  { val: "$2B+", label: "Client Revenue Generated" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-2xl border border-white/8 bg-white/3">
                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                    <div className="text-xs text-white/40 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                  alt="AiSence Technologies team"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050913]/60 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {COMPANY_VALUES.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="p-5 rounded-2xl border border-white/8 bg-[#07091a]"
                  >
                    <v.icon className="w-5 h-5 mb-2" style={{ color: v.color }} />
                    <div className="text-sm font-bold text-white mb-1">{v.title}</div>
                    <div className="text-xs text-white/45 leading-relaxed">{v.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
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
              <span className="text-accent text-sm font-bold tracking-widest uppercase">Leadership</span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">Meet the Team</h2>
            <p className="text-white/50 mt-4">World-class talent from Google, DeepMind, Twilio, and beyond.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl overflow-hidden border border-white/8 bg-[#07091a] group cursor-pointer hover:border-white/15 transition-colors"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07091a] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: member.color }} />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-white text-lg">{member.name}</h3>
                  <p className="text-xs font-semibold mb-3 mt-0.5" style={{ color: member.color }}>{member.role}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-secondary" />
              <span className="text-secondary text-sm font-bold tracking-widest uppercase">Careers</span>
              <span className="w-8 h-px bg-secondary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">Join AiSence Technologies</h2>
            <p className="text-white/50 mt-4 max-w-lg mx-auto">
              We're a remote-first team building category-defining products. Come help us shape the future of AI voice.
            </p>
          </motion.div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {OPEN_ROLES.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-6 rounded-2xl border border-white/8 bg-[#07091a] hover:border-white/15 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${role.color}18`, border: `1px solid ${role.color}25` }}>
                    <Briefcase className="w-5 h-5" style={{ color: role.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-white">{role.title}</div>
                    <div className="text-xs text-white/40 mt-0.5">{role.dept} · {role.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
                    <MapPin className="w-3.5 h-3.5" />{role.location}
                  </div>
                  <span className="text-white/40 group-hover:text-primary transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/40 text-sm mb-4">Don't see a perfect fit?</p>
            <Link href="/contacts">
              <button className="px-8 py-3 rounded-full border border-white/15 text-white font-medium hover:border-primary hover:bg-primary/10 transition-all text-sm">
                Send us your CV anyway →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionDoor direction="vertical" color="#050913"><CTA /></SectionDoor>
      <Footer />
    </div>
  );
}
