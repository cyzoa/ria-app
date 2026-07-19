"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { LogoutButton } from "@/components/home/logout-button";
import { VoiceCta } from "@/components/home/voice-cta";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/" || pathname === "/login";

  return (
    <>
      <main
        className={`mx-auto min-h-dvh max-w-lg ${hideNav ? "" : "app-shell-content"}`}
      >
        {!hideNav && (
          <div className="app-shell-header flex items-center justify-between px-5 sm:px-6">
            <LogoutButton />
            <VoiceCta />
          </div>
        )}
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </>
  );
}
