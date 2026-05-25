"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I track my shipment in real-time?",
    answer: "Every shipment is assigned a unique LogiLink ID. You can track its exact GPS location, temperature, and estimated arrival time through our client portal or mobile app.",
  },
  {
    question: "Do you offer international customs clearance?",
    answer: "Yes, our global network includes certified customs brokers in over 85 countries to ensure your cargo moves across borders without unnecessary delays.",
  },
  {
    question: "What is your typical response time for a quote?",
    answer: "Our automated quoting engine provides instant estimates for standard routes. For complex logistical challenges, our expert team guarantees a full quote within 2 hours.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Support Center</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8"
            >
              ANY <br /> QUESTIONS?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 text-lg leading-relaxed max-w-sm"
            >
              Everything you need to know about our global logistics services and digital platform.
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-neutral-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-lg font-bold text-white uppercase tracking-tight">{faq.question}</span>
                  {openIndex === i ? (
                    <Minus className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-blue-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
