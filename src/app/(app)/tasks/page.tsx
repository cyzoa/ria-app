import { redirect } from "next/navigation";
import { getTasksData } from "@/lib/queries/tasks";
import { TaskList } from "@/components/tasks/task-list";

export default async function TasksPage() {
  const data = await getTasksData();
  if (!data) redirect("/login");

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          Tasks
        </h1>
        <p className="mt-2 max-w-md text-[15px] leading-6 text-text-secondary">
          지금 중요한 일부터 차분히 살펴보세요.
        </p>
      </header>
      <TaskList tasks={data.tasks} projects={data.projects} />
    </div>
  );
}
