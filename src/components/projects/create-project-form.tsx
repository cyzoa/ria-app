"use client";

import { useRef, useState, useTransition } from "react";
import { createProject } from "@/lib/actions/projects";
import type { SpeechStyle } from "@/types/database";

export function CreateProjectForm({ speechStyle }: { speechStyle: SpeechStyle }) {
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
        const result = await createProject(formData);
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
        새 Project 만들기
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
        <label htmlFor="project-name" className="mb-2 block text-sm font-medium text-text-primary">
          Project 이름
        </label>
        <input
          id="project-name"
          name="name"
          required
          autoFocus
          placeholder="함께 묶어둘 일의 이름"
          className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary placeholder:text-text-secondary/75"
        />
      </div>

      <div>
        <label htmlFor="project-color" className="mb-2 block text-sm font-medium text-text-primary">
          구분 색상
        </label>
        <div className="flex min-w-0 items-center gap-3">
          <input
            id="project-color"
            name="color"
            type="color"
            defaultValue="#C9A661"
            className="h-12 w-12 shrink-0 rounded-xl border border-border bg-surface p-1"
          />
          <p className="min-w-0 text-sm leading-5 text-text-secondary">
            {speechStyle === "casual"
              ? "이름과 함께 Project를 구분하는 보조 색상이야."
              : "이름과 함께 Project를 구분하는 보조 색상이에요."}
          </p>
        </div>
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
          {pending ? "추가 중…" : "Project 추가"}
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
