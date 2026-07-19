"use client";

import { useState, useTransition } from "react";
import { convertToTask, deleteInboxItem } from "@/lib/actions/inbox";
import type { SpeechStyle } from "@/types/database";

interface InboxItem {
  id: string;
  content: string;
  converted_to_task: boolean;
  created_at: string;
}

interface Props {
  items: InboxItem[];
  speechStyle?: SpeechStyle;
}

const emptyMessages = {
  formal: "지금 내려놓을 생각이 생기면 여기에 적어두세요.",
  casual: "지금 내려놓을 생각이 생기면 여기에 적어둬.",
};

export function InboxList({ items, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleConvert(itemId: string) {
    setActiveItemId(itemId);
    setError(null);
    startTransition(async () => {
      const result = await convertToTask(itemId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setActiveItemId(null);
    });
  }

  function handleDelete(itemId: string) {
    setActiveItemId(itemId);
    setError(null);
    startTransition(async () => {
      const result = await deleteInboxItem(itemId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setActiveItemId(null);
    });
  }

  const unconvertedItems = items.filter((item) => !item.converted_to_task);

  if (unconvertedItems.length === 0) {
    return (
      <section aria-labelledby="inbox-items-heading">
        <h2 id="inbox-items-heading" className="text-lg font-semibold text-text-primary">
          기록된 생각
        </h2>
        <div className="mt-4 rounded-2xl bg-surface-muted px-5 py-6">
          <p className="text-base leading-7 text-text-secondary">
            {emptyMessages[speechStyle]}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="inbox-items-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="inbox-items-heading" className="text-lg font-semibold text-text-primary">
            기록된 생각
          </h2>
          <p className="mt-1 text-sm text-text-secondary">정리가 필요할 때 천천히 살펴보세요.</p>
        </div>
        <span
          className="shrink-0 text-sm tabular-nums text-text-secondary"
          aria-label={`${unconvertedItems.length}개`}
        >
          {unconvertedItems.length}
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {unconvertedItems.map((item) => {
          const isPending = pending && activeItemId === item.id;

          return (
            <li key={item.id} className="py-5 first:pt-4 last:pb-4" aria-busy={isPending}>
              <p className="whitespace-pre-wrap break-words text-base leading-7 text-text-primary [overflow-wrap:anywhere]">
                {item.content}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleConvert(item.id)}
                  disabled={pending}
                  className="min-h-11 rounded-lg bg-primary-soft px-4 py-2 text-sm font-medium text-primary disabled:opacity-80"
                >
                  {isPending ? "처리 중…" : "Task로 옮기기"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={pending}
                  className="min-h-11 rounded-lg px-4 py-2 text-sm font-medium text-danger disabled:opacity-80"
                >
                  삭제
                </button>
              </div>
              {error && activeItemId === item.id && (
                <p role="alert" className="mt-3 text-sm leading-5 text-danger">
                  {error}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
