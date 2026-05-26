"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5000+", label: "доставок" },
  { value: "300+", label: "клієнтів" },
  { value: "15+", label: "країн Європи" },
];

export function Trust() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-2xl mx-auto lg:mx-0"
          >
            <div className="aspect-[4/3] sm:aspect-video bg-neutral-100 overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
                alt="Logistics Warehouse" 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-[6px] sm:border-8 border-white/20 m-3 sm:m-4" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-48 sm:h-48 bg-brand-light-blue p-6 sm:p-8 flex flex-col justify-center items-center text-white shadow-xl z-20">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black">12+</div>
              <div className="text-[8px] sm:text-[10px] uppercase tracking-widest text-center font-bold">років досвіду</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left mt-8 lg:mt-0"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue uppercase tracking-tight mb-6 lg:mb-8 px-2 sm:px-0">
              Нам довіряють бізнеси по всій Європі
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-500 mb-8 lg:mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Ми будуємо довгострокові партнерства та гарантуємо якісний сервіс для кожного клієнта. VVA-logistic — це команда професіоналів, яка знає все про міжнародну логістику та митне оформлення.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-neutral-100 pt-8 lg:pt-12">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-light-blue mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
