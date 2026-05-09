import { getTranslations, setRequestLocale } from "next-intl/server";
import GeneratorForm from "@/components/generator/GeneratorForm";

export default async function GeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("GeneratorPage");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-24">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 text-center relative animate-clay-in">
          <h1 className="text-5xl font-bold font-display">{t("hero.title")}</h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">{t("hero.description")}</p>
        </div>
      </section>

      {/* Form */}
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <GeneratorForm />
        </div>
      </section>
    </div>
  );
}