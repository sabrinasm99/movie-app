import { useQuery } from "@tanstack/react-query";
import { movieService } from "../service";

export const useGetNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["getNowPlayingMovies"],
    queryFn: () => movieService.getNowPlayingMovies(),
  });
};
