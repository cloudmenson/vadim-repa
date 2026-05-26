"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    route: "",
    type: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      video.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });

      const handleTimeUpdate = () => {
        const duration = video.duration;
        const currentTime = video.currentTime;
        
        if (duration > 0 && duration - currentTime < 0.2) {
          setVideoOpacity(0);
        } else {
          setVideoOpacity(1);
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Обов'язкове поле";
    
    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Обов'язкове поле";
    } else if (phoneClean.length < 9) {
      newErrors.phone = "Невірний формат";
    }

    if (!formData.route.trim()) newErrors.route = "Обов'язкове поле";
    if (!formData.type.trim()) newErrors.type = "Обов'язкове поле";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", phone: "", route: "", type: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };

  return (
    <>
      <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-[#204a77] pt-24 md:pt-32">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: videoOpacity }}
            className="h-full w-full object-cover grayscale-[0.2]"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Light Blue Overlay */}
          <div className="absolute inset-0 bg-[#204a77]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto flex h-full min-h-[calc(100vh-5rem)] items-center px-4 sm:px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 xl:gap-16 items-center w-full max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter text-white leading-[0.95] mb-6"
              >
                {dict.title}
              </motion.h1>
              
              <motion.div
                variants={itemVariants}
                className="inline-block px-3 sm:px-4 py-1.5 bg-[#0066cc] text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-8 lg:mb-10"
              >
                {dict.subtitle}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 lg:mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                {dict.description}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150",
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
                  ].map((img, i) => (
                    <div key={i} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#204a77] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Team" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-white text-center sm:text-left">
                  <div className="font-black text-base sm:text-lg leading-none">2000+</div>
                  <div className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-widest mt-1">{dict.stats}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl relative w-full max-w-xl mx-auto lg:max-w-none"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0066cc]" />
              {isSuccess ? (
                <div className="py-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#003366] uppercase mb-2">Дякуємо!</h3>
                  <p className="text-neutral-500 font-medium">Ми зв&apos;яжемося з вами найближчим часом.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-black text-[#003366] mb-6 sm:mb-8 uppercase tracking-tight">{dict.form.title}</h3>
                  <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder={dict.form.name} 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-2.5 sm:py-3 bg-neutral-50 border ${errors.name ? 'border-red-500' : 'border-neutral-100'} focus:border-[#0066cc] outline-none transition-all text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base font-medium`}
                        />
                        {errors.name && <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold uppercase whitespace-nowrap">{errors.name}</p>}
                      </div>
                      <div className="relative">
                        <input 
                          type="tel" 
                          placeholder={dict.form.phone} 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-4 py-2.5 sm:py-3 bg-neutral-50 border ${errors.phone ? 'border-red-500' : 'border-neutral-100'} focus:border-[#0066cc] outline-none transition-all text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base font-medium`}
                        />
                        {errors.phone && <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold uppercase whitespace-nowrap">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder={dict.form.route} 
                          value={formData.route}
                          onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                          className={`w-full px-4 py-2.5 sm:py-3 bg-neutral-50 border ${errors.route ? 'border-red-500' : 'border-neutral-100'} focus:border-[#0066cc] outline-none transition-all text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base font-medium`}
                        />
                        {errors.route && <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold uppercase whitespace-nowrap">{errors.route}</p>}
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder={dict.form.type} 
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className={`w-full px-4 py-2.5 sm:py-3 bg-neutral-50 border ${errors.type ? 'border-red-500' : 'border-neutral-100'} focus:border-[#0066cc] outline-none transition-all text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base font-medium`}
                        />
                        {errors.type && <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold uppercase whitespace-nowrap">{errors.type}</p>}
                      </div>
                    </div>
                    <div>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#003366] hover:bg-[#002244] text-white font-black py-3.5 sm:py-4 uppercase tracking-[0.1em] text-sm sm:text-base transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
                      >
                        {isSubmitting ? 'Надсилаємо...' : dict.form.button}
                      </button>
                      <p className="text-[8px] sm:text-[9px] text-neutral-400 text-center uppercase tracking-widest mt-4 sm:mt-6">
                        {dict.form.privacy}
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
