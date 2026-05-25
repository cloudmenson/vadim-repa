"use client";

import { motion } from "framer-motion";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-neutral-950 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-12 uppercase italic">
            {title}
          </h1>
          <div className="prose prose-invert prose-neutral max-w-none space-y-8 text-neutral-400">
            {children}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
