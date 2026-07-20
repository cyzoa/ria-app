"use client";

import { logout } from "@/lib/actions/auth";
import { useDictionary } from "@/components/providers/locale-provider";
import { formatMessage } from "@/locales/types";
import type { SpeechStyle } from "@/types/database";

export function LogoutButton({
  displayName,
  speechStyle,
}: {
  displayName: string;
  speechStyle: SpeechStyle;
}) {
  const copy = useDictionary().appShell.logout[speechStyle];
  const label = displayName
    ? formatMessage(copy.withName, { name: displayName })
    : copy.withoutName;

  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-stone text-[13px] hover:text-soft-black transition-colors"
      >
        {label}
      </button>
    </form>
  );
}
