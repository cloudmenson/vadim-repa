"use client";

import { motion } from "framer-motion";
import { Globe, Truck, FileCheck, Shield, AlertTriangle, Package } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";

export function Services({ dict }: { dict: Dictionary["services"] }) {
  const services = [
    {
      icon: Truck,
      title: dict.items.intl.title,
      description: dict.items.intl.desc,
    },
    {
      icon: Package,
      title: dict.items.groupage.title,
      description: dict.items.groupage.desc,
    },
    {
      icon: Globe,
      title: dict.items.imp_exp.title,
      description: dict.items.imp_exp.desc,
    },
    {
      icon: FileCheck,
      title: dict.items.customs.title,
      description: dict.items.customs.desc,
    },
    {
      icon: AlertTriangle,
      title: dict.items.adr.title,
      description: dict.items.adr.desc,
    },
    {
      icon: Shield,
      title: dict.items.support.title,
      description: dict.items.support.desc,
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-light-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue uppercase tracking-tight mb-4 px-4">
            {dict.title}
          </h2>
          <div className="h-1.5 w-20 sm:w-24 bg-brand-light-blue mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-6 sm:p-8 bg-white border border-neutral-100 hover:bg-brand-blue transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/20 cursor-default h-full flex flex-col"
            >
              <div className="mb-6 text-brand-light-blue group-hover:text-white transition-colors duration-500">
                <service.icon className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-brand-blue group-hover:text-white mb-4 uppercase tracking-tight transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 group-hover:text-white/80 leading-relaxed transition-colors duration-500 font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
