"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSpeechStyle } from "@/lib/actions/settings";
import type { SpeechStyle } from "@/types/database";

interface Props {
  currentStyle: SpeechStyle | null;
}

export function SpeechStyleToggle({ currentStyle }: Props) {
  const [activeStyle, setActiveStyle] = useState<SpeechStyle | null>(currentStyle);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setActiveStyle(currentStyle);
  }, [currentStyle]);

  function handleToggle(style: SpeechStyle) {
    setActiveStyle(style);
    startTransition(async () => {
      const result = await updateSpeechStyle(style);
      if (!result.error) {
        router.refresh();
      }
    });
  }

  return (
    <div className="border-divider rounded-2xl border bg-card-white p-4">
      <h3 className="mb-3 text-[16px] font-medium">말투 설정</h3>
      <div className="flex gap-2">
        <button
          onClick={() => handleToggle("formal")}
          disabled={pending}
          className={`flex-1 rounded-lg px-4 py-2 text-[13px] transition-opacity hover:opacity-90 disabled:opacity-50 ${
            activeStyle === "formal" || activeStyle === null
              ? "bg-gold text-card-white"
              : "border-divider border"
          }`}
        >
          존댓말
        </button>
        <button
          onClick={() => handleToggle("casual")}
          disabled={pending}
          className={`flex-1 rounded-lg px-4 py-2 text-[13px] transition-opacity hover:opacity-90 disabled:opacity-50 ${
            activeStyle === "casual"
              ? "bg-gold text-card-white"
              : "border-divider border"
          }`}
        >
          반말
        </button>
      </div>
      <p className="text-stone mt-2 text-[13px]">
        {activeStyle === "casual" ? "반말 모드입니다." : "존댓말 모드입니다."}
      </p>
    </div>
  );
}
