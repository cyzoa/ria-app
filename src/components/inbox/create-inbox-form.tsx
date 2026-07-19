"use client";

import { useRef, useState, useTransition } from "react";
import { createInboxItem } from "@/lib/actions/inbox";

export function CreateInboxForm() {
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
        const result = await createInboxItem(formData);
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
      className="mb-10 rounded-2xl bg-primary-soft p-4 sm:p-5"
    >
      <label htmlFor="inbox-content" className="mb-2 block text-sm font-semibold text-primary">
        빠른 기록
      </label>
      <textarea
        id="inbox-content"
        name="content"
        required
        placeholder="잊기 전에 여기에 적어두세요"
        className="min-h-32 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-base leading-6 text-text-primary placeholder:text-text-secondary/75"
        rows={4}
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
          {pending ? "기록 중…" : "기록하기"}
        </button>
      </div>
    </form>
  );
}
