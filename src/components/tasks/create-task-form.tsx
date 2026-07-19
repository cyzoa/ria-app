"use client";

import { useState, useTransition } from "react";
import { createTask } from "@/lib/actions/tasks";
import type { Project } from "@/types/database";

interface Props {
  projects: Project[];
}

export function CreateTaskForm({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createTask(formData);
      if (!result.error) {
        setOpen(false);
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-gold mb-6 w-full rounded-xl py-3 text-[13px] font-medium text-card-white"
      >
        + 새 Task
      </button>
    );
  }

  return (
    <form action={handleSubmit} className="border-divider mb-6 space-y-3 rounded-2xl border bg-card-white p-4">
      <input
        name="title"
        required
        placeholder="무엇을 할까?"
        className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px] outline-none focus:border-gold"
      />

      <div className="flex gap-2">
        <select
          name="priority"
          defaultValue="medium"
          className="border-divider flex-1 rounded-xl border bg-card-white px-3 py-2 text-[16px]"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="project_id"
          defaultValue=""
          className="border-divider flex-1 rounded-xl border bg-card-white px-3 py-2 text-[16px]"
        >
          <option value="">프로젝트 없음</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <input
        name="due_date"
        type="datetime-local"
        className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px]"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-gold rounded-lg px-4 py-2 text-[13px] text-card-white disabled:opacity-50"
        >
          추가
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-stone text-[13px] underline"
        >
          취소
        </button>
      </div>
    </form>
  );
}
