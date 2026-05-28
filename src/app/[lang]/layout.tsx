import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/dictionaries";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VVA-logistic | Міжнародні вантажоперевезення",
  description:
    "Надійний партнер у міжнародних вантажоперевезеннях по Європі та Україні.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "uk");

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollProgress />
        <Header lang={lang} dict={dict} />
        {children}
        <Footer dict={dict.footer} />
        <CookieBanner />
      </body>
    </html>
  );
}
