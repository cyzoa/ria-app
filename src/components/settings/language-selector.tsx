"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLocalePreference } from "@/lib/actions/locale";
import { LOCALE_METADATA, SUPPORTED_LOCALES, type SupportedLocale } from "@/locales/config";
import { formatMessage } from "@/locales/types";
import { useDictionary } from "@/components/providers/locale-provider";
import type { SpeechStyle } from "@/types/database";

interface Props {
  currentLocale: SupportedLocale;
  speechStyle: SpeechStyle;
}

export function LanguageSelector({ currentLocale, speechStyle }: Props) {
  const [activeLocale, setActiveLocale] = useState(currentLocale);
  const [message, setMessage] = useState<"success" | "error" | null>(null);
  const [pending, startTransition] = useTransition();
  const mutationRef = useRef(false);
  const router = useRouter();
  const copy = useDictionary().settings.language;

  useEffect(() => {
    setActiveLocale(currentLocale);
  }, [currentLocale]);

  function handleLocaleChange(locale: SupportedLocale) {
    if (mutationRef.current || locale === activeLocale) return;

    const previousLocale = activeLocale;
    mutationRef.current = true;
    setActiveLocale(locale);
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await updateLocalePreference(locale);
        if (result.error) {
          setActiveLocale(previousLocale);
          setMessage("error");
          return;
        }

        setMessage("success");
        router.refresh();
      } finally {
        mutationRef.current = false;
      }
    });
  }

  return (
    <section aria-labelledby="language-heading" className="rounded-2xl bg-surface p-4 sm:p-5">
      <div className="mb-5">
        <h2 id="language-heading" className="text-lg font-semibold text-text-primary">
          {copy.title}
        </h2>
        <p className="mt-1 text-sm leading-5 text-text-secondary">
          {copy.description[speechStyle]}
        </p>
      </div>

      <fieldset aria-busy={pending}>
        <legend className="sr-only">{copy.legend}</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {SUPPORTED_LOCALES.map((locale) => {
            const selected = activeLocale === locale;
            const label = LOCALE_METADATA[locale].nativeLabel;

            return (
              <button
                key={locale}
                type="button"
                onClick={() => handleLocaleChange(locale)}
                disabled={pending}
                aria-pressed={selected}
                aria-label={formatMessage(copy.optionLabel, {
                  label,
                  state: selected ? copy.selected : copy.select,
                })}
                className={`min-h-16 rounded-2xl border px-4 py-3 text-left transition-colors disabled:opacity-80 ${
                  selected
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface hover:bg-surface-muted"
                }`}
              >
                <span className="flex min-w-0 items-center justify-between gap-2">
                  <span className="min-w-0 break-words text-base font-semibold text-text-primary">
                    {label}
                  </span>
                  {selected && (
                    <span className="shrink-0 text-sm font-medium text-primary">
                      <span aria-hidden="true">✓ </span>
                      {copy.selected}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {pending && (
        <p role="status" className="mt-4 text-sm text-text-secondary">
          {copy.saving}
        </p>
      )}
      {message === "success" && !pending && (
        <p role="status" className="mt-4 text-sm text-balance">
          {copy.saved}
        </p>
      )}
      {message === "error" && !pending && (
        <p role="alert" className="mt-4 text-sm leading-5 text-danger">
          {copy.saveError}
        </p>
      )}
    </section>
  );
}
