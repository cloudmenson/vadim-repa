"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { Dictionary } from "@/i18n/dictionaries";

export function Process({ dict, formDict }: { dict: Dictionary["process"]; formDict: Dictionary["hero"]["form"] }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <section id="process" className="py-20 lg:py-32 bg-brand-blue relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4 px-4">
              {dict.title}
            </h2>
            <div className="h-1.5 w-20 sm:w-24 bg-brand-light-blue mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
            {dict.steps.map((step, idx) => (
              <div key={idx} className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="text-6xl sm:text-7xl font-black text-white/10 group-hover:text-brand-light-blue/20 transition-colors duration-500 -mb-7.5 sm:-mb-10 z-0 select-none">
                    0{idx + 1}
                  </div>
                  <div className="relative z-10 px-4">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm sm:text-base font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
                
                {idx < dict.steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 text-brand-light-blue opacity-30">
                    <ArrowDown className="-rotate-90 h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 lg:mt-24 text-center">
            <button 
              onClick={() => setIsQuoteOpen(true)}
              className="w-full sm:w-auto bg-white hover:bg-brand-light-blue hover:text-white text-brand-blue font-black px-8 lg:px-12 py-5 lg:py-6 uppercase tracking-widest text-sm sm:text-base lg:text-lg transition-all shadow-2xl active:scale-95 cursor-pointer"
            >
              {dict.button}
            </button>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} dict={formDict} />
    </>
  );
}
