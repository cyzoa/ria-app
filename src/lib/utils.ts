import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SpeechStyle } from "@/types/database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(speechStyle: SpeechStyle = "formal"): string {
  const hour = new Date().getHours();
  
  if (speechStyle === "casual") {
    // 반말 모드 (기존 Voice Guide v0.1 기준)
    if (hour < 12) return "좋은 아침이야";
    if (hour < 18) return "좋은 오후야";
    return "좋은 저녁이야";
  } else {
    // 존댓말 모드 (새로운 Home Screen v1.0 기준)
    if (hour < 12) return "좋은 아침이에요.";
    if (hour < 18) return "오후 리듬을 같이 볼까요.";
    return "오늘 하루를 천천히 정리해볼까요.";
  }
}

export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
