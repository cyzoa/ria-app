"use client";

import { useDictionary } from "@/components/providers/locale-provider";
import type { SpeechStyle } from "@/types/database";

interface Props {
  message?: string;
  speechStyle?: SpeechStyle;
}

export function RiaMessage({
  message,
  speechStyle = "formal",
}: Props) {
  const copy = useDictionary().home.suggestion;

  return (
    <aside aria-label={copy.label} className="fade-in mb-8 border-l-2 border-balance bg-balance/5 px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-balance/10">
          <span className="text-sm font-semibold text-balance">RIA</span>
        </div>
        <div className="min-w-0 pt-1">
          <p className="text-xs font-semibold text-balance">
            {copy.heading[speechStyle]}
          </p>
          <p className="mt-1 break-words text-base leading-7 text-text-primary [overflow-wrap:anywhere]">
            {message ?? copy.afternoonHeavy[speechStyle]}
          </p>
        </div>
      </div>
    </aside>
  );
}
