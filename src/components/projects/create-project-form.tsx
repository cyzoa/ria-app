"use client";

import { useState, useTransition } from "react";
import { createProject } from "@/lib/actions/projects";

export function CreateProjectForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createProject(formData);
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
        + 새 프로젝트
      </button>
    );
  }

  return (
    <form action={handleSubmit} className="border-divider mb-6 space-y-3 rounded-2xl border bg-card-white p-4">
      <input
        name="name"
        required
        placeholder="프로젝트 이름"
        className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px] outline-none focus:border-gold"
      />

      <div className="flex gap-2">
        <input
          name="color"
          type="color"
          defaultValue="#C9A661"
          className="h-10 w-10 rounded-lg border border-divider"
        />
        <div className="flex-1">
          <p className="text-stone text-[13px]">색상 선택</p>
        </div>
      </div>

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
