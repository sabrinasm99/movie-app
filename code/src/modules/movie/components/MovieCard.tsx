import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MovieProps } from "../types";
import styles from "./styles/MovieCard.module.css";
import { useAddFavoriteMovie, useRemoveFavoriteMovie } from "../../profile/api";

export default function MovieCard({
  movie,
  favMovies,
}: {
  movie: MovieProps;
  favMovies: MovieProps[];
}) {
  const addFavMovieMutation = useAddFavoriteMovie();
  const removeFavMovieMutation = useRemoveFavoriteMovie();

  const handleRemoveFavMovie = (movieId: number) => {
    removeFavMovieMutation.mutate(movieId);
  };

  const handleAddFavorite = (movieId: number) => {
    addFavMovieMutation.mutate(movieId);
  };

  return (
    <div className="relative">
      <img
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
        alt="image"
        className="rounded-md cursor-pointer"
      />
      <p className="text-center mt-1">{movie.title}</p>
      <div className={styles["favorite-container"]}>
        {favMovies &&
        favMovies.length &&
        favMovies
          .filter((m: MovieProps) => m.id)
          .some((m: MovieProps) => m.id === movie.id) ? (
          <MdFavorite
            onClick={() => handleRemoveFavMovie(movie.id)}
            className="text-red-600 text-2xl cursor-pointer"
          />
        ) : (
          <MdFavoriteBorder
            onClick={() => handleAddFavorite(movie.id)}
            className="text-red-600 text-2xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
