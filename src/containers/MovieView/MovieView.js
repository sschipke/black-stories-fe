import React from 'react';
import Nav from '../Nav/Nav';
import MoviePage from '../../components/MoviePage/MoviePage';
import unseenMovies from '../../data/unseenMovies';

import './MovieView.scss';

const MovieView = ({movieId}) => {
  const currentMovie = unseenMovies.find(movie => movie.id === Number(movieId))
  return <main className="movie-view">
    <Nav  />
    <div className="movie-container">
      {currentMovie && <MoviePage movie={currentMovie} />}
    </div>
  </main>
}

export default MovieView;