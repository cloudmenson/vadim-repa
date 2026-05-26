"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    from: "",
    to: "",
    type: "",
    info: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    video.play().catch(() => {
      /* Autoplay blocked — poster frame shows instead */
    });

    const handleTimeUpdate = () => {
      const { duration, currentTime } = video;
      if (duration > 0 && duration - currentTime < 0.2) {
        setVideoOpacity(0);
      } else {
        setVideoOpacity(1);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = dict.form.required;

    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = dict.form.required;
    } else if (phoneClean.length < 9) {
      newErrors.phone = dict.form.invalid_phone;
    }

    if (!formData.from.trim()) newErrors.from = dict.form.required;
    if (!formData.to.trim()) newErrors.to = dict.form.required;
    if (!formData.type.trim()) newErrors.type = dict.form.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setIsSuccess(true);
      setFormData({ name: "", phone: "", from: "", to: "", type: "", info: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      /* Could add toast error here */
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Shared input style — 16px base to prevent iOS auto-zoom */
  const inputCls = (field: string) =>
    cn(
      "w-full px-4 py-3 bg-neutral-50 border text-base font-medium",
      "text-neutral-900 placeholder:text-neutral-400",
      "outline-none transition-all appearance-none rounded-none",
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-neutral-100 focus:border-[#0066cc]"
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
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

  const avatars = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
  ];

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen w-full overflow-hidden bg-[#204a77] pt-20 md:pt-28"
      >
        {/* ── Background video ── */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: videoOpacity, transition: "opacity 0.4s ease" }}
            className="h-full w-full object-cover grayscale-[0.15]"
            aria-hidden="true"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#204a77]/55" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-10 lg:py-20 flex items-center min-h-[calc(100vh-5rem)]">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 xl:gap-16 items-center w-full max-w-7xl mx-auto">

            {/* ── Left — hero copy ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter text-white leading-[0.95] mb-5"
              >
                {dict.title}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="inline-block px-3 sm:px-4 py-1.5 bg-[#0066cc] text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-8"
              >
                {dict.subtitle}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                {dict.description}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <div className="flex -space-x-3">
                  {avatars.map((src, i) => (
                    <div
                      key={i}
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#204a77] overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-white text-center sm:text-left">
                  <div className="font-black text-base sm:text-lg leading-none">
                    2000+
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-widest mt-1">
                    {dict.stats}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right — quote form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="bg-white relative w-full max-w-xl mx-auto lg:max-w-none shadow-2xl"
            >
              {/* accent bar */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0066cc]" />

              {isSuccess ? (
                <div className="py-12 text-center px-6 sm:px-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-6 ring-4 ring-green-100">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#003366] uppercase mb-2">
                    {dict.form.success}
                  </h3>
                  <p className="text-neutral-500 font-medium">
                    {dict.form.success_desc}
                  </p>
                </div>
              ) : (
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <h3 className="text-xl sm:text-2xl font-black text-[#003366] mb-6 uppercase tracking-tight">
                    {dict.form.title}
                  </h3>

                  <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                      <HeroField error={errors.name}>
                        <input
                          type="text"
                          placeholder={dict.form.name}
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={inputCls("name")}
                        />
                      </HeroField>
                      <HeroField error={errors.phone}>
                        <input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder={dict.form.phone}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={inputCls("phone")}
                        />
                      </HeroField>
                    </div>

                    {/* From + To */}
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                      <HeroField error={errors.from}>
                        <input
                          type="text"
                          placeholder={dict.form.from}
                          value={formData.from}
                          onChange={(e) =>
                            setFormData({ ...formData, from: e.target.value })
                          }
                          className={inputCls("from")}
                        />
                      </HeroField>
                      <HeroField error={errors.to}>
                        <input
                          type="text"
                          placeholder={dict.form.to}
                          value={formData.to}
                          onChange={(e) =>
                            setFormData({ ...formData, to: e.target.value })
                          }
                          className={inputCls("to")}
                        />
                      </HeroField>
                    </div>

                    {/* Type + Info */}
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                      <HeroField error={errors.type}>
                        <input
                          type="text"
                          placeholder={dict.form.type}
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className={inputCls("type")}
                        />
                      </HeroField>
                      <div>
                        <input
                          type="text"
                          placeholder={dict.form.info}
                          value={formData.info}
                          onChange={(e) =>
                            setFormData({ ...formData, info: e.target.value })
                          }
                          className={cn(
                            inputCls("info"),
                            "border-neutral-100 focus:border-[#0066cc]"
                          )}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#003366] hover:bg-[#002244] text-white font-black py-4 uppercase tracking-[0.1em] text-sm transition-all active:scale-[0.98] shadow-xl disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner />
                          {dict.form.submitting}
                        </>
                      ) : (
                        dict.form.button
                      )}
                    </button>

                    <p className="text-[9px] text-neutral-400 text-center uppercase tracking-widest">
                      {dict.form.privacy}
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        dict={dict.form}
      />
    </>
  );
}

/* ── Helpers ── */

function HeroField({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      {error && (
        <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold uppercase whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
