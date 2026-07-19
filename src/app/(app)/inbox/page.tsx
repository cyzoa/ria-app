import { redirect } from "next/navigation";
import { getInboxData } from "@/lib/queries/inbox";
import { CreateInboxForm } from "@/components/inbox/create-inbox-form";
import { InboxList } from "@/components/inbox/inbox-list";

export default async function InboxPage() {
  const data = await getInboxData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="px-6 pt-12 fade-in">
      <h1 className="text-[28px] font-light tracking-tight">Inbox</h1>
      <CreateInboxForm />
      <InboxList items={data.items} speechStyle={speechStyle} />
    </div>
  );
}
