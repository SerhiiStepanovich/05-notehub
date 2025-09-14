import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";

interface UseMoviesResult {
  movies: Movie[];
  totalPages: number;
}

export function useMovies(query: string, page: number) {
  return useQuery<UseMoviesResult, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    // keepPreviousData: true,
  });
}
