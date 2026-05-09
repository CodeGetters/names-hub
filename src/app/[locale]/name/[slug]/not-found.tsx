import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NameNotFound() {
  const t = await getTranslations("NamePage.notFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="card-clay p-12 max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold font-display">{t("title")}</h1>
        <p className="mt-4 text-muted leading-relaxed">{t("genericDescription")}</p>
        <Link
          href="/"
          className="btn-clay-primary mt-8 inline-flex items-center gap-2 px-6 py-3 font-semibold"
        >
          {t("backHome")}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}