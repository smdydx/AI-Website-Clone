import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingCart, 
  Search, 
  Bookmark, 
  Brain, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Phone, 
  Cpu, 
  Share2, 
  Layers, 
  FileText, 
  Shield, 
  BookOpen, 
  Award,
  ChevronRight,
  TrendingUp,
  Heart,
  DollarSign,
  Ticket,
  Activity,
  Home as HomeIcon,
  ShoppingBag,
  MessageSquare,
  FolderOpen,
  Info,
  Users,
  Briefcase
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS: any[] = [
  { href: "/", label: "Home" },
  {
    href: "/platform",
    label: "Platform",
    dropdownType: "mega-platform",
    dropdown: {
      platform: [
        { label: "Phone AI Campaigns", desc: "Launch outbound phone campaigns at scale.", target: "OneAIUseCases", icon: Sparkles, iconColor: "text-amber-400" },
        { label: "AI-Native Dialer", desc: "Robust & compliant high-volume caller.", target: "Capabilities", icon: Phone, iconColor: "text-blue-400" },
        { label: "Analytics & Experimentation", desc: "Analyze and optimize every aspect.", target: "Capabilities", icon: Brain, iconColor: "text-emerald-400" },
        { label: "Integrations", desc: "Sync data in real-time to your CRM stack.", target: "Integrations", icon: Share2, iconColor: "text-purple-400" }
      ],
      channels: [
        { label: "Phone", desc: "Voice calling campaigns", icon: Phone, iconColor: "text-blue-400" },
        { label: "SMS", desc: "Automated text follow-ups", icon: FileText, iconColor: "text-indigo-400" },
        { label: "WhatsApp", desc: "Engaging chat cadences", icon: MessageSquare, iconColor: "text-emerald-400" }
      ],
      capabilities: [
        { label: "Outbound Calling", target: "Capabilities" },
        { label: "Inbound Calling", target: "Capabilities" },
        { label: "Warm Call Transfers", target: "Capabilities" },
        { label: "Meeting Scheduling", target: "Capabilities" },
        { label: "Lead Verification", target: "Capabilities" },
        { label: "User Activation", target: "Capabilities" },
        { label: "Receptionist", target: "Capabilities" },
        { label: "Speed-to-Lead", target: "Capabilities" }
      ]
    }
  },
  {
    href: "/industries",
    label: "Industries",
    dropdownType: "mega-industries",
    dropdown: [
      { label: "Telesales", icon: TrendingUp, iconColor: "text-orange-400" },
      { label: "Personal Care", icon: Heart, iconColor: "text-pink-400" },
      { label: "Insurance", icon: Shield, iconColor: "text-blue-400" },
      { label: "Finance", icon: DollarSign, iconColor: "text-emerald-400" },
      { label: "Trade Shows", icon: Ticket, iconColor: "text-yellow-400" },
      { label: "Healthcare", icon: Activity, iconColor: "text-red-400" },
      { label: "Real Estate", icon: HomeIcon, iconColor: "text-cyan-400" },
      { label: "E-commerce", icon: ShoppingBag, iconColor: "text-purple-400" }
    ]
  },
  {
    href: "/pages",
    label: "Pages",
    dropdownType: "mega-pages",
    dropdown: [
      { href: "/pages", label: "Overview", desc: "All landing features & pages directory.", icon: Layers, iconColor: "text-cyan-400" },
      { href: "/blog", label: "Blog", desc: "Latest news, case studies & updates.", icon: FileText, iconColor: "text-indigo-400" },
      { href: "/shop", label: "Shop", desc: "AI agent templates & custom voices.", icon: ShoppingCart, iconColor: "text-rose-400" },
      { href: "/contacts", label: "Contacts", desc: "Get in touch with support & sales.", icon: Shield, iconColor: "text-teal-400" }
    ]
  },
  {
    href: "/resources",
    label: "Resources",
    dropdownType: "mega-resources",
    dropdown: {
      explore: [
        { label: "Learn Center", desc: "Guides and documentation for voice agents.", target: "How It Works", icon: BookOpen, iconColor: "text-orange-400" },
        { label: "Phone AI Directory", desc: "Directory of tested voice prompts.", target: "OneAIUseCases", icon: FolderOpen, iconColor: "text-blue-400" },
        { label: "Research & Technology", desc: "Our technical papers & models.", target: "Capabilities", icon: Cpu, iconColor: "text-purple-400" }
      ],
      company: [
        { label: "About Us", desc: "Our mission, vision, and background.", target: "OneAIPerformanceTeam", icon: Info, iconColor: "text-amber-400" },
        { label: "Leadership", desc: "Meet the executive team.", target: "OneAIPerformanceTeam", icon: Users, iconColor: "text-green-400" },
        { label: "Jobs", desc: "Join our fast-growing remote team.", target: "OneAIPerformanceTeam", icon: Briefcase, iconColor: "text-rose-400" }
      ]
    }
  },
  { href: "/contacts", label: "Contacts" }
];

