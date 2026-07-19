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
      <main className={`mx-auto min-h-dvh max-w-lg ${hideNav ? "" : "pb-20"}`}>
        {!hideNav && (
          <div className="px-6 pt-12 flex justify-between items-center">
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
