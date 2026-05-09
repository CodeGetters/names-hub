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

export default function GeneratorForm() {
  const t = useTranslations("GeneratorPage");
  const tCommon = useTranslations("Common");
  const [gender, setGender] = useState<Gender>("all");
  const [style, setStyle] = useState<Style>("classic");
  const [startingLetter, setStartingLetter] = useState("");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<NameResult[]>([]);
  const [generationCount, setGenerationCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setGenerationCount((prev) => prev + 1);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gender, style, count: 5 }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.success && data.names) {
        setResults(
          data.names.map((n: { name: string; pinyin?: string; meaning: string }) => ({
            name: n.name,
            pinyin: n.pinyin,
            meaning: n.meaning,
            origin: "Chinese",
          })),
        );
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setError(t("results.error"));
      setResults([]);
    } finally {
      setGenerating(false);
    }
  };

  const genderOptions: { value: Gender; label: string; gradient: string }[] = [
    { value: "all", label: tCommon("gender.any"), gradient: "btn-clay" },
    { value: "boy", label: tCommon("gender.boy"), gradient: "btn-clay-boy" },
    { value: "girl", label: tCommon("gender.girl"), gradient: "btn-clay-girl" },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      {/* Form Section */}
      <div className="lg:col-span-2">
        <div className="card-clay p-8">
          <h2 className="mb-6 text-2xl font-bold font-display">{t("form.title")}</h2>

          <div className="space-y-8">
            {/* Gender Selection */}
            <div>
              <label className="mb-4 block text-sm font-semibold">{t("form.genderLabel")}</label>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setGender(option.value)}
                    className={`
                      ${gender === option.value ? option.gradient : "btn-clay"}
                      px-4 py-3 text-sm font-semibold transition-all
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label className="mb-4 block text-sm font-semibold">{t("form.styleLabel")}</label>
              <div className="space-y-3">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`
                      w-full rounded-xl p-4 text-left transition-all border-2
                      ${
                        style === s
                          ? "border-primary bg-primary/5 shadow-md"
                          : "card-clay-sm hover:shadow-lg"
                      }
                    `}
                  >
                    <span className="font-bold">{tCommon(`style.${s}`)}</span>
                    <p className="mt-1 text-xs text-muted">{t(`form.styleDescriptions.${s}`)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Letter */}
            <div>
              <label className="mb-4 block text-sm font-semibold">
                {t("form.startingLetterLabel")}
              </label>
              <div className="card-clay-inset p-1">
                <input
                  type="text"
                  maxLength={1}
                  value={startingLetter}
                  onChange={(e) => setStartingLetter(e.target.value.toUpperCase())}
                  placeholder={t("form.startingLetterPlaceholder")}
                  className="w-full rounded-xl bg-transparent px-4 py-3 text-sm uppercase tracking-wider focus:outline-none"
                />
              </div>
              <p className="mt-2 text-xs text-muted">{t("form.startingLetterHint")}</p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-clay-primary w-full rounded-xl px-8 py-4 text-lg font-bold shadow-lg"
            >
              {generating ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t("form.generating")}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {t("form.generateButton")}
                </span>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="card-clay-sm border-2 border-red-200 bg-red-50/50 p-4"
              >
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="sticky top-24">
          <div className="card-clay p-6">
            <h3 className="mb-4 text-lg font-bold font-display">{t("results.title")}</h3>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((name, idx) => (
                  <Link
                    key={idx}
                    href={`/name/${name.name.toLowerCase()}`}
                    className="card-clay-sm block p-4 transition-all hover:scale-102"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xl font-bold font-display">{name.name}</p>
                        {name.pinyin && <p className="text-xs text-muted">{name.pinyin}</p>}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted line-clamp-2">{name.meaning}</p>
                  </Link>
                ))}

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="btn-clay w-full mt-4 py-3 text-sm font-semibold"
                >
                  {t("results.generateMore")}
                </button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted">{t("results.empty")}</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="card-clay-inset mt-6 p-4">
            <p className="text-sm font-semibold text-muted text-center">
              {t("results.stats", { count: generationCount })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}