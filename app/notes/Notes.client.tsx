"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, NoteListResponse } from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";

interface NotesClientProps {
  initialData: NoteListResponse;
  initialQuery: string;
  initialPage: number;
}

const NotesClient = ({ initialData, initialQuery, initialPage }: NotesClientProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showModal, setShowModal] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setCurrentPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    initialData,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (!isLoading && data.notes?.length === 0 && !isError) {
      toast.error("No notes found for your request.");
    }
  }, [data, isLoading, isError]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={(value) => debouncedSearch(value)} />

        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </div>

      <NoteList notes={data.notes} />
      <Toaster />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
