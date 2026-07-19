import { redirect } from "next/navigation";
import { getNotesData } from "@/lib/queries/notes";
import { CreateNoteForm } from "@/components/notes/create-note-form";
import { NoteList } from "@/components/notes/note-list";

export default async function NotesPage() {
  const data = await getNotesData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="fade-in px-5 pt-10 sm:px-6 sm:pt-12">
      <header className="mb-7 max-w-xl">
        <h1 className="text-[2rem] font-semibold tracking-[-0.035em] text-text-primary">
          Notes
        </h1>
        <p className="mt-2 max-w-md text-[15px] leading-6 text-text-secondary">
          조금 더 오래 간직하고 싶은 생각을 남겨두세요.
        </p>
      </header>
      <div className="space-y-9">
        <CreateNoteForm />
        <NoteList notes={data.notes} speechStyle={speechStyle} />
      </div>
    </div>
  );
}
