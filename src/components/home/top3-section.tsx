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
    <section className="mb-12">
      <h2 className="mb-3 text-[13px] font-medium tracking-wide uppercase text-soft-black">
        Today&apos;s Top 3
      </h2>
      <div className="border-divider rounded-2xl border bg-card-white p-6">
        {tasks.length === 0 ? (
          <button
            onClick={() => router.push("/tasks")}
            className="w-full text-left"
          >
            <p className="text-stone whitespace-pre-line text-[16px]">{emptyMessages[speechStyle].empty}</p>
          </button>
        ) : (
          <ul className={cn("space-y-3", pending && "opacity-60")}>
            {tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3">
                <button
                  onClick={() => handleToggle(task)}
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    task.status === "done"
                      ? "border-gold bg-gold text-card-white"
                      : "border-divider"
                  )}
                >
                  {task.status === "done" && "✓"}
                </button>
                <span
                  className={cn(
                    "text-[16px] transition-all duration-300",
                    task.status === "done" && "text-stone line-through"
                  )}
                >
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
