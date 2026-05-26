import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CookieBanner } from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VVA-logistic | Міжнародні вантажоперевезення",
  description: "Надійний партнер у міжнародних вантажоперевезеннях по Європі та Україні.",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'uk' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollProgress />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
