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
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 max-w-md text-muted">{t("description")}</p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border px-6 py-3 font-medium hover:bg-muted-bg"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
