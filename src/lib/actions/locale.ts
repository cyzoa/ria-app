"use server";

import { cookies } from "next/headers";
import {
  isSupportedLocale,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
} from "@/locales";

export type LocalePreferenceResult = {
  error?: "invalid_locale" | "save_failed";
};

export async function updateLocalePreference(locale: string): Promise<LocalePreferenceResult> {
  if (!isSupportedLocale(locale)) {
    return { error: "invalid_locale" };
  }

  try {
    const cookieStore = await cookies();
    cookieStore.set(LOCALE_COOKIE_NAME, locale, {
      httpOnly: true,
      maxAge: LOCALE_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return {};
  } catch {
    return { error: "save_failed" };
  }
}
