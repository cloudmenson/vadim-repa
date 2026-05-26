"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  updated?: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "uk";
  const isUk = lang === "uk";

  return (
    <main className="min-h-screen bg-white">
      {/* Top accent bar */}
      <div className="h-1 bg-brand-light-blue w-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-3xl pt-28 sm:pt-32 pb-20 sm:pb-28">
        {/* Back link */}
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-brand-blue transition-colors mb-10 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          {isUk ? "На головну" : "Back to home"}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Title block */}
          <div className="mb-10 sm:mb-14 border-b border-neutral-100 pb-8">
            <div className="w-12 h-1 bg-brand-light-blue mb-5" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-blue uppercase">
              {title}
            </h1>
            {updated && (
              <p className="mt-3 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                {isUk ? "Оновлено:" : "Last updated:"} {updated}
              </p>
            )}
          </div>

          {/* Content */}
          <div
            className="space-y-10 text-neutral-600 leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
              [&_li]:text-neutral-600
              [&_strong]:text-neutral-800 [&_strong]:font-bold
              [&_a]:text-brand-light-blue [&_a]:font-medium [&_a:hover]:underline
              [&_p]:text-base"
          >
            {children}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
