"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Advanced AI Route Optimization",
  "Real-time IoT Cargo Tracking",
  "Zero-Emission Fleet Options",
  "Global Customs Clearance",
];

export function About() {
  return (
    <section id="about" className="py-32 bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80"
                alt="Logistics Operations"
                className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/20 blur-[100px] -z-10" />
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-blue-500 rounded-2xl -z-10 rotate-12" />
          </motion.div>

          <div className="space-y-10">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Since 2012</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black tracking-tighter text-white"
              >
                PRECISION IN <br /> EVERY MILE.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-neutral-400 text-lg leading-relaxed max-w-xl"
              >
                LogiPro has been at the forefront of the logistics revolution for over a decade. 
                We combine human expertise with cutting-edge technology to create a seamless 
                shipping experience that scales with your business.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                  <span className="text-sm font-bold text-neutral-200 uppercase tracking-wide">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all"
            >
              Read Our Full Story
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
