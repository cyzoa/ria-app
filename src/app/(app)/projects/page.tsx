import { redirect } from "next/navigation";
import { getProjectsData } from "@/lib/queries/projects";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { ProjectList } from "@/components/projects/project-list";

export default async function ProjectsPage() {
  const data = await getProjectsData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          Projects
        </h1>
        <p className="mt-2 max-w-md text-[15px] leading-6 text-text-secondary">
          이어가고 있는 일의 방향을 차분히 살펴보세요.
        </p>
      </header>
      <div className="space-y-9">
        <CreateProjectForm />
        <ProjectList projects={data.projects} speechStyle={speechStyle} />
      </div>
    </div>
  );
}
