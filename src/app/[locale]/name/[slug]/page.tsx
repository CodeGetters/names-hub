import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
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
  descriptionEn: string;
  similarNames: string[];
}> = {
  "浩然": {
    name: "浩然",
    pinyin: "Hào Rán",
    gender: "boy",
    meaning: "Grand and righteous",
    meaningCn: "正气高大,胸襟广阔",
    style: "Classic",
    origin: "Chinese",
    characterCount: 2,
    strokes: 11,
    description: "浩然之名,源自《孟子》'浩然之气',象征正直广大的人格。适合期望孩子品性端正、志向高远的家庭。",
    descriptionEn: "The name 浩然 comes from Mencius' phrase 'haoran zhi qi' (vast spirit of righteousness), symbolizing an upright and broad-minded character. Ideal for families hoping their child grows up with integrity and lofty aspirations.",
    similarNames: ["浩宇", "明远", "博然"],
  },
  "子轩": {
    name: "子轩",
    pinyin: "Zǐ Xuān",
    gender: "boy",
    meaning: "Scholarly and elegant",
    meaningCn: "温文尔雅,才华出众",
    style: "Modern",
    origin: "Chinese",
    characterCount: 2,
    strokes: 9,
    description: "子轩为典型的新生代名,'子'为尊称,'轩'有高扬之意。整体寓意博学多才、气度不凡。",
    descriptionEn: "子轩 is a typical contemporary name. '子' is an honorific, and '轩' implies elevation. Together it suggests learning, talent, and an extraordinary bearing.",
    similarNames: ["子涵", "子墨", "宇轩", "泽轩"],
  },
  "梓涵": {
    name: "梓涵",
    pinyin: "Zǐ Hán",
    gender: "girl",
    meaning: "Elegant and contained",
    meaningCn: "优雅内涵,德才兼备",
    style: "Modern",
    origin: "Chinese",
    characterCount: 2,
    strokes: 12,
    description: "梓为木中之贵,涵为包容蕴含。此名寓意女孩如树木般茁壮成长,内心涵养丰富。",
    descriptionEn: "梓 is a noble tree, while 涵 means to contain and embrace. The name suggests a girl who grows strong like a tree, with rich inner cultivation.",
    similarNames: ["诗涵", "雨涵", "思涵"],
  },
  "雅静": {
    name: "雅静",
    pinyin: "Yǎ Jìng",
    gender: "girl",
    meaning: "Elegant and serene",
    meaningCn: "温文尔雅,娴静大方",
    style: "Classic",
    origin: "Chinese",
    characterCount: 2,
    strokes: 16,
    description: "雅静之名,体现传统女性美德。期望女孩性情温和、举止优雅、内心宁静。",
    descriptionEn: "The name 雅静 embodies traditional feminine virtues, expressing the hope that a girl will be gentle, graceful, and serene at heart.",
    similarNames: ["雅婷", "雅琳", "雅晴"],
  },
};

export default async function NameDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NamePage");
  const nameData = namesData[slug];

  if (!nameData) {
    notFound();
  }

  const genderColor = nameData.gender === "boy" ? "boy" : "girl";
  const isZh = locale === "zh";
  const description = isZh ? nameData.description : nameData.descriptionEn;
  const meaningPrimary = isZh ? nameData.meaningCn : nameData.meaning;
  const meaningSecondary = isZh ? nameData.meaning : nameData.meaningCn;

  return (
    <div className="flex flex-col">
      {/* Claymorphic Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br from-${genderColor}/10 via-background to-background py-20`}>
        <div className={`absolute -top-20 -right-20 h-72 w-72 rounded-full bg-${genderColor}/15 blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-${genderColor}/10 blur-3xl`} />
        <div className="mx-auto max-w-4xl px-4 relative">
          <Link
            href={`/${nameData.gender}`}
            className="btn-clay inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-6"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {nameData.gender === "boy" ? t("backToBoy") : t("backToGirl")}
          </Link>
          <div className="text-center">
            {/* Claymorphic name badge */}
            <div className="card-clay inline-block px-12 py-8 mb-4 animate-clay-in">
              <h1 className="text-7xl font-bold font-display">{nameData.name}</h1>
              <p className="mt-2 text-2xl text-muted font-medium">{nameData.pinyin}</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="btn-clay px-4 py-2 text-sm font-semibold">
                {nameData.style}
              </span>
              <span className="btn-clay px-4 py-2 text-sm font-semibold">
                {nameData.origin}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Meaning */}
              <div className="card-clay p-8">
                <h2 className="mb-4 text-xl font-bold font-display flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {t("meaning")}
                </h2>
                <p className="text-xl font-medium leading-relaxed">{meaningPrimary}</p>
                <p className="mt-2 text-muted">{meaningSecondary}</p>
              </div>

              {/* Description */}
              <div className="card-clay p-8">
                <h2 className="mb-4 text-xl font-bold font-display flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {t("story")}
                </h2>
                <p className="leading-relaxed text-muted">{description}</p>
              </div>

              {/* Similar Names */}
              <div className="card-clay p-8">
                <h2 className="mb-4 text-xl font-bold font-display flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t("similar")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {nameData.similarNames.map((similar) => (
                    <Link
                      key={similar}
                      href={`/name/${similar.toLowerCase()}`}
                      className={`btn-clay-sm px-4 py-2 text-sm font-semibold text-${genderColor} transition-all hover:scale-105`}
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
              <div className="card-clay p-6">
                <h2 className="mb-4 text-lg font-bold font-display">{t("quickFacts.title")}</h2>
                <dl className="space-y-4">
                  {[
                    { label: t("quickFacts.characters"), value: nameData.characterCount },
                    { label: t("quickFacts.strokes"), value: nameData.strokes },
                    { label: t("quickFacts.gender"), value: nameData.gender, capitalize: true },
                    { label: t("quickFacts.origin"), value: nameData.origin },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <dt className="text-muted text-sm">{item.label}</dt>
                      <dd className={`font-bold ${item.value === "boy" ? "text-boy" : item.value === "girl" ? "text-girl" : ""}`}>
                        {item.capitalize ? String(item.value).charAt(0).toUpperCase() + String(item.value).slice(1) : item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Generate CTA */}
              <div className={`card-clay p-6 text-center bg-gradient-to-br from-${genderColor}/10 to-${genderColor}/5`}>
                <h2 className="font-bold font-display text-lg">{t("ctaTitle")}</h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {nameData.gender === "boy"
                    ? t("ctaDescriptionBoy", { name: nameData.name })
                    : t("ctaDescriptionGirl", { name: nameData.name })}
                </p>
                <Link
                  href="/generator"
                  className={`btn-clay-${genderColor} mt-5 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-base shadow-lg`}
                >
                  {t("ctaButton")}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}