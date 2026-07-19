import { createClient } from "@/lib/supabase/server";
import type { InboxItem, User } from "@/types/database";

export async function getInboxData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [profileResult, itemsResult] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase
      .from("inbox_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    profile: profileResult.data as User | null,
    items: (itemsResult.data ?? []) as InboxItem[],
  };
}
