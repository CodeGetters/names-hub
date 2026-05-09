"use client";

import { useState } from "react";
import Link from "next/link";

type Gender = "all" | "boy" | "girl";
type Style = "classic" | "modern" | "nature" | "scholarly" | "elegant";

interface NameResult {
  name: string;
  pinyin?: string;
  meaning: string;
  origin: string;
}

const styleDescriptions: Record<Style, string> = {
  classic: "Traditional elegant names with deep cultural roots",
  modern: "Contemporary names popular in recent years",
  nature: "Names inspired by natural elements",
  scholarly: "Names with literary and scholarly connotations",
  elegant: "Refined and graceful names",
};

export default function GeneratorPage() {
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
      // Fallback data
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

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">AI Name Generator</h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Generate unique Chinese baby names powered by AI. Choose your preferences
            and let our AI create the perfect name for your baby.
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
                <h2 className="mb-6 text-xl font-semibold">Customize Your Search</h2>

                <div className="space-y-8">
                  {/* Gender */}
                  <div>
                    <label className="mb-3 block text-sm font-medium">Baby Gender</label>
                    <div className="flex gap-3">
                      {[
                        { value: "all" as Gender, label: "Any" },
                        { value: "boy" as Gender, label: "Boy", color: "boy" },
                        { value: "girl" as Gender, label: "Girl", color: "girl" },
                      ].map((option) => (
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
                    <label className="mb-3 block text-sm font-medium">Name Style</label>
                    <div className="space-y-2">
                      {(["classic", "modern", "nature", "scholarly", "elegant"] as Style[]).map(
                        (s) => (
                          <button
                            key={s}
                            onClick={() => setStyle(s)}
                            className={`w-full rounded-lg border px-4 py-3 text-left transition-all ${
                              style === s
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border hover:border-muted"
                            }`}
                          >
                            <span className="font-medium capitalize">{s.replace("-", " ")}</span>
                            <p className="mt-1 text-xs text-muted">{styleDescriptions[s]}</p>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Starting Letter */}
                  <div>
                    <label className="mb-3 block text-sm font-medium">
                      Starting Letter (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={1}
                      value={startingLetter}
                      onChange={(e) => setStartingLetter(e.target.value.toUpperCase())}
                      placeholder="e.g., A, B, C..."
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="mt-2 text-xs text-muted">
                      Filter names by their Pinyin starting letter
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
                        Generating...
                      </span>
                    ) : (
                      "Generate Names with AI"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div>
              <div className="sticky top-8">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold">Generated Names</h3>

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
                          Generate More
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted">
                        Configure options and click generate to create unique names
                      </p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-6 rounded-xl bg-muted-bg p-4">
                  <p className="text-sm text-muted">
                    <span className="font-medium text-foreground">{generationCount}</span> generations this session
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
