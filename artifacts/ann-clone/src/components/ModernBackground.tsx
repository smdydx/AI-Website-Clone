import { motion } from "framer-motion";

interface ModernBackgroundProps {
  blobColors?: {
    top?: string;
    bottom?: string;
    center?: string;
  };
  gridOpacity?: number;
}

export function ModernBackground({ 
  blobColors = {
    top: "from-[#6600FF]/10 to-transparent",
    bottom: "from-[#00C8D4]/10 to-transparent",
    center: "from-[#EFA758]/5 to-transparent"
  },
  gridOpacity = 0.25
}: ModernBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Glow Orb 1 - Top Left */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-10, 30, -10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${blobColors.top} blur-[120px] opacity-75`}
      />

      {/* Glow Orb 2 - Bottom Right */}
      <motion.div
        animate={{
          x: [20, -30, 20],
          y: [30, -10, 30],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tr ${blobColors.bottom} blur-[130px] opacity-80`}
      />

      {/* Glow Orb 3 - Center moving */}
      <motion.div
        animate={{
          scale: [0.85, 1.1, 0.85],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-r ${blobColors.center} blur-[100px] opacity-50`}
      />

      {/* Modern Grid Blueprint Overlay */}
      <div 
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" 
      />

      {/* Tech Dots Grid Overlay */}
      <div 
        style={{ opacity: gridOpacity * 0.5 }}
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_80%,transparent_100%)]" 
      />
    </div>
  );
}
