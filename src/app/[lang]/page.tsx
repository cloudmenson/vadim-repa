import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Trust } from "@/components/sections/Trust";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'uk');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "name": "VVA-logistic",
    "image": "https://vva-logistic.com/og-image.jpg",
    "description": dict.hero.description,
    "url": "https://vva-logistic.com",
    "telephone": "+380975299495",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kyiv",
      "addressCountry": "UA"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header lang={lang} dict={dict.header} />
      <main>
        <Hero dict={dict.hero} />
        <WhyUs />
        <Services dict={dict.services} />
        <Process />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
