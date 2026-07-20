import { DEFAULT_LOCALE, resolveLocale, type SupportedLocale } from "@/locales/config";
import { ko } from "@/locales/ko";
import type { WidenDictionary } from "@/locales/types";

export type AppDictionary = WidenDictionary<typeof ko>;

const dictionaries: Record<SupportedLocale, AppDictionary> = {
  ko,
};

export function getDictionary(locale: SupportedLocale = DEFAULT_LOCALE): AppDictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function getDictionaryForPreference(preference: string | null | undefined): AppDictionary {
  return getDictionary(resolveLocale(preference));
}

export { DEFAULT_LOCALE, INTL_LOCALES, SUPPORTED_LOCALES, isSupportedLocale, resolveLocale } from "@/locales/config";
export { formatMessage, getSpeechStyleCopy } from "@/locales/types";
export type { SupportedLocale } from "@/locales/config";
export type { SpeechStyleCopy } from "@/locales/types";
