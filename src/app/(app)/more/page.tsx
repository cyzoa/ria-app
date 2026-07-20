import Link from "next/link";
import { getRequestDictionary } from "@/lib/locale";

export default async function MorePage() {
  const dictionary = await getRequestDictionary();
  const copy = dictionary.more;
  const moreLinks = [
    {
      href: "/projects",
      label: dictionary.navigation.projects,
      description: copy.projectsDescription,
      icon: "◉",
    },
    {
      href: "/settings",
      label: dictionary.navigation.settings,
      description: copy.settingsDescription,
      icon: "⚙️",
    },
  ] as const;

  return (
    <div className="fade-in px-5 pb-8 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-md text-base leading-7 text-text-secondary">
          {copy.description}
        </p>
      </header>

      <nav aria-label={copy.navigationLabel}>
        <ul className="space-y-3">
          {moreLinks.map(({ href, label, description, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex min-h-20 min-w-0 items-center gap-4 rounded-2xl bg-surface px-4 py-4 transition-colors hover:bg-primary-soft"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg text-primary"
                >
                  {icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-base font-semibold text-text-primary [overflow-wrap:anywhere]">
                    {label}
                  </span>
                  <span className="mt-1 block break-words text-sm leading-relaxed text-text-secondary [overflow-wrap:anywhere]">
                    {description}
                  </span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-primary">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
