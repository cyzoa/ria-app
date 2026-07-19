"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { TaskPriority, TaskStatus } from "@/types/database";

async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, userId: user?.id ?? null };
}

export async function createTask(formData: FormData) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해줘." };

  const priority = (formData.get("priority") as TaskPriority) || "medium";
  const projectId = String(formData.get("project_id") ?? "") || null;
  const dueDate = String(formData.get("due_date") ?? "") || null;

  const { error } = await (supabase as any).from("tasks").insert({
    user_id: userId,
    title,
    priority,
    project_id: projectId,
    due_date: dueDate ? new Date(dueDate).toISOString() : null,
  });

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/home");
  revalidatePath("/tasks");
  return { success: true };
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const completedAt =
    status === "done" ? new Date().toISOString() : null;

  const { error } = await (supabase as any)
    .from("tasks")
    .update({ status, completed_at: completedAt })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/home");
  revalidatePath("/tasks");
  return { success: true };
}

export async function toggleTaskComplete(taskId: string, done: boolean) {
  return updateTaskStatus(taskId, done ? "done" : "todo");
}

export async function archiveTask(taskId: string) {
  return updateTaskStatus(taskId, "archived");
}

export async function deleteTask(taskId: string) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/home");
  revalidatePath("/tasks");
  return { success: true };
}

export async function setTaskTop3(taskId: string, isTop3: boolean) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  if (isTop3) {
    const { count } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_top3", true)
      .in("status", ["todo", "doing"]);

    if ((count ?? 0) >= 3) {
      return { error: "오늘 세 개는 이미 정해졌어. 이 중 하나를 바꿔볼까, 아니면 내일로 남겨둘까?" };
    }
  }

  const { error } = await (supabase as any)
    .from("tasks")
    .update({ is_top3: isTop3 })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/home");
  revalidatePath("/tasks");
  return { success: true };
}

export async function updateTaskPriority(taskId: string, priority: TaskPriority) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await (supabase as any)
    .from("tasks")
    .update({ priority })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/tasks");
  return { success: true };
}

export async function updateTaskProject(taskId: string, projectId: string | null) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await (supabase as any)
    .from("tasks")
    .update({ project_id: projectId })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/tasks");
  return { success: true };
}
