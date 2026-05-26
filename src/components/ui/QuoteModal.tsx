"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: {
    title: string;
    name: string;
    phone: string;
    from: string;
    to: string;
    type: string;
    info: string;
    button: string;
    required: string;
    invalid_phone: string;
    success: string;
    success_desc: string;
    submitting: string;
  };
}

interface FormData {
  name: string;
  phone: string;
  from: string;
  to: string;
  type: string;
  info: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  from?: string;
  to?: string;
  type?: string;
}

/* ── Animation variants ────────────────────────────────────────── */

const mobileVariants = {
  initial: { opacity: 0, y: "100%" },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: "100%" },
} as const;

const desktopVariants = {
  initial: { opacity: 0, scale: 0.97, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit:    { opacity: 0, scale: 0.97, y: 12 },
} as const;

/* ─────────────────────────────────────────────
 * Shared input style so it stays consistent
 * and satisfies the iOS 16px font-size rule.
 * ───────────────────────────────────────────── */
const inputBase =
  "w-full bg-neutral-50 border px-4 py-3 text-base outline-none transition-all focus:ring-1 focus:ring-brand-light-blue text-neutral-900 placeholder:text-neutral-400 font-medium rounded-none appearance-none";

export function QuoteModal({ isOpen, onClose, dict }: QuoteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    from: "",
    to: "",
    type: "",
    info: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const scrollTopRef = useRef(0);

  /* Detect mobile once on mount — safe for SSR */
  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  /* ── iOS Safari scroll lock ──────────────────────────────
   * overflow:hidden alone doesn't prevent background scroll
   * on iOS. Saving scrollTop → position:fixed is the reliable fix.
   * ────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      scrollTopRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollTopRef.current}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollTopRef.current);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = dict.required;

    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = dict.required;
    } else if (phoneClean.length < 9) {
      newErrors.phone = dict.invalid_phone;
    }

    if (!formData.from.trim()) newErrors.from = dict.required;
    if (!formData.to.trim()) newErrors.to = dict.required;
    if (!formData.type.trim()) newErrors.type = dict.required;

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

      if (!res.ok) throw new Error("Failed to send");

      setIsSuccess(true);
      setFormData({ name: "", phone: "", from: "", to: "", type: "", info: "" });
      setErrors({});

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3200);
    } catch {
      /* Silently handle — user sees submitting button revert */
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setFormData({ name: "", phone: "", from: "", to: "", type: "", info: "" });
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-60 bg-[#001a33]/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/*
           * ── Modal panel ──
           *
           * Mobile  (< 640 px): slides up from bottom as a sheet.
           * Desktop (≥ 640 px): scale-fade as a centered dialog.
           *
           * max-h + overflow-y-auto prevent content being cut off
           * when the software keyboard opens on iOS.
           */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.title}
            variants={
              (isMobile ? mobileVariants : desktopVariants) as Variants
            }
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              /* Base — mobile bottom sheet */
              "fixed bottom-0 left-0 right-0 z-70",
              "w-full bg-white shadow-2xl",
              "rounded-t-2xl border-t-4 border-brand-light-blue",
              "overflow-y-auto overscroll-contain",
              /* svh/vh fallback handled in globals.css .modal-max-h */
              "modal-max-h",
              /* Desktop — centered dialog */
              "sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:right-auto",
              "sm:-translate-x-1/2 sm:-translate-y-1/2",
              "sm:max-w-xl sm:rounded-none sm:border-t-8"
            )}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
          >
            {/* Drag handle — visible only on mobile */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-neutral-200" />
            </div>

            <div className="p-5 sm:p-10 pb-safe">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-10 sm:py-14 text-center"
                  >
                    <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mb-6 ring-4 ring-green-100">
                      <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-brand-blue uppercase tracking-tight mb-2">
                      {dict.success}
                    </h3>
                    <p className="text-neutral-500 font-medium text-base">
                      {dict.success_desc}
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-black text-brand-blue uppercase tracking-tight pr-4">
                        {dict.title}
                      </h3>
                      <button
                        onClick={handleClose}
                        aria-label="Close modal"
                        className="p-2 -mr-1 hover:bg-neutral-100 transition-colors rounded-lg shrink-0"
                      >
                        <X className="h-5 w-5 text-neutral-400" />
                      </button>
                    </div>

                    <form
                      className="space-y-5 sm:space-y-6"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      {/* Name + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <Field label={dict.name} error={errors.name}>
                          <input
                            type="text"
                            autoComplete="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className={cn(
                              inputBase,
                              errors.name
                                ? "border-red-400 focus:ring-red-300"
                                : "border-neutral-200 focus:border-brand-light-blue"
                            )}
                          />
                        </Field>
                        <Field label={dict.phone} error={errors.phone}>
                          <input
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className={cn(
                              inputBase,
                              errors.phone
                                ? "border-red-400 focus:ring-red-300"
                                : "border-neutral-200 focus:border-brand-light-blue"
                            )}
                          />
                        </Field>
                      </div>

                      {/* From + To */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <Field label={dict.from} error={errors.from}>
                          <input
                            type="text"
                            value={formData.from}
                            onChange={(e) =>
                              setFormData({ ...formData, from: e.target.value })
                            }
                            className={cn(
                              inputBase,
                              errors.from
                                ? "border-red-400 focus:ring-red-300"
                                : "border-neutral-200 focus:border-brand-light-blue"
                            )}
                          />
                        </Field>
                        <Field label={dict.to} error={errors.to}>
                          <input
                            type="text"
                            value={formData.to}
                            onChange={(e) =>
                              setFormData({ ...formData, to: e.target.value })
                            }
                            className={cn(
                              inputBase,
                              errors.to
                                ? "border-red-400 focus:ring-red-300"
                                : "border-neutral-200 focus:border-brand-light-blue"
                            )}
                          />
                        </Field>
                      </div>

                      {/* Cargo type + Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <Field label={dict.type} error={errors.type}>
                          <input
                            type="text"
                            value={formData.type}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                type: e.target.value,
                              })
                            }
                            className={cn(
                              inputBase,
                              errors.type
                                ? "border-red-400 focus:ring-red-300"
                                : "border-neutral-200 focus:border-brand-light-blue"
                            )}
                          />
                        </Field>
                        <Field label={dict.info}>
                          <input
                            type="text"
                            value={formData.info}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                info: e.target.value,
                              })
                            }
                            className={cn(
                              inputBase,
                              "border-neutral-200 focus:border-brand-light-blue"
                            )}
                          />
                        </Field>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-blue py-4 font-black text-white hover:bg-brand-light-blue transition-all active:scale-[0.98] disabled:opacity-60 uppercase tracking-widest text-sm mt-2 shadow-xl shadow-brand-blue/20"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <Spinner />
                            {dict.submitting}
                          </span>
                        ) : (
                          dict.button
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Sub-components ───────────────────────── */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase whitespace-nowrap"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
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
