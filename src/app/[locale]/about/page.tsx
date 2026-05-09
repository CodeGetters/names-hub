import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale === "zh" ? "AboutPage" : "AboutPage");
  return {
    title: locale === "zh" ? "关于我们 - Names Hub" : "About Names Hub",
    description: locale === "zh" ? "了解 Names Hub 宝宝取名助手" : "Learn about Names Hub baby name generator",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const tBoy = await getTranslations("BoyPage");

  const techItems = ["framework", "i18n", "deployment", "ai"] as const;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-24">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="mx-auto max-w-3xl px-4 text-center relative animate-clay-in">
          <h1 className="text-5xl sm:text-6xl font-bold font-display">{t("hero.title")}</h1>
          <p className="mt-6 text-xl text-muted leading-relaxed">{t("hero.tagline")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-8">
          {/* Mission */}
          <div className="card-clay p-8">
            <h2 className="mb-4 text-2xl font-bold font-display flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">💡</span>
              {t("mission.title")}
            </h2>
            <p className="leading-relaxed text-muted text-lg">{t("mission.body")}</p>
          </div>

          {/* Tech Stack */}
          <div className="card-clay p-8">
            <h2 className="mb-6 text-2xl font-bold font-display flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-bold text-lg">⚙️</span>
              {t("tech.title")}
            </h2>
            <ul className="space-y-4">
              {techItems.map((key) => (
                <li key={key} className="flex gap-4 items-start">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-muted leading-relaxed">{t(`tech.items.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy */}
          <div className="card-clay p-8">
            <h2 className="mb-4 text-2xl font-bold font-display flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 font-bold text-lg">🔒</span>
              {t("privacy.title")}
            </h2>
            <p className="leading-relaxed text-muted text-lg">{t("privacy.body")}</p>
          </div>

          {/* Contact */}
          <div className="card-clay p-8">
            <h2 className="mb-4 text-2xl font-bold font-display flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent font-bold text-lg">📬</span>
              {t("contact.title")}
            </h2>
            <p className="leading-relaxed text-muted text-lg">{t("contact.body")}</p>
            <a
              href="https://github.com/CodeGetters/names-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clay-primary mt-6 inline-flex items-center gap-3 rounded-2xl px-6 py-4 font-bold text-base"
            >
              {t("contact.linkLabel")}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/generator"
              className="btn-clay-primary inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-bold shadow-xl"
            >
              {tBoy("ctaButton")}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}