import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import MovieInfo from '../component/MovieInfo';
import { fetchDetails } from '../services/api-service';
import Spinner from '../component/Loader';
// import Cast from '../component/Cast';
// import Reviews from '../component/Reviews';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../component/Cast' /*webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../component/Reviews' /*webpackChunkName: "reviews" */),
);

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();

  const currentState = useRef(location.state?.from).current;

  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getDetailsPage() {
      try {
        setLoader(true);
        const movie = await fetchDetails(movieId);
        setMovie({ ...movie });
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setLoader(false);
      }
    }
    getDetailsPage();
  }, [movieId]);

  const onGoBack = () => {
    history.push(currentState ?? '/');
  };

  return (
    <>
      {loader && <Spinner />}
      <button type="button" className={s.button} onClick={onGoBack}>
        Back to movies
      </button>
      {movie && (
        <MovieInfo
          title={movie.title}
          poster={movie.poster_path}
          overview={movie.overview}
          releaseDate={movie.release_date || ' '}
          popularity={movie.popularity}
          vote={movie.vote_average}
          genres={movie.genres.map(genre => genre.name).join(', ')}
        />
      )}
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to={`${url}/cast`}>
            <h3>Cast</h3>
          </Link>
        </li>
        <li>
          <Link to={`${url}/reviews`}>
            <h3>Reviews</h3>
          </Link>
        </li>
      </ul>
      <Suspense fallback={<Spinner />}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
