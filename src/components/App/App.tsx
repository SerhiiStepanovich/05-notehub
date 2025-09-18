import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./App.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";

const PER_PAGE = 12;

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useQuery({
    queryKey: ["notes", { page, perPage: PER_PAGE, search: debouncedSearch }],
    queryFn: () => fetchNotes(page, PER_PAGE, debouncedSearch),
  });

  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        <button className={styles.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      <NoteList page={page} perPage={PER_PAGE} search={debouncedSearch} />

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <NoteForm onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
