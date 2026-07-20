import { AppShell } from "@/components/layout/app-shell";
import { getHomeData } from "@/lib/queries/home";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getHomeData();
  const speechStyle = data?.profile?.speech_style ?? "formal";

  return <AppShell speechStyle={speechStyle}>{children}</AppShell>;
}
