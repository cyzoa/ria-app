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
    <section className="mb-12">
      <h2 className="text-gold mb-3 flex items-center gap-1.5 text-[13px] font-medium tracking-wide uppercase">
        Today&apos;s North Star <span>⭐</span>
      </h2>
      <div className="border-divider rounded-2xl border bg-card-white p-6">
        {editing ? (
          <div className="space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={messages.placeholder}
              className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px] outline-none focus:border-gold"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={pending}
                className="bg-gold rounded-lg px-4 py-1.5 text-[13px] text-card-white"
              >
                저장
              </button>
              {northStar && (
                <button
                  onClick={() => {
                    setTitle(northStar.title);
                    setEditing(false);
                  }}
                  className="text-stone text-[13px] underline"
                >
                  취소
                </button>
              )}
            </div>
          </div>
        ) : northStar ? (
          <button onClick={() => setEditing(true)} className="w-full text-left">
            <p className="text-[16px]">{northStar.title}</p>
            <p className="text-stone mt-1 text-[13px]">탭해서 수정</p>
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="w-full text-left">
            <p className="text-stone whitespace-pre-line text-[16px]">{messages.empty}</p>
            <p className="text-stone mt-2 text-[13px]">탭해서 작성</p>
          </button>
        )}
      </div>
    </section>
  );
}
