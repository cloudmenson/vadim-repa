import { LegalLayout } from "@/components/ui/legal/LegalLayout";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <LegalLayout title={lang === 'uk' ? "Умови використання" : "Terms of Service"}>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the VVA-logistic website, you agree to be bound by these Terms 
          of Service and all applicable laws and regulations.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">2. Service Description</h2>
        <p>
          VVA-logistic provides international freight forwarding and logistics services. 
          All quotes provided through the website are estimates and subject to final confirmation.
        </p>
      </section>
      <p className="text-sm italic">Last updated: May 26, 2026</p>
    </LegalLayout>
  );
}
