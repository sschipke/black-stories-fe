import React, { createRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayTwoGenres } from  '../../util/helpers';
import DirectorIcon from './DirectorIcon';
import femaleIcon from '../../assets/icons/female_directed.svg';
import directorIcon from '../../assets/icons/black_directed.svg';
import './MovieCard.scss';
import "react-lazy-load-image-component/src/effects/blur.css";


export const MovieCard = ({ movie, selectedGenreId, currentMovie, type }) => {
  let genres, blackDirectorSrc, femaleDirectorSrc, genresToDisplay, date, chosenBy
  const movieRef = createRef(movie.id);

  useEffect(() => {
    scrollToPreviousMovie();
  })

  function scrollToPreviousMovie() {
    if(currentMovie && movie.id === currentMovie.id) {
      const movieToScrollTo = movieRef.current
      if(movieToScrollTo) {
        movieToScrollTo.scrollIntoView({block: "center"});
      }
    }
  }
  if(type !== 'Previously Watched'){
    genres = movie.genres
    blackDirectorSrc = genres.includes(100) ? directorIcon : '';
    femaleDirectorSrc = genres.includes(6251) ? femaleIcon : '';
    genresToDisplay =  displayTwoGenres(movie.genres, selectedGenreId).map(genreName => (<p
      key={genreName + selectedGenreId}
      className="movie-card-genre">
      {genreName}
      </p>));
      date = movie.release_date.slice(0, 4);
  } else {
    date = movie.date_watched
    chosenBy = movie.chosen_by
  }
  return (
    <Link className="movie-link" to={`/movie/${movie.id}-${encodeURI(movie.title.toLowerCase())}`}>
      <div className="movie" id={movie.id} ref={movieRef}>
        <LazyLoadImage
          className="card-image"
          effect="blur"
          alt="movie poster"
          src={"https://image.tmdb.org/t/p/original/"+movie.poster_path}
        />
        <div className="card__text-container">
          <h4>{movie.title.toUpperCase()}</h4>
          <p className="card__release-date">
            {date}
          </p>
          <p className="card__release-date chosen-by">
            {chosenBy}
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
});

export default connect(mapStateToProps)(MovieCard);
