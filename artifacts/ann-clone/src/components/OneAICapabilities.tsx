import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Layers, Cpu, Share2, BarChart3, Radio, Phone, User, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import { ModernBackground } from "./ModernBackground";

const TABS = [
  {
    id: "dialer",
    name: "AI-Native Dialer",
    icon: Radio,
    title: "AI-Native Dialer",
    subtitle: "Reach Every Lead First",
    bullets: [
      "AI-Native: Built for AI scale and optimized for peak answer times.",
      "Maximized Connection: Bypasses AI screeners and spam filters with local presence and automated number rotation.",
      "Automated Cadences: Executes multi-touch follow-ups and retries automatically.",
      "5 Second Callback: Calls incoming leads within 5 seconds of creation."
    ],
    highlight: "5s speed-to-lead latency",
    color: "#5EC900",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "workforce",
    name: "AI Workforce",
    icon: Cpu,
    title: "AI Workforce",
    subtitle: "Convert like Your Best Rep",
    bullets: [
      "Right Party Contact: Connects with the right contact, applying voicemail handling, gatekeeper bypass, and IVR navigation as needed.",
      "Configurable Qualification: Screens leads against your criteria, ensuring your team only speaks with sales-ready prospects.",
      "Human-Sounding Voices: Engages leads with natural voices and near-zero speech latency.",
      "Flow-Based Control: Guarantees brand compliance with word-for-word script optimization."
    ],
    highlight: "Near-zero speech latency (<500ms)",
    color: "#00C8D4",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    id: "handoffs",
    name: "Handoffs",
    icon: Layers,
    title: "Sales Handoffs",
    subtitle: "Deliver Sales-Ready Handoffs",
    bullets: [
      "Warm Transfers: Connects qualified leads directly to the right, available sales representative.",
      "In-Call Briefing: Briefs your reps with key lead details and notes before transferring the call.",
      "Live Scheduling: Integrates with your calendars to book qualified appointments automatically."
    ],
    highlight: "Direct warm-transfers to sales reps",
    color: "#EFA758",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    id: "optimization",
    name: "Optimization",
    icon: BarChart3,
    title: "Optimization",
    subtitle: "Auto-Optimizing Operations",
    bullets: [
      "A/B & Multi-Variant Testing: Test scripts, call scheduling, accents, and voice models to optimize conversion.",
      "Conversion Attribution: Track lead status changes directly back to your marketing campaigns.",
      "Reporting & Analytics: Detailed call recordings, transcriptions, and qualitative performance dashboards."
    ],
    highlight: "Continuous A/B script testing",
    color: "#6600FF",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "integrations",
    name: "Integrations",
    icon: Share2,
    title: "Integrations",
    subtitle: "Real-Time Sync to Your Tech Stack",
    bullets: [
      "CRM Systems: Direct integration with Salesforce, HubSpot, Zoho, and Pipedrive.",
      "Schedulers & Telephony: Native sync with Google Calendar, Outlook, Calendly, and twilio.",
      "Developer API: Full REST API access, webhooks, and secure authentication hooks."
    ],
    highlight: "CRM & Calendar bi-directional sync",
    color: "#00C8D4",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    brands: ["Salesforce", "HubSpot", "Zoho", "Pipedrive"]
  }
];

