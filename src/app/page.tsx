import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "name": "Logistics Pro",
    "image": "https://logistics-pro.example.com/og-image.jpg",
    "description": "Expert logistics and freight forwarding services worldwide.",
    "url": "https://logistics-pro.example.com",
    "telephone": "+1234567890",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Logistics Way",
      "addressLocality": "Global City",
      "postalCode": "12345",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Stats />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
