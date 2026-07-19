import { redirect } from "next/navigation";
import { getInboxData } from "@/lib/queries/inbox";
import { CreateInboxForm } from "@/components/inbox/create-inbox-form";
import { InboxList } from "@/components/inbox/inbox-list";

export default async function InboxPage() {
  const data = await getInboxData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-6 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          Inbox
        </h1>
        <p className="mt-2 max-w-md text-[15px] leading-6 text-text-secondary">
          판단은 나중에 해도 괜찮아요. 떠오른 것을 먼저 내려놓으세요.
        </p>
      </header>
      <CreateInboxForm />
      <InboxList items={data.items} speechStyle={speechStyle} />
    </div>
  );
}
