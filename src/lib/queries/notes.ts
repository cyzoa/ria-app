import { createClient } from "@/lib/supabase/server";
import type { Note, User } from "@/types/database";

export async function getNotesData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [profileResult, notesResult] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    profile: profileResult.data as User | null,
    notes: (notesResult.data ?? []) as Note[],
  };
}
