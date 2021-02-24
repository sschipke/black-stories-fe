import React from 'react';
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav';
import MoviePage from '../../components/MoviePage/MoviePage';
import unseenMovies from '../../data/unseenMovies';
import previousMovies from '../../data/previousMovies';

import './MovieView.scss';

const MovieView = ({movieId}) => {
  let currentMovie = unseenMovies.find(movie => movie.id === Number(movieId))
  if(!currentMovie){
    currentMovie = previousMovies.find(movie => movie.id === Number(movieId))
  }
  return <main className="movie-view">
    <Nav  />
    <div className="movie-container">
      {currentMovie && <MoviePage movie={currentMovie} />}
      {!currentMovie && <Redirect to="/genres" />}
    </div>
  </main>
}

export default MovieView;
