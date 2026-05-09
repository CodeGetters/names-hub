import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import InlineGenerator from "@/components/generator/InlineGenerator";
import { popularBoyNames, popularGirlNames } from "@/data/popular-names";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {t("hero.titleBefore")} <span className="text-primary">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{t("hero.description")}</p>
          </div>

          <InlineGenerator />
        </div>

        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("features.title")}</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: "AI",
                title: t("features.aiPowered.title"),
                description: t("features.aiPowered.description"),
              },
              {
                icon: "CN",
                title: t("features.bilingual.title"),
                description: t("features.bilingual.description"),
              },
              {
                icon: "FREE",
                title: t("features.free.title"),
                description: t("features.free.description"),
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted-bg py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">{t("popular.title")}</h2>
          <p className="mb-12 text-center text-muted">{t("popular.subtitle")}</p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span className="h-3 w-3 rounded-full bg-boy"></span>
                {t("popular.boy")}
              </h3>
              <div className="space-y-3">
                {popularBoyNames.map((name) => (
                  <Link
                    key={name.name}
                    href={`/name/${name.name.toLowerCase()}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-all hover:bg-muted-bg"
                  >
                    <div>
                      <p className="font-medium">{name.name}</p>
                      <p className="text-sm text-muted">{name.pinyin}</p>
                    </div>
                    <span className="text-sm text-muted">{name.meaning}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/boy"
                className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-boy hover:underline"
              >
                {t("popular.viewAllBoy")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="rounded-2xl bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span className="h-3 w-3 rounded-full bg-girl"></span>
                {t("popular.girl")}
              </h3>
              <div className="space-y-3">
                {popularGirlNames.map((name) => (
                  <Link
                    key={name.name}
                    href={`/name/${name.name.toLowerCase()}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-all hover:bg-muted-bg"
                  >
                    <div>
                      <p className="font-medium">{name.name}</p>
                      <p className="text-sm text-muted">{name.pinyin}</p>
                    </div>
                    <span className="text-sm text-muted">{name.meaning}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/girl"
                className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-girl hover:underline"
              >
                {t("popular.viewAllGirl")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
          <p className="mt-4 text-muted">{t("cta.description")}</p>
          <Link
            href="/generator"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-hover hover:shadow-xl"
          >
            {t("cta.button")}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
