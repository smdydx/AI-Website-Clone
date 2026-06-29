import { useEffect } from "react";
import { motion } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";

const POSTS = [
  {
    title: "How Diffusion Models Actually Work",
    excerpt: "A deep-dive into the math and intuition behind stable diffusion, DALL-E, and Midjourney — explained visually.",
    date: "Jun 20, 2026",
    readTime: "8 min read",
    tag: "Technical",
    tagColor: "#6600FF",
    featured: true,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    author: "Dr. Sarah Chen",
    authorRole: "AI Researcher",
  },
  {
    title: "Prompt Engineering: The Art of Talking to AI",
    excerpt: "Master the subtle craft of writing prompts that consistently produce stunning, intentional results.",
    date: "Jun 15, 2026",
    readTime: "6 min read",
    tag: "Tutorial",
    tagColor: "#5EC900",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    author: "Alex Rivera",
    authorRole: "Product Designer",
  },
  {
    title: "AI Art in Commercial Design: Legal Guide 2026",
    excerpt: "Everything you need to know about copyright, commercial licensing, and using AI art for business.",
    date: "Jun 10, 2026",
    readTime: "10 min read",
    tag: "Legal",
    tagColor: "#EFA758",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    author: "James Park",
    authorRole: "Legal Advisor",
  },
  {
    title: "Style Consistency Across AI Generations",
    excerpt: "Techniques for maintaining a cohesive visual identity when generating multiple images for a project.",
    date: "Jun 5, 2026",
    readTime: "5 min read",
    tag: "Tips",
    tagColor: "#00C8D4",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    author: "Maya Patel",
    authorRole: "Creative Director",
  },
  {
    title: "The Future of Human-AI Creative Collaboration",
    excerpt: "How AI tools are augmenting human creativity rather than replacing it — stories from working artists.",
    date: "May 28, 2026",
    readTime: "7 min read",
    tag: "Opinion",
    tagColor: "#FF4D9D",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    author: "Lena Wright",
    authorRole: "Artist & Creator",
  },
  {
    title: "AiSence v3.0: What's New in This Release",
    excerpt: "4K upscaling, new style presets, improved negative prompting, and more in our biggest update yet.",
    date: "May 20, 2026",
    readTime: "4 min read",
    tag: "Release",
    tagColor: "#a855f7",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    author: "AiSence Team",
    authorRole: "Engineering",
  },
];

const CATEGORIES = ["All", "Technical", "Tutorial", "Legal", "Tips", "Opinion", "Release"];

export default function BlogPage() {
  useEffect(() => {
    document.title = "Blog | AiSence - AI Insights & Updates";
    const m = document.querySelector("meta[name=description]");
    if (m) m.setAttribute("content", "Latest news, case studies, and AI voice agent insights from the AiSence team.");
  }, []);
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative min-h-[52vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(94,201,0,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(102,0,255,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-8 bg-accent/5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Journal &amp; Insights
            </span>
            <h1 className="font-heading font-extrabold text-[1.75rem] sm:text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tighter text-white mb-6">
              AiSence <span className="text-accent">Blog</span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
              Tutorials, technical deep-dives, and stories from the frontier of AI image generation and voice technology.
            </p>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 ${
                  i === 0
                    ? "bg-primary text-white border-primary"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDoor direction="horizontal" color="#050913">
        <section className="py-20">
          <div className="container mx-auto px-6">
            {/* Featured post */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden mb-14 group cursor-pointer border border-primary/20 hover:border-primary/40 transition-all duration-500"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050913]/80 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050913]/80 to-transparent md:hidden" />
                </div>
                <div className="p-10 md:p-14 bg-gradient-to-br from-[rgba(102,0,255,0.12)] to-[#07091a] flex flex-col justify-center">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 bg-primary/20 text-primary w-fit">{featured.tag}</span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-base text-white/60 mb-8 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{featured.date}</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{featured.readTime}</span>
                    </div>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Post grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post, i) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#07091a] hover:border-white/15 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07091a] via-[#07091a]/30 to-transparent" />
                    <span
                      className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${post.tagColor}25`, color: post.tagColor, border: `1px solid ${post.tagColor}40` }}
                    >
                      <Tag className="w-3 h-3" />{post.tag}
                    </span>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-white/50 mb-6 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/30">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                      <span className="text-xs font-semibold text-white/40 group-hover:text-primary transition-colors flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-20 rounded-3xl border border-white/8 bg-[#07091a] p-10 md:p-14 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(102,0,255,0.08),transparent)]" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">Newsletter</span>
                <h3 className="text-3xl font-extrabold text-white mb-3">Stay Ahead of the Curve</h3>
                <p className="text-white/50 mb-8 max-w-md mx-auto">Get our best AI insights delivered to your inbox every week. No spam, unsubscribe anytime.</p>
                <form className="flex gap-3 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/85 transition-all hover:shadow-[0_0_20px_rgba(102,0,255,0.4)] whitespace-nowrap text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionDoor>

      <SectionDoor direction="vertical" color="#050913"><CTA /></SectionDoor>
      <Footer />
    </div>
  );
}
