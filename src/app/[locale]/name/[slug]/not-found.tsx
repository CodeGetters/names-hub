import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NameNotFound() {
  const t = await getTranslations("NamePage.notFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 max-w-md text-muted">{t("genericDescription")}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
