"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, userId: user?.id ?? null };
}

export async function createNote(formData: FormData) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const content = String(formData.get("content") ?? "").trim();
  if (!content) return { error: "내용을 입력해줘." };

  const { error } = await (supabase as any).from("notes").insert({
    user_id: userId,
    content,
  });

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/notes");
  return { success: true };
}

export async function updateNote(noteId: string, content: string) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await (supabase as any)
    .from("notes")
    .update({ content })
    .eq("id", noteId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/notes");
  return { success: true };
}

export async function deleteNote(noteId: string) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/notes");
  return { success: true };
}
