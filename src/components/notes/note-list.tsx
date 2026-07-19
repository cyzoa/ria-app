"use client";

import { useState, useTransition } from "react";
import { updateNote, deleteNote } from "@/lib/actions/notes";
import type { SpeechStyle } from "@/types/database";

interface Note {
  id: string;
  content: string;
  created_at: string;
}

interface Props {
  notes: Note[];
  speechStyle?: SpeechStyle;
}

const emptyMessages = {
  formal: {
    empty: "아직 기록된 노트가 없어요.\n가볍게 한 줄부터 시작해도 좋아요.",
  },
  casual: {
    empty: "아직 기록된 노트가 없어.\n가볍게 한 줄부터 시작해도 좋아.",
  },
};

export function NoteList({ notes, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  function handleDelete(noteId: string) {
    startTransition(async () => {
      await deleteNote(noteId);
    });
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setEditContent(note.content);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditContent("");
  }

  function handleSaveEdit(noteId: string) {
    startTransition(async () => {
      const result = await updateNote(noteId, editContent);
      if (!result.error) {
        setEditingId(null);
        setEditContent("");
      }
    });
  }

  if (notes.length === 0) {
    return (
      <p className="text-stone whitespace-pre-line text-[16px]">{emptyMessages[speechStyle].empty}</p>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="border-divider rounded-2xl border bg-card-white p-4"
        >
          {editingId === note.id ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border-divider w-full rounded-xl border bg-card-white px-3 py-2 text-[16px] outline-none focus:border-gold resize-none"
                rows={5}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(note.id)}
                  disabled={pending}
                  className="bg-gold rounded-lg px-4 py-2 text-[13px] text-card-white disabled:opacity-50"
                >
                  저장
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-stone text-[13px] underline"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[16px] whitespace-pre-wrap">{note.content}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-stone text-[13px] underline"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  disabled={pending}
                  className="text-stone text-[13px] underline disabled:opacity-50"
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
