import { useEffect, useRef } from "react";

interface Char {
  x: number; y: number;
  char: string;
  opacity: number;
  size: number;
  color: string;
  timer: number;
  interval: number;
}

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}|/\\.,:;!?";
const COLORS = ["#6600FF", "#5EC900", "#ffffff", "#8844ff", "#44aaff"];

export function ParticleBackground({
  mouseRef,
}: {
  mouseRef?: React.RefObject<{ x: number; y: number }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const charsRef = useRef<Char[]>([]);
  const frameRef = useRef<number>(0);
  const localMouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initChars();
    };

    const initChars = () => {
      const isMobile = window.innerWidth < 768;
      const spacing = isMobile ? 60 : 35;
      const density = isMobile ? 0.2 : 0.35;
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);
      const chars: Char[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > density) continue;
          chars.push({
            x: c * spacing + Math.random() * 10,
            y: r * spacing + Math.random() * 10,
            char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
            opacity: Math.random() * 0.10 + 0.04,
            size: Math.random() * 5 + 10,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            timer: Math.floor(Math.random() * 120),
            interval: Math.floor(Math.random() * 100 + 60),
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
    const FRAME_INTERVAL = 1000 / 30; // Cap at 30fps for performance

    const draw = (timestamp: number) => {
      frameRef.current = requestAnimationFrame(draw);

      // Throttle to 30fps
      const delta = timestamp - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orb1A += 0.0012; orb2A += 0.0009;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Soft ambient orbs
      const o1x = cx + Math.cos(orb1A) * cx * 0.3;
      const o1y = cy + Math.sin(orb1A) * cy * 0.22;
      const g1 = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, 320);
      g1.addColorStop(0, "rgba(102,0,255,0.07)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const o2x = cx + Math.cos(orb2A) * cx * 0.26;
      const o2y = cy + Math.sin(orb2A * 1.3) * cy * 0.18;
      const g2 = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, 260);
      g2.addColorStop(0, "rgba(0,140,200,0.04)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse torch/shadow glow on canvas
      const mx = (mouseRef?.current ?? localMouse.current).x;
      const my = (mouseRef?.current ?? localMouse.current).y;
      if (mx > 0 && my > 0) {
        const tg = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
        tg.addColorStop(0, "rgba(102,0,255,0.22)");
        tg.addColorStop(0.6, "rgba(102,0,255,0.07)");
        tg.addColorStop(1, "transparent");
        ctx.fillStyle = tg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw chars with torch boost near mouse
      const torchRadius = 220;
      const torchRadiusSq = torchRadius * torchRadius;
      const hasMouse = mx > 0 && my > 0;

      charsRef.current.forEach((ch) => {
        ch.timer++;
        if (ch.timer >= ch.interval) {
          ch.char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          ch.timer = 0;
        }

        let alpha = ch.opacity;
        if (hasMouse) {
          const dx = ch.x - mx;
          const dy = ch.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < torchRadiusSq) {
            const boost = 1 - Math.sqrt(distSq) / torchRadius;
            alpha = Math.min(ch.opacity + boost * 0.85, 0.95);
          }
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = ch.color;
        ctx.font = `${ch.size}px 'Courier New', monospace`;
        ctx.fillText(ch.char, ch.x, ch.y);
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
