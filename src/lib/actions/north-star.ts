"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTodayDateString } from "@/lib/date";

export async function saveNorthStar(title: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "로그인이 필요해." };

  const trimmed = title.trim();
  if (!trimmed) return { error: "목표를 입력해줘." };

  const today = getTodayDateString();
  const { error } = await (supabase as any).from("north_stars").upsert(
    {
      user_id: user.id,
      date: today,
      title: trimmed,
    },
    { onConflict: "user_id,date" }
  );

  if (error) return { error: error.message };

  revalidatePath("/home");
  return { success: true };
}
