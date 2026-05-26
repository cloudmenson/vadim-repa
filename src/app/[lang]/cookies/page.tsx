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
        ? "Політика Cookie | VVA-logistic"
        : "Cookie Policy | VVA-logistic",
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <LegalLayout
      title={isUk ? "Політика Cookie" : "Cookie Policy"}
      updated={isUk ? "26 травня 2026 р." : "May 26, 2026"}
    >
      {isUk ? (
        <>
          <Section title="1. Що таке Cookie?">
            <p>
              Cookie — це невеликі текстові файли, які зберігаються на вашому
              пристрої (комп&apos;ютер, смартфон, планшет) під час відвідування
              веб-сайтів. Вони дозволяють сайту запам&apos;ятовувати ваші дії та
              налаштування впродовж певного часу.
            </p>
          </Section>

          <Section title="2. Які Cookie ми використовуємо">
            <p>Наш сайт використовує наступні типи файлів Cookie:</p>
            <ul>
              <li>
                <strong>Необхідні Cookie</strong> — забезпечують базову
                роботу сайту (навігація, заповнення форм). Ці файли не
                потребують вашої згоди та не можуть бути вимкнені.
              </li>
              <li>
                <strong>Аналітичні Cookie</strong> — допомагають нам
                розуміти, як відвідувачі взаємодіють із сайтом. Ми
                використовуємо ці дані виключно для покращення сайту.
              </li>
              <li>
                <strong>Функціональні Cookie</strong> — запам&apos;ятовують ваші
                уподобання, наприклад, вибрану мову (UK/EN).
              </li>
            </ul>
          </Section>

          <Section title="3. Строки зберігання">
            <ul>
              <li>
                <strong>Сесійні Cookie</strong> — видаляються після закриття
                браузера.
              </li>
              <li>
                <strong>Постійні Cookie</strong> — зберігаються на пристрої
                від 30 днів до 1 року залежно від типу.
              </li>
            </ul>
          </Section>

          <Section title="4. Управління Cookie">
            <p>
              Ви можете налаштувати або вимкнути файли Cookie через налаштування
              браузера. Зверніть увагу: відключення певних Cookie може
              вплинути на функціональність сайту.
            </p>
            <p>Як керувати Cookie у популярних браузерах:</p>
            <ul>
              <li>
                <strong>Chrome:</strong> Налаштування → Конфіденційність та
                безпека → Файли cookie
              </li>
              <li>
                <strong>Safari:</strong> Налаштування → Safari → Конфіденційність
              </li>
              <li>
                <strong>Firefox:</strong> Налаштування → Конфіденційність та
                захист
              </li>
              <li>
                <strong>Edge:</strong> Налаштування → Файли cookie та дозволи
                для сайтів
              </li>
            </ul>
          </Section>

          <Section title="5. Сторонні Cookie">
            <p>
              Деякі функції нашого сайту можуть використовувати Cookie від
              сторонніх сервісів (наприклад, аналітика). Ці сервіси мають
              власні політики конфіденційності. Ми не контролюємо Cookie
              третіх сторін.
            </p>
          </Section>

          <Section title="6. Зміни до Політики">
            <p>
              Ми залишаємо за собою право оновлювати цю Політику. Актуальна
              версія завжди доступна на цій сторінці.
            </p>
          </Section>

          <Section title="7. Контакти">
            <p>
              З питань використання Cookie звертайтесь:
              <br />
              📧{" "}
              <a href="mailto:vva-logistic@ukr.net">vva-logistic@ukr.net</a>
            </p>
          </Section>
        </>
      ) : (
        <>
          <Section title="1. What are Cookies?">
            <p>
              Cookies are small text files stored on your device (computer,
              smartphone, tablet) when you visit websites. They allow the
              website to remember your actions and preferences over a period of
              time.
            </p>
          </Section>

          <Section title="2. Cookies We Use">
            <p>Our website uses the following types of cookies:</p>
            <ul>
              <li>
                <strong>Essential Cookies</strong> — enable basic site
                functionality (navigation, form submission). These do not
                require consent and cannot be disabled.
              </li>
              <li>
                <strong>Analytics Cookies</strong> — help us understand how
                visitors interact with the site. We use this data solely to
                improve the website.
              </li>
              <li>
                <strong>Functional Cookies</strong> — remember your preferences,
                such as your selected language (UK/EN).
              </li>
            </ul>
          </Section>

          <Section title="3. Retention Periods">
            <ul>
              <li>
                <strong>Session Cookies</strong> — deleted when you close your
                browser.
              </li>
              <li>
                <strong>Persistent Cookies</strong> — stored on your device for
                30 days to 1 year depending on type.
              </li>
            </ul>
          </Section>

          <Section title="4. Managing Cookies">
            <p>
              You can configure or disable cookies through your browser
              settings. Please note that disabling certain cookies may affect
              website functionality.
            </p>
            <p>How to manage cookies in popular browsers:</p>
            <ul>
              <li>
                <strong>Chrome:</strong> Settings → Privacy and Security →
                Cookies
              </li>
              <li>
                <strong>Safari:</strong> Settings → Safari → Privacy
              </li>
              <li>
                <strong>Firefox:</strong> Settings → Privacy &amp; Security
              </li>
              <li>
                <strong>Edge:</strong> Settings → Cookies and site permissions
              </li>
            </ul>
          </Section>

          <Section title="5. Third-Party Cookies">
            <p>
              Some features of our website may use cookies from third-party
              services (e.g. analytics). These services have their own privacy
              policies. We do not control third-party cookies.
            </p>
          </Section>

          <Section title="6. Policy Updates">
            <p>
              We reserve the right to update this Policy. The current version
              is always available on this page.
            </p>
          </Section>

          <Section title="7. Contact Us">
            <p>
              For questions about cookie use:
              <br />
              📧{" "}
              <a href="mailto:vva-logistic@ukr.net">vva-logistic@ukr.net</a>
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
