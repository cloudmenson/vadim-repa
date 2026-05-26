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
        ? "Політика конфіденційності | VVA-logistic"
        : "Privacy Policy | VVA-logistic",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <LegalLayout
      title={isUk ? "Політика конфіденційності" : "Privacy Policy"}
      updated={isUk ? "26 травня 2026 р." : "May 26, 2026"}
    >
      {isUk ? (
        <>
          <Section title="1. Загальні положення">
            <p>
              Компанія VVA-logistic (далі — «Ми», «Компанія») поважає вашу
              приватність і зобов&apos;язується захищати персональні дані, які ви
              надаєте під час використання нашого сайту{" "}
              <strong>vva-logistic.com</strong>. Ця Політика пояснює, які дані ми
              збираємо, як їх використовуємо та яким чином ви можете керувати
              своїми даними.
            </p>
          </Section>

          <Section title="2. Які дані ми збираємо">
            <p>Ми можемо збирати наступні категорії персональних даних:</p>
            <ul>
              <li>
                <strong>Контактна інформація</strong> — ім&apos;я, номер телефону,
                адреса електронної пошти, які ви вводите у форму заявки.
              </li>
              <li>
                <strong>Дані про вантаж</strong> — місто відправлення,
                призначення, тип вантажу та інша інформація, що стосується
                замовлення.
              </li>
              <li>
                <strong>Технічні дані</strong> — IP-адреса, тип браузера,
                інформація про пристрій, файли cookie (детальніше — у Політиці
                Cookie).
              </li>
            </ul>
          </Section>

          <Section title="3. Мета обробки персональних даних">
            <p>Ми обробляємо ваші персональні дані для:</p>
            <ul>
              <li>розрахунку вартості та організації перевезення;</li>
              <li>зворотного зв&apos;язку за вашим запитом;</li>
              <li>укладання договорів та виставлення рахунків;</li>
              <li>
                покращення якості наших послуг та роботи сайту;
              </li>
              <li>
                дотримання вимог законодавства України та ЄС.
              </li>
            </ul>
          </Section>

          <Section title="4. Правова підстава обробки">
            <p>
              Обробка ваших персональних даних здійснюється на підставі:
              вашої згоди (натискання кнопки «Отримати розрахунок»), виконання
              договору, законних інтересів компанії, а також вимог
              законодавства.
            </p>
          </Section>

          <Section title="5. Передача даних третім особам">
            <p>
              Ми не продаємо і не передаємо ваші персональні дані третім
              особам у комерційних цілях. Дані можуть передаватися лише:
            </p>
            <ul>
              <li>
                перевізникам і партнерам — виключно для виконання вашого
                замовлення;
              </li>
              <li>
                постачальникам технічних сервісів (наприклад, поштові
                сервіси) — на умовах конфіденційності;
              </li>
              <li>
                державним органам — у випадках, передбачених законом.
              </li>
            </ul>
          </Section>

          <Section title="6. Зберігання даних">
            <p>
              Персональні дані зберігаються протягом строку, необхідного для
              виконання цілей обробки, але не довше ніж 3 роки з моменту
              останньої взаємодії. Після закінчення строку дані видаляються або
              знеособлюються.
            </p>
          </Section>

          <Section title="7. Ваші права">
            <p>Ви маєте право:</p>
            <ul>
              <li>отримати доступ до своїх персональних даних;</li>
              <li>вимагати виправлення або видалення даних;</li>
              <li>відкликати згоду на обробку в будь-який момент;</li>
              <li>подати скаргу до регулятора захисту даних.</li>
            </ul>
            <p>
              Для реалізації прав звертайтесь на:{" "}
              <a href="mailto:vva-logistic@ukr.net">vva-logistic@ukr.net</a>
            </p>
          </Section>

          <Section title="8. Безпека даних">
            <p>
              Ми вживаємо технічних та організаційних заходів для захисту
              ваших даних від несанкціонованого доступу, втрати або
              розголошення: шифрування з'єднання (HTTPS), обмеження доступу до
              даних серед співробітників, регулярне резервне копіювання.
            </p>
          </Section>

          <Section title="9. Зміни до Політики">
            <p>
              Ми залишаємо за собою право змінювати цю Політику. Актуальна
              версія завжди доступна на цій сторінці. Продовження використання
              сайту після змін означає вашу згоду з оновленою Політикою.
            </p>
          </Section>

          <Section title="10. Контакти">
            <p>
              З питань обробки персональних даних звертайтесь:
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
          <Section title="1. General Provisions">
            <p>
              VVA-logistic (hereinafter — &quot;We&quot;, &quot;the Company&quot;) respects your
              privacy and is committed to protecting the personal data you
              provide when using our website <strong>vva-logistic.com</strong>.
              This Policy explains what data we collect, how we use it, and how
              you can control your data.
            </p>
          </Section>

          <Section title="2. Data We Collect">
            <p>We may collect the following categories of personal data:</p>
            <ul>
              <li>
                <strong>Contact information</strong> — name, phone number,
                email address provided via the quote request form.
              </li>
              <li>
                <strong>Shipment details</strong> — origin city, destination,
                cargo type, and other order-related information.
              </li>
              <li>
                <strong>Technical data</strong> — IP address, browser type,
                device information, cookies (see our Cookie Policy for
                details).
              </li>
            </ul>
          </Section>

          <Section title="3. Purpose of Processing">
            <p>We process your personal data to:</p>
            <ul>
              <li>calculate costs and arrange transportation;</li>
              <li>respond to your enquiry;</li>
              <li>conclude contracts and issue invoices;</li>
              <li>improve our services and website performance;</li>
              <li>comply with Ukrainian and EU legislation.</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>
              Processing of your personal data is carried out based on: your
              consent (clicking &quot;Get Calculation&quot;), performance of a contract,
              the Company&apos;s legitimate interests, and legal requirements.
            </p>
          </Section>

          <Section title="5. Sharing with Third Parties">
            <p>
              We do not sell or transfer your personal data to third parties for
              commercial purposes. Data may only be shared with:
            </p>
            <ul>
              <li>
                carriers and partners — solely to fulfil your order;
              </li>
              <li>
                technical service providers (e.g. email services) — under
                confidentiality agreements;
              </li>
              <li>
                government authorities — in cases required by law.
              </li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>
              Personal data is retained for as long as necessary to achieve the
              processing purposes, but no longer than 3 years from the date of
              last interaction. After this period, data is deleted or
              anonymised.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>access your personal data;</li>
              <li>request correction or deletion of your data;</li>
              <li>withdraw consent at any time;</li>
              <li>lodge a complaint with a data protection authority.</li>
            </ul>
            <p>
              To exercise your rights, contact:{" "}
              <a href="mailto:vva-logistic@ukr.net">vva-logistic@ukr.net</a>
            </p>
          </Section>

          <Section title="8. Data Security">
            <p>
              We implement technical and organisational measures to protect your
              data from unauthorised access, loss or disclosure: HTTPS
              encryption, restricted staff access to data, and regular backups.
            </p>
          </Section>

          <Section title="9. Policy Changes">
            <p>
              We reserve the right to amend this Policy. The current version is
              always available on this page. Continued use of the website after
              changes constitutes acceptance of the updated Policy.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              For data protection enquiries:
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
