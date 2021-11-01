import PropTypes from 'prop-types';
import s from './MovieInfo.module.css';

export default function MovieInfo({
  poster,
  title,
  overview,
  releaseDate,
  popularity,
  vote,
  genres,
}) {
  return (
    <>
      <div className={s.wrapper}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster}`}
            alt={title}
            className={s.img}
          />
        </div>
        <div className={s.wrapperTitle}>
          <h2 className={s.titleMovie}>
            {title}
            <span>({releaseDate.split('-')[0]})</span>
          </h2>
          <h3>Vote</h3>
          <span>{vote}</span>
          <h2>Overview: </h2>
          <p>{overview}</p>
          <h3>Popularity: </h3>
          <span>{popularity}</span>
          <h3>Genres: </h3>
          <span>{genres}</span>
        </div>
      </div>
    </>
  );
}

MovieInfo.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  vote: PropTypes.number.isRequired,
  genres: PropTypes.string.isRequired,
};
