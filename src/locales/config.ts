export const DEFAULT_LOCALE = "ko" as const;

export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, "en", "ja", "es", "fr", "de", "ru"] as const;

export const PLANNED_LOCALES = [] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_COOKIE_NAME = "ria_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOCALE_METADATA: Record<
  SupportedLocale,
  { nativeLabel: string; intlLocale: string }
> = {
  ko: { nativeLabel: "한국어", intlLocale: "ko-KR" },
  en: { nativeLabel: "English", intlLocale: "en" },
  ja: { nativeLabel: "日本語", intlLocale: "ja-JP" },
  es: { nativeLabel: "Español", intlLocale: "es" },
  fr: { nativeLabel: "Français", intlLocale: "fr" },
  de: { nativeLabel: "Deutsch", intlLocale: "de" },
  ru: { nativeLabel: "Русский", intlLocale: "ru" },
};

export const INTL_LOCALES: Record<SupportedLocale, string> = Object.fromEntries(
  SUPPORTED_LOCALES.map((locale) => [locale, LOCALE_METADATA[locale].intlLocale])
) as Record<SupportedLocale, string>;

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export function resolveLocale(value: string | null | undefined): SupportedLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}
