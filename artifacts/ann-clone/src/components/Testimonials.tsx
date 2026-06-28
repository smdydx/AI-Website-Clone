import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { MobileSwipeContainer } from "./MobileSwipeContainer";

const REVIEWS = [
  {
    name: "Elena Rodriguez",
    role: "Product Manager",
    content: "ANN has completely transformed how I manage my day. It schedules meetings, drafts emails, and reminds me of deadlines — all without me lifting a finger. It's like having a genius assistant 24/7.",
    initials: "ER",
    color: "#6600FF",
  },
  {
    name: "Marcus Chen",
    role: "Startup Founder",
    content: "The natural language understanding is incredible. I just tell ANN what I need, and it handles everything — from booking flights to summarizing reports. It's saved me hours every single week.",
    initials: "MC",
    color: "#5EC900",
  },
  {
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    content: "I was skeptical about AI assistants, but ANN is different. It actually learns my preferences and gets smarter over time. My productivity has increased by at least 40% since I started using it.",
    initials: "SJ",
    color: "#EFA758",
  },
];

function TestimonialCard({ review, inView, i }: { review: typeof REVIEWS[number]; inView: boolean; i: number }) {
  return (
    <div
      className="bg-background p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors relative group overflow-hidden h-full flex flex-col justify-between"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 0% 0%, ${review.color}10 0%, transparent 60%)` }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.15, scale: 1 } : {}}
        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
        className="absolute top-6 right-6"
      >
        <Quote className="w-10 h-10" style={{ color: review.color }} />
      </motion.div>

      <div className="flex-1 flex flex-col">
        <div className="flex text-accent mb-6">
          {[...Array(5)].map((_, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 + j * 0.05, type: "spring", stiffness: 300 }}
            >
              <Star className="w-5 h-5 fill-current" />
            </motion.span>
          ))}
        </div>

        <p className="text-base text-white/75 mb-8 leading-relaxed italic flex-1">"{review.content}"</p>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0"
          style={{ backgroundColor: `${review.color}25`, border: `1px solid ${review.color}60` }}
        >
          {review.initials}
        </motion.div>
        <div>
          <h4 className="font-bold text-white">{review.name}</h4>
          <p className="text-sm text-white/45">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(102,0,255,0.06),transparent)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm font-bold tracking-widest uppercase">Testimonials</span>
          <span className="w-8 h-px bg-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold">Loved by Users</h2>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-stretch">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="h-full flex flex-col"
            >
              <TestimonialCard review={review} inView={inView} i={i} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe */}
        <MobileSwipeContainer
          dotColors={REVIEWS.map((r) => r.color)}
        >
          {REVIEWS.map((review, i) => (
            <TestimonialCard key={i} review={review} inView={inView} i={i} />
          ))}
        </MobileSwipeContainer>
      </div>
    </section>
  );
}
