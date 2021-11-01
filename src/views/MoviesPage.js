import { useState, useEffect } from 'react';
import { fetchKeyword } from '../services/api-service';
import { toast } from 'react-toastify';
import SearchBar from '../component/SearchBar';
import { useHistory, useLocation } from 'react-router-dom';
import MovieList from '../component/MovieList';
import Spinner from '../component/Loader';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const [loader, setLoader] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!queryUrl) {
      setMovies(null);
      return;
    }
    async function getFetchKeyword() {
      try {
        setLoader(true);
        const data = await fetchKeyword(queryUrl ?? query);
        const { results } = data;

        if (!results.length) {
          toast.info('Check the correctness of the input', {
            theme: 'colored',
          });
        }
        setMovies(results);
      } catch (error) {
        toast.error('No results found', { duration: 3000 });
      } finally {
        setLoader(false);
      }
    }
    getFetchKeyword();
  }, [query, queryUrl]);

  const onSubmit = value => {
    setQuery(value);
    history.push({ ...location, search: `query=${value}` });
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {loader && <Spinner />}

      {movies && <MovieList movies={movies} />}
    </>
  );
}
