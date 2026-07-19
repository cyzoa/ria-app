"use client";

import { useTransition } from "react";
import {
  toggleTaskComplete,
  archiveTask,
  deleteTask,
  setTaskTop3,
  updateTaskPriority,
  updateTaskProject,
} from "@/lib/actions/tasks";
import type { Project, Task, TaskPriority } from "@/types/database";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
  projects: Project[];
}

const priorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Med",
  high: "High",
};

export function TaskItem({ task, projects }: Props) {
  const [pending, startTransition] = useTransition();
  const project = projects.find((p) => p.id === task.project_id);

  function run(action: () => Promise<{ error?: string }>) {
    startTransition(() => {
      void action();
    });
  }

  return (
    <li
      className={cn(
        "border-divider rounded-2xl border bg-card-white p-4",
        pending && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => run(() => toggleTaskComplete(task.id, task.status !== "done"))}
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            task.status === "done"
              ? "border-gold bg-gold text-card-white"
              : "border-divider"
          )}
        >
          {task.status === "done" && "✓"}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-[16px] transition-all duration-300",
              task.status === "done" && "text-stone line-through"
            )}
          >
            {task.title}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {project && (
              <span
                className="rounded-full px-2 py-0.5 text-xs text-white"
                style={{ backgroundColor: project.color }}
              >
                {project.name}
              </span>
            )}

            {task.is_top3 && (
              <span className="text-gold text-[13px]">Top 3</span>
            )}

            <select
              value={task.priority}
              onChange={(e) =>
                run(() =>
                  updateTaskPriority(task.id, e.target.value as TaskPriority)
                )
              }
              className="text-stone border-none bg-transparent text-[13px] outline-none"
            >
              {Object.entries(priorityLabel).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 pl-8">
        <button
          onClick={() => run(() => setTaskTop3(task.id, !task.is_top3))}
          className="text-stone text-[13px] underline"
        >
          {task.is_top3 ? "Top 3 해제" : "Top 3 설정"}
        </button>

        <select
          value={task.project_id ?? ""}
          onChange={(e) =>
            run(() =>
              updateTaskProject(task.id, e.target.value || null)
            )
          }
          className="text-stone border-none bg-transparent text-[13px] outline-none"
        >
          <option value="">프로젝트 이동</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => run(() => archiveTask(task.id))}
          className="text-stone text-[13px] underline"
        >
          보관
        </button>

        <button
          onClick={() => run(() => deleteTask(task.id))}
          className="text-[13px] text-red-400 underline"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
