import { redirect } from "next/navigation";
import { getProjectsData } from "@/lib/queries/projects";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { ProjectList } from "@/components/projects/project-list";
import { getRequestDictionary } from "@/lib/locale";

export default async function ProjectsPage() {
  const [data, dictionary] = await Promise.all([getProjectsData(), getRequestDictionary()]);
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";
  const copy = dictionary.projects;

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-md text-base leading-7 text-text-secondary">
          {copy.description[speechStyle]}
        </p>
      </header>
      <div className="space-y-9">
        <CreateProjectForm speechStyle={speechStyle} />
        <ProjectList projects={data.projects} speechStyle={speechStyle} />
      </div>
    </div>
  );
}
