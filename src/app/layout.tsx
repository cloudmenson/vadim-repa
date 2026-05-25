import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CookieBanner } from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://logistics-pro.example.com"),
  title: {
    default: "Logistics Pro | Global Freight & Supply Chain Solutions",
    template: "%s | Logistics Pro",
  },
  description:
    "Expert logistics and freight forwarding services worldwide. Reliable road, air, and ocean transport solutions for modern businesses.",
  keywords: [
    "logistics",
    "freight forwarding",
    "shipping",
    "supply chain",
    "cargo",
    "international transport",
  ],
  authors: [{ name: "Logistics Pro Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://logistics-pro.example.com",
    siteName: "Logistics Pro",
    title: "Logistics Pro | Global Freight Solutions",
    description: "Reliable and efficient logistics services for your business.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Logistics Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Pro | Global Freight Solutions",
    description: "Reliable and efficient logistics services for your business.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-neutral-950 text-neutral-50 antialiased"
        )}
      >
        <ScrollProgress />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
