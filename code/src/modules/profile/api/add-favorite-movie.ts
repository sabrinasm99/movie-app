import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../service";

export const useAddFavoriteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => accountService.addFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getFavoriteMovies"] });
    },
  });
};
