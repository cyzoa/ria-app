import { redirect } from "next/navigation";
import { getHomeData } from "@/lib/queries/home";
import { SpeechStyleToggle } from "@/components/settings/speech-style-toggle";

export default async function SettingsPage() {
  const data = await getHomeData();
  if (!data) redirect("/login");
  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          Settings
        </h1>
        <p className="mt-2 max-w-md text-base leading-7 text-text-secondary">
          {speechStyle === "casual"
            ? "RIA가 어떤 말투로 곁에 있을지 골라봐."
            : "RIA가 어떤 말투로 곁에 있을지 선택하세요."}
        </p>
      </header>
      <SpeechStyleToggle currentStyle={speechStyle} />
    </div>
  );
}
