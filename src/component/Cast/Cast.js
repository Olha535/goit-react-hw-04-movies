import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCredits } from '../../services/api-service';
import { toast } from 'react-toastify';
import Spinner from '../Loader';
import s from './Cast.module.css';

export default function Cast() {
  const [loader, setLoader] = useState(false);
  const [credits, setCredits] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function getCast() {
      try {
        setLoader(true);
        const cast = await fetchCredits(movieId);

        setCredits(cast);
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setLoader(false);
        window.scrollTo({
          top: 700,
          behavior: 'smooth',
        });
      }
    }
    getCast();
  }, [movieId]);

  return (
    <>
      {loader && <Spinner />}
      {credits && (
        <ul className={`list ${s.list}`}>
          {credits.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <img
                className={s.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                }
                alt={name}
              />
              <h3>{name}</h3>
              <h4>Character: {character}</h4>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
