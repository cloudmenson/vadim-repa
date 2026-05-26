"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

/* ── Shared input class (16 px min to prevent iOS auto-zoom) ── */
const inputBase =
  "w-full bg-neutral-50 border px-4 py-3 text-base outline-none transition-all " +
  "focus:ring-1 focus:ring-brand-light-blue text-neutral-900 " +
  "placeholder:text-neutral-400 font-medium rounded-none appearance-none";

/* ── Framer Motion variants ── */
const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const panelVariants: Variants = {
  hidden:  { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", damping: 28, stiffness: 320 },
  },
  exit:    { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.18 } },
};

export function QuoteModal({ isOpen, onClose, dict }: QuoteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", from: "", to: "", type: "", info: "",
  });
  const [errors, setErrors]         = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess]       = useState(false);
  const savedScroll                   = useRef(0);

  /* ── iOS scroll lock ──────────────────────────────────────────
   * overflow:hidden alone doesn't work on iOS Safari.
   * position:fixed + saved scrollY is the reliable fix.
   * ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      savedScroll.current = window.scrollY;
      Object.assign(document.body.style, {
        overflow: "hidden",
        position: "fixed",
        width: "100%",
        top: `-${savedScroll.current}px`,
      });
    } else {
      Object.assign(document.body.style, {
        overflow: "", position: "", width: "", top: "",
      });
      window.scrollTo({ top: savedScroll.current, behavior: "instant" });
    }
    return () => {
      Object.assign(document.body.style, {
        overflow: "", position: "", width: "", top: "",
      });
    };
  }, [isOpen]);

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ── Validation ── */
  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim())  errs.name  = dict.required;
    const digits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) errs.phone = dict.required;
    else if (digits.length < 9) errs.phone = dict.invalid_phone;
    if (!formData.from.trim())  errs.from  = dict.required;
    if (!formData.to.trim())    errs.to    = dict.required;
    if (!formData.type.trim())  errs.type  = dict.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setFormData({ name: "", phone: "", from: "", to: "", type: "", info: "" });
      setErrors({});
      setTimeout(() => { setSuccess(false); onClose(); }, 3200);
    } catch {
      /* silently revert button */
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", phone: "", from: "", to: "", type: "", info: "" });
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 z-60 bg-[#001a33]/80 backdrop-blur-sm"
          />

          {/*
           * ── Centering wrapper ──────────────────────────────────────
           *
           * This is a fixed full-screen flex container.
           * It handles the layout; the panel itself needs no transforms.
           *
           *  Mobile  (< sm): items-end → panel sticks to the bottom
           *  Desktop (≥ sm): items-center justify-center → panel is centered
           *
           * WHY NOT top-1/2 -translate-y-1/2 on the panel?
           *   Framer Motion writes transforms via inline style, which
           *   overrides CSS-class transforms. Result: top:50% without
           *   compensation → modal hangs off the bottom of the screen.
           *   Using a flex wrapper avoids any transform conflict entirely.
           * ──────────────────────────────────────────────────────── */}
          <div className="fixed inset-0 z-70 flex items-end sm:items-center sm:justify-center sm:p-6 pointer-events-none">
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={dict.title}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "pointer-events-auto",
                "w-full bg-white shadow-2xl",
                /* border accent */
                "border-t-4 sm:border-t-8 border-brand-light-blue",
                /* shape: rounded top on mobile, sharp on desktop */
                "rounded-t-2xl sm:rounded-none",
                /* sizing: full-width bottom-sheet on mobile, fixed on desktop */
                "sm:max-w-xl",
                /* scroll: internal scroll when content > viewport */
                "overflow-y-auto overscroll-contain",
                /* height caps — single Tailwind value + CSS override for svh */
                "max-h-[88vh] sm:max-h-[85vh]",
              )}
              /* The CSS override for svh is handled inline below */
              style={{ maxHeight: "min(88svh, 88vh)" }}
            >
              {/* Drag handle (mobile only) */}
              <div className="flex justify-center pt-3 pb-0 sm:hidden">
                <div className="w-10 h-1 rounded-full bg-neutral-200" />
              </div>

              <div className="p-5 sm:p-10">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    /* ── Success ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
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
                    /* ── Form ── */
                    <motion.div key="form" exit={{ opacity: 0, y: -8 }}>
                      {/* Header row */}
                      <div className="flex items-start justify-between mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-black text-brand-blue uppercase tracking-tight pr-4">
                          {dict.title}
                        </h3>
                        <button
                          onClick={handleClose}
                          aria-label="Close modal"
                          className="p-2 -mr-1 hover:bg-neutral-100 transition-colors rounded-lg shrink-0 cursor-pointer"
                        >
                          <X className="h-5 w-5 text-neutral-400" />
                        </button>
                      </div>

                      <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit} noValidate>
                        {/* Name + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7">
                          <Field label={dict.name} error={errors.name}>
                            <input
                              type="text"
                              autoComplete="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className={cn(inputBase, errors.name ? "border-red-400" : "border-neutral-200 focus:border-brand-light-blue")}
                            />
                          </Field>
                          <Field label={dict.phone} error={errors.phone}>
                            <input
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className={cn(inputBase, errors.phone ? "border-red-400" : "border-neutral-200 focus:border-brand-light-blue")}
                            />
                          </Field>
                        </div>

                        {/* From + To */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7">
                          <Field label={dict.from} error={errors.from}>
                            <input
                              type="text"
                              value={formData.from}
                              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                              className={cn(inputBase, errors.from ? "border-red-400" : "border-neutral-200 focus:border-brand-light-blue")}
                            />
                          </Field>
                          <Field label={dict.to} error={errors.to}>
                            <input
                              type="text"
                              value={formData.to}
                              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                              className={cn(inputBase, errors.to ? "border-red-400" : "border-neutral-200 focus:border-brand-light-blue")}
                            />
                          </Field>
                        </div>

                        {/* Type + Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7">
                          <Field label={dict.type} error={errors.type}>
                            <input
                              type="text"
                              value={formData.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                              className={cn(inputBase, errors.type ? "border-red-400" : "border-neutral-200 focus:border-brand-light-blue")}
                            />
                          </Field>
                          <Field label={dict.info}>
                            <input
                              type="text"
                              value={formData.info}
                              onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                              className={cn(inputBase, "border-neutral-200 focus:border-brand-light-blue")}
                            />
                          </Field>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-blue py-4 font-black text-white hover:bg-brand-light-blue transition-all active:scale-[0.98] disabled:opacity-60 uppercase tracking-widest text-sm mt-2 shadow-xl shadow-brand-blue/20 cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? <><Spinner />{dict.submitting}</> : dict.button}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Field wrapper ── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
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

/* ── Spinner ── */
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path  className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
