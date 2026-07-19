"use client";

import { useRef, useState, useTransition } from "react";
import { createTask } from "@/lib/actions/tasks";
import type { Project } from "@/types/database";

interface Props {
  projects: Project[];
}

export function CreateTaskForm({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const submittingRef = useRef(false);

  function handleSubmit(formData: FormData) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError(null);
    startTransition(async () => {
      try {
        const result = await createTask(formData);
        if (result.error) {
          setError(result.error);
          return;
        }
        setOpen(false);
      } finally {
        submittingRef.current = false;
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary/90"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          +
        </span>
        새 Task 만들기
      </button>
    );
  }

  return (
    <form
      action={handleSubmit}
      aria-busy={pending}
      className="space-y-5 rounded-2xl border border-border bg-surface p-4 sm:p-5"
    >
      <div>
        <label htmlFor="task-title" className="mb-2 block text-sm font-medium text-text-primary">
          Task 제목
        </label>
        <input
          id="task-title"
          name="title"
          required
          autoFocus
          placeholder="지금 해둘 일을 적어보세요"
          className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary placeholder:text-text-secondary/75"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="task-priority" className="mb-2 block text-sm font-medium text-text-primary">
            우선순위
          </label>
          <select
            id="task-priority"
            name="priority"
            defaultValue="medium"
            className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
          >
            <option value="low">낮음</option>
            <option value="medium">보통</option>
            <option value="high">높음</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-project" className="mb-2 block text-sm font-medium text-text-primary">
            프로젝트
          </label>
          <select
            id="task-project"
            name="project_id"
            defaultValue=""
            className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
          >
            <option value="">프로젝트 없음</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="task-due-date" className="mb-2 block text-sm font-medium text-text-primary">
          예정 시간 <span className="font-normal text-text-secondary">(선택)</span>
        </label>
        <input
          id="task-due-date"
          name="due_date"
          type="datetime-local"
          className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm leading-5 text-danger">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-80"
        >
          {pending ? "추가 중…" : "Task 추가"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setError(null);
            setOpen(false);
          }}
          className="min-h-12 rounded-xl border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-text-secondary disabled:opacity-80"
        >
          취소
        </button>
      </div>
    </form>
  );
}
