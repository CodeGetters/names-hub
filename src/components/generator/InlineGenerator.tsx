"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { popularBoyNames, popularGirlNames } from "@/data/popular-names";

type Gender = "all" | "boy" | "girl";

interface NameResult {
  name: string;
  pinyin?: string;
  meaning: string;
  origin: string;
}

export default function InlineGenerator() {
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
      setResults(selectedNames.map((n) => ({ ...n, origin: "Chinese" })));
      setGenerating(false);
    }, 500);
  };

  const genderOptions: { value: Gender; label: string; color: string }[] = [
    { value: "all", label: tCommon("gender.any"), color: "secondary" },
    { value: "boy", label: tCommon("gender.boy"), color: "boy" },
    { value: "girl", label: tCommon("gender.girl"), color: "girl" },
  ];

  return (
    <>
      <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-card p-8 shadow-xl ring-1 ring-border">
        <div className="space-y-6">
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

          <div>
            <label className="mb-3 block text-sm font-medium">{t("form.startingLetterLabel")}</label>
            <input
              type="text"
              maxLength={1}
              value={startingLetter}
              onChange={(e) => setStartingLetter(e.target.value.toUpperCase())}
              placeholder={t("form.startingLetterPlaceholder")}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

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
                    {name.pinyin && <p className="text-sm text-muted">{name.pinyin}</p>}
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
    </>
  );
}