// ── 1. DIALER SCREEN ──
function PhoneDialer() {
  const [status, setStatus] = useState<"dialing" | "ringing" | "connected">("dialing");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStatus("ringing"), 2000);
    const t2 = setTimeout(() => setStatus("connected"), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#050614] text-white p-5 justify-between relative font-sans pt-10">
      <div className="text-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#5EC900] bg-[#5EC900]/10 border border-[#5EC900]/20 px-2 py-0.5 rounded-full">
          ANN Outbound Core
        </span>
        <h5 className="text-sm font-bold text-white/50 mt-4">Calling Lead</h5>
        <h4 className="text-lg font-bold text-white mt-1">+1 (415) 555-0199</h4>
        <p className="text-xs text-white/40 mt-1 capitalize">{status}...</p>
      </div>

      <div className="flex items-center justify-center py-6">
        {status === "dialing" && (
          <div className="flex gap-1 items-center justify-center h-16">
            <span className="w-2 h-8 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <span className="w-2 h-12 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-2 h-6 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
          </div>
        )}

        {status === "ringing" && (
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#5EC900]/30 animate-ping" />
            <div className="absolute inset-4 rounded-full border border-[#5EC900]/40 animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-[#5EC900]/20 flex items-center justify-center border border-[#5EC900]/40">
              <Phone className="w-5 h-5 text-[#5EC900] animate-bounce" />
            </div>
          </div>
        )}

        {status === "connected" && (
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-white mb-2">{formatTime(timer)}</div>
            <div className="flex items-center gap-1 justify-center h-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-[#5EC900] rounded-full transition-all"
                  style={{
                    height: `${Math.max(6, Math.sin(timer + i) * 24 + 14)}px`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid Keyboard Action */}
      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        {["Mute", "Keypad", "Speaker", "Hold", "Add Rep", "Record"].map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 text-xs hover:bg-white/10 cursor-pointer">
              {label[0]}
            </div>
            <span className="text-[9px] text-white/30">{label}</span>
          </div>
        ))}
      </div>

      {/* Decline Button */}
      <div className="w-full flex justify-center pb-2">
        <div className="w-12 h-12 rounded-full bg-red-600 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-600/30 cursor-pointer">
          <Phone className="w-5 h-5 text-white rotate-[135deg]" />
        </div>
      </div>
    </div>
  );
}

