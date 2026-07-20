export const DEFAULT_LOCALE = "ko" as const;

export const SUPPORTED_LOCALES = [DEFAULT_LOCALE] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const INTL_LOCALES: Record<SupportedLocale, string> = {
  ko: "ko-KR",
};

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export function resolveLocale(value: string | null | undefined): SupportedLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}
