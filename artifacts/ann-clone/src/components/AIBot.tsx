import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const BOT_RESPONSES: Record<string, string> = {
  hello: "Hey there! I'm AXON, AiSence's AI assistant. I can help you explore our AI Voice Agent platform. What would you like to know?",
  hi: "Hi! I'm AXON. Ask me anything about AiSence's AI Voice Agents!",
  pricing: "We have 3 plans: Starter (500 calls/month), Pro at $299/mo (unlimited + warm transfers), and Enterprise (custom pricing + API). Which one interests you?",
  features: "AiSence offers AI-powered outbound & inbound calling, lead qualification, warm call transfers, CRM sync, and A/B script testing.",
  how: "Set up your campaign → Configure your AI voice agent → Upload leads → Launch calls. AiSence handles qualification and transfers automatically!",
  start: "Click 'Get Started' in the header to schedule a demo. Our team will set up your first campaign!",
  quality: "AiSence's AI voices have near-zero latency (<500ms) and sound completely human. Trained for natural sales conversations.",
  style: "Multiple voice options available — different accents, tones, and speaking styles optimized for your industry.",
  api: "Yes! Our Enterprise plan includes full REST API access, webhooks, and CRM integrations. Perfect for scaling teams.",
  blog: "Check out our Blog page for case studies, conversion tips, and the latest AiSence platform updates!",
  shop: "Visit our Shop page to explore AI agent templates, custom voice packs, and campaign add-ons.",
  contact: "You can reach us via the Contacts page — email, phone, or just use me, AXON, for instant answers!",
  default: "Great question! AiSence's AI voice agents automate your phone campaigns and boost conversions. Want to know about pricing, features, or how to get started?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return BOT_RESPONSES.default;
}

const SUGGESTIONS = ["What can AiSence do?", "Pricing plans?", "How do I start?", "Book a demo"];

const RobotFace = ({ isThinking }: { isThinking: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6600FF] via-[#00C8D4] to-[#5EC900] opacity-25 blur-md" />
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
      {/* Outer cyber ring */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#axon-grad)" strokeWidth="2" strokeDasharray="12 6 3 6" className="animate-[spin_25s_linear_infinite]" />
      
      {/* Inner cyber ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke="#6600FF" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_12s_linear_infinite_reverse]" opacity="0.5" />
      
      {/* Glowing center sphere */}
      <circle cx="50" cy="50" r="18" fill="url(#axon-sphere)" className="animate-pulse" style={{ animationDuration: isThinking ? "1s" : "3s" }} />
      
      {/* Sparkle/Core in center */}
      <path d="M50 42 L52 48 L58 50 L52 52 L50 58 L48 52 L42 50 L48 48 Z" fill="#ffffff" className={isThinking ? "animate-ping" : ""} />
      
      <defs>
        <linearGradient id="axon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6600FF" />
          <stop offset="50%" stopColor="#00C8D4" />
          <stop offset="100%" stopColor="#5EC900" />
        </linearGradient>
        <radialGradient id="axon-sphere" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a29bfe" />
          <stop offset="50%" stopColor="#6600FF" />
          <stop offset="100%" stopColor="#0d001f" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export function AIBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! I'm AXON — AiSence's AI assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const botY = useMotionValue(0);
  const springY = useSpring(botY, { stiffness: 25, damping: 7 });

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.04;
      botY.set(Math.sin(t) * 9);
    }, 30);
    return () => clearInterval(interval);
  }, [botY]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(msg) }]);
    }, 800 + Math.random() * 500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[340px] rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_60px_rgba(102,0,255,0.2)] bg-[#07091a] flex flex-col"
            style={{ maxHeight: "480px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-primary/10">
              <div className="w-8 h-8 shrink-0"><RobotFace isThinking={thinking} /></div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">AXON</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <p className="text-xs text-white/50">AiSence AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "280px" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 shrink-0 mt-0.5"><RobotFace isThinking={false} /></div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white/5 text-white/85 rounded-tl-sm"
                      : "bg-primary text-white rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-7 h-7 shrink-0"><RobotFace isThinking={true} /></div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    {[0,1,2].map((i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ y: [0,-5,0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-primary hover:text-primary text-white/50 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2 p-3 border-t border-white/5">
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AXON anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors" />
              <button type="submit" disabled={!input.trim() || thinking}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Button */}
      <motion.button
        style={{ y: springY }}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-20 h-20 focus:outline-none"
        data-testid="button-ai-bot"
      >
        {/* Pulse rings */}
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6600FF] to-[#00C8D4] opacity-20 blur-md pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00C8D4] to-[#5EC900] opacity-10 blur-md pointer-events-none" />

        {/* Body */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#13072e]/90 to-[#05010f]/95 backdrop-blur-xl border border-primary/40 p-2.5 shadow-[0_0_35px_rgba(102,0,255,0.3)] hover:shadow-[0_0_50px_rgba(102,0,255,0.55)] transition-all duration-300">
          <RobotFace isThinking={false} />
        </div>

        {/* Notification */}
        {!open && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-background flex items-center justify-center">
            <span className="text-[9px] font-bold text-background">1</span>
          </motion.div>
        )}

        {/* Tooltip — left side since bot is on right */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-[88px] top-1/2 -translate-y-1/2 bg-[#0a0020] border border-primary/40 rounded-xl px-3 py-1.5 whitespace-nowrap pointer-events-none"
            >
              <p className="text-xs font-bold text-white">Chat with AXON</p>
              <p className="text-[10px] text-white/50">AI Assistant</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-3 h-3 rotate-45 bg-[#0a0020] border-r border-t border-primary/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
