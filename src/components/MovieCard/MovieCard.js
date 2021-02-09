import React, { createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayTwoGenres } from  '../../util/helpers';
import DirectorIcon from './DirectorIcon';
import femaleIcon from '../../assets/icons/female_directed.svg';
import directorIcon from '../../assets/icons/black_directed.svg';
import './MovieCard.scss';


export const MovieCard = ({ movie, selectedGenreId, currentMovie }) => {
  let movieRef = createRef(movie.id);
  
  useEffect(() => {
    scrollToPreviousMovie();
  })

  function scrollToPreviousMovie() {
    if(currentMovie && movie.genres.includes(selectedGenreId) && movie.id === currentMovie.id) {
      const movieToScrollTo = movieRef.current
      if(movieToScrollTo) {
        movieToScrollTo.scrollIntoView()
      }
    }
    return 
  }

  const genres = movie.genres
  const blackDirectorSrc = genres.includes(100) ? directorIcon : '';
  const femaleDirectorSrc = genres.includes(6251) ? femaleIcon : '';
  const genresToDisplay =  displayTwoGenres(movie.genres, selectedGenreId).map(genreName => (<p 
  key={genreName + selectedGenreId}
  className="movie-card-genre">
    {genreName}
  </p>));
  return (
    <Link className="movie-link" to={`/movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}>
      <div className="movie" id={movie.id} ref={movieRef}>
        <img
          className="card-image"
          loading="lazy"
          alt="movie poster"
          src={"https://image.tmdb.org/t/p/original/"+movie.poster_path} 
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

export const mapStateToProps = (state) => ({
  currentMovie: state.data.currentMovie
})

export default connect(mapStateToProps)(MovieCard);
