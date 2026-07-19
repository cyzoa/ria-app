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

export async function createProject(formData: FormData) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "프로젝트 이름을 입력해줘." };

  const color = String(formData.get("color") ?? "#C9A661");

  const { error } = await (supabase as any).from("projects").insert({
    user_id: userId,
    name,
    color,
  });

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/projects");
  revalidatePath("/tasks");
  return { success: true };
}

export async function deleteProject(projectId: string) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/projects");
  revalidatePath("/tasks");
  return { success: true };
}
