"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Extract number from string (e.g., "2,500+" -> 2500)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(
    spring,
    (current) => Math.round(current).toLocaleString() + suffix,
  );

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { label: "Active Clients", value: "100", suffix: "+" },
  { label: "Countries Covered", value: "85", suffix: "+" },
  { label: "Deliveries / Year", value: "1200", suffix: "" },
  { label: "Success Rate", value: "100", suffix: "%" },
];

export function Stats() {
  return (
    <section id="stats" className="relative py-32 bg-blue-600 overflow-hidden">
      {/* Decorative Graphic Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 border-4 border-white rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 text-center lg:text-left">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 border-l-2 border-white/20 pl-6 md:pl-8"
            >
              <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter whitespace-nowrap">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-blue-100 font-bold uppercase tracking-[0.3em] text-xs">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
