"use client";

import type { SpeechStyle } from "@/types/database";

interface Props {
  message?: string;
  speechStyle?: SpeechStyle;
}

export function RiaMessage({
  message = "오늘은 오후 일정이 조금 무거워 보여요. 오전에는 중요한 것 하나만 먼저 끝내볼까요?",
  speechStyle = "formal",
}: Props) {
  return (
    <aside aria-label="RIA의 제안" className="fade-in mb-8 border-l-2 border-balance bg-balance/5 px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-balance/10">
          <span className="text-sm font-semibold text-balance">RIA</span>
        </div>
        <div className="min-w-0 pt-1">
          <p className="text-xs font-semibold text-balance">
            {speechStyle === "casual" ? "같이 살펴볼까?" : "함께 살펴볼까요?"}
          </p>
          <p className="mt-1 break-words text-base leading-7 text-text-primary [overflow-wrap:anywhere]">
            {message}
          </p>
        </div>
      </div>
    </aside>
  );
}
