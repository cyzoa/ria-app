import { redirect } from "next/navigation";
import { getTasksData } from "@/lib/queries/tasks";
import { TaskList } from "@/components/tasks/task-list";

export default async function TasksPage() {
  const data = await getTasksData();
  if (!data) redirect("/login");

  return (
    <div className="px-6 pt-12 fade-in">
      <h1 className="mb-6 text-[28px] font-light tracking-tight">Tasks</h1>
      <TaskList tasks={data.tasks} projects={data.projects} />
    </div>
  );
}
