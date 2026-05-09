import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const girlNames = [
  { name: "梓涵", pinyin: "Zǐ Hán", meaning: "Elegant and contained", style: "modern" },
  { name: "欣怡", pinyin: "Xīn Yí", meaning: "Joyful harmony", style: "classic" },
  { name: "雨涵", pinyin: "Yǔ Hán", meaning: "Rain nurtures", style: "nature" },
  { name: "诗涵", pinyin: "Shī Hán", meaning: "Poetic depth", style: "scholarly" },
  { name: "雅静", pinyin: "Yǎ Jìng", meaning: "Elegant and serene", style: "classic" },
  { name: "思涵", pinyin: "Sī Hán", meaning: "Thoughtful and contained", style: "scholarly" },
  { name: "欣悦", pinyin: "Xīn Yuè", meaning: "Joyful and delightful", style: "modern" },
  { name: "语桐", pinyin: "Yǔ Tóng", meaning: "Words like phoenix tree", style: "nature" },
  { name: "诗琪", pinyin: "Shī Qí", meaning: "Poetic fortune", style: "scholarly" },
  { name: "雅婷", pinyin: "Yǎ Tíng", meaning: "Elegant and graceful", style: "classic" },
  { name: "雨婷", pinyin: "Yǔ Tíng", meaning: "Rain and graceful", style: "nature" },
  { name: "欣蕊", pinyin: "Xīn Ruǐ", meaning: "Joyful flower bud", style: "nature" },
  { name: "诗雅", pinyin: "Shī Yǎ", meaning: "Poetic elegance", style: "classic" },
  { name: "雅琳", pinyin: "Yǎ Lín", meaning: "Elegant jade", style: "classic" },
  { name: "雨欣", pinyin: "Yǔ Xīn", meaning: "Rain brings joy", style: "nature" },
  { name: "思琪", pinyin: "Sī Qí", meaning: "Thoughtful fortune", style: "scholarly" },
  { name: "雅晴", pinyin: "Yǎ Qíng", meaning: "Elegant clear sky", style: "nature" },
  { name: "诗瑶", pinyin: "Shī Yáo", meaning: "Poetic jade", style: "classic" },
  { name: "欣琳", pinyin: "Xīn Lín", meaning: "Joyful jade", style: "modern" },
  { name: "雨萱", pinyin: "Yǔ Xuān", meaning: "Rain lily", style: "nature" },
] as const;

const letterGroups = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function GirlNamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("GirlPage");
  const tCommon = await getTranslations("Common");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-girl/5 via-background to-background py-20">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-girl/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-girl/5 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 relative">
          <h1 className="text-5xl font-bold font-display">{t("title")}</h1>
          <p className="mt-3 text-lg text-muted">{t("description")}</p>
        </div>
      </section>

      {/* Quick Jump by Letter */}
      <section className="border-b border-border py-4 bg-card/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted font-semibold">{t("jumpTo")}</span>
            {letterGroups.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="btn-clay px-3 py-1 text-xs font-bold"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Names Grid */}
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {girlNames.map((name, idx) => (
              <Link
                key={idx}
                href={`/name/${name.name.toLowerCase()}`}
                className="card-clay-sm p-5 group transition-all hover:scale-102 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-display group-hover:text-girl transition-colors">
                      {name.name}
                    </h3>
                    <p className="text-sm text-muted">{name.pinyin}</p>
                  </div>
                  <span className="rounded-full bg-girl/10 px-3 py-1 text-xs font-bold text-girl">
                    {tCommon(`style.${name.style}`)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{name.meaning}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-t from-girl/5 to-background">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="card-clay p-10">
            <h2 className="text-3xl font-bold font-display">{t("ctaTitle")}</h2>
            <p className="mt-3 text-muted max-w-md mx-auto">{t("ctaDescription")}</p>
            <Link
              href="/generator"
              className="btn-clay-girl mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-base shadow-lg"
            >
              {t("ctaButton")}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}