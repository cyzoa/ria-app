"use client";

import { useRef, useState, useTransition } from "react";
import { createNote } from "@/lib/actions/notes";
import type { SpeechStyle } from "@/types/database";

export function CreateNoteForm({ speechStyle }: { speechStyle: SpeechStyle }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  function handleSubmit(formData: FormData) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError(null);

    startTransition(async () => {
      try {
        const result = await createNote(formData);
        if (result.error) {
          setError(result.error);
          return;
        }
        formRef.current?.reset();
      } finally {
        submittingRef.current = false;
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      aria-busy={pending}
      className="rounded-2xl bg-primary-soft p-4 sm:p-5"
    >
      <label htmlFor="note-content" className="mb-2 block text-sm font-semibold text-primary">
        새 Note
      </label>
      <textarea
        id="note-content"
        name="content"
        required
        placeholder={
          speechStyle === "casual"
            ? "오래 남겨두고 싶은 생각을 적어봐"
            : "오래 남겨두고 싶은 생각을 적어보세요"
        }
        className="min-h-40 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-base leading-7 text-text-primary placeholder:text-text-secondary/75"
        rows={6}
      />

      {error && (
        <p role="alert" className="mt-3 text-sm leading-5 text-danger">
          {error}
        </p>
      )}

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 min-w-28 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-80"
        >
          {pending ? "저장 중…" : "Note 저장"}
        </button>
      </div>
    </form>
  );
}
