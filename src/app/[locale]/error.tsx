"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="card-clay p-10 max-w-md">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold font-display">{t("title")}</h1>
        <p className="mt-4 text-muted leading-relaxed">{t("description")}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-clay-primary px-6 py-3 font-semibold"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="btn-clay px-6 py-3 font-semibold text-center"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}