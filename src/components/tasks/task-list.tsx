"use client";

import { useMemo, useState } from "react";
import { CreateTaskForm } from "./create-task-form";
import { TaskItem } from "./task-item";
import type { Project, Task, TaskStatus } from "@/types/database";

interface Props {
  tasks: Task[];
  projects: Project[];
}

export function TaskList({ tasks, projects }: Props) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter !== "all" && task.status !== statusFilter) return false;
      if (projectFilter !== "all" && task.project_id !== projectFilter) return false;
      return true;
    });
  }, [tasks, statusFilter, projectFilter]);

  return (
    <>
      <CreateTaskForm projects={projects} />

      <div className="mb-4 flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "all")}
          className="border-divider flex-1 rounded-xl border bg-card-white px-3 py-2 text-[13px]"
        >
          <option value="all">전체 상태</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="border-divider flex-1 rounded-xl border bg-card-white px-3 py-2 text-[13px]"
        >
          <option value="all">전체 프로젝트</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone text-[16px]">오늘 할 일을 아직 안 정했어요.\n떠오르는 것부터 하나 적어볼까요?</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((task) => (
            <TaskItem key={task.id} task={task} projects={projects} />
          ))}
        </ul>
      )}
    </>
  );
}
