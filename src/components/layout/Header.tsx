"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Dictionary } from "@/i18n/dictionaries";
import { useMenu } from "@/lib/context/MenuContext";

export function Header({ lang, dict }: { lang: string; dict: Dictionary }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useMenu();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const pathname = usePathname();

  // Detect if we are on a subpage (anything other than /[lang])
  const isSubPage = pathname !== `/${lang}` && pathname !== `/${lang}/`;

  const navigation = [
    { name: dict.header.nav.home, href: `/${lang}#hero` },
    { name: dict.header.nav.services, href: `/${lang}#services` },
    { name: dict.header.nav.about, href: `/${lang}#about` },
    { name: dict.header.nav.advantages, href: `/${lang}#why-us` },
    { name: dict.header.nav.process, href: `/${lang}#process` },
    { name: dict.header.nav.contacts, href: `/${lang}#contact` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  // Handle anchor link clicks to close mobile menu
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isHeaderWhite = isScrolled || mobileMenuOpen || isSubPage;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isHeaderWhite
            ? "bg-white py-3 border-b border-black/5 shadow-sm"
            : "bg-transparent py-4 lg:py-6",
        )}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 relative z-[70]">
          <Link
            href={`/${lang}`}
            className="flex items-center group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative h-10 sm:h-12 lg:h-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="VVA-logistic Logo"
                className={cn(
                  "h-25 w-auto transition-all duration-300",
                  isHeaderWhite ? "brightness-100" : "brightness-0 invert",
                )}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-6 mr-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative text-[13px] font-bold uppercase tracking-wider transition-colors group",
                    isHeaderWhite
                      ? "text-brand-gray hover:text-brand-blue"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-light-blue transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div
              className={cn(
                "flex items-center gap-4 pl-6 border-l",
                isHeaderWhite ? "border-black/10" : "border-white/20",
              )}
            >
              <LanguageSwitcher currentLang={lang} isScrolled={isHeaderWhite} />
              <a
                href="tel:+380975299495"
                className={cn(
                  "text-sm font-black transition-colors whitespace-nowrap",
                  isHeaderWhite ? "text-brand-blue" : "text-white",
                )}
              >
                +38 (097) 529 94 95
              </a>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="rounded-full bg-brand-light-blue px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-brand-blue hover:shadow-lg active:scale-95 cursor-pointer outline-none"
              >
                {dict.header.calculate}
              </button>
            </div>
          </div>

          {/* Tablet/Mobile Action & Toggle */}
          <div className="flex xl:hidden items-center gap-4">
            <a
              href="tel:+380975299495"
              className={cn(
                "p-2 rounded-full transition-colors",
                isHeaderWhite
                  ? "bg-brand-blue/5 text-brand-blue"
                  : "bg-white/10 text-white",
              )}
            >
              <Phone className="h-5 w-5" />
            </a>

            <button
              className={cn(
                "relative p-2 -mr-2 cursor-pointer outline-none transition-colors",
                isHeaderWhite ? "text-brand-blue" : "text-white",
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] flex flex-col bg-white xl:hidden overflow-y-auto"
            >
              <div className="flex flex-col min-h-full p-6 pt-28 pb-10">
                <div className="flex flex-col gap-1">
                  {navigation.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                    >
                      <Link
                        href={item.href}
                        className="block py-4 text-3xl sm:text-4xl font-black tracking-tight text-brand-blue active:text-brand-light-blue transition-colors border-b border-neutral-50"
                        onClick={handleLinkClick}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto pt-10 flex flex-col gap-8"
                >
                  <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
                      Мова / Language
                    </span>
                    <LanguageSwitcher currentLang={lang} isScrolled={true} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 px-1">
                      Зв&apos;язок з нами
                    </span>
                    <a
                      href="tel:+380975299495"
                      className="text-2xl font-black text-brand-blue px-1"
                    >
                      +38 (097) 529 94 95
                    </a>
                    <a
                      href="mailto:vva-logistic@ukr.net"
                      className="text-lg font-bold text-brand-light-blue px-1"
                    >
                      vva-logistic@ukr.net
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsQuoteOpen(true);
                    }}
                    className="w-full rounded-2xl bg-brand-blue py-5 text-xl font-black text-white shadow-xl shadow-brand-blue/20 active:scale-[0.98] transition-all"
                  >
                    {dict.header.calculate}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        dict={dict.hero.form}
      />
    </>
  );
}
