import { useEffect, useState } from "react";
import styles from "./styles/index.module.css";
import { useGetPopularMovies } from "../../api";
import { MovieProps } from "../../types";
import MovieCard from "../../components/MovieCard";

export default function PopularMovies({
  favMovies,
}: {
  favMovies: MovieProps[];
}) {
  const moviesPerLoad = 6;
  const limitMovies = 30;
  const [page, setPage] = useState(1);
  const [pageApi, setPageApi] = useState(1);
  const { data: popularMovies, fetchNextPage } = useGetPopularMovies(pageApi);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const needToCheckApi =
      1 + Math.floor((page * moviesPerLoad) / 20) !== pageApi;

    if (needToCheckApi) {
      setPageApi((prevPageApi) => prevPageApi + 1);
    }
  }, [page]);

  useEffect(() => {
    fetchNextPage();
  }, [pageApi]);

  const renderPopular = () => {
    if (!popularMovies) return null;

    let temp = popularMovies.pages.flatMap((page) => page);

    temp = temp.slice(0, Math.min(page * moviesPerLoad, limitMovies));

    return temp.map((movie: MovieProps) => (
      <MovieCard key={movie.id} movie={movie} favMovies={favMovies} />
    ));
  };

  return (
    <>
      <h2 className="mt-10 text-2xl tracking-wide uppercase">Popular Movies</h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-5 mt-5"
        id="popular-movie"
      >
        {renderPopular()}
      </div>
      {moviesPerLoad * page < limitMovies && (
        <section className="flex justify-center mt-5">
          <button className={styles["btn-load-more"]} onClick={loadMore}>
            Load More
          </button>
        </section>
      )}
    </>
  );
}
