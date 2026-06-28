import { useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDoorProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  color?: string;
  direction?: "horizontal" | "vertical" | "iris";
}

export function SectionDoor({
  children,
  className = "",
  delay = 0,
  color = "#050913",
  direction = "horizontal",
}: SectionDoorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const [complete, setComplete] = useState(false);

  const transition = {
    duration: 1.0,
    delay,
    ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
  };

  const handleAnimationComplete = () => {
    setComplete(true);
  };

  if (direction === "iris") {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        {children}
        <motion.div
          initial={{ clipPath: "circle(120% at 50% 50%)" }}
          animate={inView ? { clipPath: "circle(0% at 50% 50%)" } : { clipPath: "circle(120% at 50% 50%)" }}
          transition={transition}
          onAnimationComplete={handleAnimationComplete}
          className="absolute inset-0 z-40 pointer-events-none"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }

  if (direction === "vertical") {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        {children}
        <motion.div
          initial={{ scaleY: 1, transformOrigin: "top" }}
          animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
          transition={transition}
          onAnimationComplete={handleAnimationComplete}
          className="absolute inset-0 z-40 pointer-events-none"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        initial={{ x: "0%" }}
        animate={inView ? { x: "-100%" } : { x: "0%" }}
        transition={transition}
        onAnimationComplete={handleAnimationComplete}
        className="absolute top-0 bottom-0 left-0 right-1/2 z-40 pointer-events-none"
        style={{ backgroundColor: color, borderRight: "1px solid rgba(102,0,255,0.3)" }}
      />
      <motion.div
        initial={{ x: "0%" }}
        animate={inView ? { x: "100%" } : { x: "0%" }}
        transition={transition}
        className="absolute top-0 bottom-0 left-1/2 right-0 z-40 pointer-events-none"
        style={{ backgroundColor: color, borderLeft: "1px solid rgba(102,0,255,0.3)" }}
      />
      <motion.div
        initial={{ opacity: 1 }}
        animate={inView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.7 }}
        className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay }}
          className="h-px w-24 bg-primary"
        />
      </motion.div>
    </div>
  );
}
