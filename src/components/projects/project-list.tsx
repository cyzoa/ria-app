"use client";

import { useTransition } from "react";
import { deleteProject } from "@/lib/actions/projects";
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

const emptyMessages = {
  formal: {
    empty: "아직 만든 프로젝트가 없어요.\n새로운 프로젝트를 시작해볼까요?",
  },
  casual: {
    empty: "아직 만든 프로젝트가 없어.\n새로운 프로젝트를 시작해볼까?",
  },
};

export function ProjectList({ projects, speechStyle = "formal" }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete(projectId: string) {
    startTransition(async () => {
      await deleteProject(projectId);
    });
  }

  if (projects.length === 0) {
    return (
      <p className="text-stone whitespace-pre-line text-[16px]">{emptyMessages[speechStyle].empty}</p>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border-divider rounded-2xl border bg-card-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h3 className="text-[16px] font-medium">{project.name}</h3>
              </div>
              <p className="text-stone mt-1 text-[13px]">
                {project.taskCount}개의 Task
              </p>
            </div>
            <button
              onClick={() => handleDelete(project.id)}
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
