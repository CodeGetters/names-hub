import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const boyNames = [
  { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous", style: "classic" },
  { name: "子轩", pinyin: "Zǐ Xuān", meaning: "Scholarly and elegant", style: "classic" },
  { name: "宇轩", pinyin: "Yǔ Xuān", meaning: "Vast and lofty", style: "modern" },
  { name: "天宇", pinyin: "Tiān Yǔ", meaning: "Universal, boundless", style: "modern" },
  { name: "瑞霖", pinyin: "Ruì Lín", meaning: "Auspicious dew", style: "classic" },
  { name: "明远", pinyin: "Míng Yuǎn", meaning: "Bright and far-sighted", style: "classic" },
  { name: "博然", pinyin: "Bó Rán", meaning: "Knowledgeable and natural", style: "scholarly" },
  { name: "云飞", pinyin: "Yún Fēi", meaning: "Soaring clouds", style: "nature" },
  { name: "思远", pinyin: "Sī Yuǎn", meaning: "Thoughtful and far-sighted", style: "scholarly" },
  { name: "子涵", pinyin: "Zǐ Hán", meaning: "Scholarly and contained", style: "modern" },
  { name: "浩宇", pinyin: "Hào Yǔ", meaning: "Vast universe", style: "modern" },
  { name: "梓豪", pinyin: "Zǐ Háo", meaning: "Elegant hero", style: "classic" },
  { name: "铭宇", pinyin: "Míng Yǔ", meaning: "Inscribed in space", style: "modern" },
  { name: "泽轩", pinyin: "Zé Xuān", meaning: "Graceful scholar", style: "classic" },
  { name: "睿渊", pinyin: "Ruì Yuān", meaning: "Wise and deep", style: "scholarly" },
  { name: "天翔", pinyin: "Tiān Xiáng", meaning: "Soaring through heavens", style: "nature" },
  { name: "俊杰", pinyin: "Jùn Jié", meaning: "Talented hero", style: "classic" },
  { name: "宇航", pinyin: "Yǔ Háng", meaning: "Space navigation", style: "modern" },
  { name: "子墨", pinyin: "Zǐ Mò", meaning: "Scholarly ink", style: "scholarly" },
] as const;

const letterGroups = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function BoyNamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BoyPage");
  const tCommon = await getTranslations("Common");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-boy/5 via-background to-background py-20">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-boy/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-boy/5 blur-3xl" />
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
            {boyNames.map((name, idx) => (
              <Link
                key={idx}
                href={`/name/${name.name.toLowerCase()}`}
                className="card-clay-sm p-5 group transition-all hover:scale-102 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-display group-hover:text-boy transition-colors">
                      {name.name}
                    </h3>
                    <p className="text-sm text-muted">{name.pinyin}</p>
                  </div>
                  <span className="rounded-full bg-boy/10 px-3 py-1 text-xs font-bold text-boy">
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
      <section className="py-16 bg-gradient-to-t from-boy/5 to-background">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="card-clay p-10">
            <h2 className="text-3xl font-bold font-display">{t("ctaTitle")}</h2>
            <p className="mt-3 text-muted max-w-md mx-auto">{t("ctaDescription")}</p>
            <Link
              href="/generator"
              className="btn-clay-boy mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-base shadow-lg"
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