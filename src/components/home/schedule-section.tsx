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
    empty: "오늘은 일정이 비어 있어요.\n느긋하게 보낼 수 있는 하루네요.",
  },
  casual: {
    empty: "오늘은 일정이 비어 있어.\n느긋하게 보낼 수 있는 하루네.",
  },
};

export function ScheduleSection({ tasks, speechStyle = "formal" }: Props) {
  const router = useRouter();
  return (
    <section>
      <h2 className="mb-3 text-[13px] font-medium tracking-wide uppercase text-soft-black">
        Today&apos;s Schedule
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
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3">
                <span className="text-[16px]">{task.title}</span>
                {task.due_date && (
                  <span className="text-stone shrink-0 text-[13px]">
                    {new Date(task.due_date).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
