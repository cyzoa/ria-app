"use client";

import { useState, useTransition } from "react";
import { saveNorthStar } from "@/lib/actions/north-star";
import { formatMessage, getDictionary } from "@/locales";
import type { NorthStar } from "@/types/database";
import type { SpeechStyle } from "@/types/database";

interface Props {
  northStar: NorthStar | null;
  speechStyle?: SpeechStyle;
}

export function NorthStarSection({ northStar, speechStyle = "formal" }: Props) {
  const [editing, setEditing] = useState(!northStar);
  const [title, setTitle] = useState(northStar?.title ?? "");
  const [pending, startTransition] = useTransition();

  const dictionary = getDictionary();
  const copy = dictionary.home.direction;

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
          {copy.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {copy.description[speechStyle]}
        </p>
      </div>
      <div className="rounded-[20px] bg-primary-soft p-5 sm:p-6">
        {editing ? (
          <div className="space-y-4">
            <input
              aria-label={copy.inputLabel}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={copy.placeholder[speechStyle]}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary focus:border-primary"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                disabled={pending}
                className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {pending ? dictionary.common.pending.savingShort : dictionary.common.actions.save}
              </button>
              {northStar && (
                <button
                  onClick={() => {
                    setTitle(northStar.title);
                    setEditing(false);
                  }}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-text-secondary underline decoration-border underline-offset-4"
                >
                  {dictionary.common.actions.cancel}
                </button>
              )}
            </div>
          </div>
        ) : northStar ? (
          <button
            onClick={() => setEditing(true)}
            className="w-full rounded-xl text-left"
            aria-label={formatMessage(copy.editLabel, { title: northStar.title })}
          >
            <p className="break-words text-[21px] font-medium leading-relaxed tracking-[-0.02em] text-text-primary [overflow-wrap:anywhere]">
              {northStar.title}
            </p>
            <p className="mt-2 text-sm text-text-secondary">{copy.review[speechStyle]}</p>
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="w-full rounded-xl text-left">
            <p className="whitespace-pre-line break-words text-base leading-relaxed text-text-secondary">
              {copy.empty[speechStyle]}
            </p>
            <p className="mt-2 text-sm font-medium text-primary">{copy.choose}</p>
          </button>
        )}
      </div>
    </section>
  );
}
