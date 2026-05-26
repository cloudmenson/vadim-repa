"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Dictionary } from "@/i18n/dictionaries";
import { useMenu } from "@/lib/context/MenuContext";
import { handleSmoothScroll } from "@/lib/utils/scroll";

/* ── Constants ─────────────────────────────────────────── */
const PHONE_1 = { display: "+380 (96) 780 42 47", href: "tel:+380967804247" };
const PHONE_2 = { display: "+380 077 024 00 73", href: "tel:+380770240073" };
const EMAIL = "vva-logistic@ukr.net";

/* ─────────────────────────────────────────────────────────
 * Header
 * ───────────────────────────────────────────────────────── */
export function Header({ lang, dict }: { lang: string; dict: Dictionary }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useMenu();
  const pathname = usePathname();

  const isSubPage = pathname !== `/${lang}` && pathname !== `/${lang}/`;

  const navigation = [
    { name: dict.header.nav.home, href: "#hero" },
    { name: dict.header.nav.services, href: "#services" },
    { name: dict.header.nav.about, href: "#about" },
    { name: dict.header.nav.advantages, href: "#why-us" },
    { name: dict.header.nav.process, href: "#process" },
    { name: dict.header.nav.contacts, href: "#contact" },
  ];

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#") && !isSubPage) handleSmoothScroll(e, href);
  };

  const openQuote = () => {
    setMobileMenuOpen(false);
    setIsQuoteOpen(true);
  };

  const isHeaderWhite = isScrolled || mobileMenuOpen || isSubPage;

  return (
    <>
      {/* ── Fixed header bar ── */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isHeaderWhite
            ? "bg-white py-3 border-b border-black/5 shadow-sm"
            : "bg-transparent py-4 lg:py-6",
        )}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="VVA-logistic"
                className={cn(
                  "h-full w-auto transition-all duration-300",
                  isHeaderWhite ? "brightness-100" : "brightness-0 invert",
                )}
              />
            </div>
          </Link>

          {/* ── Desktop navigation ── */}
          <div className="hidden xl:flex items-center gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={isSubPage ? `/${lang}${item.href}` : item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative text-[12px] font-black uppercase tracking-wider transition-colors group",
                  isHeaderWhite
                    ? "text-brand-gray hover:text-brand-blue"
                    : "text-white/80 hover:text-white",
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-light-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div
              className={cn(
                "flex items-center gap-4 pl-5 ml-1 border-l",
                isHeaderWhite ? "border-black/10" : "border-white/20",
              )}
            >
              <LanguageSwitcher currentLang={lang} isScrolled={isHeaderWhite} />
              <a
                href={PHONE_1.href}
                className={cn(
                  "text-sm font-black transition-colors whitespace-nowrap",
                  isHeaderWhite ? "text-brand-blue" : "text-white",
                )}
              >
                {PHONE_1.display}
              </a>
              <button
                onClick={openQuote}
                className="rounded-full bg-brand-light-blue px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-brand-blue hover:shadow-lg active:scale-95 cursor-pointer"
              >
                {dict.header.calculate}
              </button>
            </div>
          </div>

          {/* ── Mobile: phone icon + hamburger ── */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={PHONE_1.href}
              aria-label="Call us"
              className={cn(
                "p-2.5 rounded-full transition-colors",
                isHeaderWhite
                  ? "bg-brand-blue/5 text-brand-blue"
                  : "bg-white/10 text-white",
              )}
            >
              <Phone className="h-4.5 w-4.5" />
            </a>

            <button
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2.5 rounded-full transition-colors cursor-pointer",
                isHeaderWhite
                  ? "bg-brand-blue/5 text-brand-blue"
                  : "bg-white/10 text-white",
              )}
            >
              {/* Simple icon swap — no nested AnimatePresence */}
              {mobileMenuOpen ? (
                <X className="h-4.5 w-4.5" />
              ) : (
                <Menu className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      <MobileMenu
        id="mobile-menu"
        isOpen={mobileMenuOpen}
        navigation={navigation}
        dict={dict}
        lang={lang}
        isSubPage={isSubPage}
        onNavClick={handleNavClick}
        onQuoteOpen={openQuote}
      />

      {/* ── Quote modal ── */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        dict={dict.hero.form}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
 * MobileMenu — completely standalone, zero dependencies
 * on parent scroll/overflow logic.
 * ───────────────────────────────────────────────────────── */
interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  navigation: { name: string; href: string }[];
  dict: Dictionary;
  lang: string;
  isSubPage: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onQuoteOpen: () => void;
}

function MobileMenu({
  id,
  isOpen,
  navigation,
  dict,
  lang,
  isSubPage,
  onNavClick,
  onQuoteOpen,
}: MobileMenuProps) {
  /* iOS-reliable scroll lock: saves scrollY, sets position:fixed on body */
  const savedScroll = useRef(0);

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
        overflow: "",
        position: "",
        width: "",
        top: "",
      });
      window.scrollTo({ top: savedScroll.current, behavior: "instant" });
    }

    return () => {
      Object.assign(document.body.style, {
        overflow: "",
        position: "",
        width: "",
        top: "",
      });
    };
  }, [isOpen]);

  /* Overlay variants — full panel slides down from top */
  const panelVariants = {
    hidden: { opacity: 0, y: "-6%", scale: 0.98 },
    visible: {
      opacity: 1,
      y: "0%",
      scale: 1,
      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: {
      opacity: 0,
      y: "-4%",
      scale: 0.98,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as const },
    },
  };

  /* Stagger for nav items */
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
    exit: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: [0.16, 1, 0.3, 1] as const, duration: 0.38 },
    },
    exit: { opacity: 0 },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.32, duration: 0.3 } },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-white flex flex-col xl:hidden overflow-y-auto overscroll-contain"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          {/* ── Top spacer (matches header height) ── */}
          <div className="h-16 sm:h-20 shrink-0" />

          {/* ── Navigation list ── */}
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 px-5 sm:px-8 pt-4 pb-6"
          >
            {navigation.map((item, idx) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  href={isSubPage ? `/${lang}${item.href}` : item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="flex items-center justify-between py-4 sm:py-5 border-b border-neutral-100 group"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-black text-brand-light-blue tracking-widest tabular-nums select-none">
                      0{idx + 1}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue uppercase group-active:text-brand-light-blue transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-brand-light-blue opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity text-xl">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* ── Footer section ── */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-5 sm:px-8 pt-4 pb-8 space-y-5"
            style={{
              paddingBottom: "max(2rem, env(safe-area-inset-bottom, 2rem))",
            }}
          >
            {/* Divider */}
            <div className="w-full h-px bg-neutral-100" />

            {/* Language switcher row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                {dict.header.lang_label}
              </span>
              <LanguageSwitcher currentLang={lang} isScrolled={true} />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-neutral-100" />

            {/* Contact block */}
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
                {dict.header.contact_label}
              </p>
              <a
                href={PHONE_1.href}
                className="flex items-center gap-2.5 text-xl sm:text-2xl font-black text-brand-blue active:text-brand-light-blue transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-light-blue shrink-0" />
                {PHONE_1.display}
              </a>
              <a
                href={PHONE_2.href}
                className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-brand-blue/70 active:text-brand-light-blue transition-colors pl-6"
              >
                {PHONE_2.display}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 text-sm font-bold text-brand-light-blue active:underline mt-1"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
            </div>

            {/* CTA */}
            <button
              onClick={onQuoteOpen}
              className="w-full bg-brand-blue text-white font-black text-base uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-brand-blue/20 active:scale-[0.98] transition-all"
            >
              {dict.header.calculate}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
