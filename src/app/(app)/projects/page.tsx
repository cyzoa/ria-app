import { redirect } from "next/navigation";
import { getProjectsData } from "@/lib/queries/projects";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { ProjectList } from "@/components/projects/project-list";

export default async function ProjectsPage() {
  const data = await getProjectsData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="px-6 pt-12 fade-in">
      <h1 className="mb-6 text-[28px] font-light tracking-tight">Projects</h1>
      <CreateProjectForm />
      <ProjectList projects={data.projects} speechStyle={speechStyle} />
    </div>
  );
}
