import { redirect } from "next/navigation";
import Link from "next/link";
import { getHomeData } from "@/lib/queries/home";
import { getGreeting, formatDate } from "@/lib/utils";
import { NorthStarSection } from "@/components/home/north-star-section";
import { Top3Section } from "@/components/home/top3-section";
import { ScheduleSection } from "@/components/home/schedule-section";
import { RiaMessage } from "@/components/home/ria-message";

export default async function HomePage() {
  const data = await getHomeData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";
  const greeting = getGreeting(speechStyle);
  const name = data.profile?.preferred_name ?? (speechStyle === "casual" ? "오빠" : "");

  // RIA 메시지 조건부 로직
  const hasSchedule = data.scheduleTasks.length > 0;
  const afternoonTasks = data.scheduleTasks.filter(
    (task) => task.due_date && new Date(task.due_date).getHours() >= 12
  );
  const isAfternoonHeavy = afternoonTasks.length >= 2;

  const shouldShowRiaMessage = hasSchedule && isAfternoonHeavy;
  const riaMessage = shouldShowRiaMessage
    ? speechStyle === "casual"
      ? "오늘은 오후 일정이 조금 무거워 보여. 오전에는 중요한 것 하나만 먼저 끝내볼까?"
      : "오늘은 오후 일정이 조금 무거워 보여요. 오전에는 중요한 것 하나만 먼저 끝내볼까요?"
    : "";
  const quickCaptureDescription =
    speechStyle === "casual"
      ? "Inbox에 편하게 남겨둘 수 있어."
      : "Inbox에 편하게 남겨둘 수 있어요.";

  return (
    <div className="fade-in px-5 pb-10 sm:px-6">
      <header className="mb-10">
        <p className="text-sm text-text-secondary">{formatDate()}</p>
        <h1 className="mt-2 max-w-md text-[26px] font-light leading-snug tracking-[-0.02em] text-text-primary">
          {greeting}
          {name && <span className="font-normal text-accent">, {name}</span>}
          {!name && <span className="text-accent">.</span>}
        </h1>
      </header>

      <NorthStarSection northStar={data.northStar} speechStyle={speechStyle} />
      <Top3Section tasks={data.top3Tasks} speechStyle={speechStyle} />
      <ScheduleSection tasks={data.scheduleTasks} speechStyle={speechStyle} />

      <section aria-labelledby="quick-capture-title" className="mb-10">
        <h2 id="quick-capture-title" className="mb-3 text-sm font-semibold text-text-primary">
          빠른 기록
        </h2>
        <Link
          href="/inbox"
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl bg-surface-muted px-4 py-3 transition-colors hover:bg-primary-soft"
        >
          <span className="min-w-0">
            <span className="block break-words text-base font-medium leading-6 text-text-primary">
              떠오른 생각을 잠시 내려놓기
            </span>
            <span className="mt-0.5 block break-words text-sm leading-relaxed text-text-secondary">
              {quickCaptureDescription}
            </span>
          </span>
          <span aria-hidden="true" className="shrink-0 text-sm font-semibold text-primary">
            열기 →
          </span>
        </Link>
      </section>

      {shouldShowRiaMessage && <RiaMessage message={riaMessage} speechStyle={speechStyle} />}
    </div>
  );
}
