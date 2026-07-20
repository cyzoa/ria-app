"use client";

import { useRef, useState, useTransition } from "react";
import { createTask } from "@/lib/actions/tasks";
import { useDictionary } from "@/components/providers/locale-provider";
import type { Project } from "@/types/database";

interface Props {
  projects: Project[];
}

export function CreateTaskForm({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const submittingRef = useRef(false);
  const dictionary = useDictionary();
  const copy = dictionary.tasks.create;

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
        {copy.open}
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
          {copy.titleLabel}
        </label>
        <input
          id="task-title"
          name="title"
          required
          autoFocus
          placeholder={copy.titlePlaceholder}
          className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary placeholder:text-text-secondary/75"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="task-priority" className="mb-2 block text-sm font-medium text-text-primary">
            {copy.priorityLabel}
          </label>
          <select
            id="task-priority"
            name="priority"
            defaultValue="medium"
            className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
          >
            <option value="low">{dictionary.tasks.priority.low}</option>
            <option value="medium">{dictionary.tasks.priority.medium}</option>
            <option value="high">{dictionary.tasks.priority.high}</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-project" className="mb-2 block text-sm font-medium text-text-primary">
            {copy.projectLabel}
          </label>
          <select
            id="task-project"
            name="project_id"
            defaultValue=""
            className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
          >
            <option value="">{copy.noProject}</option>
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
          {copy.dueLabel} <span className="font-normal text-text-secondary">{copy.optional}</span>
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
          {pending ? dictionary.common.pending.adding : copy.submit}
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
          {dictionary.common.actions.cancel}
        </button>
      </div>
    </form>
  );
}
