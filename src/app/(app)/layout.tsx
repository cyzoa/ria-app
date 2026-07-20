import { AppShell } from "@/components/layout/app-shell";
import { getHomeData } from "@/lib/queries/home";
import { getRequestDictionary, getRequestLocale } from "@/lib/locale";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, dictionary, locale] = await Promise.all([
    getHomeData(),
    getRequestDictionary(),
    getRequestLocale(),
  ]);
  const speechStyle = data?.profile?.speech_style ?? "formal";
  const displayName = data?.profile?.preferred_name ?? dictionary.home.casualDefaultName;

  return (
    <AppShell
      dictionary={dictionary}
      displayName={displayName}
      locale={locale}
      speechStyle={speechStyle}
    >
      {children}
    </AppShell>
  );
}
