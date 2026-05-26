import { LegalLayout } from "@/components/ui/legal/LegalLayout";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/dictionaries";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'uk');

  return (
    <>
      <Header lang={lang} dict={dict.header} />
      <LegalLayout title={lang === 'uk' ? "Політика Cookie" : "Cookie Policy"}>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">1. What are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device that help us analyze site traffic 
            and remember your preferences.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">2. Your Choices</h2>
          <p>
            You can choose to disable cookies through your browser settings, though some features 
            of our platform may not function correctly.
          </p>
        </section>
        <p className="text-sm italic">Last updated: May 26, 2026</p>
      </LegalLayout>
      <Footer dict={dict.footer} />
    </>
  );
}
