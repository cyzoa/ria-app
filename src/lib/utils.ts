import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDictionary, INTL_LOCALES, type SupportedLocale } from "@/locales";
import type { SpeechStyle } from "@/types/database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(
  speechStyle: SpeechStyle = "formal",
  locale: SupportedLocale = "ko"
): string {
  const hour = new Date().getHours();
  const greeting = getDictionary(locale).home.greeting;

  if (hour < 12) return greeting.morning[speechStyle];
  if (hour < 18) return greeting.afternoon[speechStyle];
  return greeting.evening[speechStyle];
}

export function formatDate(
  date: Date = new Date(),
  locale: SupportedLocale = "ko"
): string {
  return date.toLocaleDateString(INTL_LOCALES[locale], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
