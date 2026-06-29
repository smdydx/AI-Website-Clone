import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const BOT_RESPONSES: Record<string, string> = {
  hello: "Hey there! I'm AXON. Ask me anything about AiSence's AI Voice Agents!",
  hi: "Hi! I'm AXON — AiSence's AI assistant. What would you like to know?",
  pricing: "3 plans: Starter (500 calls/month), Pro at $299/mo (unlimited + warm transfers), Enterprise (custom pricing + API).",
  features: "AiSence offers AI-powered outbound & inbound calling, lead qualification, warm transfers, CRM sync, and A/B script testing.",
  how: "Configure your AI voice agent → Upload leads → Launch calls. Done automatically!",
  start: "Click 'Get Started' in the header — schedule a demo with our team!",
  quality: "Near-zero latency (<500ms) AI voices that sound completely human. Trained for natural sales conversations.",
  style: "Multiple voice options: different accents, tones, and speaking styles optimized for your industry!",
  api: "Enterprise plan includes full REST API access, webhooks, and CRM integrations.",
  blog: "Visit our Blog for case studies, conversion tips, and the latest AiSence updates!",
  shop: "Check the Shop for AI agent templates, voice packs, and campaign add-ons.",
  contact: "Reach us via the Contacts page — email, phone, or just ask me!",
  default: "Great question! AiSence's AI voice agents automate phone campaigns and boost conversions. Want to know about pricing, features, or how to start?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return BOT_RESPONSES.default;
}

const SUGGESTIONS = ["Features?", "Pricing?", "How to start?", "Book a demo"];

