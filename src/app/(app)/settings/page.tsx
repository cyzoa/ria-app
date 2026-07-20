import { redirect } from "next/navigation";
import { getHomeData } from "@/lib/queries/home";
import { SpeechStyleToggle } from "@/components/settings/speech-style-toggle";
import { LanguageSelector } from "@/components/settings/language-selector";
import { getRequestDictionary, getRequestLocale } from "@/lib/locale";

export default async function SettingsPage() {
  const [data, dictionary, locale] = await Promise.all([
    getHomeData(),
    getRequestDictionary(),
    getRequestLocale(),
  ]);
  if (!data) redirect("/login");
  const speechStyle = data.profile?.speech_style ?? "formal";
  const copy = dictionary.settings;

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-md text-base leading-7 text-text-secondary">
          {copy.description[speechStyle]}
        </p>
      </header>
      <div className="space-y-5">
        <LanguageSelector currentLocale={locale} speechStyle={speechStyle} />
        <SpeechStyleToggle currentStyle={speechStyle} />
      </div>
    </div>
  );
}
