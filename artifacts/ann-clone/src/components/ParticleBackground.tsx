import { useEffect, useRef } from "react";

interface Char {
  x: number; y: number;
  text: string;
  opacity: number;
  size: number;
  color: string;
  timer: number;
  interval: number;
  glitch: boolean;
  glitchTimer: number;
  type: "binary" | "hex" | "keyword" | "symbol";
}

// AI-themed character pools
const BINARY_SEQS = ["01", "10", "001", "110", "0110", "1001", "0101", "1010", "00", "11", "0", "1"];
const HEX_CODES   = ["0x00", "0xFF", "0xA1", "7F3C", "B4E1", "0x6F", "FF00", "A0B1", "0xC8", "D400"];
const AI_KEYWORDS = ["AI", "ML", "GPU", "API", "CNN", "RNN", "LLM", "GAN", "NLP", "∇", "λ", "∑", "θ", "σ", "μ"];
const SYMBOLS     = ["{}", "[]", "</>", "=>", "//", "/*", "~~", "&&", "||", "::", ">>", "<<", "!=", "==="];

const COLORS = [
  "rgba(102,0,255,VAL)",
  "rgba(94,201,0,VAL)",
  "rgba(0,200,212,VAL)",
  "rgba(139,92,246,VAL)",
  "rgba(255,255,255,VAL)",
];

function pickColor(baseAlpha: number) {
  const template = COLORS[Math.floor(Math.random() * COLORS.length)];
  return template.replace("VAL", String(baseAlpha));
}

function pickText(type: Char["type"]): string {
  if (type === "binary")  return BINARY_SEQS[Math.floor(Math.random() * BINARY_SEQS.length)];
  if (type === "hex")     return HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)];
  if (type === "keyword") return AI_KEYWORDS[Math.floor(Math.random() * AI_KEYWORDS.length)];
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function pickType(): Char["type"] {
  const r = Math.random();
  if (r < 0.45) return "binary";
  if (r < 0.70) return "hex";
  if (r < 0.85) return "keyword";
  return "symbol";
}

export function ParticleBackground({
  mouseRef,
}: {
  mouseRef?: React.RefObject<{ x: number; y: number }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const charsRef  = useRef<Char[]>([]);
  const frameRef  = useRef<number>(0);
  const localMouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initChars();
    };

    const initChars = () => {
      const isMobile = window.innerWidth < 768;
      const spacingX = isMobile ? 80 : 50;
      const spacingY = isMobile ? 60 : 42;
      const density  = isMobile ? 0.18 : 0.28;
      const cols = Math.floor(canvas.width  / spacingX);
      const rows = Math.floor(canvas.height / spacingY);
      const chars: Char[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > density) continue;
          const type    = pickType();
          const baseAlpha = Math.random() * 0.09 + 0.04;
          chars.push({
            x: c * spacingX + Math.random() * 14 - 7,
            y: r * spacingY + Math.random() * 10 - 5,
            text:     pickText(type),
            opacity:  baseAlpha,
            size:     type === "keyword" ? Math.random() * 3 + 9 : Math.random() * 3 + 8,
            color:    pickColor(baseAlpha),
            timer:    Math.floor(Math.random() * 150),
            interval: Math.floor(Math.random() * 120 + 80),
            glitch:      false,
            glitchTimer: 0,
            type,
          });
        }
      }
      charsRef.current = chars;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      localMouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let orb1A = 0; let orb2A = Math.PI;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 28;

    const draw = (timestamp: number) => {
      frameRef.current = requestAnimationFrame(draw);
      const delta = timestamp - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orb1A += 0.0010;
      orb2A += 0.0007;

      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;

      // Ambient orb 1 — purple sweep
      const o1x = cx + Math.cos(orb1A) * cx * 0.28;
      const o1y = cy + Math.sin(orb1A) * cy * 0.20;
      const g1  = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, 350);
      g1.addColorStop(0, "rgba(102,0,255,0.065)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ambient orb 2 — cyan sweep
      const o2x = cx + Math.cos(orb2A) * cx * 0.24;
      const o2y = cy + Math.sin(orb2A * 1.25) * cy * 0.16;
      const g2  = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, 280);
      g2.addColorStop(0, "rgba(0,200,212,0.04)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse torch glow
      const mx = (mouseRef?.current ?? localMouse.current).x;
      const my = (mouseRef?.current ?? localMouse.current).y;
      if (mx > 0 && my > 0) {
        const tg = ctx.createRadialGradient(mx, my, 0, mx, my, 240);
        tg.addColorStop(0,   "rgba(102,0,255,0.18)");
        tg.addColorStop(0.5, "rgba(102,0,255,0.06)");
        tg.addColorStop(1,   "transparent");
        ctx.fillStyle = tg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const torchRadius   = 200;
      const torchRadiusSq = torchRadius * torchRadius;
      const hasMouse = mx > 0 && my > 0;

      charsRef.current.forEach((ch) => {
        // Cycle text
        ch.timer++;
        if (ch.timer >= ch.interval) {
          ch.text  = pickText(ch.type);
          ch.timer = 0;
          // Random glitch flash
          if (Math.random() < 0.08) {
            ch.glitch      = true;
            ch.glitchTimer = 0;
          }
        }

        // Glitch decay
        if (ch.glitch) {
          ch.glitchTimer++;
          if (ch.glitchTimer > 6) ch.glitch = false;
        }

        // Alpha: base + torch boost
        let alpha = ch.opacity;
        if (hasMouse) {
          const dx     = ch.x - mx;
          const dy     = ch.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < torchRadiusSq) {
            const boost = 1 - Math.sqrt(distSq) / torchRadius;
            alpha = Math.min(ch.opacity + boost * 0.88, 0.96);
          }
        }
        if (ch.glitch) alpha = Math.min(alpha + 0.55, 0.98);

        // Pick font — monospace for binary/hex, sans for keywords
        const font = (ch.type === "keyword" || ch.type === "symbol")
          ? `${ch.size}px 'Inter', system-ui, sans-serif`
          : `${ch.size}px 'Courier New', monospace`;

        ctx.globalAlpha = alpha;
        ctx.font        = font;

        // Glitch: draw with color shift
        if (ch.glitch) {
          ctx.fillStyle = ch.type === "binary" ? "rgba(94,201,0,1)" : "rgba(102,0,255,1)";
          ctx.fillText(ch.text, ch.x + 1, ch.y);
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.fillText(ch.text, ch.x, ch.y);
        } else {
          ctx.fillStyle = ch.color;
          ctx.fillText(ch.text, ch.x, ch.y);
        }
      });

      ctx.globalAlpha = 1;
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, willChange: "contents" }}
    />
  );
}
