import { createClient } from "@/lib/supabase/server";
import type { Project, Task, User } from "@/types/database";

export async function getProjectsData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [profileResult, projectsResult, tasksResult] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .neq("status", "archived"),
  ]);

  const projects = (projectsResult.data ?? []) as Project[];
  const tasks = (tasksResult.data ?? []) as Task[];

  // 각 프로젝트별 Task 개수 계산
  const projectsWithTaskCount = projects.map((project) => ({
    ...project,
    taskCount: tasks.filter((task) => task.project_id === project.id).length,
  }));

  return {
    profile: profileResult.data as User | null,
    projects: projectsWithTaskCount,
  };
}
