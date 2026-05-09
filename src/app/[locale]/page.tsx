"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Gender = "all" | "boy" | "girl";

interface NameResult {
  name: string;
  pinyin?: string;
  meaning: string;
  origin: string;
}

const popularBoyNames = [
  { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous" },
  { name: "子轩", pinyin: "Zǐ Xuān", meaning: "Scholarly and elegant" },
  { name: "宇轩", pinyin: "Yǔ Xuān", meaning: "Vast and lofty" },
  { name: "天宇", pinyin: "Tiān Yǔ", meaning: "Universal, boundless" },
  { name: "瑞霖", pinyin: "Ruì Lín", meaning: "Auspicious dew" },
];

const popularGirlNames = [
  { name: "梓涵", pinyin: "Zǐ Hán", meaning: "Elegant and contained" },
  { name: "欣怡", pinyin: "Xīn Yí", meaning: "Joyful harmony" },
  { name: "雨涵", pinyin: "Yǔ Hán", meaning: "Rain nurtures" },
  { name: "诗涵", pinyin: "Shī Hán", meaning: "Poetic depth" },
  { name: "雅静", pinyin: "Yǎ Jìng", meaning: "Elegant and serene" },
];

export default function HomePage() {
  const t = useTranslations("HomePage");
  const tCommon = useTranslations("Common");
  const [gender, setGender] = useState<Gender>("all");
  const [style, setStyle] = useState("classic");
  const [startingLetter, setStartingLetter] = useState("");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<NameResult[]>([]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      let selectedNames;
      if (gender === "boy") {
        selectedNames = [...popularBoyNames].sort(() => Math.random() - 0.5).slice(0, 5);
      } else if (gender === "girl") {
        selectedNames = [...popularGirlNames].sort(() => Math.random() - 0.5).slice(0, 5);
      } else {
        const combined = [...popularBoyNames, ...popularGirlNames].sort(() => Math.random() - 0.5);
        selectedNames = combined.slice(0, 5);
      }
      setResults(selectedNames.map(n => ({ ...n, origin: "Chinese" })));
      setGenerating(false);
    }, 500);
  };

  const genderOptions: { value: Gender; label: string; color: string }[] = [
    { value: "all", label: tCommon("gender.any"), color: "secondary" },
    { value: "boy", label: tCommon("gender.boy"), color: "boy" },
    { value: "girl", label: tCommon("gender.girl"), color: "girl" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {t("hero.titleBefore")} <span className="text-primary">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              {t("hero.description")}
            </p>
          </div>

          {/* Generator Card */}
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-card p-8 shadow-xl ring-1 ring-border">
            <div className="space-y-6">
              {/* Gender Selection */}
              <div>
                <label className="mb-3 block text-sm font-medium">{t("form.genderLabel")}</label>
                <div className="flex gap-3">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setGender(option.value)}
                      className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                        gender === option.value
                          ? `bg-${option.color} text-white shadow-md`
                          : "bg-muted-bg text-foreground hover:bg-muted/20"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="mb-3 block text-sm font-medium">{t("form.styleLabel")}</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="classic">{t("form.styleOptions.classic")}</option>
                  <option value="modern">{t("form.styleOptions.modern")}</option>
                  <option value="nature">{t("form.styleOptions.nature")}</option>
                  <option value="scholarly">{t("form.styleOptions.scholarly")}</option>
                  <option value="elegant">{t("form.styleOptions.elegant")}</option>
                </select>
              </div>

              {/* Starting Letter (Optional) */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  {t("form.startingLetterLabel")}
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={startingLetter}
                  onChange={(e) => setStartingLetter(e.target.value.toUpperCase())}
                  placeholder={t("form.startingLetterPlaceholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-hover disabled:opacity-50"
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t("form.generating")}
                  </span>
                ) : (
                  t("form.generateButton")
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mx-auto mt-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4">
              <h3 className="mb-4 text-center text-lg font-semibold">{t("results.title")}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((name, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-bold">{name.name}</p>
                        {name.pinyin && (
                          <p className="text-sm text-muted">{name.pinyin}</p>
                        )}
                      </div>
                      <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                        {name.origin}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{name.meaning}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={handleGenerate}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted-bg"
                >
                  {t("results.generateMore")}
                </button>
                <button
                  onClick={() => setResults([])}
                  className="rounded-lg bg-muted-bg px-4 py-2 text-sm font-medium hover:bg-muted/20"
                >
                  {t("results.clear")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative background elements */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </section>

      {/* Features Section */}
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

      {/* Popular Names Preview */}
      <section className="bg-muted-bg py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">{t("popular.title")}</h2>
          <p className="mb-12 text-center text-muted">{t("popular.subtitle")}</p>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Boy Names */}
            <div className="rounded-2xl bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span className="h-3 w-3 rounded-full bg-boy"></span>
                {t("popular.boy")}
              </h3>
              <div className="space-y-3">
                {popularBoyNames.map((name, idx) => (
                  <Link
                    key={idx}
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

            {/* Girl Names */}
            <div className="rounded-2xl bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span className="h-3 w-3 rounded-full bg-girl"></span>
                {t("popular.girl")}
              </h3>
              <div className="space-y-3">
                {popularGirlNames.map((name, idx) => (
                  <Link
                    key={idx}
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
          <p className="mt-4 text-muted">
            {t("cta.description")}
          </p>
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
