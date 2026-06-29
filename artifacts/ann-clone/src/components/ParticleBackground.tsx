import { useEffect, useRef } from "react";

/* ── Character pools ─────────────────────────────────────────────── */
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

const BINARY_SEQS = ["01","10","001","110","0110","1001","0101","1010","00","11","0","1"];
const HEX_CODES   = ["0x00","0xFF","0xA1","7F3C","B4E1","0x6F","FF00","A0B1","0xC8","D400"];
const AI_KEYWORDS = ["AI","ML","GPU","API","CNN","RNN","LLM","GAN","NLP","∇","λ","∑","θ","σ","μ"];
const SYMBOLS     = ["{}","[]","</>","=>","//","/*","~~","&&","||","::",">>","<<","!=","==="];

const CHAR_COLORS = [
  "rgba(102,0,255,VAL)",
  "rgba(94,201,0,VAL)",
  "rgba(0,200,212,VAL)",
  "rgba(139,92,246,VAL)",
  "rgba(255,255,255,VAL)",
];

function pickColor(a: number) {
  return CHAR_COLORS[Math.floor(Math.random() * CHAR_COLORS.length)].replace("VAL", String(a));
}

function pickType(): Char["type"] {
  const r = Math.random();
  if (r < 0.45) return "binary";
  if (r < 0.70) return "hex";
  if (r < 0.85) return "keyword";
  return "symbol";
}

function pickText(t: Char["type"]): string {
  if (t === "binary")  return BINARY_SEQS[Math.floor(Math.random() * BINARY_SEQS.length)];
  if (t === "hex")     return HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)];
  if (t === "keyword") return AI_KEYWORDS[Math.floor(Math.random() * AI_KEYWORDS.length)];
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

/* ── Laser beam types ────────────────────────────────────────────── */
interface Beam {
  kind: "sweep" | "diagonal" | "radial";
  // sweep: horizontal scan line
  y: number;          // current Y for sweep
  speed: number;
  alpha: number;
  color: string;
  width: number;
  // diagonal
  x1: number; y1: number; x2: number; y2: number;
  life: number; maxLife: number;
  // radial
  angle: number;      // current angle (radians)
  cx: number; cy: number;
  length: number;
}

const BEAM_COLORS = [
  { r: 102, g: 0,   b: 255 },  // purple
  { r: 0,   g: 200, b: 212 },  // cyan
  { r: 94,  g: 201, b: 0   },  // green
  { r: 0,   g: 180, b: 255 },  // blue
];

function rndBeamColor(alpha: number) {
  const c = BEAM_COLORS[Math.floor(Math.random() * BEAM_COLORS.length)];
  return `rgba(${c.r},${c.g},${c.b},${alpha})`;
}

function makeBeam(W: number, H: number): Beam {
  const kind = (["sweep","diagonal","radial"] as const)[Math.floor(Math.random() * 3)];
  const base = {
    kind,
    y: Math.random() * H,
    speed: Math.random() * 0.6 + 0.25,
    alpha: Math.random() * 0.35 + 0.12,
    color: rndBeamColor(1),
    width: Math.random() * 1.2 + 0.4,
    x1: Math.random() * W, y1: Math.random() * H,
    x2: Math.random() * W, y2: Math.random() * H,
    life: 0, maxLife: Math.floor(Math.random() * 220 + 100),
    angle: Math.random() * Math.PI * 2,
    cx: Math.random() * W, cy: Math.random() * H,
    length: Math.random() * 320 + 120,
  } satisfies Beam;
  return base;
}

/* ── Node cluster (neural network dots + edges) ──────────────────── */
interface Node {
  x: number; y: number; r: number;
  vx: number; vy: number;
  color: { r: number; g: number; b: number };
  pulse: number; pulseSpeed: number;
}

function makeNode(W: number, H: number): Node {
  const c = BEAM_COLORS[Math.floor(Math.random() * BEAM_COLORS.length)];
  return {
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 2.2 + 0.8,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    color: c,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.03 + 0.01,
  };
}

