import React from 'react';
import unseenMovies from '../../data/unseenMovies';
import Nav from '../Nav/Nav';
import MovieCard from '../../components/MovieCard/MovieCard';
import './GenrePage.scss';

export const GenrePage = ({genreId, genreTitle}) => {
  let genreMovies = [];
  if(genreTitle && genreId) {
    genreTitle = genreTitle.replace('_', ' ').toUpperCase();
    genreMovies = unseenMovies.filter(movie => movie.genres.includes(genreId))
    .map(movie => <MovieCard movie={movie} key={movie.id}/>)
  }

  // if (genreMovies.length > 0) {

  // }
  
  console.log({genreTitle}, {genreId});
  return <main className="genre-page">
    <Nav subHeader={genreTitle} />
    <div className="movies-container">
      {!genreMovies.length && <h1>No movies in this genre</h1>}
      {genreMovies.length > 0 && genreMovies}
    </div>
  </main>
}

export default GenrePage;