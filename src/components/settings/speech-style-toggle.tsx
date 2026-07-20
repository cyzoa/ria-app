"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSpeechStyle } from "@/lib/actions/settings";
import { useDictionary } from "@/components/providers/locale-provider";
import { formatMessage } from "@/locales/types";
import type { SpeechStyle } from "@/types/database";

interface Props {
  currentStyle: SpeechStyle | null;
}

export function SpeechStyleToggle({ currentStyle }: Props) {
  const [activeStyle, setActiveStyle] = useState<SpeechStyle | null>(currentStyle);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [pending, startTransition] = useTransition();
  const mutationRef = useRef(false);
  const router = useRouter();
  const copy = useDictionary().settings.speechStyle;
  const styleOptions: Array<{
    value: SpeechStyle;
    label: string;
    accessibleLabel: string;
    example: string;
  }> = [
    {
      value: "formal",
      label: copy.formalLabel,
      accessibleLabel: copy.formalAccessibleLabel,
      example: copy.formalExample,
    },
    {
      value: "casual",
      label: copy.casualLabel,
      accessibleLabel: copy.casualAccessibleLabel,
      example: copy.casualExample,
    },
  ];

  useEffect(() => {
    setActiveStyle(currentStyle);
  }, [currentStyle]);

  function handleToggle(style: SpeechStyle) {
    const selectedStyle = activeStyle ?? "formal";
    if (mutationRef.current || style === selectedStyle) return;

    const previousStyle = activeStyle;
    mutationRef.current = true;
    setActiveStyle(style);
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await updateSpeechStyle(style);
        if (result.error) {
          setActiveStyle(previousStyle);
          setMessage({ type: "error", text: result.error });
          return;
        }

        setMessage({
          type: "success",
          text: copy.saved[style],
        });
        router.refresh();
      } finally {
        mutationRef.current = false;
      }
    });
  }

  const selectedStyle = activeStyle ?? "formal";

  return (
    <section aria-labelledby="speech-style-heading" className="rounded-2xl bg-surface p-4 sm:p-5">
      <div className="mb-5">
        <h2 id="speech-style-heading" className="text-lg font-semibold text-text-primary">
          {copy.title}
        </h2>
        <p className="mt-1 text-sm leading-5 text-text-secondary">
          {copy.description[selectedStyle]}
        </p>
      </div>

      <fieldset aria-busy={pending}>
        <legend className="sr-only">{copy.legend}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {styleOptions.map((option) => {
            const selected = selectedStyle === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleToggle(option.value)}
                disabled={pending}
                aria-pressed={selected}
                aria-label={formatMessage(copy.optionLabel, {
                  label: option.accessibleLabel,
                  state: selected ? copy.selected : copy.select,
                })}
                className={`min-h-24 rounded-2xl border px-4 py-4 text-left transition-colors disabled:opacity-80 ${
                  selected
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface hover:bg-surface-muted"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold text-text-primary">{option.label}</span>
                  {selected && (
                    <span className="shrink-0 text-sm font-medium text-primary">
                      <span aria-hidden="true">✓ </span>{copy.selected}
                    </span>
                  )}
                </span>
                <span className="mt-2 block text-sm leading-5 text-text-secondary">
                  “{option.example}”
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {pending && (
        <p role="status" className="mt-4 text-sm text-text-secondary">
          {copy.saving[selectedStyle]}
        </p>
      )}
      {message?.type === "success" && !pending && (
        <p role="status" className="mt-4 text-sm text-balance">
          {message.text}
        </p>
      )}
      {message?.type === "error" && !pending && (
        <p role="alert" className="mt-4 text-sm leading-5 text-danger">
          {message.text}
        </p>
      )}
    </section>
  );
}
