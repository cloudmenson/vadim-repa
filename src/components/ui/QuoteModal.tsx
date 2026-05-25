"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "Road Freight",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

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

    // Reset after success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", service: "Road Freight", message: "" });
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
            className="fixed inset-0 z-[60] bg-neutral-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[70] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-900 p-8 shadow-2xl overflow-hidden"
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
                  <div className="h-20 w-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-blue-500" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Success!</h3>
                  <p className="text-neutral-400">Your request has been sent. We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Get a Freight Quote</h3>
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">Response within 2 hours</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-full p-2 hover:bg-white/5 transition-colors cursor-pointer outline-none"
                    >
                      <X className="h-6 w-6 text-neutral-400" />
                    </button>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className={cn(
                            "w-full rounded-xl border bg-neutral-800 px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20",
                            errors.name ? "border-red-500/50" : "border-white/5 focus:border-blue-500/50"
                          )}
                        />
                        {errors.name && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className={cn(
                            "w-full rounded-xl border bg-neutral-800 px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20",
                            errors.email ? "border-red-500/50" : "border-white/5 focus:border-blue-500/50"
                          )}
                        />
                        {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Service Type</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-white/5 bg-neutral-800 px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option>Road Freight</option>
                        <option>Air Cargo</option>
                        <option>Ocean Freight</option>
                        <option>Warehousing</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your requirements..."
                        className={cn(
                          "w-full rounded-xl border bg-neutral-800 px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 resize-none",
                          errors.message ? "border-red-500/50" : "border-white/5 focus:border-blue-500/50"
                        )}
                      />
                      {errors.message && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-black text-white hover:bg-blue-500 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          Send Request <Send className="h-4 w-4" />
                        </>
                      )}
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
