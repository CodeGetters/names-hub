import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Names Hub - AI Baby Name Generator | Chinese & English Names",
  description: "Discover the perfect baby name with AI. Generate beautiful Chinese-English bilingual names for your baby. Free, instant, and personalized.",
  keywords: ["baby names", "Chinese names", "English names", "name generator", "bilingual names", "婴儿取名"],
  openGraph: {
    title: "Names Hub - AI Baby Name Generator",
    description: "Generate beautiful Chinese-English baby names with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-primary">
                Names Hub
              </a>
              <nav className="flex gap-6 text-sm">
                <a href="/boy" className="text-boy hover:text-boy/80 font-medium">Boy Names</a>
                <a href="/girl" className="text-girl hover:text-girl/80 font-medium">Girl Names</a>
                <a href="/generator" className="hover:text-primary">Generator</a>
                <a href="/about" className="hover:text-primary">About</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-card py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted">
            <p>&copy; 2026 Names Hub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
