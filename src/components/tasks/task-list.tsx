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

  const topTasks = filtered.filter(
    (task) => task.is_top3 && task.status !== "done"
  );
  const activeTasks = filtered.filter(
    (task) => !task.is_top3 && task.status !== "done"
  );
  const completedTasks = filtered.filter((task) => task.status === "done");
  const filtersActive = statusFilter !== "all" || projectFilter !== "all";

  return (
    <div className="space-y-9">
      <CreateTaskForm projects={projects} />

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-surface-muted px-5 py-6">
          <p className="text-base leading-7 text-text-secondary">
            {filtersActive
              ? "선택한 조건에 맞는 Task가 없어요. 보기 조건을 바꿔보세요."
              : "아직 Task가 없어요. 떠오른 다음 한 걸음부터 가볍게 적어보세요."}
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {topTasks.length > 0 && (
            <TaskSection
              title="지금 중요한 작업"
              description="오늘 먼저 살펴볼 Top 3"
              tasks={topTasks}
              projects={projects}
              emphasis
            />
          )}

          {activeTasks.length > 0 && (
            <TaskSection
              title="진행 중인 작업"
              description="필요한 순간에 하나씩 이어가세요"
              tasks={activeTasks}
              projects={projects}
            />
          )}

          {completedTasks.length > 0 && (
            <TaskSection
              title="완료한 작업"
              description="필요하면 다시 미완료로 돌릴 수 있어요"
              tasks={completedTasks}
              projects={projects}
              quiet
            />
          )}
        </div>
      )}

      <section aria-labelledby="task-filter-heading" className="border-t border-border pt-6">
        <div className="mb-4">
          <h2 id="task-filter-heading" className="text-base font-semibold text-text-primary">
            보기 조정
          </h2>
          <p className="mt-1 text-sm text-text-secondary">상태나 프로젝트로 목록을 좁혀보세요.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="task-status-filter" className="mb-2 block text-sm font-medium text-text-primary">
              상태
            </label>
            <select
              id="task-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as TaskStatus | "all")}
              className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
            >
              <option value="all">모든 상태</option>
              <option value="todo">진행 전</option>
              <option value="doing">진행 중</option>
              <option value="done">완료</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-project-filter" className="mb-2 block text-sm font-medium text-text-primary">
              프로젝트
            </label>
            <select
              id="task-project-filter"
              value={projectFilter}
              onChange={(event) => setProjectFilter(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary"
            >
              <option value="all">모든 프로젝트</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

interface TaskSectionProps {
  title: string;
  description: string;
  tasks: Task[];
  projects: Project[];
  emphasis?: boolean;
  quiet?: boolean;
}

function TaskSection({
  title,
  description,
  tasks,
  projects,
  emphasis = false,
  quiet = false,
}: TaskSectionProps) {
  const sectionId = `task-section-${title.replaceAll(" ", "-")}`;

  return (
    <section aria-labelledby={sectionId} className={quiet ? "opacity-80" : undefined}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2
            id={sectionId}
            className={
              emphasis
                ? "text-xl font-semibold text-primary"
                : "text-lg font-semibold text-text-primary"
            }
          >
            {title}
          </h2>
          <p className="mt-1 text-sm leading-5 text-text-secondary">{description}</p>
        </div>
        <span className="shrink-0 text-sm tabular-nums text-text-secondary" aria-label={`${tasks.length}개`}>
          {tasks.length}
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} projects={projects} emphasis={emphasis} />
        ))}
      </ul>
    </section>
  );
}
