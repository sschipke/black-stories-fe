import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import MoviePage from '../../components/MoviePage/MoviePage';
import './MovieView.scss';

const MovieView = ({movieId, unseenMovies, previousMovies}) => {
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

export const mapStateToProps = state => ({
  unseenMovies: state.data.watchList,
  previousMovies: state.data.previouslySeen
})

export default connect(mapStateToProps)(MovieView);
