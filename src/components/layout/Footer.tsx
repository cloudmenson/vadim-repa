"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Globe, Share2, MessageCircle } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";
import { handleSmoothScroll } from "@/lib/utils/scroll";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'uk';
  const isSubPage = pathname !== `/${lang}` && pathname !== `/${lang}/`;

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && !isSubPage) {
      handleSmoothScroll(e, href);
    }
  };

  return (
    <footer id="contact" className="bg-[#001a33] text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="space-y-6">
            <Link href={`/${lang}`} className="flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="VVA-logistic Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-xl font-black tracking-tight">
                VVA-logistic
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium">
              {dict.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-light-blue transition-colors rounded-full">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-light-blue transition-colors rounded-full">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-light-blue transition-colors rounded-full">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8">{dict.nav}</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#hero` : "#hero"} 
                  onClick={(e) => handleFooterLinkClick(e, "#hero")}
                  className="hover:text-white transition-colors"
                >
                  Головна
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#services` : "#services"} 
                  onClick={(e) => handleFooterLinkClick(e, "#services")}
                  className="hover:text-white transition-colors"
                >
                  Послуги
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#about` : "#about"} 
                  onClick={(e) => handleFooterLinkClick(e, "#about")}
                  className="hover:text-white transition-colors"
                >
                  Про нас
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#why-us` : "#why-us"} 
                  onClick={(e) => handleFooterLinkClick(e, "#why-us")}
                  className="hover:text-white transition-colors"
                >
                  Переваги
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#process` : "#process"} 
                  onClick={(e) => handleFooterLinkClick(e, "#process")}
                  className="hover:text-white transition-colors"
                >
                  Як ми працюємо
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8">{dict.services}</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#services` : "#services"} 
                  onClick={(e) => handleFooterLinkClick(e, "#services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Міжнародні перевезення
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#services` : "#services"} 
                  onClick={(e) => handleFooterLinkClick(e, "#services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Збірні вантажі
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#services` : "#services"} 
                  onClick={(e) => handleFooterLinkClick(e, "#services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Митні документи
                </Link>
              </li>
              <li>
                <Link 
                  href={isSubPage ? `/${lang}#services` : "#services"} 
                  onClick={(e) => handleFooterLinkClick(e, "#services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ADR вантажі
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8">{dict.contacts}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-light-blue shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+380975299495" className="block hover:text-brand-light-blue transition-colors font-bold">+38 (097) 529 94 95</a>
                  <a href="tel:+380960229918" className="block hover:text-brand-light-blue transition-colors font-bold">+38 (096) 022 99 18</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-light-blue shrink-0" />
                <a href="mailto:vva-logistic@ukr.net" className="hover:text-brand-light-blue transition-colors font-bold">vva-logistic@ukr.net</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-light-blue shrink-0" />
                <span className="text-white/60 text-sm font-medium">{dict.city}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 VVA-logistic. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
