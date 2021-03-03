import React from 'react';
import unseenMovies from '../../data/unseenMovies';
import previousMovies from '../../data/previousMovies';
import Nav from '../Nav/Nav';
import MovieCard from '../../components/MovieCard/MovieCard';
import './MovieList.scss';

export const MovieList = ({genreId, genreTitle, type}) => {
  let specificMovies = [];
  let className;
  if(genreId === 0) {
    className = 'genre-page';
    specificMovies = unseenMovies.map(movie => <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id}/>)
  }
  if(genreTitle && genreId) {
    className = 'genre-page';
    genreTitle = genreTitle.replace('_', ' ').toUpperCase();
    specificMovies = unseenMovies.filter(movie => movie.genres.includes(genreId))
    .map(movie => <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id}/>)
  } else if (type === 'Previously Watched'){
    className = 'previously-watched'
    let specificMoviesSorted = previousMovies.sort((a, b)=>{
      return Date.parse(b.date_watched) - Date.parse(a.date_watched)
    })
    specificMovies = specificMoviesSorted.map(movie => <MovieCard movie={movie} type='Previously Watched' key={movie.id}/>)
  }
  return <main className={className}>
    <Nav subHeader={genreTitle || type} />
    <div className="movies-container">
      {!specificMovies.length && <h1>No movies in this genre</h1>}
      {specificMovies.length > 0 && specificMovies}
    </div>
  </main>
}

export default MovieList;
