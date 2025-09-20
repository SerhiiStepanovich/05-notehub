import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./App.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import type { FetchNotesResponse } from "../../services/noteService";
import { fetchNotes } from "../../services/noteService";

const PER_PAGE = 12;

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, error, isFetching } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", { page, perPage: PER_PAGE, search: debouncedSearch }],
      queryFn: () => fetchNotes(page, PER_PAGE, debouncedSearch),
      placeholderData: (previousData) => previousData,
    });

  const notes = (data as FetchNotesResponse)?.notes ?? [];
  const totalPages = (data as FetchNotesResponse)?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}

        <button className={styles.button} onClick={() => setModalOpen(true)}>
          Create a note
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      {isFetching && !isLoading && <p>Refreshing the page...</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {!isLoading && notes.length === 0 && <p>No notes found.</p>}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <NoteForm onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
