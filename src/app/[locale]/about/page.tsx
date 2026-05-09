import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
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

  const techItems = ["framework", "i18n", "deployment", "ai"] as const;
  const tBoy = await getTranslations("BoyPage");

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-bold">{t("hero.title")}</h1>
          <p className="mt-4 text-lg text-muted">{t("hero.tagline")}</p>
        </div>
      </section>

      <section className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 space-y-10">
          <article className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-3 text-xl font-semibold">{t("mission.title")}</h2>
            <p className="leading-relaxed text-muted">{t("mission.body")}</p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-4 text-xl font-semibold">{t("tech.title")}</h2>
            <ul className="space-y-3 text-muted">
              {techItems.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t(`tech.items.${key}`)}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-3 text-xl font-semibold">{t("privacy.title")}</h2>
            <p className="leading-relaxed text-muted">{t("privacy.body")}</p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-3 text-xl font-semibold">{t("contact.title")}</h2>
            <p className="leading-relaxed text-muted">{t("contact.body")}</p>
            <a
              href="https://github.com/CodeGetters/names-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted-bg"
            >
              {t("contact.linkLabel")}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </article>

          <div className="text-center">
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary-hover"
            >
              {tBoy("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
