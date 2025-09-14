import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page = 1
): Promise<{ movies: Movie[]; totalPages: number }> {
  const response = await axios.get<TMDBResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
  };
}
