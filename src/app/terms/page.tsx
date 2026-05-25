import { LegalLayout } from "@/components/ui/legal/LegalLayout";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Terms of Service">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Acceptance of Terms</h2>
          <p>
            By accessing or using LogiPro services, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. Service Provision</h2>
          <p>
            We reserve the right to modify or discontinue any part of our logistics network 
            without prior notice to ensure optimal performance.
          </p>
        </section>
        <p className="text-sm italic">Last updated: May 25, 2026</p>
      </LegalLayout>
      <Footer />
    </>
  );
}
