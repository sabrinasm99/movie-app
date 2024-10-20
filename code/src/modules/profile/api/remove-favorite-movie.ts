import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../service";

export const useRemoveFavoriteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => accountService.removeFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getFavoriteMovies"] });
    },
  });
};
