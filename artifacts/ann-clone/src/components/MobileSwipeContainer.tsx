import { ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeCards } from "@/hooks/use-swipe-cards";

interface MobileSwipeContainerProps {
  children: ReactNode[];
  dotColor?: string;
  dotColors?: string[];
  className?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function MobileSwipeContainer({
  children,
  dotColor = "#6600FF",
  dotColors,
  className = "",
}: MobileSwipeContainerProps) {
  const directionRef = useRef(0);
  const totalCards = children.length;

  const { activeIndex, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, goTo } =
    useSwipeCards({ totalCards });

  // Track direction for animation
  const prevIndexRef = useRef(activeIndex);
  if (prevIndexRef.current !== activeIndex) {
    directionRef.current = activeIndex > prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = activeIndex;
  }

  const currentDotColor = dotColors ? dotColors[activeIndex] || dotColor : dotColor;

  return (
    <div className={`md:hidden ${className}`}>
      {/* Swipeable card area */}
      <div
        className="relative overflow-hidden pt-6"
        style={{ minHeight: "280px" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <AnimatePresence initial={false} custom={directionRef.current} mode="wait">
          <motion.div
            key={activeIndex}
            custom={directionRef.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {children[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalCards }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative p-1"
            aria-label={`Go to card ${i + 1}`}
          >
            <motion.div
              animate={{
                width: i === activeIndex ? 24 : 8,
                backgroundColor:
                  i === activeIndex ? currentDotColor : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          </button>
        ))}
      </div>

      {/* Swipe hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-white/40 mt-3 flex items-center justify-center gap-1.5"
      >
        <motion.span
          animate={{ x: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ←
        </motion.span>
        Swipe to explore
        <motion.span
          animate={{ x: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.p>
    </div>
  );
}
