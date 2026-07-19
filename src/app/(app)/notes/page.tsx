import { redirect } from "next/navigation";
import { getNotesData } from "@/lib/queries/notes";
import { CreateNoteForm } from "@/components/notes/create-note-form";
import { NoteList } from "@/components/notes/note-list";

export default async function NotesPage() {
  const data = await getNotesData();
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";

  return (
    <div className="px-6 pt-12 fade-in">
      <h1 className="text-[28px] font-light tracking-tight">Notes</h1>
      <CreateNoteForm />
      <NoteList notes={data.notes} speechStyle={speechStyle} />
    </div>
  );
}
