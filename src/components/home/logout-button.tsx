"use client";

import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-stone text-[13px] hover:text-soft-black transition-colors"
      >
        다음에 또 봐, 오빠
      </button>
    </form>
  );
}
