import { getDictionary, INTL_LOCALES, type SupportedLocale } from "@/locales";
import type { SpeechStyle } from "@/types/database";

export function getGreetingTemplate(
  speechStyle: SpeechStyle = "formal",
  locale: SupportedLocale = "ko",
  hasName = false
): string {
  const hour = new Date().getHours();
  const greeting = getDictionary(locale).home.greeting;
  const period = hour < 12 ? greeting.morning : hour < 18 ? greeting.afternoon : greeting.evening;
  const copy = period[speechStyle];

  return hasName ? copy.withName : copy.withoutName;
}

export function formatDate(
  date: Date = new Date(),
  locale: SupportedLocale = "ko",
  timeZone = "Asia/Seoul"
): string {
  return date.toLocaleDateString(INTL_LOCALES[locale], {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
