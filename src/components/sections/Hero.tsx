"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { QuoteModal } from "@/components/ui/QuoteModal";

export function Hero() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };

  return (
    <>
      <section className="relative h-[100vh] w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 scale-105">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover grayscale-[0.2]"
            poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-in-the-ocean-40615-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Advanced Overlay for 2026 aesthetic */}
          <div className="absolute inset-0 bg-neutral-950/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto flex h-full items-center px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-12 bg-blue-500" />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-400">
                Est. 2012 / Global Reach
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-8"
            >
              MOVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">
                FASTER.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-xl font-medium leading-relaxed"
            >
              The most advanced logistics network in the world. Real-time
              tracking, seamless integration, zero delays.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-black text-neutral-950 hover:bg-blue-500 hover:text-white transition-all active:scale-95"
              >
                Start Shipping{" "}
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 px-10 py-5 text-lg font-bold text-white hover:bg-white/10 transition-all">
                Watch Process{" "}
                <Play className="h-5 w-5 fill-current group-hover:scale-125 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 rotate-180 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
