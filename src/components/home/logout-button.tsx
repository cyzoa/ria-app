"use client";

import { logout } from "@/lib/actions/auth";
import type { SpeechStyle } from "@/types/database";

export function LogoutButton({ speechStyle }: { speechStyle: SpeechStyle }) {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-stone text-[13px] hover:text-soft-black transition-colors"
      >
        {speechStyle === "casual" ? "다음에 또 봐, 오빠" : "다음에 또 봬요, 오빠"}
      </button>
    </form>
  );
}
