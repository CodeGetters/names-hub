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
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">{t("hero.title")}</h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto">{t("hero.description")}</p>
        </div>
      </section>

      <section className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <GeneratorForm />
        </div>
      </section>
    </div>
  );
}
