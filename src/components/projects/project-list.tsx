"use client";

import { useRef, useState, useTransition } from "react";
import { deleteProject } from "@/lib/actions/projects";
import { formatMessage, getDictionary } from "@/locales";
import type { SpeechStyle } from "@/types/database";

interface Project {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

interface Props {
  projects: Project[];
  speechStyle?: SpeechStyle;
}

export function ProjectList({ projects, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutationRef = useRef(false);
  const dictionary = getDictionary();
  const copy = dictionary.projects;

  function handleDelete(projectId: string) {
    if (mutationRef.current) return;
    mutationRef.current = true;
    setActiveProjectId(projectId);
    setError(null);

    startTransition(async () => {
      try {
        const result = await deleteProject(projectId);
        if (result.error) {
          setError(result.error);
          return;
        }
        setActiveProjectId(null);
      } finally {
        mutationRef.current = false;
      }
    });
  }

  if (projects.length === 0) {
    return (
      <section aria-labelledby="project-list-heading">
        <h2 id="project-list-heading" className="text-lg font-semibold text-text-primary">
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
    <section aria-labelledby="project-list-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="project-list-heading" className="text-lg font-semibold text-text-primary">
            {copy.list.title}
          </h2>
          <p className="mt-1 text-sm leading-5 text-text-secondary">
            {copy.list.description[speechStyle]}
          </p>
        </div>
        <span className="shrink-0 text-sm tabular-nums text-text-secondary" aria-label={formatMessage(dictionary.accessibility.itemCount, { count: projects.length })}>
          {projects.length}
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {projects.map((project) => {
          const isPending = pending && activeProjectId === project.id;

          return (
            <li
              key={project.id}
              className="flex min-w-0 items-start gap-3 py-5 first:pt-4 last:pb-4"
              aria-busy={isPending}
            >
              <span
                aria-hidden="true"
                className="mt-2 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-base font-semibold leading-6 text-text-primary [overflow-wrap:anywhere]">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {formatMessage(copy.list.taskCount, { count: project.taskCount })}
                </p>
                {error && activeProjectId === project.id && (
                  <p role="alert" className="mt-3 text-sm leading-5 text-danger">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(project.id)}
                disabled={pending}
                aria-label={formatMessage(copy.list.deleteLabel, { name: project.name })}
                className="min-h-11 shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-danger disabled:opacity-80"
              >
                {isPending ? dictionary.common.pending.deleting : dictionary.common.actions.delete}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
