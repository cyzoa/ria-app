"use client";

import { useRouter } from "next/navigation";
import type { Task } from "@/types/database";
import type { SpeechStyle } from "@/types/database";

interface Props {
  tasks: Task[];
  speechStyle?: SpeechStyle;
}

const emptyMessages = {
  formal: {
    description: "시간의 흐름을 한 번만 가볍게 살펴보세요.",
    empty: "오늘은 일정이 비어 있어요.\n느긋하게 보낼 수 있는 하루네요.",
    add: "일정이 필요하면 추가해보세요",
  },
  casual: {
    description: "시간의 흐름을 한 번만 가볍게 살펴봐.",
    empty: "오늘은 일정이 비어 있어.\n느긋하게 보낼 수 있는 하루네.",
    add: "일정이 필요하면 추가해봐",
  },
};

function formatScheduleTime(dueDate: string) {
  return new Date(dueDate).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ScheduleSection({ tasks, speechStyle = "formal" }: Props) {
  const router = useRouter();
  const [nextTask, ...laterTasks] = tasks;

  return (
    <section aria-labelledby="schedule-title" className="mb-10">
      <div className="mb-3">
        <h2 id="schedule-title" className="text-sm font-semibold text-text-primary">
          다음 일정
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {emptyMessages[speechStyle].description}
        </p>
      </div>

      {!nextTask ? (
        <button
          onClick={() => router.push("/tasks")}
          className="w-full rounded-2xl bg-surface-muted px-4 py-4 text-left"
        >
          <p className="whitespace-pre-line break-words text-base leading-relaxed text-text-secondary">
            {emptyMessages[speechStyle].empty}
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {emptyMessages[speechStyle].add}
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
                  {formatScheduleTime(nextTask.due_date)}
                </time>
              )}
              <div className="min-w-0 flex-1 py-1">
                <p className="text-xs font-medium text-text-secondary">가장 가까운 일정</p>
                <p className="mt-1 break-words text-[17px] font-medium leading-relaxed text-text-primary [overflow-wrap:anywhere]">
                  {nextTask.title}
                </p>
              </div>
            </div>
          </div>

          {laterTasks.length > 0 && (
            <div className="mt-3 px-1">
              <p className="mb-1 text-xs font-medium text-text-secondary">이후 일정</p>
              <ul className="divide-y divide-border">
                {laterTasks.map((task) => (
                  <li key={task.id} className="flex min-w-0 items-start gap-3 py-3">
                    {task.due_date && (
                      <time
                        dateTime={task.due_date}
                        className="w-16 shrink-0 text-sm font-medium text-text-secondary"
                      >
                        {formatScheduleTime(task.due_date)}
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
