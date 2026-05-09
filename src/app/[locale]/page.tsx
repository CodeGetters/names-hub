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
  const tCommon = await getTranslations("Common");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12 animate-clay-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight">
              {t("hero.titleBefore")}{" "}
              <span className="text-primary relative">
                {t("hero.titleHighlight")}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
              {t("hero.description")}
            </p>
          </div>

          {/* Inline Generator Form */}
          <InlineGenerator />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-3xl sm:text-4xl font-bold font-display">
            {t("features.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: t("features.aiPowered.title"),
                description: t("features.aiPowered.description"),
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                ),
                title: t("features.bilingual.title"),
                description: t("features.bilingual.description"),
                color: "text-secondary",
                bg: "bg-secondary/10",
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: t("features.free.title"),
                description: t("features.free.description"),
                color: "text-accent",
                bg: "bg-accent/10",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card-clay p-8 text-center transition-all hover:scale-105"
              >
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold font-display">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Names Section */}
      <section className="py-20 bg-gradient-to-b from-muted-bg/50 to-background">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-3xl sm:text-4xl font-bold font-display">
            {t("popular.title")}
          </h2>
          <p className="mb-12 text-center text-muted">{t("popular.subtitle")}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Boy Names */}
            <div className="card-clay p-6">
              <h3 className="mb-6 flex items-center gap-3 text-xl font-bold font-display">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-boy/20 text-boy font-bold text-sm">M</span>
                {t("popular.boy")}
              </h3>
              <div className="space-y-3">
                {popularBoyNames.map((name) => (
                  <Link
                    key={name.name}
                    href={`/name/${name.name.toLowerCase()}`}
                    className="card-clay-sm flex items-center justify-between p-4 transition-all hover:scale-102"
                  >
                    <div>
                      <p className="font-bold font-display text-lg">{name.name}</p>
                      <p className="text-xs text-muted">{name.pinyin}</p>
                    </div>
                    <span className="text-xs text-muted text-right max-w-[120px] line-clamp-1">{name.meaning}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/boy"
                className="mt-6 flex items-center justify-center gap-2 btn-clay px-6 py-3 text-sm font-semibold text-boy"
              >
                {t("popular.viewAllBoy")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Girl Names */}
            <div className="card-clay p-6">
              <h3 className="mb-6 flex items-center gap-3 text-xl font-bold font-display">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-girl/20 text-girl font-bold text-sm">F</span>
                {t("popular.girl")}
              </h3>
              <div className="space-y-3">
                {popularGirlNames.map((name) => (
                  <Link
                    key={name.name}
                    href={`/name/${name.name.toLowerCase()}`}
                    className="card-clay-sm flex items-center justify-between p-4 transition-all hover:scale-102"
                  >
                    <div>
                      <p className="font-bold font-display text-lg">{name.name}</p>
                      <p className="text-xs text-muted">{name.pinyin}</p>
                    </div>
                    <span className="text-xs text-muted text-right max-w-[120px] line-clamp-1">{name.meaning}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/girl"
                className="mt-6 flex items-center justify-center gap-2 btn-clay px-6 py-3 text-sm font-semibold text-girl"
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

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="card-clay p-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display">{t("cta.title")}</h2>
            <p className="mt-4 text-muted max-w-md mx-auto">{t("cta.description")}</p>
            <Link
              href="/generator"
              className="btn-clay-primary mt-8 inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-bold shadow-xl"
            >
              {t("cta.button")}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}