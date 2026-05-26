"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ currentLang, isScrolled }: { currentLang: string; isScrolled: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (lang: string) => {
    // Correctly handle the path replacement
    const segments = pathname.split('/');
    segments[1] = lang;
    const newPath = segments.join('/');
    router.push(newPath, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange("uk")}
        className={cn(
          "text-[11px] font-black tracking-widest uppercase transition-all hover:scale-110 cursor-pointer outline-none",
          currentLang === "uk"
            ? (isScrolled ? "text-brand-blue border-b-2 border-brand-blue" : "text-white border-b-2 border-white")
            : (isScrolled ? "text-neutral-400" : "text-white/40")
        )}
      >
        UK
      </button>
      <span className={cn("text-[10px]", isScrolled ? "text-neutral-200" : "text-white/20")}>/</span>
      <button
        onClick={() => handleLanguageChange("en")}
        className={cn(
          "text-[11px] font-black tracking-widest uppercase transition-all hover:scale-110 cursor-pointer outline-none",
          currentLang === "en"
            ? (isScrolled ? "text-brand-blue border-b-2 border-brand-blue" : "text-white border-b-2 border-white")
            : (isScrolled ? "text-neutral-400" : "text-white/40")
        )}
      >
        EN
      </button>
    </div>
  );
}
