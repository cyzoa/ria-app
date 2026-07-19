import { createClient } from "@/lib/supabase/server";
import type { Project, Task } from "@/types/database";

export async function getTasksData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [tasksResult, projectsResult] = await Promise.all([
    supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .neq("status", "archived")
      .order("created_at", { ascending: false }),
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("name"),
  ]);

  return {
    tasks: (tasksResult.data ?? []) as Task[],
    projects: (projectsResult.data ?? []) as Project[],
  };
}
