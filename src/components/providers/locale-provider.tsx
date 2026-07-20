"use client";

import { createContext, useContext } from "react";
import type { Dictionary, SupportedLocale } from "@/locales";

interface LocaleContextValue {
  locale: SupportedLocale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  dictionary,
  locale,
}: LocaleContextValue & { children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ dictionary, locale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return value;
}

export function useDictionary() {
  return useLocale().dictionary;
}
