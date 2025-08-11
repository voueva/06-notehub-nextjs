"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import NoteModal from "../../components/NoteModal/NoteModal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, NoteListResponse } from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";


const NotesPageClient = () => {
	const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setCurrentPage(1);
  }, 500);

  const {
    data = { notes: [], totalPages: 0 } as NoteListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: (prevData) => prevData,
  });

  useEffect(() => {
    if (!isLoading && data.notes?.length === 0 && !isError) {
      toast.error('No notes found for your request.');
    }
  }, [data, isLoading, isError]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          onSearch={(value) => {
            debouncedSearch(value);
          }}
        />
        {
          data.totalPages > 1 &&
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
        <button className={css.button} onClick={() => setShowModal(true)}>Create note +</button>
      </div>

      <NoteList notes={data.notes} />
      <Toaster />

      {showModal && (
        <NoteModal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </NoteModal>
      )}
    </div>
  );
};

export default NotesPageClient;
