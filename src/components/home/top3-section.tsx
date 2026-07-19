"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleTaskComplete } from "@/lib/actions/tasks";
import type { Task } from "@/types/database";
import type { SpeechStyle } from "@/types/database";
import { cn } from "@/lib/utils";

interface Props {
  tasks: Task[];
  speechStyle?: SpeechStyle;
}

const emptyMessages = {
  formal: {
    empty: "오늘 할 일을 아직 안 정했어요.\n떠오르는 것부터 하나 적어볼까요?",
  },
  casual: {
    empty: "오늘 할 일을 아직 안 정했어.\n떠오르는 것부터 하나 적어볼까?",
  },
};

export function Top3Section({ tasks, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle(task: Task) {
    startTransition(async () => {
      await toggleTaskComplete(task.id, task.status !== "done");
    });
  }

  return (
    <section aria-labelledby="top-priorities-title" className="mb-10">
      <div className="mb-3">
        <h2 id="top-priorities-title" className="text-sm font-semibold text-text-primary">
          지금 가능한 한 걸음
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          가장 의미 있는 일부터 하나씩 이어가요.
        </p>
      </div>

      {tasks.length === 0 ? (
        <button
          onClick={() => router.push("/tasks")}
          className="w-full rounded-2xl bg-surface-muted px-4 py-4 text-left"
        >
          <p className="whitespace-pre-line break-words text-base leading-relaxed text-text-secondary">
            {emptyMessages[speechStyle].empty}
          </p>
          <p className="mt-2 text-sm font-medium text-primary">할 일에서 정하기</p>
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
                  aria-label={`${task.title} ${task.status === "done" ? "미완료로 변경" : "완료"}`}
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
                    <p className="mb-1 text-xs font-semibold text-primary">먼저</p>
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
