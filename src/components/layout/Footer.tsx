"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";
import { handleSmoothScroll } from "@/lib/utils/scroll";

/* Nav anchors — same in all locales, only labels change */
const NAV_HREFS = ["#hero", "#services", "#about", "#why-us", "#process"];


export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "uk";
  const isSubPage = pathname !== `/${lang}` && pathname !== `/${lang}/`;

  const handleFooterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#") && !isSubPage) {
      handleSmoothScroll(e, href);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-[#001a33] text-white py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0066cc 1px, transparent 1px), linear-gradient(90deg, #0066cc 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          {/* ── Logo & Desc ── */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${lang}`}
              className="inline-flex cursor-pointer"
              aria-label="VVA-logistic — на головну"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="VVA-logistic Logo"
                className="h-20 sm:h-20 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs font-medium">
              {dict.desc}
            </p>

            {/* Phone quick-dial on mobile */}
            <div className="flex flex-col gap-1 sm:hidden">
              <a
                href="tel:+380967804247"
                className="text-base font-black text-white hover:text-brand-light-blue transition-colors"
              >
                +380 (96) 780 42 47
              </a>
              <a
                href="tel:+380770240073"
                className="text-base font-black text-white hover:text-brand-light-blue transition-colors"
              >
                +380 077 024 00 73
              </a>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">
              {dict.nav}
            </h4>
            <ul className="space-y-3">
              {dict.nav_items.map((name, idx) => {
                const href = NAV_HREFS[idx] ?? "#hero";
                return (
                  <li key={idx}>
                    <Link
                      href={isSubPage ? `/${lang}${href}` : href}
                      onClick={(e) => handleFooterLinkClick(e, href)}
                      className="text-white/60 hover:text-white transition-colors text-sm font-medium inline-block"
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">
              {dict.services}
            </h4>
            <ul className="space-y-3">
              {dict.services_items.map((name) => (
                <li key={name}>
                  <button
                    onClick={(e) => {
                      if (!isSubPage) {
                        handleSmoothScroll(
                          e as unknown as React.MouseEvent<HTMLAnchorElement>,
                          "#services"
                        );
                      } else {
                        window.location.href = `/${lang}#services`;
                      }
                    }}
                    className="text-white/60 text-sm font-medium text-left cursor-pointer transition-colors duration-150 [@media(hover:hover)]:hover:text-white active:text-white"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contacts ── */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">
              {dict.contacts}
            </h4>
            <ul className="space-y-4">
              <li className="hidden sm:flex items-start gap-3">
                <Phone className="h-4 w-4 text-brand-light-blue shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:+380967804247"
                    className="block text-sm hover:text-brand-light-blue transition-colors font-bold"
                  >
                    +380 (96) 780 42 47
                  </a>
                  <a
                    href="tel:+380770240073"
                    className="block text-sm hover:text-brand-light-blue transition-colors font-bold"
                  >
                    +380 077 024 00 73
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-light-blue shrink-0" />
                <a
                  href="mailto:vva-logistic@ukr.net"
                  className="text-sm hover:text-brand-light-blue transition-colors font-bold break-all"
                >
                  vva-logistic@ukr.net
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-light-blue shrink-0 mt-0.5" />
                <span className="text-white/55 text-sm font-medium">
                  {dict.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/35 text-[11px] font-bold uppercase tracking-widest">
          <p>
            © {new Date().getFullYear()} VVA-logistic. {dict.copyright}
          </p>
          <div className="flex gap-6">
            <Link
              href={`/${lang}/terms`}
              className="hover:text-white transition-colors"
            >
              {dict.terms}
            </Link>
            <Link
              href={`/${lang}/privacy`}
              className="hover:text-white transition-colors"
            >
              {dict.privacy_policy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
