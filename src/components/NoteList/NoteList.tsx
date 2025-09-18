import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  page: number;
  perPage: number;
  search: string;
}

const NoteList: React.FC<NoteListProps> = ({ page, perPage, search }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", { page, perPage, search }],
    queryFn: () => fetchNotes(page, perPage, search),
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { page, perPage, search }],
      });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  if (!data || data.notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={styles.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              className={styles.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
