"use client";

import { useState, useTransition } from "react";
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
  emphasis?: boolean;
}

const priorityLabel: Record<TaskPriority, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

const statusLabel = {
  todo: "진행 전",
  doing: "진행 중",
  done: "완료",
  archived: "보관됨",
} as const;

export function TaskItem({ task, projects, emphasis = false }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const project = projects.find((candidate) => candidate.id === task.project_id);

  function run(action: () => Promise<{ error?: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result.error) setError(result.error);
    });
  }

  return (
    <li
      className={cn("py-5 first:pt-4 last:pb-4", pending && "opacity-60")}
      aria-busy={pending}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => run(() => toggleTaskComplete(task.id, task.status !== "done"))}
          disabled={pending}
          aria-label={`${task.title}, ${task.status === "done" ? "미완료로 변경" : "완료로 변경"}`}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed",
            task.status === "done"
              ? "border-balance bg-balance text-white"
              : "border-border bg-surface text-text-secondary"
          )}
        >
          <span aria-hidden="true" className="text-base font-semibold">
            {task.status === "done" ? "✓" : "○"}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "break-words text-base leading-6 text-text-primary [overflow-wrap:anywhere]",
              emphasis && "font-semibold",
              task.status === "done" && "text-text-secondary line-through decoration-border"
            )}
          >
            {task.title}
          </p>

          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-secondary">
            <span>{statusLabel[task.status]}</span>
            {project && (
              <span className="inline-flex min-w-0 max-w-full items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="truncate">{project.name}</span>
              </span>
            )}
            {task.is_top3 && <span className="font-medium text-accent">Top 3</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 pl-14 sm:grid-cols-2">
        <label className="min-w-0 text-xs font-medium text-text-secondary">
          <span className="mb-1 block">우선순위</span>
          <select
            value={task.priority}
            disabled={pending}
            onChange={(event) =>
              run(() => updateTaskPriority(task.id, event.target.value as TaskPriority))
            }
            className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-text-primary disabled:opacity-80"
          >
            {Object.entries(priorityLabel).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="min-w-0 text-xs font-medium text-text-secondary">
          <span className="mb-1 block">프로젝트</span>
          <select
            value={task.project_id ?? ""}
            disabled={pending}
            onChange={(event) =>
              run(() => updateTaskProject(task.id, event.target.value || null))
            }
            className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-text-primary disabled:opacity-80"
          >
            <option value="">프로젝트 없음</option>
            {projects.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 pl-14">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => setTaskTop3(task.id, !task.is_top3))}
          className="min-h-11 rounded-lg bg-primary-soft px-3 py-2 text-sm font-medium text-primary disabled:opacity-80"
        >
          {task.is_top3 ? "Top 3에서 빼기" : "Top 3에 두기"}
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => archiveTask(task.id))}
          className="min-h-11 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-secondary disabled:opacity-80"
        >
          보관
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => deleteTask(task.id))}
          className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium text-danger disabled:opacity-80"
        >
          삭제
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 pl-14 text-sm leading-5 text-danger">
          {error}
        </p>
      )}
    </li>
  );
}
