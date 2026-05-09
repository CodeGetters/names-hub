import Link from "next/link";

const girlNames = [
  { name: "梓涵", pinyin: "Zǐ Hán", meaning: "Elegant and contained", style: "Modern" },
  { name: "欣怡", pinyin: "Xīn Yí", meaning: "Joyful harmony", style: "Classic" },
  { name: "雨涵", pinyin: "Yǔ Hán", meaning: "Rain nurtures", style: "Nature" },
  { name: "诗涵", pinyin: "Shī Hán", meaning: "Poetic depth", style: "Scholarly" },
  { name: "雅静", pinyin: "Yǎ Jìng", meaning: "Elegant and serene", style: "Classic" },
  { name: "思涵", pinyin: "Sī Hán", meaning: "Thoughtful and contained", style: "Scholarly" },
  { name: "欣悦", pinyin: "Xīn Yuè", meaning: "Joyful and delightful", style: "Modern" },
  { name: "语桐", pinyin: "Yǔ Tóng", meaning: "Words like phoenix tree", style: "Nature" },
  { name: "诗琪", pinyin: "Shī Qí", meaning: "Poetic fortune", style: "Scholarly" },
  { name: "雅婷", pinyin: "Yǎ Tíng", meaning: "Elegant and graceful", style: "Classic" },
  { name: "雨婷", pinyin: "Yǔ Tíng", meaning: "Rain and graceful", style: "Nature" },
  { name: "欣蕊", pinyin: "Xīn Ruǐ", meaning: "Joyful flower bud", style: "Nature" },
  { name: "诗雅", pinyin: "Shī Yǎ", meaning: "Poetic elegance", style: "Classic" },
  { name: "雅琳", pinyin: "Yǎ Lín", meaning: "Elegant jade", style: "Classic" },
  { name: "雨欣", pinyin: "Yǔ Xīn", meaning: "Rain brings joy", style: "Nature" },
  { name: "思琪", pinyin: "Sī Qí", meaning: "Thoughtful fortune", style: "Scholarly" },
  { name: "雅晴", pinyin: "Yǎ Qíng", meaning: "Elegant clear sky", style: "Nature" },
  { name: "诗瑶", pinyin: "Shī Yáo", meaning: "Poetic jade", style: "Classic" },
  { name: "欣琳", pinyin: "Xīn Lín", meaning: "Joyful jade", style: "Modern" },
  { name: "雨萱", pinyin: "Yǔ Xuān", meaning: "Rain lily", style: "Nature" },
];

const letterGroups = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GirlNamesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-girl/10 to-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold">Chinese Girl Names</h1>
          <p className="mt-2 text-muted">
            Discover beautiful Chinese names for your baby girl with pinyin and meanings.
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
                className="rounded-lg px-3 py-1 text-sm font-medium text-girl hover:bg-girl/10"
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
            {girlNames.map((name, idx) => (
              <Link
                key={idx}
                href={`/name/${name.name.toLowerCase()}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:ring-2 hover:ring-girl/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-girl">
                      {name.name}
                    </h3>
                    <p className="text-sm text-muted">{name.pinyin}</p>
                  </div>
                  <span className="rounded-full bg-girl/10 px-2 py-1 text-xs font-medium text-girl">
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
      <section className="bg-girl/5 py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold">Generate More Names</h2>
          <p className="mt-2 text-muted">
            Use our AI-powered generator to create unique names based on your preferences.
          </p>
          <Link
            href="/#generator"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-girl px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-girl/90 hover:shadow-xl"
          >
            Try AI Generator
          </Link>
        </div>
      </section>
    </div>
  );
}
