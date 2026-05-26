"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  route: string;
  type: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  route?: string;
  type?: string;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    route: "",
    type: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    
    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (phoneClean.length < 9) {
      newErrors.phone = "Невірний формат";
    }

    if (!formData.route.trim()) newErrors.route = "Маршрут обов'язковий";
    if (!formData.type.trim()) newErrors.type = "Тип вантажу обов'язковий";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        phone: "",
        route: "",
        type: "",
      });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#003366]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[70] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-10 shadow-2xl overflow-hidden border-t-8 border-brand-light-blue"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-brand-blue uppercase tracking-tight mb-2">
                    Дякуємо!
                  </h3>
                  <p className="text-neutral-500 font-medium">
                    Ваша заявка успішно надіслана. Ми зв&apos;яжемося з вами найближчим часом.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-black text-brand-blue uppercase tracking-tight">
                        Розрахунок вартості
                      </h3>
                      <p className="text-xs font-bold text-brand-light-blue uppercase tracking-widest mt-1">
                        Відповідь протягом 2 годин
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-neutral-100 transition-colors cursor-pointer outline-none"
                    >
                      <X className="h-6 w-6 text-neutral-400" />
                    </button>
                  </div>

                  <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8">
                      <div className="relative">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1.5">
                          Ваше ім&apos;я
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={cn(
                            "w-full bg-neutral-50 border px-4 py-3 text-sm outline-none transition-all focus:ring-1 focus:ring-brand-light-blue text-neutral-900 placeholder:text-neutral-400 font-medium",
                            errors.name ? "border-red-500" : "border-neutral-200 focus:border-brand-light-blue"
                          )}
                          placeholder="Іван Іванов"
                        />
                        {errors.name && <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase whitespace-nowrap">{errors.name}</p>}
                      </div>
                      <div className="relative">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1.5">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={cn(
                            "w-full bg-neutral-50 border px-4 py-3 text-sm outline-none transition-all focus:ring-1 focus:ring-brand-light-blue text-neutral-900 placeholder:text-neutral-400 font-medium",
                            errors.phone ? "border-red-500" : "border-neutral-200 focus:border-brand-light-blue"
                          )}
                          placeholder="+38 (0XX) XXX XX XX"
                        />
                        {errors.phone && <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase whitespace-nowrap">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1.5">
                        Звідки / Куди
                      </label>
                      <input
                        type="text"
                        value={formData.route}
                        onChange={(e) =>
                          setFormData({ ...formData, route: e.target.value })
                        }
                        className={cn(
                          "w-full bg-neutral-50 border px-4 py-3 text-sm outline-none focus:border-brand-light-blue transition-all text-neutral-900 font-medium",
                          errors.route ? "border-red-500" : "border-neutral-200 focus:border-brand-light-blue"
                        )}
                        placeholder="Київ - Варшава"
                      />
                      {errors.route && <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase whitespace-nowrap">{errors.route}</p>}
                    </div>

                    <div className="relative">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1.5">
                        Тип вантажу
                      </label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        className={cn(
                          "w-full bg-neutral-50 border px-4 py-3 text-sm outline-none focus:border-brand-light-blue transition-all text-neutral-900 font-medium",
                          errors.type ? "border-red-500" : "border-neutral-200 focus:border-brand-light-blue"
                        )}
                        placeholder="Продукти харчування"
                      />
                      {errors.type && <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase whitespace-nowrap">{errors.type}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue py-4 font-black text-white hover:bg-brand-light-blue transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest text-sm mt-4"
                    >
                      {isSubmitting ? "Надсилаємо..." : "Отримати розрахунок"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
