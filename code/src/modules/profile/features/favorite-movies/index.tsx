import React from "react";
import { MovieProps } from "../../../movie/types";
import { useGetFavoriteMovies, useRemoveFavoriteMovie } from "../../api";

export default function FavoriteMovies() {
  const { data: favoriteMovies } = useGetFavoriteMovies();
  const removeFavMovieMutation = useRemoveFavoriteMovie();

  const handleRemoveFavMovie = (
    e: React.MouseEvent<HTMLButtonElement>,
    movieId: number
  ) => {
    e.preventDefault();
    removeFavMovieMutation.mutate(movieId);
  };

  return (
    <>
      <h3 className="text-2xl mt-5 font-medium">My Favorites</h3>
      {favoriteMovies && favoriteMovies.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3 mt-3">
          {favoriteMovies.map((movie: MovieProps) => (
            <div
              key={movie.id}
              className="border-2 border-gray-300 rounded-md p-2 flex h-44"
            >
              <img
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                alt="favorite"
                className="h-full object-cover"
              />
              <div className="grow ml-2 flex flex-col">
                <p className="text-xl">{movie.title}</p>
                <p className="text-sm text-justify text-gray-500 mt-1 line-clamp-3 xl:line-clamp-4">
                  {movie.overview}
                </p>
                <button
                  onClick={(e) => handleRemoveFavMovie(e, movie.id)}
                  className="mt-auto ml-auto border-2 border-red-500 px-1 rounded-md text-sm text-red-500 hover:bg-red-500 hover:text-white font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grow flex justify-center items-center">
          You haven't added any favorite movies.
        </div>
      )}
    </>
  );
}
