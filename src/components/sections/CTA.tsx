"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-brand-light-blue to-brand-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6 px-4">
            Потрібне міжнародне перевезення?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 lg:mb-12 max-w-2xl mx-auto font-medium px-4">
            Отримайте розрахунок вартості вже сьогодні та переконайтесь у наших перевагах
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-brand-blue font-black px-8 lg:px-12 py-5 lg:py-6 text-lg lg:text-xl uppercase tracking-widest transition-all shadow-2xl active:scale-95"
          >
            Залишити заявку
          </button>
        </motion.div>
      </div>
    </section>
  );
}
