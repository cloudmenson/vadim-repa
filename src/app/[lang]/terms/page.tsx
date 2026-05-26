import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/legal/LegalLayout";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "uk"
        ? "Умови використання | VVA-logistic"
        : "Terms of Service | VVA-logistic",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <LegalLayout
      title={isUk ? "Умови використання" : "Terms of Service"}
      updated={isUk ? "26 травня 2026 р." : "May 26, 2026"}
    >
      {isUk ? (
        <>
          <Section title="1. Прийняття умов">
            <p>
              Використовуючи сайт <strong>vva-logistic.com</strong>, ви
              підтверджуєте, що ознайомилися з цими Умовами використання та
              погоджуєтеся з ними. Якщо ви не згодні з будь-яким із пунктів —
              будь ласка, припиніть використання сайту.
            </p>
          </Section>

          <Section title="2. Опис послуг">
            <p>
              VVA-logistic надає послуги міжнародних вантажоперевезень
              автомобільним транспортом, митного оформлення та логістики по
              Європі та Україні.
            </p>
            <ul>
              <li>
                Розрахунки вартості на сайті є орієнтовними та потребують
                підтвердження менеджером.
              </li>
              <li>
                Остаточна вартість визначається після уточнення всіх деталей
                замовлення.
              </li>
              <li>
                Компанія залишає за собою право відмовити в наданні послуг без
                пояснення причин.
              </li>
            </ul>
          </Section>

          <Section title="3. Використання сайту">
            <p>Використовуючи цей сайт, ви зобов&apos;язуєтеся:</p>
            <ul>
              <li>надавати достовірну інформацію у формах зворотного зв&apos;язку;</li>
              <li>не здійснювати будь-яких дій, що можуть порушити роботу сайту;</li>
              <li>не використовувати сайт у протиправних цілях;</li>
              <li>
                не копіювати, не відтворювати та не поширювати матеріали сайту
                без письмової згоди компанії.
              </li>
            </ul>
          </Section>

          <Section title="4. Інтелектуальна власність">
            <p>
              Всі матеріали сайту — тексти, зображення, логотип, структура —
              є інтелектуальною власністю VVA-logistic та захищені
              законодавством України. Будь-яке використання без дозволу
              заборонено.
            </p>
          </Section>

          <Section title="5. Обмеження відповідальності">
            <p>
              Компанія VVA-logistic не несе відповідальності за:
            </p>
            <ul>
              <li>
                непряму шкоду, упущену вигоду або збитки, пов&apos;язані з
                використанням сайту;
              </li>
              <li>
                затримки або форс-мажорні обставини, що знаходяться поза
                нашим контролем;
              </li>
              <li>
                помилки або неточності в інформації, наданій клієнтом.
              </li>
            </ul>
          </Section>

          <Section title="6. Порядок вирішення спорів">
            <p>
              У разі виникнення спору сторони зобов&apos;язуються спочатку
              вирішити його шляхом переговорів. Якщо врегулювання не досягнуто
              — спір розглядається у судовому порядку відповідно до
              законодавства України.
            </p>
          </Section>

          <Section title="7. Зміни до Умов">
            <p>
              Компанія залишає за собою право в односторонньому порядку
              змінювати ці Умови. Актуальна версія завжди розміщена на цій
              сторінці. Продовження використання сайту означає прийняття
              нових умов.
            </p>
          </Section>

          <Section title="8. Контакти">
            <p>
              З будь-яких питань щодо цих Умов звертайтесь:
              <br />
              📧{" "}
              <a href="mailto:vva-logistic@ukr.net">vva-logistic@ukr.net</a>
              <br />
              📞{" "}
              <a href="tel:+380967804247">+380 (96) 780 42 47</a>
            </p>
          </Section>
        </>
      ) : (
        <>
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using <strong>vva-logistic.com</strong>, you
              confirm that you have read and agree to these Terms of Service.
              If you do not agree with any provision, please discontinue use of
              the website.
            </p>
          </Section>

          <Section title="2. Service Description">
            <p>
              VVA-logistic provides international road freight transportation,
              customs clearance, and logistics services across Europe and
              Ukraine.
            </p>
            <ul>
              <li>
                Cost estimates provided on the website are indicative and
                subject to confirmation by a manager.
              </li>
              <li>
                Final pricing is determined after all order details have been
                clarified.
              </li>
              <li>
                The Company reserves the right to decline service requests
                without explanation.
              </li>
            </ul>
          </Section>

          <Section title="3. Use of the Website">
            <p>By using this website, you agree to:</p>
            <ul>
              <li>provide accurate information in contact forms;</li>
              <li>not perform any actions that may disrupt the website;</li>
              <li>not use the website for unlawful purposes;</li>
              <li>
                not copy, reproduce, or distribute website content without
                written consent from the Company.
              </li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All website materials — texts, images, logo, structure — are the
              intellectual property of VVA-logistic and are protected by
              Ukrainian law. Any unauthorised use is prohibited.
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>VVA-logistic is not liable for:</p>
            <ul>
              <li>
                indirect damages, lost profits, or losses related to use of the
                website;
              </li>
              <li>
                delays or force majeure circumstances beyond our control;
              </li>
              <li>errors or inaccuracies in information provided by clients.</li>
            </ul>
          </Section>

          <Section title="6. Dispute Resolution">
            <p>
              In the event of a dispute, the parties shall first attempt to
              resolve it through negotiation. If no resolution is reached, the
              dispute shall be referred to the courts under Ukrainian law.
            </p>
          </Section>

          <Section title="7. Changes to Terms">
            <p>
              The Company reserves the right to amend these Terms unilaterally.
              The current version is always available on this page. Continued
              use of the website constitutes acceptance of any updates.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p>
              For any questions regarding these Terms:
              <br />
              📧{" "}
              <a href="mailto:vva-logistic@ukr.net">vva-logistic@ukr.net</a>
              <br />
              📞{" "}
              <a href="tel:+380967804247">+380 (96) 780 42 47</a>
            </p>
          </Section>
        </>
      )}
    </LegalLayout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-black text-brand-blue uppercase tracking-tight">
        {title}
      </h2>
      <div className="space-y-3 text-neutral-600 leading-relaxed">{children}</div>
    </section>
  );
}
