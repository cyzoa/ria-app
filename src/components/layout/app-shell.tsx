"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { LogoutButton } from "@/components/home/logout-button";
import { VoiceCta } from "@/components/home/voice-cta";
import { LocaleProvider } from "@/components/providers/locale-provider";
import type { Dictionary, SupportedLocale } from "@/locales";
import type { SpeechStyle } from "@/types/database";

export function AppShell({
  children,
  dictionary,
  displayName,
  locale,
  speechStyle,
}: {
  children: React.ReactNode;
  dictionary: Dictionary;
  displayName: string;
  locale: SupportedLocale;
  speechStyle: SpeechStyle;
}) {
  const pathname = usePathname();
  const hideNav = pathname === "/" || pathname === "/login";

  return (
    <LocaleProvider dictionary={dictionary} locale={locale}>
      <div lang={locale} className="contents">
        <main
          className={`mx-auto min-h-dvh max-w-lg ${hideNav ? "" : "app-shell-content"}`}
        >
          {!hideNav && (
            <div className="app-shell-header flex items-center justify-between px-5 sm:px-6">
              <LogoutButton displayName={displayName} speechStyle={speechStyle} />
              <VoiceCta speechStyle={speechStyle} />
            </div>
          )}
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </LocaleProvider>
  );
}
