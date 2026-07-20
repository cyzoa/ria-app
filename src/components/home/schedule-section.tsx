"use client";

import { useRouter } from "next/navigation";
import type { Task } from "@/types/database";
import type { SpeechStyle } from "@/types/database";
import { useLocale } from "@/components/providers/locale-provider";
import { INTL_LOCALES, type SupportedLocale } from "@/locales/config";

interface Props {
  tasks: Task[];
  speechStyle?: SpeechStyle;
  timeZone?: string;
}

function formatScheduleTime(dueDate: string, locale: SupportedLocale, timeZone: string) {
  return new Date(dueDate).toLocaleTimeString(INTL_LOCALES[locale], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
}

export function ScheduleSection({
  tasks,
  speechStyle = "formal",
  timeZone = "Asia/Seoul",
}: Props) {
  const router = useRouter();
  const [nextTask, ...laterTasks] = tasks;
  const { dictionary, locale } = useLocale();
  const copy = dictionary.home.schedule;

  return (
    <section aria-labelledby="schedule-title" className="mb-10">
      <div className="mb-3">
        <h2 id="schedule-title" className="text-sm font-semibold text-text-primary">
          {copy.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {copy.description[speechStyle]}
        </p>
      </div>

      {!nextTask ? (
        <button
          onClick={() => router.push("/tasks")}
          className="w-full rounded-2xl bg-surface-muted px-4 py-4 text-left"
        >
          <p className="whitespace-pre-line break-words text-base leading-relaxed text-text-secondary">
            {copy.empty[speechStyle]}
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {copy.add[speechStyle]}
          </p>
        </button>
      ) : (
        <div>
          <div className="rounded-2xl bg-surface px-4 py-4">
            <div className="flex min-w-0 items-start gap-3">
              {nextTask.due_date && (
                <time
                  dateTime={nextTask.due_date}
                  className="shrink-0 rounded-full bg-primary-soft px-3 py-2 text-sm font-semibold text-primary"
                >
                  {formatScheduleTime(nextTask.due_date, locale, timeZone)}
                </time>
              )}
              <div className="min-w-0 flex-1 py-1">
                <p className="text-xs font-medium text-text-secondary">{copy.nearest}</p>
                <p className="mt-1 break-words text-[17px] font-medium leading-relaxed text-text-primary [overflow-wrap:anywhere]">
                  {nextTask.title}
                </p>
              </div>
            </div>
          </div>

          {laterTasks.length > 0 && (
            <div className="mt-3 px-1">
              <p className="mb-1 text-xs font-medium text-text-secondary">{copy.later}</p>
              <ul className="divide-y divide-border">
                {laterTasks.map((task) => (
                  <li key={task.id} className="flex min-w-0 items-start gap-3 py-3">
                    {task.due_date && (
                      <time
                        dateTime={task.due_date}
                        className="w-16 shrink-0 text-sm font-medium text-text-secondary"
                      >
                        {formatScheduleTime(task.due_date, locale, timeZone)}
                      </time>
                    )}
                    <span className="min-w-0 break-words text-sm leading-relaxed text-text-primary [overflow-wrap:anywhere]">
                      {task.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
