import { LegalLayout } from "@/components/ui/legal/LegalLayout";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <LegalLayout title={lang === 'uk' ? "Політика конфіденційності" : "Privacy Policy"}>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">1. Information Collection</h2>
        <p>
          We collect information you provide directly to us, such as when you fill out our quote 
          request form or contact us via email.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">2. Use of Information</h2>
        <p>
          The information we collect is used to provide, maintain, and improve our services, 
          and to communicate with you about your shipments.
        </p>
      </section>
      <p className="text-sm italic">Last updated: May 26, 2026</p>
    </LegalLayout>
  );
}
