import { redirect } from "next/navigation";
import { getTasksData } from "@/lib/queries/tasks";
import { TaskList } from "@/components/tasks/task-list";
import { getRequestDictionary } from "@/lib/locale";

export default async function TasksPage() {
  const [data, dictionary] = await Promise.all([getTasksData(), getRequestDictionary()]);
  if (!data) redirect("/login");
  const copy = dictionary.tasks;

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-md text-base leading-7 text-text-secondary">
          {copy.description}
        </p>
      </header>
      <TaskList tasks={data.tasks} projects={data.projects} />
    </div>
  );
}
