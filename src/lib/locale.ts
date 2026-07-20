import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import {
  getDictionary,
  LOCALE_COOKIE_NAME,
  resolveLocale,
  type Dictionary,
  type SupportedLocale,
} from "@/locales";

export const getRequestLocale = cache(async (): Promise<SupportedLocale> => {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
});

export const getRequestDictionary = cache(async (): Promise<Dictionary> => {
  return getDictionary(await getRequestLocale());
});
