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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-neutral-950/70 backdrop-blur-xl py-3"
            : "bg-transparent py-6",
        )}
      >
        <nav className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group">
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
              className="relative overflow-hidden rounded-full bg-blue-600 px-7 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full overflow-hidden bg-neutral-900/95 backdrop-blur-lg border-b border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-6 p-8">
                {navigation.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-bold text-neutral-300 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="mt-4 rounded-xl bg-blue-600 px-6 py-4 text-center font-bold text-white"
                >
                  Get a Quote
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
