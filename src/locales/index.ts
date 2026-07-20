import { de } from "@/locales/de";
import { DEFAULT_LOCALE, resolveLocale, type SupportedLocale } from "@/locales/config";
import { en } from "@/locales/en";
import { es } from "@/locales/es";
import { fr } from "@/locales/fr";
import { ja } from "@/locales/ja";
import { ko } from "@/locales/ko";
import { ru } from "@/locales/ru";
import type { Dictionary } from "@/locales/schema";

const dictionaries = {
  ko,
  en,
  ja,
  es,
  fr,
  de,
  ru,
} satisfies Record<SupportedLocale, Dictionary>;

export function getDictionary(locale: SupportedLocale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function getDictionaryForPreference(preference: string | null | undefined): Dictionary {
  return getDictionary(resolveLocale(preference));
}

export {
  DEFAULT_LOCALE,
  INTL_LOCALES,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  LOCALE_METADATA,
  PLANNED_LOCALES,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  resolveLocale,
} from "@/locales/config";
export { formatCountMessage, formatMessage, getSpeechStyleCopy } from "@/locales/types";
export type { Dictionary } from "@/locales/schema";
export type { SupportedLocale } from "@/locales/config";
export type { CountMessage, SpeechStyleCopy } from "@/locales/types";