const SEARCH_ITEMS = [
  { label: "Features & Capabilities", target: "Capabilities" },
  { label: "Pricing Plans", target: "Pricing" },
  { label: "How It Works", target: "How It Works" },
  { label: "User Reviews", target: "Loved by Users" },
  { label: "Hero Assistant", target: "AI Personal" }
];

function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      className="text-white/70 hover:text-white transition-colors relative group hidden md:block"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
          {count}
        </span>
      )}
      {count === 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center opacity-60">
          0
        </span>
      )}
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<number, boolean>>({});

  const toggleMobileDropdown = (idx: number) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleSearchClick = (targetText: string) => {
    const elements = Array.from(document.querySelectorAll("h2, h1, span, section"));
    const match = elements.find(el => el.textContent?.toLowerCase().includes(targetText.toLowerCase()));
    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-10">
            <span className="font-heading font-bold text-3xl tracking-tighter">ANN</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link: any, idx) => {
              const isActive = link.href ? location === link.href : false;
              const hasDropdown = !!link.dropdown;
              return (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors relative group py-1 flex items-center gap-1 ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />}
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </Link>
                  ) : (
                    <span
                      className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                        activeDropdown === idx ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${activeDropdown === idx ? "rotate-180" : ""}`} />
                    </span>
                  )}
                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {activeDropdown === idx && hasDropdown && (
                      <>
                        {link.dropdownType === "mega-platform" && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                            className="absolute left-1/2 -translate-x-[25%] top-full mt-2 w-[760px] bg-[#0a0020]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl z-50 grid grid-cols-12 gap-6"
                          >
                            {/* Column 1: Platform (span 5) */}
                            <div className="col-span-5 flex flex-col gap-3">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Platform</span>
                              {link.dropdown.platform.map((subItem: any) => (
                                <button
                                  key={subItem.label}
                                  onClick={() => {
                                    handleSearchClick(subItem.target);
                                    setActiveDropdown(null);
                                  }}
                                  className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all font-medium flex items-start gap-3 group/sub"
                                >
                                  {subItem.icon && <subItem.icon className={`w-4.5 h-4.5 mt-0.5 shrink-0 transition-transform group-hover/sub:scale-110 ${subItem.iconColor}`} />}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-white text-[13px]">{subItem.label}</span>
                                    <span className="text-[10px] text-white/40 group-hover/sub:text-white/60 transition-colors mt-0.5 leading-relaxed">{subItem.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Column 2: Channels (span 3) */}
                            <div className="col-span-3 flex flex-col gap-3 border-l border-white/5 pl-6">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Channels</span>
                              {link.dropdown.channels.map((subItem: any) => (
                                <button
                                  key={subItem.label}
                                  onClick={() => {
                                    handleSearchClick("Capabilities");
                                    setActiveDropdown(null);
                                  }}
                                  className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all font-medium flex items-center gap-3 group/sub"
                                >
                                  {subItem.icon && <subItem.icon className={`w-4 h-4 shrink-0 transition-transform group-hover/sub:scale-110 ${subItem.iconColor}`} />}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-white text-[13px]">{subItem.label}</span>
                                    <span className="text-[10px] text-white/40 group-hover/sub:text-white/60 transition-colors mt-0.5">{subItem.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Column 3: Capabilities (span 4) */}
                            <div className="col-span-4 flex flex-col gap-3 border-l border-white/5 pl-6">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Capabilities</span>
                              <div className="grid grid-cols-1 gap-1">
                                {link.dropdown.capabilities.map((subItem: any) => (
                                  <button
                                    key={subItem.label}
                                    onClick={() => {
                                      handleSearchClick(subItem.target);
                                      setActiveDropdown(null);
                                    }}
                                    className="text-left text-xs text-white/60 hover:text-white hover:bg-white/5 py-1.5 px-2.5 rounded-lg transition-all font-medium flex items-center justify-between group/cap"
                                  >
                                    <span>{subItem.label}</span>
                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover/cap:opacity-100 group-hover/cap:translate-x-1 transition-all" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {link.dropdownType === "mega-industries" && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                            className="absolute left-1/2 -translate-x-[40%] top-full mt-2 w-[540px] bg-[#0a0020]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-50 flex flex-col gap-4"
                          >
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Phone AI Solutions by Industry</span>
                              <button
                                onClick={() => {
                                  handleSearchClick("OneAIUseCases");
                                  setActiveDropdown(null);
                                }}
                                className="text-[10px] font-bold text-primary hover:text-primary-hover transition-colors"
                              >
                                See all industries →
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {link.dropdown.map((subItem: any) => (
                                <button
                                  key={subItem.label}
                                  onClick={() => {
                                    handleSearchClick("OneAIUseCases");
                                    setActiveDropdown(null);
                                  }}
                                  className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-3 group/ind"
                                >
                                  {subItem.icon && <subItem.icon className={`w-4 h-4 shrink-0 transition-transform group-hover/ind:scale-110 ${subItem.iconColor}`} />}
                                  <span className="text-[13px]">{subItem.label}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {link.dropdownType === "mega-pages" && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-[#0a0020]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl z-50 flex flex-col gap-1.5"
                          >
                            {link.dropdown.map((subItem: any) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all font-medium flex items-center gap-3 group/sub"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.icon && <subItem.icon className={`w-4 h-4 shrink-0 transition-transform group-hover/sub:scale-110 ${subItem.iconColor}`} />}
                                <div className="flex flex-col">
                                  <span className="font-semibold text-white text-[13px]">{subItem.label}</span>
                                  <span className="text-[10px] text-white/40 group-hover/sub:text-white/60 transition-colors">{subItem.desc}</span>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}

                        {link.dropdownType === "mega-resources" && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[480px] bg-[#0a0020]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-50 grid grid-cols-2 gap-6"
                          >
                            {/* Column 1: Explore */}
                            <div className="flex flex-col gap-3">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Explore</span>
                              {link.dropdown.explore.map((subItem: any) => (
                                <button
                                  key={subItem.label}
                                  onClick={() => {
                                    handleSearchClick(subItem.target);
                                    setActiveDropdown(null);
                                  }}
                                  className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all font-medium flex items-start gap-3 group/sub"
                                >
                                  {subItem.icon && <subItem.icon className={`w-4 h-4 shrink-0 mt-0.5 transition-transform group-hover/sub:scale-110 ${subItem.iconColor}`} />}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-white text-[13px]">{subItem.label}</span>
                                    <span className="text-[10px] text-white/40 group-hover/sub:text-white/60 transition-colors mt-0.5 leading-relaxed">{subItem.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Column 2: Company */}
                            <div className="flex flex-col gap-3 border-l border-white/5 pl-6">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Company</span>
                              {link.dropdown.company.map((subItem: any) => (
                                <button
                                  key={subItem.label}
                                  onClick={() => {
                                    handleSearchClick(subItem.target);
                                    setActiveDropdown(null);
                                  }}
                                  className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all font-medium flex items-start gap-3 group/sub"
                                >
                                  {subItem.icon && <subItem.icon className={`w-4 h-4 shrink-0 mt-0.5 transition-transform group-hover/sub:scale-110 ${subItem.iconColor}`} />}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-white text-[13px]">{subItem.label}</span>
                                    <span className="text-[10px] text-white/40 group-hover/sub:text-white/60 transition-colors mt-0.5 leading-relaxed">{subItem.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <CartButton />
            <div className="relative flex items-center hidden md:flex">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="mr-2 overflow-visible relative"
                  >
                    <input
                      type="text"
                      placeholder="Search site..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary w-full backdrop-blur-md"
                      autoFocus
                    />
                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-[#0a0020]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 flex flex-col gap-1"
                        >
                          <p className="text-[10px] font-bold text-white/40 px-2.5 mb-1.5 uppercase tracking-wider">Quick Search Links</p>
                          {SEARCH_ITEMS.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                            <button
                              key={item.label}
                              onClick={() => {
                                handleSearchClick(item.target);
                                setSearchQuery("");
                                setSearchOpen(false);
                              }}
                              className="text-left w-full text-xs text-white/70 hover:text-white hover:bg-primary/20 px-3 py-2 rounded-xl transition-all font-medium flex items-center justify-between"
                            >
                              <span>{item.label}</span>
                              <span className="text-[10px] text-accent font-bold">Jump →</span>
                            </button>
                          ))}
                          {SEARCH_ITEMS.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <p className="text-[11px] text-white/40 px-2.5 py-2 italic">No results found</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white/70 hover:text-white transition-colors mr-2"
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
            <a href="/affiliate" className="hidden md:flex">
              <button className="px-5 py-2 border border-accent/50 hover:border-accent text-accent hover:bg-accent/10 font-semibold rounded-full transition-all text-sm">
                Affiliate
              </button>
            </a>
            <Button className="bg-primary hover:bg-primary/85 text-white rounded-full px-6 py-2 h-auto font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(102,0,255,0.4)] hidden md:flex">
              Get Started
            </Button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-0 top-0 z-40 pt-24 pb-8 px-6 bg-background/95 backdrop-blur-xl border-b border-white/5 md:hidden max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link: any, idx) => {
                const isActive = link.href ? location === link.href : false;
                const hasDropdown = !!link.dropdown;
                const isMobileOpen = !!mobileDropdowns[idx];

                return (
                  <div key={link.label} className="flex flex-col">
                    {hasDropdown ? (
                      <button
                        onClick={() => toggleMobileDropdown(idx)}
                        className={`text-lg font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-between text-left ${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileOpen ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                      link.href && (
                        <Link
                          href={link.href}
                          className={`text-lg font-semibold py-3 px-4 rounded-xl transition-colors ${
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )
                    )}

                    {/* Mobile submenu list */}
                    <AnimatePresence initial={false}>
                      {hasDropdown && isMobileOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { type: "spring", stiffness: 500, damping: 40, mass: 0.8 },
                            opacity: { duration: 0.25, ease: "easeInOut" }
                          }}
                          style={{ overflow: "hidden" }}
                          className="pl-6 pr-4 flex flex-col gap-3 mt-1 border-l-2 border-white/5 ml-4 mb-2"
                        >
                          {link.dropdownType === "mega-platform" && (
                            <>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Platform</span>
                                {link.dropdown.platform.map((subItem: any) => (
                                  <button
                                    key={subItem.label}
                                    onClick={() => {
                                      handleSearchClick(subItem.target);
                                      setMobileOpen(false);
                                    }}
                                    className="py-2 px-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left flex items-center gap-2"
                                  >
                                    {subItem.icon && <subItem.icon className={`w-4 h-4 ${subItem.iconColor}`} />}
                                    <span>{subItem.label}</span>
                                  </button>
                                ))}
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Channels</span>
                                {link.dropdown.channels.map((subItem: any) => (
                                  <button
                                    key={subItem.label}
                                    onClick={() => {
                                      handleSearchClick("Capabilities");
                                      setMobileOpen(false);
                                    }}
                                    className="py-2 px-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left flex items-center gap-2"
                                  >
                                    {subItem.icon && <subItem.icon className={`w-4 h-4 ${subItem.iconColor}`} />}
                                    <span>{subItem.label}</span>
                                  </button>
                                ))}
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Capabilities</span>
                                {link.dropdown.capabilities.map((subItem: any) => (
                                  <button
                                    key={subItem.label}
                                    onClick={() => {
                                      handleSearchClick(subItem.target);
                                      setMobileOpen(false);
                                    }}
                                    className="py-1.5 px-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left"
                                  >
                                    <span>{subItem.label}</span>
                                  </button>
                                ))}
                              </div>
                            </>
                          )}

                          {link.dropdownType === "mega-industries" && (
                            <div className="grid grid-cols-2 gap-1.5">
                              {link.dropdown.map((subItem: any) => (
                                <button
                                  key={subItem.label}
                                  onClick={() => {
                                    handleSearchClick("OneAIUseCases");
                                    setMobileOpen(false);
                                  }}
                                  className="py-2 px-2.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left flex items-center gap-2"
                                >
                                  {subItem.icon && <subItem.icon className={`w-3.5 h-3.5 ${subItem.iconColor}`} />}
                                  <span>{subItem.label}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          {link.dropdownType === "mega-pages" && (
                            <div className="flex flex-col gap-1">
                              {link.dropdown.map((subItem: any) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="py-2 px-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {subItem.icon && <subItem.icon className={`w-4 h-4 ${subItem.iconColor}`} />}
                                  <span>{subItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}

                          {link.dropdownType === "mega-resources" && (
                            <>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Explore</span>
                                {link.dropdown.explore.map((subItem: any) => (
                                  <button
                                    key={subItem.label}
                                    onClick={() => {
                                      handleSearchClick(subItem.target);
                                      setMobileOpen(false);
                                    }}
                                    className="py-2 px-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left flex items-center gap-2"
                                  >
                                    {subItem.icon && <subItem.icon className={`w-4 h-4 ${subItem.iconColor}`} />}
                                    <span>{subItem.label}</span>
                                  </button>
                                ))}
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Company</span>
                                {link.dropdown.company.map((subItem: any) => (
                                  <button
                                    key={subItem.label}
                                    onClick={() => {
                                      handleSearchClick(subItem.target);
                                      setMobileOpen(false);
                                    }}
                                    className="py-2 px-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left flex items-center gap-2"
                                  >
                                    {subItem.icon && <subItem.icon className={`w-4 h-4 ${subItem.iconColor}`} />}
                                    <span>{subItem.label}</span>
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
            <div className="mt-6">
              <Button className="w-full bg-primary text-white rounded-full py-4 h-auto font-bold text-base">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right sidebar — quick access (desktop only) */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 p-2 bg-primary/15 backdrop-blur-md rounded-l-2xl border-l border-t border-b border-primary/25">
        <button
          onClick={() => handleSearchClick("Pricing")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all group relative"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="absolute right-full mr-3 bg-[#0a0020] border border-primary/40 text-white text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Pricing
          </span>
        </button>
        <button
          onClick={() => handleSearchClick("Capabilities")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all group relative"
        >
          <Brain className="w-4 h-4" />
          <span className="absolute right-full mr-3 bg-[#0a0020] border border-primary/40 text-white text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Capabilities
          </span>
        </button>
        <button
          onClick={() => handleSearchClick("Process")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all group relative"
        >
          <Bookmark className="w-4 h-4" />
          <span className="absolute right-full mr-3 bg-[#0a0020] border border-primary/40 text-white text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            How It Works
          </span>
        </button>
      </div>
      {/* Backdrop overlay for hover dropdown */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 bg-black/40 backdrop-blur-[2px] z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
