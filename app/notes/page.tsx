import { fetchNotes, NoteListResponse } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const initialPage = 1;
  const initialQuery = "";

  const initialData: NoteListResponse = await fetchNotes(initialQuery, initialPage);

  return (
    <NotesClient
      initialData={initialData}
      initialQuery={initialQuery}
      initialPage={initialPage}
    />
  );
}
