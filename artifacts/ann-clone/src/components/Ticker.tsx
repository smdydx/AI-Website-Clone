import React from "react";

const TAGS = [
  "Smart Scheduling",
  "Task Manager",
  "Voice Control",
  "Auto Reply",
  "AI Insights",
  "Workflow",
  "Reminders",
  "Analytics",
  "Automation"
];

export function Ticker() {
  // Duplicate tags for seamless looping
  const items = [...TAGS, ...TAGS, ...TAGS, ...TAGS];

  return (
    <div className="w-full overflow-hidden py-6 border-y border-white/5 relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex w-max animate-ticker">
        {items.map((tag, i) => (
          <div key={i} className="flex items-center px-8">
            <span className="font-heading font-bold text-2xl md:text-4xl text-white/40 whitespace-nowrap uppercase tracking-wider hover:text-primary transition-colors cursor-default">
              {tag}
            </span>
            <span className="mx-8 text-accent text-2xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
