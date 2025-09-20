import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";

const deleteNote = async (id: string): Promise<void> => {
  const response = await fetch(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete note.");
  }
};

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "notes",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete the note?")) {
      mutation.mutate(id);
    }
  };

  if (!notes.length) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              className={styles.button}
              onClick={() => handleDelete(note.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
