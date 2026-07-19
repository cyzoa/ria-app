"use client";

import { useState, useTransition } from "react";
import { saveNorthStar } from "@/lib/actions/north-star";
import type { NorthStar } from "@/types/database";
import type { SpeechStyle } from "@/types/database";

interface Props {
  northStar: NorthStar | null;
  speechStyle?: SpeechStyle;
}

const emptyMessages = {
  formal: {
    placeholder: "오늘 하나만 정한다면, 뭐가 제일 중요할까요?",
    empty: "오늘의 방향이 아직 없어요.\n가장 중요한 것 하나만 정해볼까요?",
  },
  casual: {
    placeholder: "오늘 하나만 정한다면, 뭐가 제일 중요할까?",
    empty: "오늘의 방향이 아직 없어.\n가장 중요한 것 하나만 정해볼까?",
  },
};

export function NorthStarSection({ northStar, speechStyle = "formal" }: Props) {
  const [editing, setEditing] = useState(!northStar);
  const [title, setTitle] = useState(northStar?.title ?? "");
  const [pending, startTransition] = useTransition();

  const messages = emptyMessages[speechStyle];

  function handleSave() {
    startTransition(async () => {
      await saveNorthStar(title);
      setEditing(false);
    });
  }

  return (
    <section aria-labelledby="north-star-title" className="mb-10">
      <div className="mb-3">
        <h2 id="north-star-title" className="text-sm font-semibold text-text-primary">
          오늘의 방향
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          오늘을 이끌 한 가지를 천천히 정해보세요.
        </p>
      </div>
      <div className="rounded-[20px] bg-primary-soft p-5 sm:p-6">
        {editing ? (
          <div className="space-y-4">
            <input
              aria-label="오늘의 방향"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={messages.placeholder}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary focus:border-primary"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                disabled={pending}
                className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {pending ? "저장 중" : "저장"}
              </button>
              {northStar && (
                <button
                  onClick={() => {
                    setTitle(northStar.title);
                    setEditing(false);
                  }}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-text-secondary underline decoration-border underline-offset-4"
                >
                  취소
                </button>
              )}
            </div>
          </div>
        ) : northStar ? (
          <button
            onClick={() => setEditing(true)}
            className="w-full rounded-xl text-left"
            aria-label={`오늘의 방향 수정: ${northStar.title}`}
          >
            <p className="break-words text-[21px] font-medium leading-relaxed tracking-[-0.02em] text-text-primary [overflow-wrap:anywhere]">
              {northStar.title}
            </p>
            <p className="mt-2 text-sm text-text-secondary">눌러서 다시 살펴보기</p>
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="w-full rounded-xl text-left">
            <p className="whitespace-pre-line break-words text-base leading-relaxed text-text-secondary">
              {messages.empty}
            </p>
            <p className="mt-2 text-sm font-medium text-primary">눌러서 방향 정하기</p>
          </button>
        )}
      </div>
    </section>
  );
}
