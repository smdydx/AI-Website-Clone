import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Twitter, Linkedin, Instagram, Building2 } from "lucide-react";
import { Link } from "wouter";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-36 relative overflow-hidden">
      {/* AI Robot background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1800&q=80"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Deep dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-[#050913]/80" />
        {/* Purple tint overlay matching brand */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(102,0,255,0.45),transparent)]" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 pointer-events-none z-10"
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-primary/10 pointer-events-none z-10"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 border border-white/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Join 50,000+ Creators
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight"
        >
          Start Creating<br />for Free
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-xl text-white/70 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Join thousands of businesses and teams already using AiEye to automate
          and scale their voice operations.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-background/50 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary backdrop-blur-sm transition-colors"
          />
          <Button
            type="submit"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-4 h-auto font-bold text-base w-full sm:w-auto flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const LINKS = [
    {
      title: "Product",
      items: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Platform", href: "/platform" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Industries", href: "/industries" },
        { label: "Affiliate Program", href: "/affiliate" },
        { label: "Resources Hub", href: "/resources" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Us", href: "/resources#about" },
        { label: "Careers", href: "/resources#careers" },
        { label: "Contact", href: "/contacts" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ];

  const SOCIALS = [
    { label: "Twitter", icon: Twitter, href: "#" },
    { label: "LinkedIn", icon: Linkedin, href: "#" },
    { label: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer ref={ref} className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <img
              src="/aieye-logo-transparent.png"
              alt="AiEye Technologies"
              className="h-14 w-auto object-contain mb-3"
            />
            <div className="flex items-center gap-1.5 mb-5">
              <Building2 className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-xs text-primary/70 font-semibold">AiEye Technologies Private Limited</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              The premium AI Voice Agent platform for modern businesses and scale campaigns.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all hover:scale-110 duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {LINKS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * (i + 1), duration: 0.6 }}
            >
              <h4 className="font-bold text-base mb-6">{col.title}</h4>
              <ul className="space-y-4 text-sm text-white/50">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30"
        >
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <p>© {new Date().getFullYear()} AiEye. All rights reserved.</p>
            <span className="hidden sm:block text-white/15">•</span>
            <p className="text-white/20 text-xs flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              AiEye Technologies Private Limited
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <Link href="/contacts" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