/* ── Main component ──────────────────────────────────────────────── */
export function ParticleBackground({
  mouseRef,
}: {
  mouseRef?: React.RefObject<{ x: number; y: number }>;
}) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const charsRef     = useRef<Char[]>([]);
  const beamsRef     = useRef<Beam[]>([]);
  const nodesRef     = useRef<Node[]>([]);
  const frameRef     = useRef<number>(0);
  const localMouse   = useRef({ x: -9999, y: -9999 });
  const sizeRef      = useRef({ W: 0, H: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      sizeRef.current = { W: canvas.width, H: canvas.height };
      initAll();
    };

    const initAll = () => {
      const { W, H } = sizeRef.current;
      const isMobile = W < 768;

      /* Chars */
      const spacingX = isMobile ? 80 : 50;
      const spacingY = isMobile ? 60 : 42;
      const density  = isMobile ? 0.16 : 0.26;
      const cols = Math.floor(W / spacingX);
      const rows = Math.floor(H / spacingY);
      const chars: Char[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > density) continue;
          const type = pickType();
          const baseA = Math.random() * 0.09 + 0.04;
          chars.push({
            x: c * spacingX + Math.random() * 14 - 7,
            y: r * spacingY + Math.random() * 10 - 5,
            text: pickText(type), opacity: baseA,
            size: type === "keyword" ? Math.random() * 3 + 9 : Math.random() * 3 + 8,
            color: pickColor(baseA),
            timer: Math.floor(Math.random() * 150),
            interval: Math.floor(Math.random() * 120 + 80),
            glitch: false, glitchTimer: 0, type,
          });
        }
      }
      charsRef.current = chars;

      /* Beams */
      const numBeams = isMobile ? 4 : 8;
      beamsRef.current = Array.from({ length: numBeams }, () => makeBeam(W, H));

      /* Nodes */
      const numNodes = isMobile ? 18 : 38;
      nodesRef.current = Array.from({ length: numNodes }, () => makeNode(W, H));
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      localMouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let orb1A = 0; let orb2A = Math.PI;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 30;

    const draw = (timestamp: number) => {
      frameRef.current = requestAnimationFrame(draw);
      const delta = timestamp - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL);

      const { W, H } = sizeRef.current;
      ctx.clearRect(0, 0, W, H);
      orb1A += 0.0010; orb2A += 0.0007;

      /* ── Ambient orbs ───────────────────────────────────────────── */
      const cx = W / 2; const cy = H / 2;
      const o1x = cx + Math.cos(orb1A) * cx * 0.28;
      const o1y = cy + Math.sin(orb1A) * cy * 0.20;
      const g1  = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, 380);
      g1.addColorStop(0, "rgba(102,0,255,0.07)"); g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const o2x = cx + Math.cos(orb2A) * cx * 0.24;
      const o2y = cy + Math.sin(orb2A * 1.25) * cy * 0.16;
      const g2  = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, 290);
      g2.addColorStop(0, "rgba(0,200,212,0.045)"); g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      /* ── Laser beams ────────────────────────────────────────────── */
      beamsRef.current.forEach((beam, bi) => {
        ctx.save();
        ctx.globalAlpha = beam.alpha;

        if (beam.kind === "sweep") {
          /* Horizontal laser scan — moves top to bottom */
          beam.y += beam.speed;
          if (beam.y > H + 20) beam.y = -20;

          /* Main beam line */
          const lg = ctx.createLinearGradient(0, beam.y, W, beam.y);
          lg.addColorStop(0,    "transparent");
          lg.addColorStop(0.15, beam.color);
          lg.addColorStop(0.5,  beam.color.replace(",1)", ",1)"));
          lg.addColorStop(0.85, beam.color);
          lg.addColorStop(1,    "transparent");
          ctx.strokeStyle = lg;
          ctx.lineWidth = beam.width;
          ctx.beginPath();
          ctx.moveTo(0, beam.y); ctx.lineTo(W, beam.y);
          ctx.stroke();

          /* Glow halo */
          ctx.globalAlpha = beam.alpha * 0.25;
          const haloG = ctx.createLinearGradient(0, beam.y - 8, 0, beam.y + 8);
          haloG.addColorStop(0, "transparent");
          haloG.addColorStop(0.5, beam.color);
          haloG.addColorStop(1, "transparent");
          ctx.fillStyle = haloG;
          ctx.fillRect(0, beam.y - 8, W, 16);

        } else if (beam.kind === "diagonal") {
          /* Diagonal beam with limited lifespan */
          beam.life++;
          if (beam.life > beam.maxLife) {
            beamsRef.current[bi] = makeBeam(W, H);
            ctx.restore(); return;
          }

          const progress  = beam.life / beam.maxLife;
          const fade      = Math.sin(progress * Math.PI); // fade in then out
          ctx.globalAlpha = beam.alpha * fade;

          const dg = ctx.createLinearGradient(beam.x1, beam.y1, beam.x2, beam.y2);
          dg.addColorStop(0, "transparent");
          dg.addColorStop(0.3, beam.color);
          dg.addColorStop(0.7, beam.color);
          dg.addColorStop(1, "transparent");
          ctx.strokeStyle = dg;
          ctx.lineWidth = beam.width * 0.8;
          ctx.shadowColor = beam.color;
          ctx.shadowBlur  = 8;
          ctx.beginPath();
          ctx.moveTo(beam.x1, beam.y1); ctx.lineTo(beam.x2, beam.y2);
          ctx.stroke();
          ctx.shadowBlur = 0;

        } else {
          /* Radial — rotating ray from a fixed centre */
          beam.angle += 0.008;
          const rx = beam.cx + Math.cos(beam.angle) * beam.length;
          const ry = beam.cy + Math.sin(beam.angle) * beam.length;

          const rg = ctx.createLinearGradient(beam.cx, beam.cy, rx, ry);
          rg.addColorStop(0, beam.color.replace(",1)", ",0.9)"));
          rg.addColorStop(1, "transparent");
          ctx.strokeStyle = rg;
          ctx.lineWidth = beam.width * 1.1;
          ctx.shadowColor = beam.color;
          ctx.shadowBlur  = 14;
          ctx.beginPath();
          ctx.moveTo(beam.cx, beam.cy); ctx.lineTo(rx, ry);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      });

      /* ── Neural network nodes + edges ───────────────────────────── */
      const nodes = nodesRef.current;
      const CONNECT_DIST = 130;
      const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

      /* Move nodes */
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      /* Edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq > CONNECT_DIST_SQ) continue;
          const fade = 1 - Math.sqrt(dSq) / CONNECT_DIST;
          const c = nodes[i].color;
          ctx.save();
          ctx.globalAlpha = fade * 0.18;
          ctx.strokeStyle = `rgb(${c.r},${c.g},${c.b})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* Nodes (dots) */
      nodes.forEach((n) => {
        const pulseFactor = 0.7 + 0.3 * Math.sin(n.pulse);
        ctx.save();
        ctx.globalAlpha = 0.45 * pulseFactor;
        ctx.fillStyle = `rgb(${n.color.r},${n.color.g},${n.color.b})`;
        ctx.shadowColor = `rgb(${n.color.r},${n.color.g},${n.color.b})`;
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ── Mouse torch glow ───────────────────────────────────────── */
      const mx = (mouseRef?.current ?? localMouse.current).x;
      const my = (mouseRef?.current ?? localMouse.current).y;
      if (mx > 0 && my > 0) {
        const tg = ctx.createRadialGradient(mx, my, 0, mx, my, 240);
        tg.addColorStop(0,   "rgba(102,0,255,0.18)");
        tg.addColorStop(0.5, "rgba(102,0,255,0.06)");
        tg.addColorStop(1,   "transparent");
        ctx.fillStyle = tg;
        ctx.fillRect(0, 0, W, H);
      }

      /* ── Code characters ────────────────────────────────────────── */
      const torchR   = 200;
      const torchRSq = torchR * torchR;
      const hasMouse = mx > 0 && my > 0;

      charsRef.current.forEach((ch) => {
        ch.timer++;
        if (ch.timer >= ch.interval) {
          ch.text = pickText(ch.type);
          ch.timer = 0;
          if (Math.random() < 0.08) { ch.glitch = true; ch.glitchTimer = 0; }
        }
        if (ch.glitch) {
          ch.glitchTimer++;
          if (ch.glitchTimer > 6) ch.glitch = false;
        }

        let alpha = ch.opacity;
        if (hasMouse) {
          const dx = ch.x - mx; const dy = ch.y - my;
          const dSq = dx * dx + dy * dy;
          if (dSq < torchRSq) {
            alpha = Math.min(ch.opacity + (1 - Math.sqrt(dSq) / torchR) * 0.88, 0.96);
          }
        }
        if (ch.glitch) alpha = Math.min(alpha + 0.55, 0.98);

        const font = (ch.type === "keyword" || ch.type === "symbol")
          ? `${ch.size}px 'Inter',system-ui,sans-serif`
          : `${ch.size}px 'Courier New',monospace`;

        ctx.globalAlpha = alpha;
        ctx.font = font;
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
