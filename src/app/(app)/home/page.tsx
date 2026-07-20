import { redirect } from "next/navigation";
import Link from "next/link";
import { getHomeData } from "@/lib/queries/home";
import { getGreeting, formatDate } from "@/lib/utils";
import { NorthStarSection } from "@/components/home/north-star-section";
import { Top3Section } from "@/components/home/top3-section";
import { ScheduleSection } from "@/components/home/schedule-section";
import { RiaMessage } from "@/components/home/ria-message";
import { getDictionary } from "@/locales";

export default async function HomePage() {
  const data = await getHomeData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";
  const copy = getDictionary();
  const greeting = getGreeting(speechStyle);
  const name = data.profile?.preferred_name ?? (speechStyle === "casual" ? copy.home.casualDefaultName : "");

  // RIA 메시지 조건부 로직
  const hasSchedule = data.scheduleTasks.length > 0;
  const afternoonTasks = data.scheduleTasks.filter(
    (task) => task.due_date && new Date(task.due_date).getHours() >= 12
  );
  const isAfternoonHeavy = afternoonTasks.length >= 2;

  const shouldShowRiaMessage = hasSchedule && isAfternoonHeavy;
  const riaMessage = shouldShowRiaMessage ? copy.home.suggestion.afternoonHeavy[speechStyle] : "";

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
          {copy.home.quickCapture.title}
        </h2>
        <Link
          href="/inbox"
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl bg-surface-muted px-4 py-3 transition-colors hover:bg-primary-soft"
        >
          <span className="min-w-0">
            <span className="block break-words text-base font-medium leading-6 text-text-primary">
              {copy.home.quickCapture.action}
            </span>
            <span className="mt-0.5 block break-words text-sm leading-relaxed text-text-secondary">
              {copy.home.quickCapture.description[speechStyle]}
            </span>
          </span>
          <span aria-hidden="true" className="shrink-0 text-sm font-semibold text-primary">
            {copy.common.actions.open}
          </span>
        </Link>
      </section>

      {shouldShowRiaMessage && <RiaMessage message={riaMessage} speechStyle={speechStyle} />}
    </div>
  );
}