function FullBodyRobot({ isWalking, isThinking, facingLeft }: {
  isWalking: boolean; isThinking: boolean; facingLeft: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)", transition: "transform 0.2s" }}
    >
      {/* ANTENNA */}
      <rect x="44" y="2" width="12" height="10" rx="3" fill="#1a0533" stroke="#6600FF" strokeWidth="1.5" />
      <circle cx="50" cy="2" r="3" fill="#6600FF" className="robot-eye-idle" />

      {/* HEAD */}
      <rect x="28" y="12" width="44" height="36" rx="9" fill="#1a0533" stroke="#6600FF" strokeWidth="1.8" />

      {/* Eyes */}
      <circle cx="40" cy="28" r="7" fill="#0d001f" stroke="#6600FF" strokeWidth="1.2" />
      <circle cx="60" cy="28" r="7" fill="#0d001f" stroke="#6600FF" strokeWidth="1.2" />
      <circle cx="40" cy="28" r="3.5" fill="#6600FF" className={isThinking ? "robot-eye-thinking" : "robot-eye-idle"} />
      <circle cx="60" cy="28" r="3.5" fill="#6600FF" className={isThinking ? "robot-eye-thinking" : "robot-eye-idle"} style={{ animationDelay: "0.2s" }} />
      <circle cx="41" cy="26.5" r="1.3" fill="white" opacity="0.8" />
      <circle cx="61" cy="26.5" r="1.3" fill="white" opacity="0.8" />

      {/* Mouth */}
      <rect x="35" y="40" width="30" height="5" rx="2.5" fill="#0d001f" stroke="#5EC900" strokeWidth="1.2" />
      {[37, 42, 47, 52, 57].map((x, i) => (
        <rect key={x} x={x} y="41.5" width="3" height="2" rx="0.8" fill="#5EC900"
          className="robot-led" style={{ animationDelay: `${i * 0.1}s`, animationDuration: isThinking ? "0.25s" : "0.7s" }} />
      ))}

      {/* NECK */}
      <rect x="43" y="48" width="14" height="9" rx="3" fill="#1a0533" stroke="#6600FF" strokeWidth="1.2" />

      {/* BODY */}
      <rect x="20" y="57" width="60" height="50" rx="8" fill="#1a0533" stroke="#6600FF" strokeWidth="1.8" />
      <rect x="29" y="64" width="42" height="30" rx="5" fill="#0d001f" stroke="#6600FF" strokeWidth="1" />
      <circle cx="50" cy="79" r="8" fill="#0d001f" stroke="#6600FF" strokeWidth="1.2" />
      <circle cx="50" cy="79" r="5" fill="#6600FF" className="robot-eye-idle" />
      <circle cx="50" cy="79" r="2" fill="white" opacity="0.7" />
      <line x1="33" y1="70" x2="42" y2="70" stroke="#6600FF" strokeWidth="0.8" opacity="0.5" />
      <line x1="58" y1="70" x2="67" y2="70" stroke="#6600FF" strokeWidth="0.8" opacity="0.5" />
      {[32, 39, 46, 53, 60].map((x, i) => (
        <rect key={x} x={x} y="88" width="5" height="3" rx="1" fill="#5EC900"
          className="robot-led" style={{ animationDelay: `${i * 0.08}s` }} />
      ))}

      {/* LEFT ARM */}
      <g style={{
        transformOrigin: "12px 63px",
        transform: isWalking ? undefined : "rotate(4deg)",
        animation: isWalking ? "walkArm 0.5s ease-in-out infinite alternate" : "idleArm 3s ease-in-out infinite",
      }}>
        <rect x="5" y="59" width="14" height="36" rx="7" fill="#1a0533" stroke="#6600FF" strokeWidth="1.5" />
        <circle cx="12" cy="97" r="7" fill="#1a0533" stroke="#6600FF" strokeWidth="1.2" />
        <circle cx="12" cy="97" r="3" fill="#6600FF" className="robot-eye-idle" />
      </g>

      {/* RIGHT ARM */}
      <g style={{
        transformOrigin: "88px 63px",
        animation: isWalking ? "walkArmR 0.5s ease-in-out infinite alternate" : "idleArmR 3s ease-in-out infinite",
      }}>
        <rect x="81" y="59" width="14" height="36" rx="7" fill="#1a0533" stroke="#6600FF" strokeWidth="1.5" />
        <circle cx="88" cy="97" r="7" fill="#1a0533" stroke="#6600FF" strokeWidth="1.2" />
        <circle cx="88" cy="97" r="3" fill="#6600FF" className="robot-eye-idle" style={{ animationDelay: "0.5s" }} />
      </g>

      {/* LEFT LEG */}
      <g style={{
        transformOrigin: "33px 107px",
        animation: isWalking ? "walkLeg 0.5s ease-in-out infinite alternate" : "idleLeg 3s ease-in-out infinite",
      }}>
        <rect x="24" y="107" width="18" height="32" rx="7" fill="#1a0533" stroke="#6600FF" strokeWidth="1.5" />
        <rect x="20" y="135" width="24" height="10" rx="4" fill="#1a0533" stroke="#6600FF" strokeWidth="1.2" />
      </g>

      {/* RIGHT LEG */}
      <g style={{
        transformOrigin: "67px 107px",
        animation: isWalking ? "walkLegR 0.5s ease-in-out infinite alternate" : "idleLegR 3s ease-in-out infinite",
      }}>
        <rect x="58" y="107" width="18" height="32" rx="7" fill="#1a0533" stroke="#6600FF" strokeWidth="1.5" />
        <rect x="56" y="135" width="24" height="10" rx="4" fill="#1a0533" stroke="#6600FF" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function CursorBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! I'm AXON. Click me to chat!" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevX = useRef(0);
  const walkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });

  // Smooth lerp-based following using RAF — lighter than spring
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (e.clientX < prevX.current) setFacingLeft(true);
      else if (e.clientX > prevX.current) setFacingLeft(false);
      prevX.current = e.clientX;
      setIsWalking(true);
      if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
      walkTimerRef.current = setTimeout(() => setIsWalking(false), 350);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.10);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.10);
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  const sendMessage = useCallback((text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(msg) }]);
    }, 800 + Math.random() * 400);
  }, [input]);

  const OFFSET_X = -40;
  const OFFSET_Y = -148;

  return (
    <>
      {/* Robot body layer — pointer-events: none so it doesn't block clicks */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 80,
          height: 124,
          transform: `translate(${pos.x + OFFSET_X}px, ${pos.y + OFFSET_Y}px)`,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Shadow glow under feet */}
        <div style={{
          position: "absolute",
          bottom: -4,
          left: "50%",
          transform: "translateX(-50%)",
          width: 56,
          height: 10,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(102,0,255,0.55) 0%, transparent 70%)",
          filter: "blur(3px)",
          animation: "robotGlow 2s ease-in-out infinite",
        }} />
        <FullBodyRobot isWalking={isWalking} isThinking={thinking} facingLeft={facingLeft} />
      </div>

      {/* Invisible click zone on top of robot */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 80,
          height: 124,
          transform: `translate(${pos.x + OFFSET_X}px, ${pos.y + OFFSET_Y}px)`,
          zIndex: 9999,
          cursor: "pointer",
          willChange: "transform",
        }}
      />

      {/* Chat panel — fixed bottom right */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", bottom: 24, right: 24, zIndex: 10000, width: 340 }}
            className="rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_60px_rgba(102,0,255,0.22)] bg-[#07091a] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-primary/10">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#0a0020] border border-primary/60 p-1.5 shadow-[0_0_14px_rgba(102,0,255,0.5)]">
                <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
                  <rect x="10" y="18" width="80" height="52" rx="10" fill="#1a0533" stroke="#6600FF" strokeWidth="2.5" />
                  <circle cx="35" cy="40" r="9" fill="#0d001f" stroke="#6600FF" strokeWidth="1.5" />
                  <circle cx="65" cy="40" r="9" fill="#0d001f" stroke="#6600FF" strokeWidth="1.5" />
                  <circle cx="35" cy="40" r="4.5" fill="#6600FF" className="robot-eye-idle" />
                  <circle cx="65" cy="40" r="4.5" fill="#6600FF" className="robot-eye-idle" style={{ animationDelay: "0.2s" }} />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">AXON</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <p className="text-xs text-white/50">AI Assistant · Following your cursor</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 260 }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[9px] font-bold text-primary">AX</div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot" ? "bg-white/5 text-white/85 rounded-tl-sm" : "bg-primary text-white rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 shrink-0 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[9px] font-bold text-primary">AX</div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    {[0,1,2].map((i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ y: [0,-4,0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i*0.12 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-primary hover:text-primary text-white/50 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2 p-3 border-t border-white/5">
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AXON..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors" />
              <button type="submit" disabled={!input.trim() || thinking}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-all hover:scale-110 disabled:opacity-40 shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
