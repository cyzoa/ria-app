"use client";

import { useTransition } from "react";
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
  formal: {
    empty: "Inbox가 조용하네요.\n생각날 때 편하게 남겨두세요.",
  },
  casual: {
    empty: "Inbox가 조용하네.\n생각날 때 편하게 남겨둬.",
  },
};

export function InboxList({ items, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();

  function handleConvert(itemId: string) {
    startTransition(async () => {
      await convertToTask(itemId);
    });
  }

  function handleDelete(itemId: string) {
    startTransition(async () => {
      await deleteInboxItem(itemId);
    });
  }

  const unconvertedItems = items.filter((item) => !item.converted_to_task);

  if (unconvertedItems.length === 0) {
    return (
      <p className="text-stone whitespace-pre-line text-[16px]">{emptyMessages[speechStyle].empty}</p>
    );
  }

  return (
    <div className="space-y-3">
      {unconvertedItems.map((item) => (
        <div
          key={item.id}
          className="border-divider rounded-2xl border bg-card-white p-4"
        >
          <p className="text-[16px]">{item.content}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleConvert(item.id)}
              disabled={pending}
              className="bg-gold rounded-lg px-3 py-1 text-[13px] text-card-white disabled:opacity-50"
            >
              Task로 전환
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={pending}
              className="text-stone text-[13px] underline disabled:opacity-50"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
