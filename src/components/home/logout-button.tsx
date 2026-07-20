"use client";

import { logout } from "@/lib/actions/auth";
import { getDictionary } from "@/locales";
import type { SpeechStyle } from "@/types/database";

export function LogoutButton({ speechStyle }: { speechStyle: SpeechStyle }) {
  const copy = getDictionary().appShell.logout;

  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-stone text-[13px] hover:text-soft-black transition-colors"
      >
        {copy[speechStyle]}
      </button>
    </form>
  );
}
