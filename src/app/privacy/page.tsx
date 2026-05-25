import { LegalLayout } from "@/components/ui/legal/LegalLayout";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Privacy Policy">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you request a quote or contact us for support. 
            This may include your name, email address, and company details.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our logistics services, 
            as well as to communicate with you about your shipments.
          </p>
        </section>
        <p className="text-sm italic">Last updated: May 25, 2026</p>
      </LegalLayout>
      <Footer />
    </>
  );
}
