"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[70] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-900 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">Get a Freight Quote</h3>
                <p className="text-sm text-neutral-400">Response within 2 hours</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-white/5 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/5 bg-neutral-800 px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-white/5 bg-neutral-800 px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Service Type</label>
                <select className="w-full appearance-none rounded-lg border border-white/5 bg-neutral-800 px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 transition-colors">
                  <option>Road Freight</option>
                  <option>Air Cargo</option>
                  <option>Ocean Freight</option>
                  <option>Warehousing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full rounded-lg border border-white/5 bg-neutral-800 px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-500 transition-all active:scale-[0.98]"
              >
                Send Request <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
