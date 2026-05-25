"use client";

import { motion } from "framer-motion";
import { Truck, Plane, Anchor, Warehouse } from "lucide-react";

const services = [
  {
    title: "Road Freight",
    description:
      "Ultra-reliable door-to-door delivery with AI-optimized routing across the continent.",
    icon: Truck,
  },
  {
    title: "Air Cargo",
    description:
      "Next-day shipping for time-critical assets with full climate control and 24/7 monitoring.",
    icon: Plane,
  },
  {
    title: "Ocean Freight",
    description:
      "Scalable sea transport solutions utilizing the next generation of eco-friendly cargo vessels.",
    icon: Anchor,
  },
  {
    title: "Warehousing",
    description:
      "Fully automated robotic distribution centers with millisecond-accurate inventory sync.",
    icon: Warehouse,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function Services() {
  return (
    <section
      id="services"
      className="relative py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">
                Core Capabilities
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white"
            >
              LOGISTICS <br /> REIMAGINED.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-md text-lg leading-relaxed"
          >
            We don't just move cargo. We architect supply chains for the
            autonomous era, ensuring your business stays ahead of the curve.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-3xl bg-neutral-900 border border-white/5 hover:border-blue-500/30 transition-colors duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-blue-500/0 group-hover:bg-blue-500/[0.02] transition-colors duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500 shadow-xl">
                  <service.icon className="h-8 w-8 text-blue-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Decorative Number */}
              <span className="absolute bottom-6 right-8 text-5xl font-black text-white/[0.02] group-hover:text-blue-500/10 transition-colors duration-500 select-none">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
