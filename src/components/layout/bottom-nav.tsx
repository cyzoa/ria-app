"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: "🏠" },
  { href: "/tasks", label: "Tasks", icon: "✓" },
  { href: "/projects", label: "Projects", icon: "◉" },
  { href: "/inbox", label: "Inbox", icon: "📥" },
  { href: "/notes", label: "Notes", icon: "📝" },
  { href: "/settings", label: "설정", icon: "⚙️" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border fixed inset-x-0 bottom-0 z-50 border-t bg-warm-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs transition-colors",
                isActive ? "text-gold" : "text-muted hover:text-soft-black"
              )}
            >
              <span className="text-base leading-none">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
