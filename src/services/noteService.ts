import axios from "axios";
import type { Note } from "../types/note";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: Note["tag"];
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) {
    params.search = search;
  }

  const response = await api.get("/notes", { params });
  return response.data;
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await api.post("/notes", newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}
