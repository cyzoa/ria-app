import { redirect } from "next/navigation";
import { getNotesData } from "@/lib/queries/notes";
import { CreateNoteForm } from "@/components/notes/create-note-form";
import { NoteList } from "@/components/notes/note-list";
import { getRequestDictionary } from "@/lib/locale";

export default async function NotesPage() {
  const [data, dictionary] = await Promise.all([getNotesData(), getRequestDictionary()]);
  if (!data) redirect("/login");

  const speechStyle = data.profile?.speech_style ?? "formal";
  const copy = dictionary.notes;

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
      <div className="space-y-9">
        <CreateNoteForm speechStyle={speechStyle} />
        <NoteList notes={data.notes} speechStyle={speechStyle} />
      </div>
    </div>
  );
}
