"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleTaskComplete } from "@/lib/actions/tasks";
import type { Task } from "@/types/database";
import type { SpeechStyle } from "@/types/database";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/components/providers/locale-provider";
import { formatMessage } from "@/locales/types";

interface Props {
  tasks: Task[];
  speechStyle?: SpeechStyle;
}

export function Top3Section({ tasks, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const copy = useDictionary().home.priorities;

  function handleToggle(task: Task) {
    startTransition(async () => {
      await toggleTaskComplete(task.id, task.status !== "done");
    });
  }

  return (
    <section aria-labelledby="top-priorities-title" className="mb-10">
      <div className="mb-3">
        <h2 id="top-priorities-title" className="text-sm font-semibold text-text-primary">
          {copy.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {copy.description[speechStyle]}
        </p>
      </div>

      {tasks.length === 0 ? (
        <button
          onClick={() => router.push("/tasks")}
          className="w-full rounded-2xl bg-surface-muted px-4 py-4 text-left"
        >
          <p className="whitespace-pre-line break-words text-base leading-relaxed text-text-secondary">
            {copy.empty[speechStyle]}
          </p>
          <p className="mt-2 text-sm font-medium text-primary">{copy.choose}</p>
        </button>
      ) : (
        <ul className={cn("space-y-2", pending && "opacity-60")} aria-busy={pending}>
          {tasks.map((task, index) => {
            const isFirst = index === 0;

            return (
              <li
                key={task.id}
                className={cn(
                  "flex min-w-0 items-start gap-2",
                  isFirst
                    ? "rounded-2xl bg-surface px-3 py-4"
                    : "border-t border-border px-1 py-3"
                )}
              >
                <button
                  onClick={() => handleToggle(task)}
                  disabled={pending}
                  aria-label={formatMessage(
                    task.status === "done" ? copy.reopenLabel : copy.completeLabel,
                    { title: task.title }
                  )}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full disabled:opacity-50"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                      task.status === "done"
                        ? "border-balance bg-balance text-white"
                        : "border-text-secondary"
                    )}
                  >
                    {task.status === "done" && "✓"}
                  </span>
                </button>

                <div className="min-w-0 flex-1 pt-2">
                  {isFirst && (
                    <p className="mb-1 text-xs font-semibold text-primary">{copy.first}</p>
                  )}
                  <p
                    className={cn(
                      "break-words leading-relaxed text-text-primary [overflow-wrap:anywhere]",
                      isFirst ? "text-[18px] font-medium" : "text-base",
                      task.status === "done" && "text-text-secondary line-through"
                    )}
                  >
                    {task.title}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
