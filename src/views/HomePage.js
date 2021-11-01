import { useState, useEffect } from 'react';
import { fetchTrending } from '../services/api-service';
import Spinner from '../component/Loader';
import MovieList from '../component/MovieList';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getFetchMovies() {
      try {
        setLoader(true);
        const movies = await fetchTrending();
        setMovies(movies);
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setLoader(false);
      }
    }
    getFetchMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {loader && <Spinner />}

      {movies && <MovieList movies={movies} />}
    </>
  );
}
