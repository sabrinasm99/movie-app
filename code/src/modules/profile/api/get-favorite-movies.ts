import { useQuery } from "@tanstack/react-query";
import { accountService } from "../service";

export const useGetFavoriteMovies = () => {
  return useQuery({
    queryKey: ["getFavoriteMovies"],
    queryFn: () => accountService.getFavoriteMovies(),
  });
};
