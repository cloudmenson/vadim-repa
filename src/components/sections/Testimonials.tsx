"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "LogiPro transformed our global supply chain. Their real-time tracking is a game-changer for our manufacturing operations.",
    author: "Sarah Chen",
    position: "COO at TechDrive Global",
  },
  {
    text: "Fastest response times in the industry. We've never had a shipment delayed since switching to their AI-optimized routing.",
    author: "Marcello Rossi",
    position: "Logistics Director at EuroStyle",
  },
  {
    text: "Sustainable shipping that actually works. Their zero-emission fleet options help us meet our corporate green targets.",
    author: "David Miller",
    position: "Founder of GreenFlow",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2"
          >
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Client Feedback</span>
            <div className="h-px w-8 bg-blue-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white"
          >
            TRUSTED BY <br /> INDUSTRY LEADERS.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 rounded-3xl bg-neutral-800 border border-white/5 flex flex-col justify-between"
            >
              <Quote className="h-10 w-10 text-blue-500/20 absolute top-8 right-8" />
              <p className="text-xl font-medium text-neutral-200 leading-relaxed mb-10 italic">
                &quot;{item.text}&quot;
              </p>
              <div>
                <p className="text-white font-black uppercase tracking-wider">{item.author}</p>
                <p className="text-blue-500 text-sm font-bold uppercase tracking-widest">{item.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
