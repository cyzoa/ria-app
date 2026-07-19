"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Today", icon: "🏠", activePaths: ["/home"] },
  { href: "/tasks", label: "Tasks", icon: "✓", activePaths: ["/tasks"] },
  { href: "/inbox", label: "Inbox", icon: "📥", activePaths: ["/inbox"] },
  { href: "/notes", label: "Notes", icon: "📝", activePaths: ["/notes"] },
  {
    href: "/more",
    label: "More",
    icon: "•••",
    activePaths: ["/more", "/projects", "/settings"],
  },
] as const;

function isPathActive(pathname: string, activePaths: readonly string[]) {
  return activePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="주요 내비게이션"
      className="app-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md"
    >
      <div className="app-bottom-nav-inner mx-auto grid w-full max-w-lg grid-cols-5 items-stretch gap-1 px-2 py-1.5">
        {navItems.map(({ href, label, icon, activePaths }) => {
          const isActive = isPathActive(pathname, activePaths);

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center text-[11px] leading-tight transition-colors",
                isActive
                  ? "bg-primary-soft font-semibold text-primary"
                  : "font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-6 min-w-8 items-center justify-center rounded-full text-base leading-none",
                  isActive && "bg-surface"
                )}
              >
                {icon}
              </span>
              <span className="max-w-full break-words [overflow-wrap:anywhere]">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
