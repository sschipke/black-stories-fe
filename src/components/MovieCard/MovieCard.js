import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { displayTwoGenres } from  '../../util/helpers';
import DirectorIcon from './DirectorIcon';
import './MovieCard.scss';
import femaleIcon from '../../assets/icons/female_directed.svg';
import directorIcon from '../../assets/icons/black_directed.svg';


export const MovieCard = ({ movie, selectedGenreId }) => {
  const genres = movie.genres
  const blackDirectorSrc = genres.includes(100) ? directorIcon : '';
  const femaleDirectorSrc = genres.includes(6251) ? femaleIcon : '';
  const genresToDisplay =  displayTwoGenres(movie.genres, selectedGenreId).map(genreName => (<p 
  key={genreName}
  className="movie-card-genre">
    {genreName}
  </p>));
  return (
    <Link className="movie-link" to={`/movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}>
      <div className="movie" movie_id={movie.movie_id}>
        <img
          className="card-image"
          alt="movie poster"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
        />
        <div className="card__text-container">
          <h4>{movie.title.toUpperCase()}</h4>
          <p className="card__release-date">
            {movie.release_date.slice(0, 4)}
          </p>
          <div className="movie-genres-container">
            {genresToDisplay}
          </div>
        </div>
        <div className="director-icons-container">
          <DirectorIcon src={femaleDirectorSrc} />
          <DirectorIcon src={blackDirectorSrc} />
        </div>
      </div>
    </Link>
  );
};

export default MovieCard

// export const mapStateToProps = (state) => ({
//   favorites: state.favorites,
// });

// export default connect(mapStateToProps)(MovieCard);

// MovieCard.propTypes = {
//   movie: PropTypes.object.isRequired,
//   toggleFavorites: PropTypes.func.isRequired,
//   favorites: PropTypes.array.isRequired
// }