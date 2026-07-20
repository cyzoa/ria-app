"use client";

import { useRef, useState, useTransition } from "react";
import { updateNote, deleteNote } from "@/lib/actions/notes";
import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { formatCountMessage } from "@/locales/types";
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

export function NoteList({ notes, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutationRef = useRef(false);
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const copy = dictionary.notes;

  function handleDelete(noteId: string) {
    if (mutationRef.current) return;
    mutationRef.current = true;
    setActiveNoteId(noteId);
    setError(null);

    startTransition(async () => {
      try {
        const result = await deleteNote(noteId);
        if (result.error) {
          setError(result.error);
          return;
        }
        setActiveNoteId(null);
      } finally {
        mutationRef.current = false;
      }
    });
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setEditContent(note.content);
    setActiveNoteId(note.id);
    setError(null);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditContent("");
    setActiveNoteId(null);
    setError(null);
  }

  function handleSaveEdit(noteId: string) {
    if (mutationRef.current) return;
    mutationRef.current = true;
    setActiveNoteId(noteId);
    setError(null);

    startTransition(async () => {
      try {
        const result = await updateNote(noteId, editContent);
        if (result.error) {
          setError(result.error);
          return;
        }
        setEditingId(null);
        setEditContent("");
        setActiveNoteId(null);
      } finally {
        mutationRef.current = false;
      }
    });
  }

  if (notes.length === 0) {
    return (
      <section aria-labelledby="note-list-heading">
        <h2 id="note-list-heading" className="text-lg font-semibold text-text-primary">
          {copy.list.title}
        </h2>
        <div className="mt-4 rounded-2xl bg-surface-muted px-5 py-6">
          <p className="text-base leading-7 text-text-secondary">
            {copy.list.empty[speechStyle]}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="note-list-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="note-list-heading" className="text-lg font-semibold text-text-primary">
            {copy.list.title}
          </h2>
          <p className="mt-1 text-sm leading-5 text-text-secondary">
            {copy.list.description[speechStyle]}
          </p>
        </div>
        <span className="shrink-0 text-sm tabular-nums text-text-secondary" aria-label={formatCountMessage(dictionary.accessibility.itemCount, notes.length, locale)}>
          {notes.length}
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {notes.map((note) => {
          const isEditing = editingId === note.id;
          const isPending = pending && activeNoteId === note.id;

          return (
            <li key={note.id} className="py-5 first:pt-4 last:pb-4" aria-busy={isPending}>
              {isEditing ? (
                <div>
                  <label htmlFor={`note-edit-${note.id}`} className="mb-2 block text-sm font-semibold text-primary">
                    {copy.item.editing}
                  </label>
                  <textarea
                    id={`note-edit-${note.id}`}
                    value={editContent}
                    onChange={(event) => setEditContent(event.target.value)}
                    className="min-h-40 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-base leading-7 text-text-primary"
                    rows={6}
                  />

                  {error && activeNoteId === note.id && (
                    <p role="alert" className="mt-3 text-sm leading-5 text-danger">
                      {error}
                    </p>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(note.id)}
                      disabled={pending}
                      aria-label={copy.item.saveChangesLabel}
                      className="min-h-12 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-80"
                    >
                      {isPending ? dictionary.common.pending.saving : copy.item.saveChanges}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={pending}
                      aria-label={copy.item.cancelEditLabel}
                      className="min-h-12 rounded-xl border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-text-secondary disabled:opacity-80"
                    >
                      {dictionary.common.actions.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <article>
                  <p className="whitespace-pre-wrap break-words text-base leading-7 text-text-primary [overflow-wrap:anywhere]">
                    {note.content}
                  </p>

                  {error && activeNoteId === note.id && (
                    <p role="alert" className="mt-3 text-sm leading-5 text-danger">
                      {error}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(note)}
                      disabled={pending}
                      aria-label={copy.item.editLabel}
                      className="min-h-11 rounded-lg bg-primary-soft px-4 py-2 text-sm font-medium text-primary disabled:opacity-80"
                    >
                      {dictionary.common.actions.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(note.id)}
                      disabled={pending}
                      aria-label={copy.item.deleteLabel}
                      className="min-h-11 rounded-lg px-4 py-2 text-sm font-medium text-danger disabled:opacity-80"
                    >
                      {dictionary.common.actions.delete}
                    </button>
                  </div>
                </article>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