// ── 2. WORKFORCE SCREEN ──
function PhoneWorkforce() {
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);

  useEffect(() => {
    const sequence = [
      { role: "ai", text: "Hello! I am AXON, ANN's AI voice agent. Am I speaking with Sarah?" },
      { role: "user", text: "Yes! This is Sarah." },
      { role: "ai", text: "Great! I saw you requested info on scaling outbound calls..." },
      { role: "user", text: "Yes, we need to dial 500 leads daily." },
    ] as const;

    setMessages([sequence[0]]);

    const t1 = setTimeout(() => setMessages((m) => [...m, sequence[1]]), 2800);
    const t2 = setTimeout(() => setMessages((m) => [...m, sequence[2]]), 5600);
    const t3 = setTimeout(() => setMessages((m) => [...m, sequence[3]]), 8400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#050614] text-white p-4 justify-between font-sans pt-10">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <div className="w-8 h-8 rounded-lg bg-[#00C8D4]/10 border border-[#00C8D4]/20 flex items-center justify-center text-[#00C8D4] font-bold text-xs">
          AX
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white">AXON Voice Node</span>
          <span className="text-[9px] text-[#00C8D4] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8D4] animate-pulse" />
            Active Call • 120ms Latency
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 my-4 flex flex-col gap-3.5 overflow-y-auto no-scrollbar justify-end pb-2">
        {messages.map((msg, i) => {
          const isAI = msg.role === "ai";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col max-w-[85%] ${isAI ? "self-start" : "self-end items-end"}`}
            >
              <div
                className={`p-3 rounded-2xl text-[11px] leading-relaxed font-medium ${
                  isAI
                    ? "bg-[#00C8D4]/10 border border-[#00C8D4]/20 text-white rounded-tl-none"
                    : "bg-primary text-white rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[8px] text-white/30 mt-1">{isAI ? "AI Agent" : "Lead"}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Waveform visual at bottom */}
      <div className="border-t border-white/5 pt-3 pb-1 flex flex-col gap-2 items-center">
        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Neural Voice Stream</span>
        <div className="flex gap-1 items-center justify-center h-8 w-full">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="w-1 bg-[#00C8D4] rounded-full transition-all"
              style={{
                height: `${Math.max(4, Math.random() * 24 + 4)}px`,
                opacity: 0.8,
                animation: "robot-led-anim 1s ease-in-out infinite",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 3. HANDOFFS SCREEN ──
function PhoneHandoffs() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#050614] text-white p-5 justify-between font-sans pt-10">
      <div className="text-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#EFA758] bg-[#EFA758]/10 border border-[#EFA758]/20 px-2 py-0.5 rounded-full">
          Warm Transfer Route
        </span>
        <h4 className="text-sm font-bold text-white mt-4">Handoff Controller</h4>
      </div>

      {/* Visual routing diagram */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-4">
        {/* Nodes */}
        <div className="absolute top-4 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-xs shadow-lg shadow-primary/10">
          <Cpu className="w-5 h-5 text-primary" />
          <span className="text-[8px] text-white/40 mt-0.5">AI</span>
        </div>

        <div className="absolute bottom-16 left-2 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col items-center justify-center text-xs shadow-lg shadow-cyan-500/10">
          <User className="w-5 h-5 text-cyan-400" />
          <span className="text-[8px] text-white/40 mt-0.5">Lead</span>
        </div>

        <div className="absolute bottom-16 right-2 w-12 h-12 rounded-xl bg-[#EFA758]/10 border border-[#EFA758]/20 flex flex-col items-center justify-center text-xs shadow-lg shadow-[#EFA758]/10">
          <User className="w-5 h-5 text-[#EFA758]" />
          <span className="text-[8px] text-white/40 mt-0.5">Rep Mark</span>
        </div>

        {/* Status Line */}
        <div className="text-center px-4 max-w-xs mt-32">
          <p className="text-[11px] font-semibold text-white">
            {step === 0 && "Analyzing Lead Intent..."}
            {step === 1 && "Lead Qualified! Routing Call..."}
            {step === 2 && "Briefing Rep Mark (Sales Rep)..."}
            {step === 3 && "Warm Transfer Active!"}
          </p>
          <p className="text-[9px] text-white/40 mt-1 leading-relaxed">
            {step === 0 && "AI screens the contact against target criteria."}
            {step === 1 && "Instantly dialing Mark to bridge the connection."}
            {step === 2 && "Whispering lead details to Mark before merge."}
            {step === 3 && "Call bridged! Lead connected to rep seamlessly."}
          </p>
        </div>
      </div>

      {/* Calendly confirm card */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15 }}
            className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex items-center gap-2 mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-emerald-400">Meeting Scheduled</span>
              <span className="text-[8.5px] text-white/60">Demo booked with Mark: Mon @ 10am</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 4. OPTIMIZATION SCREEN ──
function PhoneOptimization() {
  const [valA, setValA] = useState(0);
  const [valB, setValB] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setValA(78), 400);
    const t2 = setTimeout(() => setValB(42), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#050614] text-white p-5 justify-between font-sans pt-10">
      <div className="text-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#6600FF] bg-[#6600FF]/10 border border-[#6600FF]/20 px-2 py-0.5 rounded-full">
          Real-Time A/B Testing
        </span>
        <h4 className="text-sm font-bold text-white mt-4">Script Optimizer</h4>
      </div>

      {/* Interactive Graph Metrics */}
      <div className="flex-1 flex flex-col gap-5 justify-center my-4">
        {/* Variant A */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-white/70">Variant A (Friendly)</span>
            <span className="font-mono font-bold text-[#5EC900]">{valA}% CV</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${valA}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-[#5EC900]"
            />
          </div>
        </div>

        {/* Variant B */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-white/70">Variant B (Direct)</span>
            <span className="font-mono font-bold text-white/40">{valB}% CV</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${valB}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-white/20"
            />
          </div>
        </div>

        {/* A/B Metric Summary */}
        <div className="p-3.5 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-1.5 text-left mt-2">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#5EC900] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Auto-Optimization</span>
          </div>
          <p className="text-[10.5px] font-semibold text-white leading-relaxed">
            Winner Detected: Promoting Variant A to 100% traffic allocation.
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 pt-3 pb-1 text-center">
        <span className="text-[9px] text-white/30 font-mono">1,420 Call Runs Evaluated</span>
      </div>
    </div>
  );
}

// ── 5. INTEGRATIONS SCREEN ──
function PhoneIntegrations() {
  const [activeSync, setActiveSync] = useState<"salesforce" | "hubspot" | "zoho" | "idle">("idle");
  const [logs, setLogs] = useState<string[]>(["[LOG] Outbound call completed"]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setActiveSync("salesforce");
      setLogs((l) => [...l, "[LOG] Syncing to Salesforce..."]);
    }, 1500);

    const t2 = setTimeout(() => {
      setLogs((l) => [...l, "[LOG] Salesforce: Synced!"]);
      setActiveSync("hubspot");
      setLogs((l) => [...l, "[LOG] Syncing to HubSpot..."]);
    }, 4000);

    const t3 = setTimeout(() => {
      setLogs((l) => [...l, "[LOG] HubSpot: Synced!"]);
      setActiveSync("zoho");
      setLogs((l) => [...l, "[LOG] Syncing to Zoho CRM..."]);
    }, 6500);

    const t4 = setTimeout(() => {
      setLogs((l) => [...l, "[LOG] Zoho: Synced!", "[LOG] CRM Stack in sync."]);
      setActiveSync("idle");
    }, 9000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#050614] text-white p-4 justify-between font-sans pt-10">
      <div className="text-center border-b border-white/5 pb-3">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#00C8D4] bg-[#00C8D4]/10 border border-[#00C8D4]/20 px-2 py-0.5 rounded-full">
          CRM Integrations Sync
        </span>
      </div>

      {/* Sync Status Cards */}
      <div className="flex-1 flex flex-col gap-2.5 justify-center my-3">
        {/* Salesforce Card */}
        <div 
          className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
            activeSync === "salesforce" 
              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(102,0,255,0.15)]" 
              : "bg-white/2 border-white/5"
          }`}
        >
          <span className="text-[11px] font-bold">Salesforce CRM</span>
          {activeSync === "salesforce" ? (
            <span className="text-[8px] font-mono text-primary animate-pulse uppercase">Syncing...</span>
          ) : logs.includes("[LOG] Salesforce: Synced!") ? (
            <Check className="w-3.5 h-3.5 text-[#5EC900]" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          )}
        </div>

        {/* HubSpot Card */}
        <div 
          className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
            activeSync === "hubspot" 
              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(102,0,255,0.15)]" 
              : "bg-white/2 border-white/5"
          }`}
        >
          <span className="text-[11px] font-bold">HubSpot CRM</span>
          {activeSync === "hubspot" ? (
            <span className="text-[8px] font-mono text-primary animate-pulse uppercase">Syncing...</span>
          ) : logs.includes("[LOG] HubSpot: Synced!") ? (
            <Check className="w-3.5 h-3.5 text-[#5EC900]" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          )}
        </div>

        {/* Zoho Card */}
        <div 
          className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
            activeSync === "zoho" 
              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(102,0,255,0.15)]" 
              : "bg-white/2 border-white/5"
          }`}
        >
          <span className="text-[11px] font-bold">Zoho CRM</span>
          {activeSync === "zoho" ? (
            <span className="text-[8px] font-mono text-primary animate-pulse uppercase">Syncing...</span>
          ) : logs.includes("[LOG] Zoho: Synced!") ? (
            <Check className="w-3.5 h-3.5 text-[#5EC900]" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          )}
        </div>
      </div>

      {/* Sync console log */}
      <div className="h-20 bg-black/40 border border-white/5 rounded-xl p-2 font-mono text-[8px] text-white/55 flex flex-col gap-1.5 overflow-y-auto no-scrollbar text-left">
        {logs.map((log, idx) => (
          <div key={idx} className={log.includes("Synced!") ? "text-[#5EC900] font-bold" : ""}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 6. INTERACTIVE PHONE CONTAINER ──
function InteractivePhone({ activeTabId }: { activeTabId: string }) {
  return (
    <div className="relative w-[280px] h-[520px] rounded-[38px] border-[6px] border-white/10 bg-black/80 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(102,0,255,0.15)] p-2 flex flex-col overflow-hidden z-10">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-white/10 z-30 flex items-center justify-center pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-white/20 mr-2" />
        <div className="w-8 h-1 rounded-full bg-white/20" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#050614] border border-white/5 flex flex-col relative z-20">
        {/* Gloss reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />

        {/* Dynamic Screen Content */}
        <AnimatePresence mode="wait">
          {activeTabId === "dialer" && (
            <motion.div
              key="dialer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <PhoneDialer />
            </motion.div>
          )}
          {activeTabId === "workforce" && (
            <motion.div
              key="workforce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <PhoneWorkforce />
            </motion.div>
          )}
          {activeTabId === "handoffs" && (
            <motion.div
              key="handoffs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <PhoneHandoffs />
            </motion.div>
          )}
          {activeTabId === "optimization" && (
            <motion.div
              key="optimization"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <PhoneOptimization />
            </motion.div>
          )}
          {activeTabId === "integrations" && (
            <motion.div
              key="integrations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <PhoneIntegrations />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/20 z-30 pointer-events-none" />
    </div>
  );
}

export function OneAICapabilities() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const activeTab = TABS[activeTabIdx];

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-background">
      <ModernBackground 
        blobColors={{
          top: "from-[#6600FF]/15 to-transparent",
          bottom: "from-[#5EC900]/10 to-transparent",
          center: "from-[#00C8D4]/5 to-transparent"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-bold tracking-widest uppercase">System Architecture</span>
          <span className="w-8 h-px bg-primary" />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white"
          >
            System <span className="text-primary">Capabilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-lg text-white/55 leading-relaxed"
          >
            Explore our state-of-the-art voice dialer infrastructure, smart qualification system, CRM handoffs, and real-time optimization.
          </motion.p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex justify-center mb-12 px-4 md:px-0">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 p-1.5 rounded-2xl md:rounded-full bg-[#07091a]/80 border border-white/5 backdrop-blur-md">
            {TABS.map((tab, idx) => {
              const TabIcon = tab.icon;
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: `1px solid ${tab.color}35`,
                        boxShadow: `0 0 20px ${tab.color}15`
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <TabIcon className="w-4 h-4 shrink-0" style={{ color: isActive ? tab.color : undefined }} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents Panel */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Tab Content Info */}
              <div className="lg:col-span-7 flex flex-col justify-center rounded-2xl bg-[#07091a] border border-white/5 shadow-2xl relative overflow-hidden">
                {/* Visual Glow */}
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-[80px] pointer-events-none z-0"
                  style={{ backgroundColor: activeTab.color }}
                />

                {/* Tab Image Banner */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id + "-img"}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative w-full h-44 shrink-0 overflow-hidden"
                  >
                    <img
                      src={(activeTab as typeof activeTab & { image: string }).image}
                      alt={activeTab.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Dark overlay to keep text legible below */}
                    <div className="absolute inset-0 bg-[#07091a]/50" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, transparent 30%, #07091a 100%)`,
                      }}
                    />
                    {/* Colored accent stripe on image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${activeTab.color}1A 0%, transparent 55%)`,
                      }}
                    />
                    {/* Corner bracket decoration */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl" style={{ borderColor: activeTab.color }} />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr" style={{ borderColor: activeTab.color }} />
                    {/* Tab label on the image */}
                    <span
                      className="absolute bottom-3 left-4 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-sm"
                      style={{ borderColor: `${activeTab.color}40`, backgroundColor: `${activeTab.color}15`, color: activeTab.color }}
                    >
                      {activeTab.name}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Text content below image */}
                <div className="relative z-10 flex flex-col flex-1 p-8 lg:p-10 pt-5">
                  <h3 className="text-3xl font-extrabold text-white mb-2">{activeTab.title}</h3>
                  <h4 className="text-base font-semibold text-white/50 mb-6">{activeTab.subtitle}</h4>

                  {/* Bullets List */}
                  <ul className="space-y-4 mb-8">
                    {activeTab.bullets.map((bullet, index) => {
                      const [title, desc] = bullet.split(": ");
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${activeTab.color}15` }}
                          >
                            <Check className="w-3.5 h-3.5" style={{ color: activeTab.color }} />
                          </div>
                          <div className="text-sm leading-relaxed text-white/60">
                            <strong className="text-white font-semibold">{title}:</strong> {desc}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Highlight/Metric Box */}
                  <div className="mt-auto p-4 rounded-xl border border-white/5 flex items-center gap-3 bg-white/2">
                    <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: activeTab.color }} />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/40">Core Performance:</span>
                    <span className="text-sm font-bold text-white ml-auto">{activeTab.highlight}</span>
                  </div>
                </div>
              </div>

              {/* Tab Content Visual / Interactive Phone Mockup */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 rounded-2xl bg-[#07091a]/40 border border-white/5 shadow-2xl relative overflow-hidden min-h-[580px]">
                {/* Tech Grid Backdrop */}
                <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none font-mono text-[8px] leading-tight break-all p-4 text-white z-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="mb-1">
                      {`0x${(i * 12345).toString(16).toUpperCase()}: SYS_ROUTE_ACTIVE [NODE_${activeTab.id.toUpperCase()}]`}
                    </div>
                  ))}
                </div>

                {/* Glassy Interactive Phone */}
                <InteractivePhone activeTabId={activeTab.id} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
