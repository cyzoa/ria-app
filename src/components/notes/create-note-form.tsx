"use client";

import { useState, useTransition } from "react";
import { createNote } from "@/lib/actions/notes";

export function CreateNoteForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createNote(formData);
    });
  }

  return (
    <form action={handleSubmit} className="border-divider mb-6 rounded-2xl border bg-card-white p-4">
      <textarea
        name="content"
        required
        placeholder="아무거나 괜찮아, 편하게 남겨봐..."
        className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px] outline-none focus:border-gold resize-none"
        rows={5}
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="bg-gold rounded-lg px-4 py-2 text-[13px] text-card-white disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </form>
  );
}
