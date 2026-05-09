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
    }, 600);
  };

  const genderOptions: { value: Gender; label: string; color: string; gradient: string }[] = [
    { value: "all", label: tCommon("gender.any"), color: "text-foreground", gradient: "btn-clay" },
    { value: "boy", label: tCommon("gender.boy"), color: "text-boy", gradient: "btn-clay-boy" },
    { value: "girl", label: tCommon("gender.girl"), color: "text-girl", gradient: "btn-clay-girl" },
  ];

  return (
    <div className="animate-clay-in">
      {/* Claymorphism form container */}
      <div className="card-clay p-8 mx-auto max-w-2xl">
        <div className="space-y-8">
          {/* Gender Selection */}
          <div>
            <label className="mb-4 block text-sm font-semibold text-foreground">
              {t("form.genderLabel")}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGender(option.value)}
                  className={`
                    ${gender === option.value ? option.gradient : "btn-clay"}
                    ${gender === option.value ? "" : option.color}
                    px-4 py-3 text-sm font-semibold transition-all
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style Select */}
          <div>
            <label className="mb-4 block text-sm font-semibold text-foreground">
              {t("form.styleLabel")}
            </label>
            <div className="card-clay-inset p-1">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full rounded-xl bg-transparent px-4 py-3 text-sm font-medium focus:outline-none cursor-pointer appearance-none"
              >
                <option value="classic">{t("form.styleOptions.classic")}</option>
                <option value="modern">{t("form.styleOptions.modern")}</option>
                <option value="nature">{t("form.styleOptions.nature")}</option>
                <option value="scholarly">{t("form.styleOptions.scholarly")}</option>
                <option value="elegant">{t("form.styleOptions.elegant")}</option>
              </select>
            </div>
          </div>

          {/* Starting Letter */}
          <div>
            <label className="mb-4 block text-sm font-semibold text-foreground">
              {t("form.startingLetterLabel")}
            </label>
            <div className="card-clay-inset p-1">
              <input
                type="text"
                maxLength={1}
                value={startingLetter}
                onChange={(e) => setStartingLetter(e.target.value.toUpperCase())}
                placeholder={t("form.startingLetterPlaceholder")}
                className="w-full rounded-xl bg-transparent px-4 py-3 text-sm focus:outline-none uppercase tracking-wider"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-clay-primary w-full rounded-xl px-6 py-4 text-base font-bold shadow-lg"
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
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8 mx-auto max-w-2xl animate-clay-in">
          <h3 className="mb-6 text-center text-xl font-bold font-display">{t("results.title")}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((name, idx) => (
              <div
                key={idx}
                className="card-clay-sm p-5 transition-all hover:scale-102 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-bold font-display">{name.name}</p>
                    {name.pinyin && <p className="text-sm text-muted font-medium">{name.pinyin}</p>}
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-primary">
                    {name.origin}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{name.meaning}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleGenerate}
              className="btn-clay-primary px-6 py-3 text-sm font-semibold"
            >
              {t("results.generateMore")}
            </button>
            <button
              onClick={() => setResults([])}
              className="btn-clay px-6 py-3 text-sm font-semibold"
            >
              {t("results.clear")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}