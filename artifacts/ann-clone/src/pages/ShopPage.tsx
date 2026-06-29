import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionDoor } from "@/components/SectionDoor";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";
import { ShoppingCart, Star, Zap, CheckCircle2, Shield, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/context/CartContext";

const PRODUCTS = [
  {
    id: "starter",
    name: "Starter Pack",
    price: "$9",
    priceNum: 9,
    desc: "500 AI query credits + basic automation workflows",
    badge: null,
    color: "#6600FF",
    popular: false,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    features: ["500 AI credits", "Basic workflows", "Email support", "API access"],
  },
  {
    id: "power",
    name: "Power User Bundle",
    price: "$39",
    priceNum: 39,
    desc: "3000 credits + 50 custom integrations + commercial license",
    badge: "Best Value",
    color: "#5EC900",
    popular: true,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
    features: ["3,000 AI credits", "50 integrations", "Commercial license", "Priority support"],
  },
  {
    id: "automation",
    name: "Automation Pack",
    price: "$19",
    priceNum: 19,
    desc: "100 exclusive pre-built productivity workflows",
    badge: null,
    color: "#EFA758",
    popular: false,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80",
    features: ["100 workflows", "Zapier integration", "Webhook support", "Team sharing"],
  },
  {
    id: "data",
    name: "Data Analysis Pack",
    price: "$14",
    priceNum: 14,
    desc: "200 premium document & data analysis queries",
    badge: null,
    color: "#00C8D4",
    popular: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    features: ["200 analysis queries", "CSV/PDF support", "Visual charts", "Export reports"],
  },
  {
    id: "enterprise",
    name: "Enterprise API",
    price: "$99",
    priceNum: 99,
    desc: "Full API access + 50K query credits/month",
    badge: "Team",
    color: "#FF4D9D",
    popular: false,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    features: ["50K monthly credits", "Full REST API", "SLA guarantee", "Dedicated support"],
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: "$299",
    priceNum: 299,
    desc: "One-time payment for unlimited Pro assistant access",
    badge: "Limited",
    color: "#a855f7",
    popular: false,
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80",
    features: ["Unlimited credits", "All future updates", "Founding member badge", "VIP community"],
  },
];

function AddToCartButton({ product }: { product: typeof PRODUCTS[number] }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: product.priceNum,
      color: product.color,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    openCart();
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
      style={{
        backgroundColor: added ? `${product.color}35` : `${product.color}18`,
        color: product.color,
        border: `1px solid ${added ? product.color : product.color + "44"}`,
      }}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span key="added" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Added to Cart!
          </motion.span>
        ) : (
          <motion.span key="add" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative min-h-[52vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(239,167,88,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_20%,rgba(102,0,255,0.06),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary border border-secondary/30 rounded-full px-4 py-1.5 mb-8 bg-secondary/5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              AiSence Store
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white mb-6">
              Shop <span className="text-secondary">Credits</span><br />&amp; Bundles
            </h1>
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
              Top up your credits, unlock advanced automations, or go unlimited — all at transparent, creator-friendly prices.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            {[
              { icon: Shield, label: "Secure Checkout" },
              { icon: Truck, label: "Instant Delivery" },
              { icon: RefreshCw, label: "30-Day Refund" },
              { icon: Zap, label: "Credits Never Expire" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-sm text-white/50">
                <Icon className="w-4 h-4 text-accent" />{label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDoor direction="iris" color="#050913">
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
                  style={{
                    border: `1px solid ${p.color}${p.popular ? "55" : "22"}`,
                    boxShadow: p.popular ? `0 0 40px ${p.color}22` : "none",
                  }}
                >
                  {/* Card image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, #07091a 100%)` }} />
                    <div className="absolute inset-0 bg-[#07091a]/30" />

                    {p.badge && (
                      <div className="absolute top-3 right-3 z-20">
                        <span className="text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: `${p.color}50`, color: "white", border: `1px solid ${p.color}60` }}>
                          {p.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4 z-10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-heading font-extrabold text-white">{p.price}</span>
                        <span className="text-white/50 text-xs">one-time</span>
                      </div>
                    </div>
                  </div>

                  {/* Top accent line */}
                  <div className="h-0.5 w-full" style={{ backgroundColor: p.color }} />

                  <div className="relative z-10 p-7 bg-[#07091a] flex flex-col flex-1">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(180deg, ${p.color}10 0%, transparent 60%)` }}
                    />

                    <h3 className="text-xl font-bold text-white mb-1 relative z-10">{p.name}</h3>
                    <p className="text-sm text-white/50 mb-5 leading-relaxed relative z-10">{p.desc}</p>

                    <ul className="space-y-2 mb-6 flex-1 relative z-10">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: p.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1 text-xs text-white/30 mb-4 relative z-10">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" style={{ color: p.color }} />)}
                      <span className="ml-1">Rated 4.9/5</span>
                    </div>

                    <div className="relative z-10">
                      <AddToCartButton product={p} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom guarantee strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 p-8 rounded-2xl border border-white/5 bg-[#07091a]/50 flex flex-wrap justify-center gap-10 text-sm text-white/40"
            >
              {["Instant Delivery", "Secure Checkout via Stripe", "Credits Never Expire", "24/7 Support", "30-Day Money Back"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />{t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionDoor>

      <SectionDoor direction="horizontal" color="#050913"><CTA /></SectionDoor>
      <Footer />
    </div>
  );
}
