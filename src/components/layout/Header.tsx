"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Ship, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { QuoteModal } from "@/components/ui/QuoteModal";

const navigation = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Stats", href: "#stats" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-neutral-950/70 backdrop-blur-xl py-3 border-b border-white/5"
            : "bg-transparent py-6",
        )}
      >
        <nav className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group relative z-[60]">
            <div className="relative">
              <Ship className="h-8 w-8 text-blue-500 transition-transform group-hover:scale-110" />
              <div className="absolute -inset-1 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              LOGIPRO
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 transition-all group-hover:w-full" />
              </Link>
            ))}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="relative overflow-hidden rounded-full bg-blue-600 px-7 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white relative z-[60] cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </nav>

        {/* Mobile Nav Overlay */}
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[55] flex flex-col bg-neutral-950 md:hidden"
            >
              <div className="flex flex-col h-full p-8 pt-32">
                <div className="flex flex-col gap-10">
                  {navigation.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-6xl font-black tracking-tighter text-neutral-500 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto mb-10"
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsQuoteOpen(true);
                    }}
                    className="w-full rounded-2xl bg-blue-600 py-6 text-2xl font-black text-white shadow-2xl shadow-blue-500/20 active:scale-[0.98] transition-transform"
                  >
                    Get a Quote
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
