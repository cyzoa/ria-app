"use client";

import { useState, useTransition } from "react";
import { createInboxItem } from "@/lib/actions/inbox";

export function CreateInboxForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createInboxItem(formData);
    });
  }

  return (
    <form action={handleSubmit} className="border-divider mb-6 rounded-2xl border bg-card-white p-4">
      <textarea
        name="content"
        required
        placeholder="떠오르는 생각 있으면 편하게 적어둬..."
        className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px] outline-none focus:border-gold resize-none"
        rows={3}
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
