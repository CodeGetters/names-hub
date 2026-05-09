"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Gender = "all" | "boy" | "girl";
type Style = "classic" | "modern" | "nature" | "scholarly" | "elegant";

interface NameResult {
  name: string;
  pinyin?: string;
  meaning: string;
  origin: string;
}

const STYLES: Style[] = ["classic", "modern", "nature", "scholarly", "elegant"];

export default function GeneratorPage() {
  const t = useTranslations("GeneratorPage");
  const tCommon = useTranslations("Common");
  const [gender, setGender] = useState<Gender>("all");
  const [style, setStyle] = useState<Style>("classic");
  const [startingLetter, setStartingLetter] = useState("");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<NameResult[]>([]);
  const [generationCount, setGenerationCount] = useState(0);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerationCount((prev) => prev + 1);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gender, style, count: 5 }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      if (data.success && data.names) {
        setResults(data.names.map((n: { name: string; pinyin?: string; meaning: string }) => ({
          name: n.name,
          pinyin: n.pinyin,
          meaning: n.meaning,
          origin: "Chinese",
        })));
      }
    } catch (error) {
      console.error(error);
      const fallback = {
        boy: [
          { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous" },
          { name: "子轩", pinyin: "Zǐ Xuān", meaning: "Scholarly and elegant" },
          { name: "宇轩", pinyin: "Yǔ Xuān", meaning: "Vast and lofty" },
        ],
        girl: [
          { name: "梓涵", pinyin: "Zǐ Hán", meaning: "Elegant and contained" },
          { name: "雅静", pinyin: "Yǎ Jìng", meaning: "Elegant and serene" },
          { name: "诗涵", pinyin: "Shī Hán", meaning: "Poetic depth" },
        ],
      };
      const category = gender === "girl" ? "girl" : gender === "boy" ? "boy" : "boy";
      setResults(fallback[category].map((n) => ({ ...n, origin: "Chinese" })));
    } finally {
      setGenerating(false);
    }
  };

  const genderOptions: { value: Gender; label: string; color?: string }[] = [
    { value: "all", label: tCommon("gender.any") },
    { value: "boy", label: tCommon("gender.boy"), color: "boy" },
    { value: "girl", label: tCommon("gender.girl"), color: "girl" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">{t("hero.title")}</h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Generator Form */}
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Options */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-6 text-xl font-semibold">{t("form.title")}</h2>

                <div className="space-y-8">
                  {/* Gender */}
                  <div>
                    <label className="mb-3 block text-sm font-medium">{t("form.genderLabel")}</label>
                    <div className="flex gap-3">
                      {genderOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setGender(option.value)}
                          className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                            gender === option.value
                              ? `bg-${option.color || "secondary"} text-white`
                              : "bg-muted-bg hover:bg-muted/20"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <label className="mb-3 block text-sm font-medium">{t("form.styleLabel")}</label>
                    <div className="space-y-2">
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStyle(s)}
                          className={`w-full rounded-lg border px-4 py-3 text-left transition-all ${
                            style === s
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-muted"
                          }`}
                        >
                          <span className="font-medium">{tCommon(`style.${s}`)}</span>
                          <p className="mt-1 text-xs text-muted">
                            {t(`form.styleDescriptions.${s}`)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Starting Letter */}
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
                    <p className="mt-2 text-xs text-muted">
                      {t("form.startingLetterHint")}
                    </p>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-hover hover:shadow-xl disabled:opacity-50"
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
            </div>

            {/* Results Sidebar */}
            <div>
              <div className="sticky top-8">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold">{t("results.title")}</h3>

                  {results.length > 0 ? (
                    <div className="space-y-4">
                      {results.map((name, idx) => (
                        <Link
                          key={idx}
                          href={`/name/${name.name.toLowerCase()}`}
                          className="block rounded-lg border border-border p-4 transition-all hover:shadow-md hover:border-primary/30"
                        >
                          <p className="text-xl font-bold">{name.name}</p>
                          {name.pinyin && (
                            <p className="text-sm text-muted">{name.pinyin}</p>
                          )}
                          <p className="mt-2 text-xs text-muted line-clamp-2">{name.meaning}</p>
                        </Link>
                      ))}

                      <div className="pt-4">
                        <button
                          onClick={handleGenerate}
                          disabled={generating}
                          className="w-full rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted-bg disabled:opacity-50"
                        >
                          {t("results.generateMore")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted">
                        {t("results.empty")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-6 rounded-xl bg-muted-bg p-4">
                  <p className="text-sm text-muted">
                    {t("results.stats", { count: generationCount })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
