import Carousel from "react-multi-carousel";
import { useGetNowPlayingMovies } from "../../api";
import { MovieProps } from "../../types";
import MovieCard from "../../components/MovieCard";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1023 },
    items: 4,
  },
  lg: {
    breakpoint: { max: 1023, min: 767 },
    items: 3,
  },
  md: {
    breakpoint: { max: 767, min: 639 },
    items: 2,
  },
  sm: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
  },
};

export default function NowPlaying({ favMovies }: { favMovies: MovieProps[] }) {
  const limitMovies = 6;
  const { data: movies } = useGetNowPlayingMovies();

  const renderNowPlaying = () => {
    if (!movies) return <></>;

    let temp = [...movies];

    temp = temp.slice(0, limitMovies);

    return temp.map((movie: MovieProps) => (
      <div className="flex justify-center" key={movie.id}>
        <MovieCard movie={movie} favMovies={favMovies} />
      </div>
    ));
  };

  return (
    <>
      <h2 className="text-2xl tracking-wide uppercase">Now Playing</h2>
      <Carousel responsive={responsive} infinite className="mt-5 z-0">
        {renderNowPlaying()}
      </Carousel>
    </>
  );
}
