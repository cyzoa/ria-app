"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSpeechStyle } from "@/lib/actions/settings";
import type { SpeechStyle } from "@/types/database";

interface Props {
  currentStyle: SpeechStyle | null;
}

const styleOptions: Array<{
  value: SpeechStyle;
  label: string;
  example: string;
}> = [
  {
    value: "formal",
    label: "존댓말",
    example: "오늘도 함께 살펴볼까요?",
  },
  {
    value: "casual",
    label: "반말",
    example: "오늘도 같이 살펴볼까?",
  },
];

export function SpeechStyleToggle({ currentStyle }: Props) {
  const [activeStyle, setActiveStyle] = useState<SpeechStyle | null>(currentStyle);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [pending, startTransition] = useTransition();
  const mutationRef = useRef(false);
  const router = useRouter();

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

        setMessage({ type: "success", text: "말투를 저장했어요." });
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
          말투 설정
        </h2>
        <p className="mt-1 text-sm leading-5 text-text-secondary">
          편안하게 느껴지는 말투를 선택하세요.
        </p>
      </div>

      <fieldset aria-busy={pending}>
        <legend className="sr-only">RIA 말투 선택</legend>
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
                      <span aria-hidden="true">✓ </span>선택됨
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
          말투를 저장하고 있어요…
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
