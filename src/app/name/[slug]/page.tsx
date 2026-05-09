import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const namesData: Record<string, {
  name: string;
  pinyin: string;
  gender: "boy" | "girl";
  meaning: string;
  meaningCn: string;
  style: string;
  origin: string;
  characterCount: number;
  strokes: number;
  description: string;
  similarNames: string[];
}> = {
  "浩然": {
    name: "浩然",
    pinyin: "Hào Rán",
    gender: "boy",
    meaning: "Grand and righteous",
    meaningCn: "正气高大，胸襟广阔",
    style: "Classic",
    origin: "Chinese",
    characterCount: 2,
    strokes: 11,
    description: "浩然之名，源自《孟子》'浩然之气'，象征正直广大的人格。适合期望孩子品性端正、志向高远的家庭。",
    similarNames: ["浩宇", "浩然", "明远", "博然"],
  },
  "子轩": {
    name: "子轩",
    pinyin: "Zǐ Xuān",
    gender: "boy",
    meaning: "Scholarly and elegant",
    meaningCn: "温文尔雅，才华出众",
    style: "Modern",
    origin: "Chinese",
    characterCount: 2,
    strokes: 9,
    description: "子轩为典型的新生代名，'子'为尊称，'轩'有高扬之意。整体寓意博学多才、气度不凡。",
    similarNames: ["子涵", "子墨", "宇轩", "泽轩"],
  },
  "梓涵": {
    name: "梓涵",
    pinyin: "Zǐ Hán",
    gender: "girl",
    meaning: "Elegant and contained",
    meaningCn: "优雅内涵，德才兼备",
    style: "Modern",
    origin: "Chinese",
    characterCount: 2,
    strokes: 12,
    description: "梓为木中之贵，涵为包容蕴含。此名寓意女孩如树木般茁壮成长，内心涵养丰富。",
    similarNames: ["梓涵", "诗涵", "雨涵", "思涵"],
  },
  "雅静": {
    name: "雅静",
    pinyin: "Yǎ Jìng",
    gender: "girl",
    meaning: "Elegant and serene",
    meaningCn: "温文尔雅，娴静大方",
    style: "Classic",
    origin: "Chinese",
    characterCount: 2,
    strokes: 16,
    description: "雅静之名，体现传统女性美德。期望女孩性情温和、举止优雅、内心宁静。",
    similarNames: ["雅静", "雅婷", "雅琳", "雅晴"],
  },
};

export default async function NameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const nameData = namesData[slug];

  if (!nameData) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Name Not Found</h1>
        <p className="mt-2 text-muted">The name &quot;{slug}&quot; is not in our database yet.</p>
        <Link href="/" className="mt-4 text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const genderColor = nameData.gender === "boy" ? "boy" : "girl";
  const genderBg = nameData.gender === "boy" ? "boy-bg" : "girl-bg";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className={`bg-gradient-to-b from-${genderColor}/10 to-background py-16`}>
        <div className="mx-auto max-w-4xl px-4">
          <Link href={`/${nameData.gender}`} className="text-sm text-muted hover:text-foreground">
            ← Back to {nameData.gender === "boy" ? "Boy" : "Girl"} Names
          </Link>
          <div className="mt-6 text-center">
            <h1 className="text-6xl font-bold">{nameData.name}</h1>
            <p className="mt-2 text-2xl text-muted">{nameData.pinyin}</p>
            <span className={`mt-4 inline-block rounded-full bg-${genderBg} px-4 py-2 text-sm font-medium text-${genderColor}`}>
              {nameData.style} · {nameData.origin}
            </span>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Meaning */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Meaning</h2>
                <p className="text-xl">{nameData.meaning}</p>
                <p className="mt-1 text-muted">{nameData.meaningCn}</p>
              </div>

              {/* Description */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Name Story</h2>
                <p className="leading-relaxed text-muted">{nameData.description}</p>
              </div>

              {/* Similar Names */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Similar Names</h2>
                <div className="flex flex-wrap gap-3">
                  {nameData.similarNames.map((similar) => (
                    <Link
                      key={similar}
                      href={`/name/${similar.toLowerCase()}`}
                      className={`rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all hover:bg-${genderBg} hover:border-${genderColor}`}
                    >
                      {similar}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Quick Facts</h2>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-muted">Characters</dt>
                    <dd className="font-medium">{nameData.characterCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Total Strokes</dt>
                    <dd className="font-medium">{nameData.strokes}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Gender</dt>
                    <dd className={`font-medium capitalize text-${genderColor}`}>{nameData.gender}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Origin</dt>
                    <dd className="font-medium">{nameData.origin}</dd>
                  </div>
                </dl>
              </div>

              {/* Generate CTA */}
              <div className={`rounded-xl bg-gradient-to-br from-${genderColor}/10 to-${genderColor}/5 p-6 text-center`}>
                <h2 className="font-semibold">Like this name?</h2>
                <p className="mt-2 text-sm text-muted">
                  Generate more {nameData.gender === "boy" ? "boy" : "girl"} names like {nameData.name}
                </p>
                <Link
                  href={`/#generator`}
                  className={`mt-4 inline-block rounded-full bg-${genderColor} px-6 py-2 font-medium text-white hover:opacity-90`}
                >
                  Try AI Generator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
