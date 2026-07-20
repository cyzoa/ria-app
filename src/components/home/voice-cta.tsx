"use client";

import { useState } from "react";
import type { SpeechStyle } from "@/types/database";

export function VoiceCta({ speechStyle }: { speechStyle: SpeechStyle }) {
  const [isListening, setIsListening] = useState(false);

  function handleClick() {
    setIsListening(true);
    // P1 단계에서 실제 음성 인식 연결
    setTimeout(() => setIsListening(false), 3000);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isListening}
      aria-label={isListening ? "RIA 음성 입력 듣는 중" : "RIA 음성 입력 열기"}
      className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${
        isListening
          ? "bg-gold scale-110 animate-pulse"
          : "bg-gold hover:scale-105"
      }`}
    >
      <img
        src="/RIA_Profile_Avatar_Circular.png"
        alt="RIA"
        className={`h-full w-full object-cover ${isListening ? "opacity-60" : ""}`}
      />
      {isListening && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-[10px] font-medium text-card-white">
          {speechStyle === "casual" ? "듣고 있어" : "듣고 있어요"}
        </span>
      )}
    </button>
  );
}
