import { useInfiniteQuery } from "@tanstack/react-query";
import { movieService } from "../service";

export const useGetPopularMovies = (pageApi: number = 1) => {
  return useInfiniteQuery({
    queryKey: ["getPopularMovies"],
    queryFn: ({ pageParam = pageApi }) =>
      movieService.getPopularMovies(pageParam),
    getNextPageParam: (_lastPage, _pages, pageNumber) => {
      return pageNumber + 1;
    },
    initialPageParam: pageApi,
  });
};
