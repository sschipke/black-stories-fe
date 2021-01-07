import React from 'react';

import './MoviePage.scss';

const MoviePage = ({movie}) => {
  console.log({movie})
  return <section className="movie-section" >
      <img 
      className="movie-view-backdrop"
      alt="Movie backrop"
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      />
      <h1>{movie.title.toUpperCase()}</h1>
      <div>
        {movie.overview}
      </div>
  </section>
}

export default MoviePage