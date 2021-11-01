import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/api-service';
import Spinner from '../Loader';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoader(true);
        const reviews = await fetchReviews(movieId);

        setReviews(reviews);
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
    getReviews();
  }, [movieId]);

  return (
    <>
      {loader && <Spinner />}

      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!reviews && <h3>We don't have any reviews for this movie.</h3>}
    </>
  );
}
