"use client";

import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, UserCheck, CreditCard, FileText } from "lucide-react";

const advantages = [
  {
    icon: Truck,
    title: "2000+ перевірених авто",
    description: "Транспорт під будь-який тип вантажу",
  },
  {
    icon: Clock,
    title: "Швидка доставка",
    description: "Оптимізовані маршрути без затримок",
  },
  {
    icon: FileText,
    title: "Повний супровід",
    description: "Документи, митниця, контроль доставки",
  },
  {
    icon: ShieldCheck,
    title: "Безпечне перевезення",
    description: "Страхування та контроль вантажу",
  },
  {
    icon: UserCheck,
    title: "Персональний менеджер",
    description: "Підтримка клієнта 24/7",
  },
  {
    icon: CreditCard,
    title: "Вигідні тарифи",
    description: "Прозорі ціни без прихованих платежів",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue uppercase tracking-tight mb-4 px-4">
            Чому клієнти обирають VVA-logistic
          </h2>
          <div className="h-1.5 w-20 sm:w-24 bg-brand-light-blue mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 sm:p-8 border border-neutral-100 bg-neutral-50 hover:bg-white hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-light-blue group-hover:h-full transition-all duration-500" />
              <div className="mb-6 inline-block p-4 bg-white text-brand-light-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500 shadow-sm">
                <adv.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-brand-blue mb-3 uppercase tracking-tight">
                {adv.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-medium">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
