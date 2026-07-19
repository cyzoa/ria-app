import { createClient } from "@/lib/supabase/server";
import { getTodayDateString } from "@/lib/date";
import type { NorthStar, Task, User } from "@/types/database";

export async function getHomeData() {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return null;

    const today = getTodayDateString();

    const [profileResult, northStarResult, top3Result, scheduleResult] =
      await Promise.all([
        supabase.from("users").select("*").eq("id", authUser.id).single(),
        supabase
          .from("north_stars")
          .select("*")
          .eq("user_id", authUser.id)
          .eq("date", today)
          .maybeSingle(),
        supabase
          .from("tasks")
          .select("*")
          .eq("user_id", authUser.id)
          .eq("is_top3", true)
          .in("status", ["todo", "doing"])
          .order("created_at", { ascending: true })
          .limit(3),
        supabase
          .from("tasks")
          .select("*")
          .eq("user_id", authUser.id)
          .in("status", ["todo", "doing"])
          .not("due_date", "is", null)
          .gte("due_date", `${today}T00:00:00`)
          .lte("due_date", `${today}T23:59:59`)
          .order("due_date", { ascending: true }),
      ]);

    return {
      profile: profileResult.data as User | null,
      northStar: northStarResult.data as NorthStar | null,
      top3Tasks: (top3Result.data ?? []) as Task[],
      scheduleTasks: (scheduleResult.data ?? []) as Task[],
    };
  } catch {
    return null;
  }
}
