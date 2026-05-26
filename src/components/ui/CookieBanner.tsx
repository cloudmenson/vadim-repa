"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 z-100 md:left-auto md:right-8 md:max-w-md"
        >
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Privacy First</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  We use cookies to optimize your logistics experience. By continuing, you agree to our 
                  <Link href="/cookies" className="text-blue-500 hover:underline ml-1">Cookie Policy</Link>.
                </p>
              </div>
              <button onClick={() => setIsVisible(false)} className="text-neutral-500 hover:text-white transition-colors cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={accept}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
