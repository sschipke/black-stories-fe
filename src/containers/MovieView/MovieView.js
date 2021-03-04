import React from 'react';
import { Redirect } from 'react-router-dom'
import MoviePage from '../../components/MoviePage/MoviePage';
import unseenMovies from '../../data/unseenMovies';
import previousMovies from '../../data/previousMovies';
import './MovieView.scss';

const MovieView = ({movieId}) => {
  let currentMovie = unseenMovies.find(movie => movie.id === Number(movieId))
  if(!currentMovie) {
    currentMovie = previousMovies.find(movie => movie.id === Number(movieId))
  };

  return (
    <div className="movie-container">
      {currentMovie && <MoviePage movie={currentMovie} />}
      {!currentMovie && <Redirect to="/genres" />}
    </div>
  );
};

export default MovieView;
