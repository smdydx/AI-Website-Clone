import { useEffect, useRef } from "react";

export function TorchLight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    let rafId = 0;
    let latestX = -1;
    let latestY = -1;
    let scheduled = false;

    const updateStyle = () => {
      scheduled = false;
      if (latestX < 0) {
        el.style.background = "transparent";
      } else {
        el.style.background = `radial-gradient(circle 350px at ${latestX}px ${latestY}px, rgba(102,0,255,0.3) 0%, rgba(102,0,255,0.08) 60%, transparent 100%)`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(updateStyle);
      }
    };
    const onMouseLeave = () => {
      latestX = -1;
      latestY = -1;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(updateStyle);
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        willChange: "background",
      }}
    />
  );
}
