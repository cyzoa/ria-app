import type { Metadata, Viewport } from "next";
import { INTL_LOCALES } from "@/locales";
import { getRequestLocale } from "@/lib/locale";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIA — Life Rhythm Companion",
  description: "천천히 시작하자, 오빠.",
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html lang={INTL_LOCALES[locale]}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
