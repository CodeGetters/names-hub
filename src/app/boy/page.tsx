import Link from "next/link";

const boyNames = [
  { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous", style: "Classic" },
  { name: "子轩", pinyin: "Zǐ Xuān", meaning: "Scholarly and elegant", style: "Classic" },
  { name: "宇轩", pinyin: "Yǔ Xuān", meaning: "Vast and lofty", style: "Modern" },
  { name: "天宇", pinyin: "Tiān Yǔ", meaning: "Universal, boundless", style: "Modern" },
  { name: "瑞霖", pinyin: "Ruì Lín", meaning: "Auspicious dew", style: "Classic" },
  { name: "明远", pinyin: "Míng Yuǎn", meaning: "Bright and far-sighted", style: "Classic" },
  { name: "博然", pinyin: "Bó Rán", meaning: "Knowledgeable and natural", style: "Scholarly" },
  { name: "云飞", pinyin: "Yún Fēi", meaning: "Soaring clouds", style: "Nature" },
  { name: "思远", pinyin: "Sī Yuǎn", meaning: "Thoughtful and far-sighted", style: "Scholarly" },
  { name: "子涵", pinyin: "Zǐ Hán", meaning: "Scholarly and contained", style: "Modern" },
  { name: "浩宇", pinyin: "Hào Yǔ", meaning: "Vast universe", style: "Modern" },
  { name: "梓豪", pinyin: "Zǐ Háo", meaning: "Elegant hero", style: "Classic" },
  { name: "铭宇", pinyin: "Míng Yǔ", meaning: "Inscribed in space", style: "Modern" },
  { name: "泽轩", pinyin: "Zé Xuān", meaning: "Graceful scholar", style: "Classic" },
  { name: "睿渊", pinyin: "Ruì Yuān", meaning: "Wise and deep", style: "Scholarly" },
  { name: "天翔", pinyin: "Tiān Xiáng", meaning: "Soaring through heavens", style: "Nature" },
  { name: "俊杰", pinyin: "Jùn Jié", meaning: "Talented hero", style: "Classic" },
  { name: "宇航", pinyin: "Yǔ Háng", meaning: "Space navigation", style: "Modern" },
  { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous", style: "Classic" },
  { name: "子墨", pinyin: "Zǐ Mò", meaning: "Scholarly ink", style: "Scholarly" },
];

const letterGroups = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function BoyNamesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-boy/10 to-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold">Chinese Boy Names</h1>
          <p className="mt-2 text-muted">
            Discover meaningful Chinese names for your baby boy with pinyin and meanings.
          </p>
        </div>
      </section>

      {/* Quick Jump by Letter */}
      <section className="border-b border-border py-4">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted">Jump to:</span>
            {letterGroups.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="rounded-lg px-3 py-1 text-sm font-medium text-boy hover:bg-boy/10"
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boyNames.map((name, idx) => (
              <Link
                key={idx}
                href={`/name/${name.name.toLowerCase()}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:ring-2 hover:ring-boy/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-boy">
                      {name.name}
                    </h3>
                    <p className="text-sm text-muted">{name.pinyin}</p>
                  </div>
                  <span className="rounded-full bg-boy/10 px-2 py-1 text-xs font-medium text-boy">
                    {name.style}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{name.meaning}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-boy/5 py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold">Generate More Names</h2>
          <p className="mt-2 text-muted">
            Use our AI-powered generator to create unique names based on your preferences.
          </p>
          <Link
            href="/#generator"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-boy px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-boy/90 hover:shadow-xl"
          >
            Try AI Generator
          </Link>
        </div>
      </section>
    </div>
  );
}
