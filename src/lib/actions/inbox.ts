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

export async function createInboxItem(formData: FormData) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const content = String(formData.get("content") ?? "").trim();
  if (!content) return { error: "내용을 입력해줘." };

  const { error } = await (supabase as any).from("inbox_items").insert({
    user_id: userId,
    content,
    converted_to_task: false,
  });

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/inbox");
  return { success: true };
}

export async function convertToTask(itemId: string) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  // InboxItem 가져오기
  const { data: inboxItem } = (await supabase
    .from("inbox_items")
    .select("*")
    .eq("id", itemId)
    .eq("user_id", userId)
    .single()) as {
    data: { content: string } | null;
  };

  if (!inboxItem) return { error: "항목을 찾을 수 없어." };

  // Task 생성
  const { error: taskError } = await (supabase as any).from("tasks").insert({
    user_id: userId,
    title: inboxItem.content,
    priority: "medium",
    status: "todo",
    is_top3: false,
  });

  if (taskError) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  // InboxItem을 converted로 표시
  const { error: updateError } = await (supabase as any)
    .from("inbox_items")
    .update({ converted_to_task: true })
    .eq("id", itemId)
    .eq("user_id", userId);

  if (updateError) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/inbox");
  revalidatePath("/tasks");
  return { success: true };
}

export async function deleteInboxItem(itemId: string) {
  const { supabase, userId } = await getUserId();
  if (!userId) return { error: "로그인이 필요해." };

  const { error } = await supabase
    .from("inbox_items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", userId);

  if (error) return { error: "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?" };

  revalidatePath("/inbox");
  return { success: true };
}
