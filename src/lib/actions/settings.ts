"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SpeechStyle } from "@/types/database";

async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, userId: user?.id ?? null };
}

export async function updateSpeechStyle(speechStyle: SpeechStyle) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해요." };

  const { error } = await (supabase as any)
    .from("users")
    .update({ speech_style: speechStyle })
    .eq("id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐요. 다시 한번 해볼까요?" };

  revalidatePath("/home");
  revalidatePath("/settings");
  return { success: true };
}
