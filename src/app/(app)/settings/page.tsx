import { redirect } from "next/navigation";
import { getHomeData } from "@/lib/queries/home";
import { SpeechStyleToggle } from "@/components/settings/speech-style-toggle";

export default async function SettingsPage() {
  const data = await getHomeData();
  if (!data) redirect("/login");

  return (
    <div className="px-6 pt-12 fade-in">
      <h1 className="mb-6 text-[28px] font-light tracking-tight">설정</h1>
      <SpeechStyleToggle currentStyle={data.profile?.speech_style ?? null} />
    </div>
  );
}
