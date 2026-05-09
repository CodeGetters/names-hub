import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito } from "next/font/google";
import { Fredoka } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: ["baby names", "Chinese names", "English names", "name generator", "bilingual names", "婴儿取名"],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${fredoka.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-background">
        <NextIntlClientProvider>
          <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary font-display tracking-tight hover:scale-105 transition-transform">
                  {t("siteName")}
                </Link>
                <nav className="flex items-center gap-2 text-sm">
                  <Link href="/boy" className="btn-clay px-4 py-2 text-boy font-semibold text-sm">
                    {t("nav.boyNames")}
                  </Link>
                  <Link href="/girl" className="btn-clay px-4 py-2 text-girl font-semibold text-sm">
                    {t("nav.girlNames")}
                  </Link>
                  <Link href="/generator" className="btn-clay px-4 py-2 hover:text-primary text-sm">
                    {t("nav.generator")}
                  </Link>
                  <Link href="/about" className="btn-clay px-4 py-2 hover:text-primary text-sm">
                    {t("nav.about")}
                  </Link>
                  <LocaleSwitcher />
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border bg-card mt-auto py-8">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted">
              <p className="font-medium">{t("footer.copyright")}</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
