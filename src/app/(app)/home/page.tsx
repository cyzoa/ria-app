import { redirect } from "next/navigation";
import { getHomeData } from "@/lib/queries/home";
import { getGreeting, formatDate } from "@/lib/utils";
import { NorthStarSection } from "@/components/home/north-star-section";
import { Top3Section } from "@/components/home/top3-section";
import { ScheduleSection } from "@/components/home/schedule-section";
import { TodayRhythmCard } from "@/components/home/today-rhythm-card";
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
    ? "오늘은 오후 일정이 조금 무거워 보여요. 오전에는 중요한 것 하나만 먼저 끝내볼까요?"
    : "";

  return (
    <div className="px-6 fade-in">
      <header className="mb-8">
        <p className="text-stone text-[13px]">{formatDate()}</p>
        <h1 className="mt-1 text-[28px] font-light tracking-tight">
          {greeting}
          {name && <span className="text-gold">, {name}</span>}
          {!name && <span className="text-gold">.</span>}
        </h1>
      </header>

      <TodayRhythmCard />
      <NorthStarSection northStar={data.northStar} speechStyle={speechStyle} />
      <Top3Section tasks={data.top3Tasks} speechStyle={speechStyle} />
      <ScheduleSection tasks={data.scheduleTasks} speechStyle={speechStyle} />
      {shouldShowRiaMessage && <RiaMessage message={riaMessage} />}
    </div>
  );
}
